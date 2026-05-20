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
                created_at TIMESTAMP DEFAULT NOW()
            );

            CREATE INDEX IF NOT EXISTS idx_listings_user ON listings(user_id);
            CREATE INDEX IF NOT EXISTS idx_listings_active ON listings(is_active);
            CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(plant_type);
            CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
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
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );

            CREATE INDEX IF NOT EXISTS idx_listings_user ON listings(user_id);
            CREATE INDEX IF NOT EXISTS idx_listings_active ON listings(is_active);
            CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(plant_type);
            CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
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
