"""
Reseed listings with co-creator's real plant photos.

Run with no args to seed the local SQLite DB (photos stored in data/uploads/).
Set CLOUDINARY_* env vars (in .env.local) to upload to Cloudinary instead —
required for photos to persist on the live Render site.

Usage:
    python reseed_plants.py              # local SQLite only
    python reseed_plants.py --render     # also seeds Render PostgreSQL (needs DATABASE_URL)
"""

import sys, os, shutil, sqlite3
sys.path.insert(0, os.path.dirname(__file__))

# Load .env.local if it exists
_env_file = os.path.join(os.path.dirname(__file__), ".env.local")
if os.path.exists(_env_file):
    for line in open(_env_file):
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())

PLANTS_DIR = os.path.join(os.path.dirname(__file__), "..", "plants")
UPLOADS_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "uploads")
DB_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "gardenswap.db")
USE_RENDER = "--render" in sys.argv

os.makedirs(UPLOADS_DIR, exist_ok=True)

# ── Cloudinary setup (when credentials are present) ───────────────────────
CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD_NAME")
API_KEY    = os.environ.get("CLOUDINARY_API_KEY")
API_SECRET = os.environ.get("CLOUDINARY_API_SECRET")
USE_CLOUDINARY = bool(CLOUD_NAME and API_KEY and API_SECRET)

if USE_CLOUDINARY:
    import cloudinary
    import cloudinary.uploader
    cloudinary.config(cloud_name=CLOUD_NAME, api_key=API_KEY, api_secret=API_SECRET)
    print("☁️  Cloudinary credentials found — photos will be uploaded to Cloudinary.")
else:
    print("📁  No Cloudinary credentials — saving photos to data/uploads/ (local only).")

def cp(src_name, dest_name):
    src = os.path.join(PLANTS_DIR, src_name)
    if not os.path.exists(src):
        raise FileNotFoundError(src)
    if USE_CLOUDINARY:
        public_id = dest_name.replace(".jpg", "")
        result = cloudinary.uploader.upload(
            src,
            public_id=f"gardenswap/{public_id}",
            overwrite=True,
            resource_type="image",
        )
        return result["secure_url"]
    else:
        dest = os.path.join(UPLOADS_DIR, dest_name)
        shutil.copy2(src, dest)
        return f"/uploads/{dest_name}"

# ── Copy photos and build URL map ─────────────────────────────────────────
photos = [
    ("WhatsApp Image 2026-06-29 at 12.44.49 PM.jpeg",   "plant_rex_silver.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.44.51 PM.jpeg",   "plant_rex_rose.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.44.52 PM (1).jpeg","plant_rex_fireworks.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.44.52 PM.jpeg",   "plant_begonia_polkadot.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.44.53 PM (1).jpeg","plant_caladium_pink.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.44.53 PM.jpeg",   "plant_caladium_white.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.44.54 PM.jpeg",   "plant_caladium_greenvein.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.44.55 PM.jpeg",   "plant_calathea.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.44.56 PM.jpeg",   "plant_monstera.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.02 PM.jpeg",   "plant_cypress_vine.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.02 PM (2).jpeg","plant_philodendron_group.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.03 PM.jpeg",   "plant_haworthia.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.04 PM.jpeg",   "plant_crassula.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.06 PM.jpeg",   "plant_echeveria_topsy.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.06 PM (1).jpeg","plant_echeveria_blue.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.07 PM.jpeg",   "plant_echeveria_green.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.11 PM.jpeg",   "plant_echeveria_bluebird.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.12 PM.jpeg",   "plant_sedum.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.13 PM.jpeg",   "plant_hibiscus_redy.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.13 PM (1).jpeg","plant_hibiscus_multi.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.14 PM (1).jpeg","plant_philodendron_brasil.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.14 PM (2).jpeg","plant_philodendron_lemon.jpg"),
    ("WhatsApp Image 2026-06-29 at 12.45.15 PM.jpeg",   "plant_zz.jpg"),
    ("pothos.jpg",                                       "plant_pothos.jpg"),
]

