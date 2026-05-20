"""Garden Swap — Main FastAPI App (Stage 1: The Swap Feed)."""

import os
import uuid
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form, Header, Query
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path
from typing import Optional

from models import get_db, init_db, query, query_one, execute, DATABASE_URL
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

app = FastAPI(title="Garden Swap API")

# Serve frontend
FRONTEND_DIR = Path(__file__).parent.parent / "frontend"
app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

# Serve uploaded images locally (dev mode)
UPLOADS_DIR = Path(__file__).parent.parent / "data" / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(UPLOADS_DIR)), name="uploads")

# Placeholder param for SQL (? for sqlite, %s for postgres)
P = "%s" if DATABASE_URL else "?"


@app.on_event("startup")
def startup():
    init_db()
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
    """Like get_current_user but returns None instead of raising."""
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
        f"INSERT INTO users (email, username, password_hash, display_name, zip_code, lat, lng) VALUES ({P}, {P}, {P}, {P}, {P}, {P}, {P})",
        (req.email, req.username, hashed, req.display_name or req.username, req.zip_code, lat, lng)
    )
    conn.commit()
    conn.close()

    token = create_token(user_id, req.username)
    return {"token": token, "user_id": user_id, "username": req.username, "display_name": req.display_name or req.username}


@app.post("/api/login")
def login(req: LoginRequest):
    conn = get_db()
    user = query_one(conn, f"SELECT id, username, display_name, password_hash FROM users WHERE email = {P}", (req.email,))
    conn.close()

    if not user or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_token(user["id"], user["username"])
    return {"token": token, "user_id": user["id"], "username": user["username"], "display_name": user["display_name"]}


# ── Profile Endpoints ───────────────────────────────────────────────────

@app.get("/api/profile/{username}")
def get_profile(username: str):
    conn = get_db()
    user = query_one(conn,
        f"SELECT id, username, display_name, zip_code, rating_sum, rating_count, created_at FROM users WHERE username = {P}",
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
        "rating": rating,
        "rating_count": user["rating_count"],
        "member_since": str(user["created_at"]),
        "listings": listings,
    }


@app.get("/api/me")
def get_me(user=Depends(get_current_user)):
    conn = get_db()
    u = query_one(conn,
        f"SELECT id, username, display_name, zip_code, lat, lng, rating_sum, rating_count FROM users WHERE id = {P}",
        (user["id"],))
    conn.close()
    if not u:
        raise HTTPException(status_code=404, detail="User not found")
    rating = round(u["rating_sum"] / u["rating_count"], 1) if u["rating_count"] > 0 else None
    return {**u, "rating": rating}


# ── Listing Endpoints ───────────────────────────────────────────────────

@app.post("/api/listings")
async def create_listing(
    title: str = Form(...),
    plant_type: str = Form(...),
    condition: str = Form(...),
    status: str = Form("swap"),
    description: str = Form(""),
    image: UploadFile = File(...),
    user=Depends(get_current_user),
):
    # Validate status
    if status not in ("swap", "free"):
        raise HTTPException(status_code=400, detail="Status must be 'swap' or 'free'")

    contents = await image.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image too large (max 10MB)")

    # Get user's location for the listing
    conn = get_db()
    u = query_one(conn, f"SELECT lat, lng FROM users WHERE id = {P}", (user["id"],))
    if not u:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found")

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
        f"""INSERT INTO listings (user_id, title, plant_type, condition, status, description, image_url, image_public_id, lat, lng)
           VALUES ({P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P})""",
        (user["id"], title, plant_type, condition, status, description, image_url, public_id, lat, lng))
    conn.commit()
    conn.close()
    return {"id": listing_id, "image_url": image_url}


@app.get("/api/listings")
def get_listings(
    lat: float = 0, lng: float = 0, radius: float = 10,
    plant_type: str = "", status: str = "", q: str = "",
    limit: int = 50,
):
    """Get active listings with optional filters."""
    conn = get_db()
    rows = query(conn,
        f"""SELECT l.id, l.title, l.plant_type, l.condition, l.status, l.description,
                  l.image_url, l.lat, l.lng, l.created_at,
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
        # Apply filters
        if plant_type and row.get("plant_type", "").lower() != plant_type.lower():
            continue
        if status and row.get("status", "").lower() != status.lower():
            continue
        if q and q.lower() not in (row.get("title", "") + " " + (row.get("plant_type") or "") + " " + (row.get("description") or "")).lower():
            continue

        item = dict(row)
        # Calculate user rating
        item["user_rating"] = round(row["rating_sum"] / row["rating_count"], 1) if row["rating_count"] > 0 else None

        # Calculate distance
        if lat != 0 or lng != 0:
            dist = haversine_miles(lat, lng, row["lat"], row["lng"])
            item["distance_miles"] = round(dist, 1)
            # Filter by radius
            if dist > radius:
                continue
        else:
            item["distance_miles"] = None

        results.append(item)

    # Sort by distance if location provided
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


# ── SPA Fallback ────────────────────────────────────────────────────────

@app.get("/")
def serve_index():
    return FileResponse(str(FRONTEND_DIR / "index.html"))
