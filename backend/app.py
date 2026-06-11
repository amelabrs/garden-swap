"""Garden Swap — Main FastAPI App (Stage 3: The Tiers)."""

import os
import uuid
import json
import stripe
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form, Header, Query, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path
from typing import Optional, List

from models import get_db, init_db, migrate_db, query, query_one, execute, DATABASE_URL
from auth import hash_password, verify_password, create_token, decode_token
from geo import haversine_miles, zip_to_coords

import cloudinary
import cloudinary.uploader

# ── Config ──────────────────────────────────────────────────────────────

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME", ""),
    api_key=os.environ.get("CLOUDINARY_API_KEY", ""),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET", ""),
)

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
STRIPE_PRICE_GROWER = os.environ.get("STRIPE_PRICE_GROWER", "")
STRIPE_PRICE_STEWARD = os.environ.get("STRIPE_PRICE_STEWARD", "")
APP_URL = os.environ.get("APP_URL", "http://localhost:8000")

# Sprout tier limits
SPROUT_MAX_LISTINGS = 3
SPROUT_MAX_WISHLIST = 5

app = FastAPI(title="Garden Swap API")

# Serve frontend
FRONTEND_DIR = Path(__file__).parent.parent / "frontend"
app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

# Serve design system website
WEB_DIR = Path(__file__).parent.parent / "web"
app.mount("/design", StaticFiles(directory=str(WEB_DIR), html=True), name="design")

# Serve uploaded images locally (dev mode)
UPLOADS_DIR = Path(__file__).parent.parent / "data" / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

# Placeholder param for SQL (? for sqlite, %s for postgres)
P = "%s" if DATABASE_URL else "?"


@app.on_event("startup")
def startup():
    init_db()
    migrate_db()
    conn = get_db()
    count = query_one(conn, "SELECT COUNT(*) as c FROM listings")
    conn.close()
    if count and count["c"] == 0:
        from seed import seed
        seed()


# ── Auth dependency ─────────────────────────────────────────────────────

def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    tok = authorization.split(" ", 1)[1]
    payload = decode_token(tok)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"id": int(payload["sub"]), "username": payload["username"]}


def get_optional_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        return None
    tok = authorization.split(" ", 1)[1]
    payload = decode_token(tok)
    if not payload:
        return None
    return {"id": int(payload["sub"]), "username": payload["username"]}


# ── Schemas ─────────────────────────────────────────────────────────────

class SignupRequest(BaseModel):
    email: str
    username: str
    password: str
    display_name: str = ""
    zip_code: str


class LoginRequest(BaseModel):
    email: str
    password: str


# ── Auth Endpoints ──────────────────────────────────────────────────────

@app.post("/api/signup")
def signup(req: SignupRequest):
    if not req.zip_code or len(req.zip_code) < 3:
        raise HTTPException(status_code=400, detail="Valid zip code is required")

    conn = get_db()
    existing = query_one(conn, f"SELECT id FROM users WHERE email = {P} OR username = {P}", (req.email, req.username))
    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="Email or username already taken")

    hashed = hash_password(req.password)
    lat, lng = zip_to_coords(req.zip_code)
    user_id = execute(conn,
        f"INSERT INTO users (email, username, password_hash, display_name, zip_code, lat, lng, tier) VALUES ({P}, {P}, {P}, {P}, {P}, {P}, {P}, 'sprout')",
        (req.email, req.username, hashed, req.display_name or req.username, req.zip_code, lat, lng)
    )
    conn.commit()
    conn.close()

    token = create_token(user_id, req.username)
    return {"token": token, "user_id": user_id, "username": req.username,
            "display_name": req.display_name or req.username, "tier": "sprout"}


@app.post("/api/login")
def login(req: LoginRequest):
    conn = get_db()
    user = query_one(conn, f"SELECT id, username, display_name, password_hash, tier FROM users WHERE email = {P}", (req.email,))
    conn.close()

    if not user or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token(user["id"], user["username"])
    return {"token": token, "user_id": user["id"], "username": user["username"],
            "display_name": user["display_name"], "tier": user.get("tier", "sprout")}


# ── Profile Endpoints ───────────────────────────────────────────────────