urls = {}
for src, dest in photos:
    try:
        urls[dest] = cp(src, dest)
        print(f"  ✓ {dest}")
    except FileNotFoundError:
        print(f"  ✗ missing: {src}")

# ── Listing data ─────────────────────────────────────────────────────────
# user_id: 1=priya(Steward) 2=faizan(Grower) 3=rachel(Sprout)
#          4=deepak 5=amina 6=joel 7=amel(admin) 8=reshma(Sprout)
# lat/lng from users table (Bangalore area)

LISTINGS = [
    # Rex Begonias
    dict(
        user_id=1, lat=12.9563, lng=77.641,
        title="Rex Begonia — Silver & Burgundy",
        plant_type="Rex Begonia",
        condition="excellent",
        status="swap",
        description="Stunning Rex Begonia with silver-green textured leaves and deep burgundy undersides. The puckered, almost metallic surface is unlike anything else. Perfect for a shaded windowsill. Happy to swap for another Begonia variety or a Calathea.",
        light_needs="indirect", rarity="uncommon", size="medium",
        image="plant_rex_silver.jpg",
    ),
    dict(
        user_id=2, lat=12.9352, lng=77.6245,
        title="Rex Begonia — Deep Rose & Dark Green",
        plant_type="Rex Begonia",
        condition="good",
        status="swap",
        description="Beautiful Rex Begonia with rounded rose-pink and deep forest-green patterned leaves. Grown from a healthy mother plant. Looking to swap for a Monstera or unusual Calathea.",
        light_needs="indirect", rarity="uncommon", size="small",
        image="plant_rex_rose.jpg",
    ),
    dict(
        user_id=7, lat=12.9698, lng=77.75,
        title="Rex Begonia 'Fireworks' — Crimson & Teal",
        plant_type="Rex Begonia",
        condition="excellent",
        status="swap",
        description="This one turns heads every time. Vivid crimson centre fading to teal-green with dark black margins — like a tropical stained glass window. One of the most striking Begonias I've grown. Swap for something equally rare.",
        light_needs="indirect", rarity="rare", size="medium",
        image="plant_rex_fireworks.jpg",
    ),
    dict(
        user_id=3, lat=12.998, lng=77.57,
        title="Polka Dot Begonia (Begonia maculata)",
        plant_type="Begonia maculata",
        condition="good",
        status="free",
        description="Angel-wing Begonia with bright green leaves dusted in perfect white polka dots. Cane-type so it grows upright — great in a corner. I have a few young plants to give away free to good homes.",
        light_needs="bright-indirect", rarity="common", size="small",
        image="plant_begonia_polkadot.jpg",
    ),
    # Caladiums
    dict(
        user_id=1, lat=12.9563, lng=77.641,
        title="Caladium — Pink & Green Heart",
        plant_type="Caladium",
        condition="good",
        status="swap",
        description="Gorgeous caladium with large heart-shaped leaves in soft pink with green edges and veining. Thrives in warm, humid conditions. Goes dormant in winter so I'm offering these bulbs to someone who'll appreciate the summer show. Swap for another tropical or succulent.",
        light_needs="indirect", rarity="uncommon", size="medium",
        image="plant_caladium_pink.jpg",
    ),
    dict(
        user_id=2, lat=12.9352, lng=77.6245,
        title="Caladium 'White Queen' — Ghostly White",
        plant_type="Caladium",
        condition="excellent",
        status="swap",
        description="One of my favourites — the White Queen caladium has near-translucent white leaves with intricate dark green veining. Photographed at night to show just how luminous it looks. Growing beautifully in a shaded spot outdoors.",
        light_needs="shade", rarity="rare", size="medium",
        image="plant_caladium_white.jpg",
    ),
    dict(
        user_id=7, lat=12.9698, lng=77.75,
        title="Caladium — Dark Green with White Veins",
        plant_type="Caladium",
        condition="good",
        status="swap",
        description="Large-leafed caladium with deep forest-green leaves and bright white venation that forms a striking contrast. Growing in a nursery bag at the moment. Happy to pot it up properly before handing over. Swap for a Begonia or Philodendron.",
        light_needs="bright-indirect", rarity="uncommon", size="large",
        image="plant_caladium_greenvein.jpg",
    ),
    # Calathea
    dict(
        user_id=1, lat=12.9563, lng=77.641,
        title="Calathea — Striped Prayer Plant",
        plant_type="Calathea",
        condition="excellent",
        status="swap",
        description="Healthy Calathea with the classic feather-stripe pattern — alternating light and dark green bands running parallel to each leaf midrib. Moves its leaves up and down with the light (hence 'prayer plant'). Needs humidity. Swap for another Calathea variety or a Rex Begonia.",
        light_needs="indirect", rarity="common", size="medium",
        image="plant_calathea.jpg",
    ),
    # Monstera
    dict(
        user_id=2, lat=12.9352, lng=77.6245,
        title="Monstera Deliciosa — Established 2yr Plant",
        plant_type="Monstera deliciosa",
        condition="excellent",
        status="swap",
        description="A proper, well-established Monstera with multiple large fenestrated leaves. This is no seedling — it's been growing for two years and has real presence. Currently on a moss pole outdoors. Swap for something interesting — open to offers.",
        light_needs="bright-indirect", rarity="common", size="large",
        image="plant_monstera.jpg",
    ),
    # Cypress Vine
    dict(
        user_id=6, lat=12.9081, lng=77.6476,
        title="Cypress Vine (Ipomoea quamoclit)",
        plant_type="Cypress Vine",
        condition="good",
        status="free",
        description="One of the most delicate and beautiful flowering vines I've grown. Feathery, fern-like foliage with tiny perfect 5-pointed star flowers in hot pink. Self-seeds prolifically so I have plenty of seedlings to give away. Perfect for a balcony railing or trellis.",
        light_needs="full-sun", rarity="uncommon", size="small",
        image="plant_cypress_vine.jpg",
    ),
    # Philodendron group
    dict(
        user_id=3, lat=12.998, lng=77.57,
        title="Philodendron Hederaceum + Neon Pothos",
        plant_type="Philodendron",
        condition="good",
        status="swap",
        description="These are from my windowsill collection — a mix of Philodendron hederaceum (heart-leaf), neon Pothos, and variegated Pothos cuttings. All in water propagation and ready to pot. Happy to split them up or offer as a set. Swap for succulents or a Begonia.",
        light_needs="indirect", rarity="common", size="small",
        image="plant_philodendron_group.jpg",
    ),
    # Succulents
    dict(
        user_id=4, lat=12.926, lng=77.6762,
        title="Haworthia cooperi — Window Succulent",
        plant_type="Haworthia cooperi",
        condition="excellent",
        status="swap",
        description="Compact little gem — Haworthia cooperi with plump, fleshy leaves arranged in a tight rosette. The transparent leaf tips act like little windows to let in light underground (in nature). One of the more forgiving succulents and it stays tiny. Swap for another unusual succulent.",
        light_needs="indirect", rarity="uncommon", size="small",
        image="plant_haworthia.jpg",
    ),
    dict(
        user_id=1, lat=12.9563, lng=77.641,
        title="Crassula perforata — String of Buttons",
        plant_type="Crassula perforata",
        condition="good",
        status="swap",
        description="Charming little succulent that looks like a spiral staircase — triangular blue-green leaves stacked along the stem. Incredibly easy, tolerates neglect well, and looks great in a terracotta pot. I have a few offshoots to swap.",
        light_needs="full-sun", rarity="uncommon", size="small",
        image="plant_crassula.jpg",
    ),
    dict(
        user_id=5, lat=12.915, lng=77.61,
        title="Echeveria 'Topsy Turvy' — Crinkle Rosette",
        plant_type="Echeveria runyonii",
        condition="excellent",
        status="swap",
        description="One of the most distinctive Echeverias — the leaves curve and curl backwards giving it a wavy, almost inside-out look. Pale blue-green with a powdery farina coating. Babies readily once settled. Swap for a Haworthia or another Echeveria variety.",
        light_needs="full-sun", rarity="uncommon", size="small",
        image="plant_echeveria_topsy.jpg",
    ),
    dict(
        user_id=4, lat=12.926, lng=77.6762,
        title="Echeveria — Powder Blue Rosette",
        plant_type="Echeveria",
        condition="excellent",
        status="swap",
        description="Beautiful compact Echeveria with plump, smooth pale blue-lavender leaves in a perfect rosette. The colour is truly something — almost like it's been dusted in chalk. Grown from seed. Swap for any interesting Haworthia or Crassula.",
        light_needs="full-sun", rarity="uncommon", size="small",
        image="plant_echeveria_blue.jpg",
    ),
    dict(
        user_id=6, lat=12.9081, lng=77.6476,
        title="Echeveria — Compact Green Rosette",
        plant_type="Echeveria",
        condition="good",
        status="free",
        description="A healthy, classic green Echeveria rosette — tightly packed, perfect symmetry. Nothing flashy, just reliably gorgeous. Great for anyone just getting into succulents. Free to a good home, just asking you to pick it up.",
        light_needs="full-sun", rarity="common", size="small",
        image="plant_echeveria_green.jpg",
    ),
    dict(
        user_id=5, lat=12.915, lng=77.61,
        title="Echeveria 'Blue Bird' — Silver-Blue Stellate",
        plant_type="Echeveria",
        condition="excellent",
        status="swap",
        description="Absolutely spectacular — tight, star-shaped rosettes in silver-blue with faint blush tips at the edges. I have a whole tray of these beauties. Happy to do a bulk swap — 3 for 3 with someone who has interesting succulents.",
        light_needs="full-sun", rarity="rare", size="small",
        image="plant_echeveria_bluebird.jpg",
    ),
    dict(
        user_id=8, lat=12.949, lng=77.5936,
        title="Sedum — Blue-Green Jelly Bean Clusters",
        plant_type="Sedum morganianum",
        condition="good",
        status="swap",
        description="Plump blue-green oval leaves clustered densely like little jellybeans. Often called Burro's Tail or Donkey Tail — looks incredible trailing over the edge of a pot. I have a small pot with multiple stems growing. Swap for any Echeveria or Haworthia.",
        light_needs="full-sun", rarity="uncommon", size="small",
        image="plant_sedum.jpg",
    ),
    # Hibiscus
    dict(
        user_id=1, lat=12.9563, lng=77.641,
        title="Hibiscus rosa-sinensis — Red & Yellow",
        plant_type="Hibiscus",
        condition="excellent",
        status="swap",
        description="Two stunning Hibiscus in full bloom — one deep red with orange stamen, one bright yellow. Both in 6-inch pots. These are blooming prolifically right now — you can see for yourself! Swap for a tropical houseplant.",
        light_needs="full-sun", rarity="common", size="medium",
        image="plant_hibiscus_redy.jpg",
    ),
    dict(
        user_id=3, lat=12.998, lng=77.57,
        title="Hibiscus — Pink, Red & White Trio",
        plant_type="Hibiscus",
        condition="good",
        status="swap",
        description="Three Hibiscus plants in different colours — bright red, hot pink, and white with a red eye. All potted and flowering. Grew them from cuttings. Swap for succulents or a Philodendron cutting.",
        light_needs="full-sun", rarity="common", size="medium",
        image="plant_hibiscus_multi.jpg",
    ),
    # Philodendrons
    dict(
        user_id=7, lat=12.9698, lng=77.75,
        title="Philodendron hederaceum 'Brasil'",
        plant_type="Philodendron",
        condition="excellent",
        status="swap",
        description="The Brasil is one of those plants where the variegation actually holds — vivid lime-yellow stripe down the centre of each heart-shaped leaf against deep green. Vining type, looks great hanging or climbing. Healthy and actively growing. Swap for another rare Philodendron or a Calathea.",
        light_needs="indirect", rarity="uncommon", size="medium",
        image="plant_philodendron_brasil.jpg",
    ),
    dict(
        user_id=8, lat=12.949, lng=77.5936,
        title="Philodendron 'Lemon Lime' — Neon Trailing",
        plant_type="Philodendron",
        condition="good",
        status="swap",
        description="Bright neon yellow-green heart-leaf Philodendron — the colour is electric in good light. This is a young plant with several trailing stems. Perfect for a hanging pot or training up a pole. Looking to swap for a Brasil or a Calathea.",
        light_needs="indirect", rarity="uncommon", size="small",
        image="plant_philodendron_lemon.jpg",
    ),
    # ZZ Plant
    dict(
        user_id=2, lat=12.9352, lng=77.6245,
        title="ZZ Plant (Zamioculcas zamiifolia)",
        plant_type="ZZ Plant",
        condition="excellent",
        status="swap",
        description="The ultimate low-maintenance tropical — ZZ Plant with glossy, deep-green pinnate leaves. Mine are well established and look absolutely lush. Barely needs watering, tolerates low light, virtually indestructible. Swap for a Calathea or Begonia.",
        light_needs="low-light", rarity="common", size="medium",
        image="plant_zz.jpg",
    ),
    # Pothos
    dict(
        user_id=4, lat=12.926, lng=77.6762,
        title="Golden Pothos — Cuttings Ready to Root",
        plant_type="Pothos",
        condition="good",
        status="free",
        description="Classic Golden Pothos cuttings — variegated green and yellow. These are some of the hardiest plants you can own. Great for beginners. I have a bunch of cuttings with aerial roots ready to go straight into water or soil.",
        light_needs="indirect", rarity="common", size="small",
        image="plant_pothos.jpg",
    ),
]

