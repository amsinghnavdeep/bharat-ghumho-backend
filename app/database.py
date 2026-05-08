"""SQLite persistence for users, bookings, alerts, reviews and favorites."""
import os
import sqlite3
import json
import threading
from typing import Optional, Any, Iterable

DB_PATH = os.getenv("BG_DB_PATH", os.path.join(os.path.dirname(os.path.dirname(__file__)), "bharat_ghumho.db"))

_lock = threading.RLock()


def _row_to_dict(row: sqlite3.Row | None) -> Optional[dict]:
    return dict(row) if row else None


def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn


SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id            TEXT PRIMARY KEY,
    name          TEXT NOT NULL,
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    preferences   TEXT NOT NULL DEFAULT '{}',
    created_at    TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
    id          TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL,
    type        TEXT NOT NULL,
    entity_id   TEXT NOT NULL,
    title       TEXT NOT NULL,
    price       REAL NOT NULL,
    currency    TEXT NOT NULL DEFAULT 'USD',
    travelers   INTEGER NOT NULL DEFAULT 1,
    start_date  TEXT,
    end_date    TEXT,
    status      TEXT NOT NULL DEFAULT 'confirmed',
    details     TEXT,
    created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS fare_alerts (
    id            TEXT PRIMARY KEY,
    user_id       TEXT,
    frm           TEXT NOT NULL,
    to_           TEXT NOT NULL,
    target_price  REAL NOT NULL,
    currency      TEXT NOT NULL DEFAULT 'CAD',
    email         TEXT NOT NULL,
    active        INTEGER NOT NULL DEFAULT 1,
    created_at    TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS reviews (
    id           TEXT PRIMARY KEY,
    user_id      TEXT,
    entity_type  TEXT NOT NULL,
    entity_id    TEXT NOT NULL,
    rating       REAL NOT NULL,
    title        TEXT,
    body         TEXT NOT NULL,
    author       TEXT,
    created_at   TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS favorites (
    id          TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL,
    type        TEXT NOT NULL,
    entity_id   TEXT NOT NULL,
    title       TEXT NOT NULL,
    metadata    TEXT,
    created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, type, entity_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS saved_trips (
    id          TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL,
    name        TEXT NOT NULL,
    plan        TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
"""


def init_db() -> None:
    with _lock:
        conn = get_conn()
        try:
            conn.executescript(SCHEMA)
            conn.commit()
        finally:
            conn.close()


def execute(query: str, params: Iterable[Any] = ()) -> sqlite3.Cursor:
    with _lock:
        conn = get_conn()
        try:
            cur = conn.execute(query, tuple(params))
            conn.commit()
            return cur
        finally:
            conn.close()


def fetchone(query: str, params: Iterable[Any] = ()) -> Optional[dict]:
    with _lock:
        conn = get_conn()
        try:
            row = conn.execute(query, tuple(params)).fetchone()
            return _row_to_dict(row)
        finally:
            conn.close()


def fetchall(query: str, params: Iterable[Any] = ()) -> list[dict]:
    with _lock:
        conn = get_conn()
        try:
            rows = conn.execute(query, tuple(params)).fetchall()
            return [dict(r) for r in rows]
        finally:
            conn.close()


def insert(query: str, params: Iterable[Any] = ()) -> None:
    execute(query, params)


def to_json(value: Any) -> str:
    if value is None:
        return ""
    return json.dumps(value, default=str)


def from_json(text: str | None) -> Any:
    if not text:
        return None
    try:
        return json.loads(text)
    except (json.JSONDecodeError, TypeError):
        return None