@app.get("/api/profile/{username}")
def get_profile(username: str):
    conn = get_db()
    user = query_one(conn,
        f"SELECT id, username, display_name, zip_code, rating_sum, rating_count, tier, created_at FROM users WHERE username = {P}",
        (username,))
    if not user:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")

    listings = query(conn,
        f"""SELECT id, title, plant_type, condition, status, image_url, is_active, created_at
           FROM listings WHERE user_id = {P} ORDER BY created_at DESC""",
        (user["id"],))
    conn.close()

    rating = round(user["rating_sum"] / user["rating_count"], 1) if user["rating_count"] > 0 else None

    return {
        "username": user["username"],
        "display_name": user["display_name"],
        "zip_code": user["zip_code"],
        "tier": user.get("tier", "sprout"),
        "rating": rating,
        "rating_count": user["rating_count"],
        "member_since": str(user["created_at"]),
        "listings": listings,
    }


@app.get("/api/me")
def get_me(user=Depends(get_current_user)):
    conn = get_db()
    u = query_one(conn,
        f"SELECT id, username, display_name, zip_code, lat, lng, rating_sum, rating_count, tier FROM users WHERE id = {P}",
        (user["id"],))
    if not u:
        conn.close()
        raise HTTPException(status_code=401, detail="Session expired, please sign in again")

    # Count active listings
    active_count = query_one(conn,
        f"SELECT COUNT(*) as c FROM listings WHERE user_id = {P} AND is_active = 1", (user["id"],))

    # Count unread notifications (Grower/Steward only)
    tier = u.get("tier", "sprout")
    unread_notifications = 0
    if tier in ("grower", "steward"):
        unread = query_one(conn,
            f"SELECT COUNT(*) as c FROM notifications WHERE user_id = {P} AND is_read = 0", (user["id"],))
        unread_notifications = unread["c"] if unread else 0

    conn.close()

    rating = round(u["rating_sum"] / u["rating_count"], 1) if u["rating_count"] > 0 else None
    return {
        **u,
        "rating": rating,
        "active_listing_count": active_count["c"] if active_count else 0,
        "unread_notifications": unread_notifications,
    }


# ── Listing Endpoints ───────────────────────────────────────────────────

@app.post("/api/listings")
async def create_listing(
    title: str = Form(...),
    plant_type: str = Form(...),
    condition: str = Form(...),
    status: str = Form("swap"),
    description: str = Form(""),
    light_needs: str = Form(""),
    rarity: str = Form(""),
    size: str = Form(""),
    image: UploadFile = File(...),
    user=Depends(get_current_user),
):
    if status not in ("swap", "free"):
        raise HTTPException(status_code=400, detail="Status must be 'swap' or 'free'")

    contents = await image.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image too large (max 10MB)")

    conn = get_db()
    u = query_one(conn, f"SELECT lat, lng, tier FROM users WHERE id = {P}", (user["id"],))
    if not u:
        conn.close()
        raise HTTPException(status_code=401, detail="Session expired, please sign in again")

    # Enforce Sprout listing limit
    if u.get("tier", "sprout") == "sprout":
        active_count = query_one(conn,
            f"SELECT COUNT(*) as c FROM listings WHERE user_id = {P} AND is_active = 1", (user["id"],))
        if active_count and active_count["c"] >= SPROUT_MAX_LISTINGS:
            conn.close()
            raise HTTPException(
                status_code=403,
                detail=f"SPROUT_LIMIT: Sprout accounts can have max {SPROUT_MAX_LISTINGS} active listings. Upgrade to Grower for unlimited listings."
            )

    lat, lng = u["lat"], u["lng"]

    cloud_name = os.environ.get("CLOUDINARY_CLOUD_NAME", "")
    if cloud_name:
        upload_result = cloudinary.uploader.upload(contents, folder="gardenswap", transformation=[{"width": 800, "crop": "limit"}])
        image_url = upload_result["secure_url"]
        public_id = upload_result["public_id"]
    else:
        ext = image.filename.rsplit(".", 1)[-1] if "." in image.filename else "jpg"
        filename = f"{uuid.uuid4().hex}.{ext}"
        with open(UPLOADS_DIR / filename, "wb") as f:
            f.write(contents)
        image_url = f"/uploads/{filename}"
        public_id = None

    listing_id = execute(conn,
        f"""INSERT INTO listings (user_id, title, plant_type, condition, status, description, image_url, image_public_id, lat, lng, light_needs, rarity, size)
           VALUES ({P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P})""",
        (user["id"], title, plant_type, condition, status, description, image_url, public_id, lat, lng,
         light_needs, rarity, size))

    # Smart match: notify Grower/Steward users whose wish list matches this listing
    _check_smart_match(conn, listing_id, title, lat, lng)

    conn.commit()
    conn.close()
    return {"id": listing_id, "image_url": image_url}