# ── Wipe and reseed ───────────────────────────────────────────────────────

def seed_db(execute_fn, placeholder="?"):
    P = placeholder
    print("\nClearing existing listings...")
    execute_fn(f"DELETE FROM event_plant_tags")
    execute_fn(f"DELETE FROM event_prebookings")
    execute_fn(f"DELETE FROM listings")
    print("  Done.")

    print("\nInserting new listings...")
    inserted = 0
    for p in LISTINGS:
        img_url = urls.get(p["image"], "")
        if not img_url:
            print(f"  ✗ no URL for {p['image']}, skipping")
            continue
        execute_fn(f"""
            INSERT INTO listings
                (user_id, title, plant_type, condition, status, description,
                 image_url, image_public_id, lat, lng, is_active, swap_status,
                 light_needs, rarity, size)
            VALUES ({P},{P},{P},{P},{P},{P},{P},''
                   ,{P},{P},1,'available',{P},{P},{P})
        """, (
            p["user_id"], p["title"], p["plant_type"], p["condition"],
            p["status"], p["description"], img_url, p["lat"], p["lng"],
            p.get("light_needs", ""), p.get("rarity", ""), p.get("size", ""),
        ))
        inserted += 1
        print(f"  ✓ {p['title']}")
    return inserted

# ── Local SQLite ──────────────────────────────────────────────────────────
conn = sqlite3.connect(DB_PATH)
def _sqlite_exec(sql, params=()):
    conn.execute(sql, params)
    conn.commit()

n = seed_db(_sqlite_exec, placeholder="?")
conn.close()
print(f"\n✅ Local SQLite — {n} listings created.")

# ── Render PostgreSQL (optional) ──────────────────────────────────────────
if USE_RENDER:
    DATABASE_URL = os.environ.get("DATABASE_URL")
    if not DATABASE_URL:
        print("\n⚠️  --render flag set but DATABASE_URL not found in env. Skipping Render DB.")
    else:
        import psycopg2
        pg = psycopg2.connect(DATABASE_URL)
        pg.autocommit = False
        cur = pg.cursor()
        def _pg_exec(sql, params=()):
            cur.execute(sql, params)
        n2 = seed_db(_pg_exec, placeholder="%s")
        pg.commit()
        cur.close()
        pg.close()
        print(f"✅ Render PostgreSQL — {n2} listings created with Cloudinary URLs.")
