"""Seed the database with demo plant listings for testing."""

import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from models import get_db, init_db, query_one, execute, DATABASE_URL
from auth import hash_password
from geo import zip_to_coords

# Sample plant images from Unsplash
DEMO_IMAGES = [
    "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600",  # monstera
    "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600",  # succulents
    "https://images.unsplash.com/photo-1501004318776-cd6bfa6d0c65?w=600",  # pothos
    "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=600",  # herbs
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600",  # garden plants
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600",  # cactus
    "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=600",  # fiddle leaf
    "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=600",  # snake plant
    "https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?w=600",  # fern
    "https://images.unsplash.com/photo-1521334884684-d80222895322?w=600",  # aloe
    "https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=600",  # philodendron
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",  # peace lily
    "https://images.unsplash.com/photo-1604762512526-b7ce049b5764?w=600",  # tomato plant
    "https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=600",  # calathea
]

# Demo users (Bangalore area)
USERS = [
    {"email": "priya@demo.com", "username": "priya_garden", "display_name": "Priya Sharma", "zip_code": "560010"},
    {"email": "faizan@demo.com", "username": "faizan_greens", "display_name": "Faizan Ahmed", "zip_code": "560008"},
    {"email": "rachel@demo.com", "username": "rachel_plants", "display_name": "Rachel D'Souza", "zip_code": "560004"},
    {"email": "deepak@demo.com", "username": "deepak_grows", "display_name": "Deepak Gowda", "zip_code": "560034"},
    {"email": "amina@demo.com", "username": "amina_blooms", "display_name": "Amina Begum", "zip_code": "560017"},
    {"email": "joel@demo.com", "username": "joel_terrace", "display_name": "Joel Mathew", "zip_code": "560038"},
    {"email": "amelabrs@gmail.com", "username": "amel_garden", "display_name": "Amel Rahman", "zip_code": "560066"},
    {"email": "reshma.rajkumar@gmail.com", "username": "reshma_grows", "display_name": "Reshma Rajkumar", "zip_code": "560027"},
]

# Demo listings (Bangalore area)
LISTINGS = [
    {"title": "Monstera Deliciosa — 2ft", "plant_type": "Houseplant", "condition": "Healthy", "status": "swap", "description": "Beautiful monstera with 6 fenestrated leaves. Looking for rare aroids in exchange! Pick up from Indiranagar.", "zip": "560010", "light_needs": "Partial Sun", "rarity": "Uncommon", "size": "Large"},
    {"title": "Succulent Arrangement (5 pots)", "plant_type": "Succulent", "condition": "Healthy", "status": "free", "description": "Relocating from Koramangala and can't take these. All healthy, various types. Free to good home.", "zip": "560008", "light_needs": "Full Sun", "rarity": "Common", "size": "Small"},
    {"title": "Golden Pothos Cuttings x3", "plant_type": "Cutting", "condition": "Fresh Cutting", "status": "swap", "description": "Three rooted cuttings, 6-8 inches each. Will swap for any philodendron variety. Malleshwaram pickup.", "zip": "560004", "light_needs": "Low Light", "rarity": "Common", "size": "Small"},
    {"title": "Tulsi & Pudina Starter Kit", "plant_type": "Herb", "condition": "Healthy", "status": "free", "description": "Homegrown tulsi and pudina seedlings ready for transplant. Perfect for your balcony garden in HSR!", "zip": "560034", "light_needs": "Full Sun", "rarity": "Common", "size": "Small"},
    {"title": "Jasmine Mogra — 3ft Bush", "plant_type": "Houseplant", "condition": "Healthy", "status": "swap", "description": "Fragrant mogra jasmine, blooms every evening. Perfect for pooja or just to enjoy. BTM Layout pickup.", "zip": "560017", "light_needs": "Full Sun", "rarity": "Common", "size": "Large"},
    {"title": "Spider Plant Babies (6)", "plant_type": "Cutting", "condition": "Fresh Cutting", "status": "free", "description": "Six spider plant babies ready to pot. Great air purifiers! Free pickup from Jayanagar 4th Block.", "zip": "560038", "light_needs": "Partial Sun", "rarity": "Common", "size": "Small"},
    {"title": "Snake Plant — Large", "plant_type": "Houseplant", "condition": "Healthy", "status": "swap", "description": "3ft tall mother-in-law's tongue. Indestructible! Looking for a fiddle leaf or bird of paradise. Indiranagar.", "zip": "560010", "light_needs": "Low Light", "rarity": "Common", "size": "Large"},
    {"title": "Prickly Pear Cactus Pads", "plant_type": "Succulent", "condition": "Fresh Cutting", "status": "swap", "description": "3 pads ready to root. Grows great in Bangalore weather. Would love some string-of-pearls in return.", "zip": "560008", "light_needs": "Full Sun", "rarity": "Uncommon", "size": "Medium"},
    {"title": "Fiddle Leaf Fig — Needs TLC", "plant_type": "Houseplant", "condition": "Needs TLC", "status": "free", "description": "Dropping leaves but roots are strong. Needs more light than my Malleshwaram flat gets. Free to someone who can revive it!", "zip": "560004", "light_needs": "Full Sun", "rarity": "Uncommon", "size": "Large"},
    {"title": "Desi Tomato Seedlings", "plant_type": "Vegetable", "condition": "Healthy", "status": "swap", "description": "Bangalore tomato and Udupi Gulla brinjal starts from my terrace garden. Swap for any chilli or methi seedlings.", "zip": "560034", "light_needs": "Full Sun", "rarity": "Common", "size": "Small"},
    {"title": "Adenium Desert Rose — Blooming", "plant_type": "Succulent", "condition": "Healthy", "status": "swap", "description": "Beautiful pink adenium in full bloom. Low water, loves Bangalore sun. Swap for any bougainvillea cutting. BTM Layout.", "zip": "560017", "light_needs": "Full Sun", "rarity": "Rare", "size": "Medium"},
    {"title": "Bird's Nest Fern", "plant_type": "Houseplant", "condition": "Healthy", "status": "swap", "description": "Lush bird's nest fern in 6-inch pot. Low light friendly. Looking for calathea or prayer plant. Near Forum Mall.", "zip": "560038", "light_needs": "Shade", "rarity": "Common", "size": "Medium"},
    {"title": "Aloe Vera Pups (4)", "plant_type": "Succulent", "condition": "Healthy", "status": "free", "description": "Four aloe pups separated from mother plant. Already rooted. Great for beginners! Koramangala 4th Block.", "zip": "560008", "light_needs": "Full Sun", "rarity": "Common", "size": "Small"},
    {"title": "Pink Princess Philodendron — Cutting", "plant_type": "Cutting", "condition": "Fresh Cutting", "status": "swap", "description": "Rooted cutting with pink variegation. Highly sought after! Only swapping for other rare plants. Malleshwaram.", "zip": "560004", "light_needs": "Partial Sun", "rarity": "Very Rare", "size": "Small"},
    {"title": "Curry Leaf Plant — Mature", "plant_type": "Herb", "condition": "Healthy", "status": "free", "description": "Healthy 2ft curry leaf plant. Produces fragrant leaves year-round in Bangalore climate. Free to anyone who picks up from Indiranagar.", "zip": "560010", "light_needs": "Full Sun", "rarity": "Common", "size": "Medium"},
    {"title": "Calathea Orbifolia", "plant_type": "Houseplant", "condition": "Needs TLC", "status": "swap", "description": "Slightly crispy edges but new growth coming in. Bangalore humidity helps! Swap for any low-light plant. Koramangala.", "zip": "560008", "light_needs": "Low Light", "rarity": "Rare", "size": "Medium"},
    {"title": "Hibiscus Cuttings — Red & Yellow", "plant_type": "Cutting", "condition": "Fresh Cutting", "status": "free", "description": "Rooted hibiscus cuttings, 2 red and 2 yellow. They love Bangalore weather. Free from my Jayanagar terrace garden.", "zip": "560038", "light_needs": "Full Sun", "rarity": "Common", "size": "Small"},
    {"title": "Ajwain & Methi Seeds", "plant_type": "Seed", "condition": "Healthy", "status": "free", "description": "Fresh seeds from my kitchen garden harvest. Grows easily on any Bangalore balcony. BTM Layout pickup.", "zip": "560017", "light_needs": "Full Sun", "rarity": "Common", "size": "Small"},
]