def _check_smart_match(conn, listing_id, title, listing_lat, listing_lng):
    """Notify Grower/Steward users when a new listing matches their wish list."""
    try:
        wish_items = query(conn, f"""
            SELECT w.id, w.user_id, w.plant_name, u.lat, u.lng
            FROM wish_list w
            JOIN users u ON w.user_id = u.id
            WHERE u.tier IN ('grower', 'steward')
        """)

        title_lower = title.lower()
        notified_users = set()

        for item in wish_items:
            if item["plant_name"].lower() in title_lower and item["user_id"] not in notified_users:
                u_lat, u_lng = item["lat"], item["lng"]
                if u_lat and u_lng and listing_lat and listing_lng:
                    dist = haversine_miles(u_lat, u_lng, listing_lat, listing_lng)
                    if dist <= 25:
                        body = f"New match! '{title}' listed {dist:.1f} mi away — matches your wish for '{item['plant_name']}'"
                        execute(conn,
                            f"INSERT INTO notifications (user_id, type, body, listing_id) VALUES ({P}, 'smart_match', {P}, {P})",
                            (item["user_id"], body, listing_id))
                        notified_users.add(item["user_id"])
    except Exception:
        pass  # Never fail listing creation due to notification error


@app.get("/api/listings")
def get_listings(
    lat: float = 0, lng: float = 0, radius: float = 10,
    plant_type: str = "", status: str = "", q: str = "",
    light_needs: str = "", rarity: str = "", size: str = "",
    min_rating: float = 0,
    limit: int = 50,
):
    conn = get_db()
    rows = query(conn,
        f"""SELECT l.id, l.title, l.plant_type, l.condition, l.status, l.description,
                  l.image_url, l.lat, l.lng, l.created_at,
                  l.light_needs, l.rarity, l.size,
                  u.username, u.display_name, u.rating_sum, u.rating_count
           FROM listings l
           JOIN users u ON l.user_id = u.id
           WHERE l.is_active = 1
           ORDER BY l.created_at DESC
           LIMIT {P}""",
        (limit * 3,))
    conn.close()

    results = []
    for row in rows:
        if plant_type and row.get("plant_type", "").lower() != plant_type.lower():
            continue
        if status and row.get("status", "").lower() != status.lower():
            continue
        if q and q.lower() not in (row.get("title", "") + " " + (row.get("plant_type") or "") + " " + (row.get("description") or "")).lower():
            continue
        # Advanced filters (Grower+)
        if light_needs and (row.get("light_needs") or "").lower() != light_needs.lower():
            continue
        if rarity and (row.get("rarity") or "").lower() != rarity.lower():
            continue
        if size and (row.get("size") or "").lower() != size.lower():
            continue

        item = dict(row)
        item["user_rating"] = round(row["rating_sum"] / row["rating_count"], 1) if row["rating_count"] > 0 else None

        # Advanced filter: min lister rating
        if min_rating > 0 and (item["user_rating"] is None or item["user_rating"] < min_rating):
            continue

        if lat != 0 or lng != 0:
            dist = haversine_miles(lat, lng, row["lat"], row["lng"])
            item["distance_miles"] = round(dist, 1)
            if dist > radius:
                continue
        else:
            item["distance_miles"] = None

        results.append(item)

    if lat != 0 or lng != 0:
        results.sort(key=lambda x: x["distance_miles"])

    return results[:limit]


@app.get("/api/listings/{listing_id}")
def get_listing(listing_id: int):
    conn = get_db()
    row = query_one(conn,
        f"""SELECT l.*, u.username, u.display_name, u.rating_sum, u.rating_count
           FROM listings l JOIN users u ON l.user_id = u.id
           WHERE l.id = {P}""", (listing_id,))
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Listing not found")
    item = dict(row)
    item["user_rating"] = round(row["rating_sum"] / row["rating_count"], 1) if row["rating_count"] > 0 else None
    return item


