"""Database models and setup for Garden Swap.

Uses PostgreSQL if DATABASE_URL is set (Render), otherwise SQLite (local dev).
"""

import os
import sqlite3
from pathlib import Path

DATABASE_URL = os.environ.get("DATABASE_URL", "")

# ── PostgreSQL mode ──────────────────────────────────────────────────────

if DATABASE_URL:
    import psycopg2
    import psycopg2.extras

    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

    def get_db():
        conn = psycopg2.connect(DATABASE_URL)
        conn.autocommit = False
        return conn

    def init_db():
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                display_name TEXT,
                zip_code TEXT NOT NULL,
                lat REAL,
                lng REAL,
                avatar_url TEXT DEFAULT '',
                rating_sum INTEGER DEFAULT 0,
                rating_count INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS listings (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id),
                title TEXT NOT NULL,
                plant_type TEXT NOT NULL,
                condition TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'swap',
                description TEXT DEFAULT '',
                image_url TEXT NOT NULL,
                image_public_id TEXT,
                lat REAL NOT NULL,
                lng REAL NOT NULL,
                is_active INTEGER DEFAULT 1,
                swap_status TEXT DEFAULT 'available',
                created_at TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS swaps (
                id SERIAL PRIMARY KEY,
                listing_id INTEGER NOT NULL REFERENCES listings(id),
                requester_id INTEGER NOT NULL REFERENCES users(id),
                lister_id INTEGER NOT NULL REFERENCES users(id),
                offered_listing_id INTEGER REFERENCES listings(id),
                swap_type TEXT NOT NULL DEFAULT 'trade',
                state TEXT NOT NULL DEFAULT 'pending',
                lister_confirmed INTEGER DEFAULT 0,
                requester_confirmed INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                swap_id INTEGER NOT NULL REFERENCES swaps(id),
                sender_id INTEGER NOT NULL REFERENCES users(id),
                body TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS ratings (
                id SERIAL PRIMARY KEY,
                swap_id INTEGER NOT NULL REFERENCES swaps(id),
                rater_id INTEGER NOT NULL REFERENCES users(id),
                rated_id INTEGER NOT NULL REFERENCES users(id),
                score INTEGER NOT NULL,
                comment TEXT DEFAULT '',
                created_at TIMESTAMP DEFAULT NOW(),
                UNIQUE(swap_id, rater_id)
            );

            CREATE INDEX IF NOT EXISTS idx_listings_user ON listings(user_id);
            CREATE INDEX IF NOT EXISTS idx_listings_active ON listings(is_active);
            CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(plant_type);
            CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
            CREATE INDEX IF NOT EXISTS idx_swaps_listing ON swaps(listing_id);
            CREATE INDEX IF NOT EXISTS idx_swaps_requester ON swaps(requester_id);
            CREATE INDEX IF NOT EXISTS idx_swaps_lister ON swaps(lister_id);
            CREATE INDEX IF NOT EXISTS idx_swaps_state ON swaps(state);
            CREATE INDEX IF NOT EXISTS idx_messages_swap ON messages(swap_id);
            CREATE INDEX IF NOT EXISTS idx_ratings_swap ON ratings(swap_id);
        """)
        conn.commit()
        conn.close()

# ── SQLite mode (local development) ─────────────────────────────────────

else:
    DB_PATH = Path(__file__).parent.parent / "data" / "gardenswap.db"

    def get_db():
        DB_PATH.parent.mkdir(parents=True, exist_ok=True)
        conn = sqlite3.connect(str(DB_PATH))
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA foreign_keys=ON")
        return conn

    def init_db():
        conn = get_db()
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                username TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                display_name TEXT,
                zip_code TEXT NOT NULL,
                lat REAL,
                lng REAL,
                avatar_url TEXT DEFAULT '',
                rating_sum INTEGER DEFAULT 0,
                rating_count INTEGER DEFAULT 0,
                created_at TEXT DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS listings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                plant_type TEXT NOT NULL,
                condition TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'swap',
                description TEXT DEFAULT '',
                image_url TEXT NOT NULL,
                image_public_id TEXT,
                lat REAL NOT NULL,
                lng REAL NOT NULL,
                is_active INTEGER DEFAULT 1,
                swap_status TEXT DEFAULT 'available',
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS swaps (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                listing_id INTEGER NOT NULL,
                requester_id INTEGER NOT NULL,
                lister_id INTEGER NOT NULL,
                offered_listing_id INTEGER,
                swap_type TEXT NOT NULL DEFAULT 'trade',
                state TEXT NOT NULL DEFAULT 'pending',
                lister_confirmed INTEGER DEFAULT 0,
                requester_confirmed INTEGER DEFAULT 0,
                created_at TEXT DEFAULT (datetime('now')),
                updated_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (listing_id) REFERENCES listings(id),
                FOREIGN KEY (requester_id) REFERENCES users(id),
                FOREIGN KEY (lister_id) REFERENCES users(id),
                FOREIGN KEY (offered_listing_id) REFERENCES listings(id)
            );

            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                swap_id INTEGER NOT NULL,
                sender_id INTEGER NOT NULL,
                body TEXT NOT NULL,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (swap_id) REFERENCES swaps(id),
                FOREIGN KEY (sender_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS ratings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                swap_id INTEGER NOT NULL,
                rater_id INTEGER NOT NULL,
                rated_id INTEGER NOT NULL,
                score INTEGER NOT NULL,
                comment TEXT DEFAULT '',
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (swap_id) REFERENCES swaps(id),
                FOREIGN KEY (rater_id) REFERENCES users(id),
                FOREIGN KEY (rated_id) REFERENCES users(id),
                UNIQUE(swap_id, rater_id)
            );

            CREATE INDEX IF NOT EXISTS idx_listings_user ON listings(user_id);
            CREATE INDEX IF NOT EXISTS idx_listings_active ON listings(is_active);
            CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(plant_type);
            CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
            CREATE INDEX IF NOT EXISTS idx_swaps_listing ON swaps(listing_id);
            CREATE INDEX IF NOT EXISTS idx_swaps_requester ON swaps(requester_id);
            CREATE INDEX IF NOT EXISTS idx_swaps_lister ON swaps(lister_id);
            CREATE INDEX IF NOT EXISTS idx_swaps_state ON swaps(state);
            CREATE INDEX IF NOT EXISTS idx_messages_swap ON messages(swap_id);
            CREATE INDEX IF NOT EXISTS idx_ratings_swap ON ratings(swap_id);
        """)
        conn.close()


# ── Helper for portable queries ──────────────────────────────────────────

def query(conn, sql, params=None):
    """Execute a query and return list of dicts."""
    if DATABASE_URL:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(sql, params or ())
        try:
            rows = cur.fetchall()
            return [dict(r) for r in rows]
        except psycopg2.ProgrammingError:
            return []
    else:
        cur = conn.execute(sql, params or ())
        rows = cur.fetchall()
        return [dict(r) for r in rows]


def query_one(conn, sql, params=None):
    """Execute a query and return a single dict or None."""
    if DATABASE_URL:
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        cur.execute(sql, params or ())
        row = cur.fetchone()
        return dict(row) if row else None
    else:
        cur = conn.execute(sql, params or ())
        row = cur.fetchone()
        return dict(row) if row else None


def execute(conn, sql, params=None):
    """Execute a write query and return the last inserted id."""
    if DATABASE_URL:
        cur = conn.cursor()
        cur.execute(sql + " RETURNING id", params or ())
        row = cur.fetchone()
        return row[0] if row else None
    else:
        cur = conn.execute(sql, params or ())
        return cur.lastrowid
