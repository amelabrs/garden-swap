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
                tier TEXT DEFAULT 'sprout',
                stripe_customer_id TEXT,
                stripe_subscription_id TEXT,
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
                light_needs TEXT DEFAULT '',
                rarity TEXT DEFAULT '',
                size TEXT DEFAULT '',
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

            CREATE TABLE IF NOT EXISTS wish_list (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id),
                plant_name TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                UNIQUE(user_id, plant_name)
            );

            CREATE TABLE IF NOT EXISTS notifications (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id),
                type TEXT NOT NULL,
                body TEXT NOT NULL,
                listing_id INTEGER,
                is_read INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW()
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
            CREATE INDEX IF NOT EXISTS idx_wish_list_user ON wish_list(user_id);
            CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);

            CREATE TABLE IF NOT EXISTS vendors (
                id SERIAL PRIMARY KEY,
                user_id INTEGER UNIQUE NOT NULL REFERENCES users(id),
                shop_name TEXT NOT NULL,
                description TEXT DEFAULT '',
                phone TEXT DEFAULT '',
                stripe_account_id TEXT,
                is_approved INTEGER DEFAULT 0,
                is_active INTEGER DEFAULT 1,
                created_at TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                vendor_id INTEGER NOT NULL REFERENCES vendors(id),
                title TEXT NOT NULL,
                description TEXT DEFAULT '',
                category TEXT NOT NULL,
                price REAL NOT NULL,
                stock_qty INTEGER DEFAULT 0,
                image_url TEXT DEFAULT '',
                image_public_id TEXT,
                is_active INTEGER DEFAULT 1,
                created_at TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS cart_items (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id),
                product_id INTEGER NOT NULL REFERENCES products(id),
                quantity INTEGER DEFAULT 1,
                UNIQUE(user_id, product_id)
            );

            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                buyer_id INTEGER NOT NULL REFERENCES users(id),
                shipping_name TEXT DEFAULT '',
                shipping_phone TEXT DEFAULT '',
                shipping_address TEXT NOT NULL,
                total_amount REAL NOT NULL,
                status TEXT DEFAULT 'pending',
                stripe_session_id TEXT,
                created_at TIMESTAMP DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS order_items (
                id SERIAL PRIMARY KEY,
                order_id INTEGER NOT NULL REFERENCES orders(id),
                product_id INTEGER NOT NULL REFERENCES products(id),
                vendor_id INTEGER NOT NULL REFERENCES vendors(id),
                title TEXT NOT NULL,
                price REAL NOT NULL,
                quantity INTEGER NOT NULL,
                subtotal REAL NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_vendors_user ON vendors(user_id);
            CREATE INDEX IF NOT EXISTS idx_products_vendor ON products(vendor_id);
            CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
            CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
            CREATE INDEX IF NOT EXISTS idx_cart_user ON cart_items(user_id);
            CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
            CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
            CREATE INDEX IF NOT EXISTS idx_order_items_vendor ON order_items(vendor_id);

            CREATE TABLE IF NOT EXISTS plant_doctor_logs (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id),
                created_at TIMESTAMP DEFAULT NOW()
            );

            CREATE INDEX IF NOT EXISTS idx_plant_doctor_user ON plant_doctor_logs(user_id);

            CREATE TABLE IF NOT EXISTS test_checks (
                id SERIAL PRIMARY KEY,
                tester TEXT NOT NULL,
                test_id TEXT NOT NULL,
                checked INTEGER DEFAULT 1,
                updated_at TIMESTAMP DEFAULT NOW(),
                UNIQUE(tester, test_id)
            );
        """)
        conn.commit()
        conn.close()

    def migrate_db():
        """Add Stage 3 + Stage 4 + Stage 5 columns and tables to existing tables (PostgreSQL)."""
        conn = get_db()
        cur = conn.cursor()
        migrations = [
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS tier TEXT DEFAULT 'sprout'",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT",
            "ALTER TABLE listings ADD COLUMN IF NOT EXISTS light_needs TEXT DEFAULT ''",
            "ALTER TABLE listings ADD COLUMN IF NOT EXISTS rarity TEXT DEFAULT ''",
            "ALTER TABLE listings ADD COLUMN IF NOT EXISTS size TEXT DEFAULT ''",
        ]
        for sql in migrations:
            try:
                cur.execute(sql)
            except Exception:
                conn.rollback()

        # Stage 4: new tables
        stage4_tables = """
            CREATE TABLE IF NOT EXISTS vendors (
                id SERIAL PRIMARY KEY,
                user_id INTEGER UNIQUE NOT NULL REFERENCES users(id),
                shop_name TEXT NOT NULL,
                description TEXT DEFAULT '',
                phone TEXT DEFAULT '',
                stripe_account_id TEXT,
                is_approved INTEGER DEFAULT 0,
                is_active INTEGER DEFAULT 1,
                created_at TIMESTAMP DEFAULT NOW()
            );
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                vendor_id INTEGER NOT NULL REFERENCES vendors(id),
                title TEXT NOT NULL,
                description TEXT DEFAULT '',
                category TEXT NOT NULL,
                price REAL NOT NULL,
                stock_qty INTEGER DEFAULT 0,
                image_url TEXT DEFAULT '',
                image_public_id TEXT,
                is_active INTEGER DEFAULT 1,
                created_at TIMESTAMP DEFAULT NOW()
            );
            CREATE TABLE IF NOT EXISTS cart_items (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id),
                product_id INTEGER NOT NULL REFERENCES products(id),
                quantity INTEGER DEFAULT 1,
                UNIQUE(user_id, product_id)
            );
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                buyer_id INTEGER NOT NULL REFERENCES users(id),
                shipping_name TEXT DEFAULT '',
                shipping_phone TEXT DEFAULT '',
                shipping_address TEXT NOT NULL,
                total_amount REAL NOT NULL,
                status TEXT DEFAULT 'pending',
                stripe_session_id TEXT,
                created_at TIMESTAMP DEFAULT NOW()
            );
            CREATE TABLE IF NOT EXISTS order_items (
                id SERIAL PRIMARY KEY,
                order_id INTEGER NOT NULL REFERENCES orders(id),
                product_id INTEGER NOT NULL REFERENCES products(id),
                vendor_id INTEGER NOT NULL REFERENCES vendors(id),
                title TEXT NOT NULL,
                price REAL NOT NULL,
                quantity INTEGER NOT NULL,
                subtotal REAL NOT NULL
            );
        """
        try:
            cur.execute(stage4_tables)
        except Exception:
            conn.rollback()

        # Stage 5: plant_doctor_logs
        try:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS plant_doctor_logs (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL REFERENCES users(id),
                    created_at TIMESTAMP DEFAULT NOW()
                );
                CREATE INDEX IF NOT EXISTS idx_plant_doctor_user ON plant_doctor_logs(user_id);
            """)
        except Exception:
            conn.rollback()

        # Stage 5: test_checks (collaborative test tracking)
        try:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS test_checks (
                    id SERIAL PRIMARY KEY,
                    tester TEXT NOT NULL,
                    test_id TEXT NOT NULL,
                    checked INTEGER DEFAULT 1,
                    updated_at TIMESTAMP DEFAULT NOW(),
                    UNIQUE(tester, test_id)
                );
            """)
        except Exception:
            conn.rollback()

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
                tier TEXT DEFAULT 'sprout',
                stripe_customer_id TEXT,
                stripe_subscription_id TEXT,
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
                light_needs TEXT DEFAULT '',
                rarity TEXT DEFAULT '',
                size TEXT DEFAULT '',
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

            CREATE TABLE IF NOT EXISTS wish_list (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                plant_name TEXT NOT NULL,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id),
                UNIQUE(user_id, plant_name)
            );

            CREATE TABLE IF NOT EXISTS notifications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                type TEXT NOT NULL,
                body TEXT NOT NULL,
                listing_id INTEGER,
                is_read INTEGER DEFAULT 0,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id)
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
            CREATE INDEX IF NOT EXISTS idx_wish_list_user ON wish_list(user_id);
            CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);

            CREATE TABLE IF NOT EXISTS vendors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER UNIQUE NOT NULL,
                shop_name TEXT NOT NULL,
                description TEXT DEFAULT '',
                phone TEXT DEFAULT '',
                stripe_account_id TEXT,
                is_approved INTEGER DEFAULT 0,
                is_active INTEGER DEFAULT 1,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                vendor_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                description TEXT DEFAULT '',
                category TEXT NOT NULL,
                price REAL NOT NULL,
                stock_qty INTEGER DEFAULT 0,
                image_url TEXT DEFAULT '',
                image_public_id TEXT,
                is_active INTEGER DEFAULT 1,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (vendor_id) REFERENCES vendors(id)
            );

            CREATE TABLE IF NOT EXISTS cart_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                quantity INTEGER DEFAULT 1,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (product_id) REFERENCES products(id),
                UNIQUE(user_id, product_id)
            );

            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                buyer_id INTEGER NOT NULL,
                shipping_name TEXT DEFAULT '',
                shipping_phone TEXT DEFAULT '',
                shipping_address TEXT NOT NULL,
                total_amount REAL NOT NULL,
                status TEXT DEFAULT 'pending',
                stripe_session_id TEXT,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (buyer_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS order_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                vendor_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                price REAL NOT NULL,
                quantity INTEGER NOT NULL,
                subtotal REAL NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id),
                FOREIGN KEY (product_id) REFERENCES products(id),
                FOREIGN KEY (vendor_id) REFERENCES vendors(id)
            );

            CREATE INDEX IF NOT EXISTS idx_vendors_user ON vendors(user_id);
            CREATE INDEX IF NOT EXISTS idx_products_vendor ON products(vendor_id);
            CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
            CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
            CREATE INDEX IF NOT EXISTS idx_cart_user ON cart_items(user_id);
            CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
            CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
            CREATE INDEX IF NOT EXISTS idx_order_items_vendor ON order_items(vendor_id);

            CREATE TABLE IF NOT EXISTS plant_doctor_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
            CREATE INDEX IF NOT EXISTS idx_plant_doctor_user ON plant_doctor_logs(user_id);

            CREATE TABLE IF NOT EXISTS test_checks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tester TEXT NOT NULL,
                test_id TEXT NOT NULL,
                checked INTEGER DEFAULT 1,
                updated_at TEXT DEFAULT (datetime('now')),
                UNIQUE(tester, test_id)
            );
        """)
        conn.close()

    def migrate_db():
        """Add Stage 3 + Stage 4 columns and tables to existing tables (SQLite)."""
        conn = get_db()
        new_columns = [
            ("users", "tier TEXT DEFAULT 'sprout'"),
            ("users", "stripe_customer_id TEXT"),
            ("users", "stripe_subscription_id TEXT"),
            ("listings", "light_needs TEXT DEFAULT ''"),
            ("listings", "rarity TEXT DEFAULT ''"),
            ("listings", "size TEXT DEFAULT ''"),
        ]
        for table, col_def in new_columns:
            try:
                conn.execute(f"ALTER TABLE {table} ADD COLUMN {col_def}")
            except Exception:
                pass  # Column already exists
        conn.commit()

        # Create new tables if they don't exist
        conn.executescript("""
            CREATE TABLE IF NOT EXISTS wish_list (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                plant_name TEXT NOT NULL,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id),
                UNIQUE(user_id, plant_name)
            );

            CREATE TABLE IF NOT EXISTS notifications (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                type TEXT NOT NULL,
                body TEXT NOT NULL,
                listing_id INTEGER,
                is_read INTEGER DEFAULT 0,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS vendors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER UNIQUE NOT NULL,
                shop_name TEXT NOT NULL,
                description TEXT DEFAULT '',
                phone TEXT DEFAULT '',
                stripe_account_id TEXT,
                is_approved INTEGER DEFAULT 0,
                is_active INTEGER DEFAULT 1,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                vendor_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                description TEXT DEFAULT '',
                category TEXT NOT NULL,
                price REAL NOT NULL,
                stock_qty INTEGER DEFAULT 0,
                image_url TEXT DEFAULT '',
                image_public_id TEXT,
                is_active INTEGER DEFAULT 1,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (vendor_id) REFERENCES vendors(id)
            );

            CREATE TABLE IF NOT EXISTS cart_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                quantity INTEGER DEFAULT 1,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (product_id) REFERENCES products(id),
                UNIQUE(user_id, product_id)
            );

            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                buyer_id INTEGER NOT NULL,
                shipping_name TEXT DEFAULT '',
                shipping_phone TEXT DEFAULT '',
                shipping_address TEXT NOT NULL,
                total_amount REAL NOT NULL,
                status TEXT DEFAULT 'pending',
                stripe_session_id TEXT,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (buyer_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS order_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                vendor_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                price REAL NOT NULL,
                quantity INTEGER NOT NULL,
                subtotal REAL NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id),
                FOREIGN KEY (product_id) REFERENCES products(id),
                FOREIGN KEY (vendor_id) REFERENCES vendors(id)
            );

            CREATE INDEX IF NOT EXISTS idx_wish_list_user ON wish_list(user_id);
            CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
            CREATE INDEX IF NOT EXISTS idx_vendors_user ON vendors(user_id);
            CREATE INDEX IF NOT EXISTS idx_products_vendor ON products(vendor_id);
            CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
            CREATE INDEX IF NOT EXISTS idx_cart_user ON cart_items(user_id);
            CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
            CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
            CREATE INDEX IF NOT EXISTS idx_order_items_vendor ON order_items(vendor_id);

            CREATE TABLE IF NOT EXISTS plant_doctor_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                created_at TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
            CREATE INDEX IF NOT EXISTS idx_plant_doctor_user ON plant_doctor_logs(user_id);

            CREATE TABLE IF NOT EXISTS test_checks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tester TEXT NOT NULL,
                test_id TEXT NOT NULL,
                checked INTEGER DEFAULT 1,
                updated_at TEXT DEFAULT (datetime('now')),
                UNIQUE(tester, test_id)
            );
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