@app.delete("/api/listings/{listing_id}")
def delete_listing(listing_id: int, user=Depends(get_current_user)):
    conn = get_db()
    listing = query_one(conn, f"SELECT user_id, image_public_id FROM listings WHERE id = {P}", (listing_id,))
    if not listing or listing["user_id"] != user["id"]:
        conn.close()
        raise HTTPException(status_code=403, detail="Not your listing")
    if listing.get("image_public_id"):
        try:
            cloudinary.uploader.destroy(listing["image_public_id"])
        except Exception:
            pass
    execute(conn, f"DELETE FROM listings WHERE id = {P}", (listing_id,))
    conn.commit()
    conn.close()
    return {"ok": True}


# ── Swap Endpoints ──────────────────────────────────────────────────────

class SwapRequest(BaseModel):
    listing_id: int
    offered_listing_id: Optional[int] = None
    swap_type: str = "trade"
    message: str = ""


@app.post("/api/swaps")
def create_swap(req: SwapRequest, user=Depends(get_current_user)):
    if req.swap_type not in ("trade", "giveaway"):
        raise HTTPException(status_code=400, detail="swap_type must be 'trade' or 'giveaway'")

    conn = get_db()
    listing = query_one(conn, f"SELECT id, user_id, swap_status, title FROM listings WHERE id = {P}", (req.listing_id,))
    if not listing:
        conn.close()
        raise HTTPException(status_code=404, detail="Listing not found")
    if listing["user_id"] == user["id"]:
        conn.close()
        raise HTTPException(status_code=400, detail="Cannot request swap on your own listing")
    if listing["swap_status"] != "available":
        conn.close()
        raise HTTPException(status_code=400, detail="Listing is not available for swap")

    if req.offered_listing_id:
        offered = query_one(conn, f"SELECT id, user_id FROM listings WHERE id = {P}", (req.offered_listing_id,))
        if not offered or offered["user_id"] != user["id"]:
            conn.close()
            raise HTTPException(status_code=400, detail="You don't own that listing to offer")

    swap_id = execute(conn,
        f"""INSERT INTO swaps (listing_id, requester_id, lister_id, offered_listing_id, swap_type, state)
           VALUES ({P}, {P}, {P}, {P}, {P}, 'pending')""",
        (req.listing_id, user["id"], listing["user_id"], req.offered_listing_id, req.swap_type))

    execute(conn, f"UPDATE listings SET swap_status = 'pending' WHERE id = {P}", (req.listing_id,))

    if req.message.strip():
        execute(conn,
            f"INSERT INTO messages (swap_id, sender_id, body) VALUES ({P}, {P}, {P})",
            (swap_id, user["id"], req.message.strip()[:250]))

    conn.commit()
    conn.close()
    return {"swap_id": swap_id}


@app.get("/api/swaps")
def get_my_swaps(user=Depends(get_current_user)):
    conn = get_db()
    rows = query(conn, f"""
        SELECT s.id, s.listing_id, s.requester_id, s.lister_id, s.offered_listing_id,
               s.swap_type, s.state, s.lister_confirmed, s.requester_confirmed,
               s.created_at, s.updated_at,
               l.title as listing_title, l.image_url as listing_image,
               req.display_name as requester_name, req.username as requester_username,
               lis.display_name as lister_name, lis.username as lister_username
        FROM swaps s
        JOIN listings l ON s.listing_id = l.id
        JOIN users req ON s.requester_id = req.id
        JOIN users lis ON s.lister_id = lis.id
        WHERE s.requester_id = {P} OR s.lister_id = {P}
        ORDER BY s.updated_at DESC
    """, (user["id"], user["id"]))

    for row in rows:
        last_msg = query_one(conn,
            f"SELECT body, sender_id, created_at FROM messages WHERE swap_id = {P} ORDER BY created_at DESC LIMIT 1",
            (row["id"],))
        row["last_message"] = last_msg
        msg_count = query_one(conn,
            f"SELECT COUNT(*) as c FROM messages WHERE swap_id = {P}", (row["id"],))
        row["message_count"] = msg_count["c"] if msg_count else 0

    conn.close()
    return rows