def seed():
    init_db()
    conn = get_db()
    P = "%s" if DATABASE_URL else "?"

    # Check if already seeded — delete in FK-safe order
    existing = query_one(conn, "SELECT COUNT(*) as c FROM users")
    if existing and existing["c"] > 0:
        for tbl in ("notifications", "wish_list", "ratings", "messages", "swaps", "listings", "users"):
            execute(conn, f"DELETE FROM {tbl}")
        conn.commit()

    # Create demo users
    user_ids = []
    for i, u in enumerate(USERS):
        hashed = hash_password("demo1234")
        lat, lng = zip_to_coords(u["zip_code"])
        # First two demo users get Grower/Steward tier so smart match can be tested
        tier = "steward" if i == 0 else ("grower" if i == 1 else "sprout")
        uid = execute(conn,
            f"INSERT INTO users (email, username, password_hash, display_name, zip_code, lat, lng, rating_sum, rating_count, tier) VALUES ({P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P})",
            (u["email"], u["username"], hashed, u["display_name"], u["zip_code"], lat, lng, 0, 0, tier))
        user_ids.append(uid)

    # Give some users ratings
    execute(conn, f"UPDATE users SET rating_sum = 14, rating_count = 3 WHERE id = {P}", (user_ids[0],))
    execute(conn, f"UPDATE users SET rating_sum = 9, rating_count = 2 WHERE id = {P}", (user_ids[1],))
    execute(conn, f"UPDATE users SET rating_sum = 5, rating_count = 1 WHERE id = {P}", (user_ids[4],))
    execute(conn, f"UPDATE users SET rating_sum = 18, rating_count = 4 WHERE id = {P}", (user_ids[5],))

    # Create demo listings
    for i, listing in enumerate(LISTINGS):
        user_id = user_ids[i % len(user_ids)]
        lat, lng = zip_to_coords(listing["zip"])
        # Add small offset so listings aren't all at exact same point
        lat += (i * 0.002) - 0.01
        lng += (i * 0.001) - 0.007
        image_url = DEMO_IMAGES[i % len(DEMO_IMAGES)]

        execute(conn,
            f"""INSERT INTO listings (user_id, title, plant_type, condition, status, description, image_url, lat, lng, light_needs, rarity, size)
               VALUES ({P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P}, {P})""",
            (user_id, listing["title"], listing["plant_type"], listing["condition"],
             listing["status"], listing["description"], image_url, lat, lng,
             listing.get("light_needs", ""), listing.get("rarity", ""), listing.get("size", "")))

    conn.commit()
    conn.close()
    print(f"✅ Seeded {len(USERS)} users and {len(LISTINGS)} plant listings!")
    print(f"   Demo login: priya@demo.com / demo1234")
    print(f"   Open http://127.0.0.1:8000 to see the feed")