@app.get("/api/swaps/{swap_id}")
def get_swap(swap_id: int, user=Depends(get_current_user)):
    conn = get_db()
    swap = query_one(conn, f"""
        SELECT s.*, l.title as listing_title, l.image_url as listing_image, l.plant_type,
               req.display_name as requester_name, req.username as requester_username,
               lis.display_name as lister_name, lis.username as lister_username
        FROM swaps s
        JOIN listings l ON s.listing_id = l.id
        JOIN users req ON s.requester_id = req.id
        JOIN users lis ON s.lister_id = lis.id
        WHERE s.id = {P}
    """, (swap_id,))

    if not swap:
        conn.close()
        raise HTTPException(status_code=404, detail="Swap not found")
    if swap["requester_id"] != user["id"] and swap["lister_id"] != user["id"]:
        conn.close()
        raise HTTPException(status_code=403, detail="Not your swap")

    offered = None
    if swap.get("offered_listing_id"):
        offered = query_one(conn,
            f"SELECT id, title, image_url, plant_type FROM listings WHERE id = {P}",
            (swap["offered_listing_id"],))

    messages = query(conn, f"""
        SELECT m.id, m.body, m.sender_id, m.created_at, u.display_name, u.username
        FROM messages m JOIN users u ON m.sender_id = u.id
        WHERE m.swap_id = {P} ORDER BY m.created_at ASC
    """, (swap_id,))

    ratings = query(conn, f"SELECT rater_id, rated_id, score, comment FROM ratings WHERE swap_id = {P}", (swap_id,))

    conn.close()
    return {**swap, "offered_listing": offered, "messages": messages, "ratings": ratings}


class MessageBody(BaseModel):
    body: str


@app.post("/api/swaps/{swap_id}/messages")
def send_message(swap_id: int, req: MessageBody, user=Depends(get_current_user)):
    if not req.body.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    conn = get_db()
    swap = query_one(conn, f"SELECT requester_id, lister_id, state FROM swaps WHERE id = {P}", (swap_id,))
    if not swap:
        conn.close()
        raise HTTPException(status_code=404, detail="Swap not found")
    if swap["requester_id"] != user["id"] and swap["lister_id"] != user["id"]:
        conn.close()
        raise HTTPException(status_code=403, detail="Not your swap")
    if swap["state"] == "declined":
        conn.close()
        raise HTTPException(status_code=400, detail="Cannot message in a declined swap")

    msg_id = execute(conn,
        f"INSERT INTO messages (swap_id, sender_id, body) VALUES ({P}, {P}, {P})",
        (swap_id, user["id"], req.body.strip()[:500]))
    execute(conn, f"UPDATE swaps SET updated_at = CURRENT_TIMESTAMP WHERE id = {P}", (swap_id,))
    conn.commit()
    conn.close()
    return {"message_id": msg_id}


@app.post("/api/swaps/{swap_id}/accept")
def accept_swap(swap_id: int, user=Depends(get_current_user)):
    conn = get_db()
    swap = query_one(conn, f"SELECT id, lister_id, listing_id, state FROM swaps WHERE id = {P}", (swap_id,))
    if not swap:
        conn.close()
        raise HTTPException(status_code=404, detail="Swap not found")
    if swap["lister_id"] != user["id"]:
        conn.close()
        raise HTTPException(status_code=403, detail="Only the lister can accept")
    if swap["state"] != "pending":
        conn.close()
        raise HTTPException(status_code=400, detail="Swap is not pending")

    execute(conn, f"UPDATE swaps SET state = 'accepted', updated_at = CURRENT_TIMESTAMP WHERE id = {P}", (swap_id,))
    execute(conn, f"UPDATE listings SET swap_status = 'accepted' WHERE id = {P}", (swap["listing_id"],))
    conn.commit()
    conn.close()
    return {"ok": True, "state": "accepted"}


@app.post("/api/swaps/{swap_id}/decline")
def decline_swap(swap_id: int, user=Depends(get_current_user)):
    conn = get_db()
    swap = query_one(conn, f"SELECT id, lister_id, listing_id, state FROM swaps WHERE id = {P}", (swap_id,))
    if not swap:
        conn.close()
        raise HTTPException(status_code=404, detail="Swap not found")
    if swap["lister_id"] != user["id"]:
        conn.close()
        raise HTTPException(status_code=403, detail="Only the lister can decline")
    if swap["state"] not in ("pending",):
        conn.close()
        raise HTTPException(status_code=400, detail="Swap cannot be declined in current state")

    execute(conn, f"UPDATE swaps SET state = 'declined', updated_at = CURRENT_TIMESTAMP WHERE id = {P}", (swap_id,))
    execute(conn, f"UPDATE listings SET swap_status = 'available' WHERE id = {P}", (swap["listing_id"],))
    conn.commit()
    conn.close()
    return {"ok": True, "state": "declined"}


@app.post("/api/swaps/{swap_id}/confirm")
def confirm_swap(swap_id: int, user=Depends(get_current_user)):
    conn = get_db()
    swap = query_one(conn,
        f"SELECT id, requester_id, lister_id, listing_id, state, lister_confirmed, requester_confirmed FROM swaps WHERE id = {P}",
        (swap_id,))
    if not swap:
        conn.close()
        raise HTTPException(status_code=404, detail="Swap not found")
    if swap["requester_id"] != user["id"] and swap["lister_id"] != user["id"]:
        conn.close()
        raise HTTPException(status_code=403, detail="Not your swap")
    if swap["state"] != "accepted":
        conn.close()
        raise HTTPException(status_code=400, detail="Swap must be accepted before confirming")

    if user["id"] == swap["lister_id"]:
        execute(conn, f"UPDATE swaps SET lister_confirmed = 1, updated_at = CURRENT_TIMESTAMP WHERE id = {P}", (swap_id,))
        swap["lister_confirmed"] = 1
    else:
        execute(conn, f"UPDATE swaps SET requester_confirmed = 1, updated_at = CURRENT_TIMESTAMP WHERE id = {P}", (swap_id,))
        swap["requester_confirmed"] = 1

    if swap["lister_confirmed"] and swap["requester_confirmed"]:
        execute(conn, f"UPDATE swaps SET state = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = {P}", (swap_id,))
        execute(conn, f"UPDATE listings SET swap_status = 'completed', is_active = 0 WHERE id = {P}", (swap["listing_id"],))

    conn.commit()
    conn.close()

    both_done = swap["lister_confirmed"] and swap["requester_confirmed"]
    return {"ok": True, "state": "completed" if both_done else "accepted", "both_confirmed": both_done}


# ── Rating Endpoints ────────────────────────────────────────────────────

class RatingRequest(BaseModel):
    score: int
    comment: str = ""


@app.post("/api/swaps/{swap_id}/rate")
def rate_swap(swap_id: int, req: RatingRequest, user=Depends(get_current_user)):
    if req.score < 1 or req.score > 5:
        raise HTTPException(status_code=400, detail="Score must be 1-5")

    conn = get_db()
    swap = query_one(conn, f"SELECT id, requester_id, lister_id, state FROM swaps WHERE id = {P}", (swap_id,))
    if not swap:
        conn.close()
        raise HTTPException(status_code=404, detail="Swap not found")
    if swap["state"] != "completed":
        conn.close()
        raise HTTPException(status_code=400, detail="Can only rate completed swaps")
    if swap["requester_id"] != user["id"] and swap["lister_id"] != user["id"]:
        conn.close()
        raise HTTPException(status_code=403, detail="Not your swap")

    rated_id = swap["lister_id"] if user["id"] == swap["requester_id"] else swap["requester_id"]

    existing = query_one(conn, f"SELECT id FROM ratings WHERE swap_id = {P} AND rater_id = {P}", (swap_id, user["id"]))
    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="You already rated this swap")

    execute(conn,
        f"INSERT INTO ratings (swap_id, rater_id, rated_id, score, comment) VALUES ({P}, {P}, {P}, {P}, {P})",
        (swap_id, user["id"], rated_id, req.score, req.comment[:200]))

    execute(conn,
        f"UPDATE users SET rating_sum = rating_sum + {P}, rating_count = rating_count + 1 WHERE id = {P}",
        (req.score, rated_id))

    conn.commit()
    conn.close()
    return {"ok": True}


# ── Wish List Endpoints ─────────────────────────────────────────────────

class WishListItem(BaseModel):
    plant_name: str


@app.get("/api/wish-list")
def get_wish_list(user=Depends(get_current_user)):
    conn = get_db()
    items = query(conn,
        f"SELECT id, plant_name, created_at FROM wish_list WHERE user_id = {P} ORDER BY created_at DESC",
        (user["id"],))
    conn.close()
    return items


@app.post("/api/wish-list")
def add_wish_list_item(req: WishListItem, user=Depends(get_current_user)):
    plant_name = req.plant_name.strip()
    if not plant_name:
        raise HTTPException(status_code=400, detail="Plant name is required")
    if len(plant_name) > 100:
        raise HTTPException(status_code=400, detail="Plant name too long (max 100 chars)")

    conn = get_db()

    # Check tier limit for Sprout
    u = query_one(conn, f"SELECT tier FROM users WHERE id = {P}", (user["id"],))
    tier = u.get("tier", "sprout") if u else "sprout"

    if tier == "sprout":
        count = query_one(conn,
            f"SELECT COUNT(*) as c FROM wish_list WHERE user_id = {P}", (user["id"],))
        if count and count["c"] >= SPROUT_MAX_WISHLIST:
            conn.close()
            raise HTTPException(
                status_code=403,
                detail=f"SPROUT_LIMIT: Sprout accounts can have max {SPROUT_MAX_WISHLIST} wish list items. Upgrade to Grower for unlimited."
            )

    try:
        item_id = execute(conn,
            f"INSERT INTO wish_list (user_id, plant_name) VALUES ({P}, {P})",
            (user["id"], plant_name))
        conn.commit()
    except Exception:
        conn.close()
        raise HTTPException(status_code=400, detail="Item already in wish list")

    conn.close()
    return {"id": item_id, "plant_name": plant_name}


@app.delete("/api/wish-list/{item_id}")
def delete_wish_list_item(item_id: int, user=Depends(get_current_user)):
    conn = get_db()
    item = query_one(conn, f"SELECT user_id FROM wish_list WHERE id = {P}", (item_id,))
    if not item or item["user_id"] != user["id"]:
        conn.close()
        raise HTTPException(status_code=404, detail="Item not found")
    execute(conn, f"DELETE FROM wish_list WHERE id = {P}", (item_id,))
    conn.commit()
    conn.close()
    return {"ok": True}


# ── Notification Endpoints ──────────────────────────────────────────────

@app.get("/api/notifications")
def get_notifications(user=Depends(get_current_user)):
    conn = get_db()
    items = query(conn,
        f"""SELECT n.id, n.type, n.body, n.listing_id, n.is_read, n.created_at,
                  l.title as listing_title, l.image_url as listing_image
           FROM notifications n
           LEFT JOIN listings l ON n.listing_id = l.id
           WHERE n.user_id = {P}
           ORDER BY n.created_at DESC
           LIMIT 50""",
        (user["id"],))
    conn.close()
    return items


@app.post("/api/notifications/read-all")
def mark_all_notifications_read(user=Depends(get_current_user)):
    conn = get_db()
    conn.execute(f"UPDATE notifications SET is_read = 1 WHERE user_id = {P}", (user["id"],))
    conn.commit()
    conn.close()
    return {"ok": True}


@app.post("/api/notifications/{notif_id}/read")
def mark_notification_read(notif_id: int, user=Depends(get_current_user)):
    conn = get_db()
    execute(conn,
        f"UPDATE notifications SET is_read = 1 WHERE id = {P} AND user_id = {P}",
        (notif_id, user["id"]))
    conn.commit()
    conn.close()
    return {"ok": True}


@app.delete("/api/notifications/{notif_id}")
def delete_notification(notif_id: int, user=Depends(get_current_user)):
    conn = get_db()
    execute(conn, f"DELETE FROM notifications WHERE id = {P} AND user_id = {P}", (notif_id, user["id"]))
    conn.commit()
    conn.close()
    return {"ok": True}


@app.delete("/api/notifications")
def delete_all_notifications(user=Depends(get_current_user)):
    conn = get_db()
    conn.execute(f"DELETE FROM notifications WHERE user_id = {P}", (user["id"],))
    conn.commit()
    conn.close()
    return {"ok": True}


# ── Subscription / Stripe Endpoints ────────────────────────────────────

TIER_PRICES = {
    "grower": STRIPE_PRICE_GROWER,
    "steward": STRIPE_PRICE_STEWARD,
}


class SubscribeRequest(BaseModel):
    tier: str  # "grower" or "steward"


@app.post("/api/subscribe")
def create_checkout_session(req: SubscribeRequest, user=Depends(get_current_user)):
    if req.tier not in ("grower", "steward"):
        raise HTTPException(status_code=400, detail="tier must be 'grower' or 'steward'")

    if not stripe.api_key:
        raise HTTPException(status_code=501, detail="Stripe not configured. Set STRIPE_SECRET_KEY.")

    price_id = TIER_PRICES.get(req.tier)
    if not price_id:
        raise HTTPException(status_code=501, detail=f"STRIPE_PRICE_{req.tier.upper()} not configured.")

    conn = get_db()
    u = query_one(conn, f"SELECT email, stripe_customer_id FROM users WHERE id = {P}", (user["id"],))
    conn.close()
    if not u:
        raise HTTPException(status_code=404, detail="User not found")

    try:
        # Re-use existing Stripe customer or create new
        customer_id = u.get("stripe_customer_id")
        if not customer_id:
            customer = stripe.Customer.create(email=u["email"], metadata={"user_id": str(user["id"])})
            customer_id = customer.id
            conn = get_db()
            conn.execute(f"UPDATE users SET stripe_customer_id = {P} WHERE id = {P}", (customer_id, user["id"]))
            conn.commit()
            conn.close()

        session = stripe.checkout.Session.create(
            customer=customer_id,
            payment_method_types=["card"],
            mode="subscription",
            line_items=[{"price": price_id, "quantity": 1}],
            success_url=f"{APP_URL}/?subscribed={req.tier}",
            cancel_url=f"{APP_URL}/?cancelled=1",
            metadata={"user_id": str(user["id"]), "tier": req.tier},
        )
        return {"checkout_url": session.url}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/webhook/stripe")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    if not STRIPE_WEBHOOK_SECRET:
        raise HTTPException(status_code=501, detail="Webhook secret not configured")

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, STRIPE_WEBHOOK_SECRET)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    if event["type"] in ("customer.subscription.created", "customer.subscription.updated"):
        sub = event["data"]["object"]
        customer_id = sub["customer"]
        sub_id = sub["id"]
        # Determine tier from price ID
        tier = "sprout"
        for item in sub.get("items", {}).get("data", []):
            price_id = item["price"]["id"]
            if price_id == STRIPE_PRICE_GROWER:
                tier = "grower"
            elif price_id == STRIPE_PRICE_STEWARD:
                tier = "steward"

        if sub["status"] in ("active", "trialing"):
            conn = get_db()
            conn.execute(
                f"UPDATE users SET tier = {P}, stripe_subscription_id = {P} WHERE stripe_customer_id = {P}",
                (tier, sub_id, customer_id)
            )
            conn.commit()
            conn.close()

    elif event["type"] == "customer.subscription.deleted":
        sub = event["data"]["object"]
        customer_id = sub["customer"]
        conn = get_db()
        conn.execute(
            f"UPDATE users SET tier = 'sprout', stripe_subscription_id = NULL WHERE stripe_customer_id = {P}",
            (customer_id,)
        )
        conn.commit()
        conn.close()

    return {"ok": True}


@app.post("/api/cancel-subscription")
def cancel_subscription(user=Depends(get_current_user)):
    if not stripe.api_key:
        raise HTTPException(status_code=501, detail="Stripe not configured")

    conn = get_db()
    u = query_one(conn, f"SELECT stripe_subscription_id FROM users WHERE id = {P}", (user["id"],))
    conn.close()

    if not u or not u.get("stripe_subscription_id"):
        raise HTTPException(status_code=400, detail="No active subscription found")

    try:
        stripe.Subscription.modify(u["stripe_subscription_id"], cancel_at_period_end=True)
        return {"ok": True, "message": "Subscription will cancel at end of billing period"}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ── SPA Fallback ────────────────────────────────────────────────────────

@app.get("/")
def serve_index():
    return FileResponse(str(FRONTEND_DIR / "index.html"))
