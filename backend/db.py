# Database initalization for recording history of played song


import sqlite3
import os


# db for loging song history
DB_PATH_LOG = os.path.join(os.path.dirname(__file__), "Data", "tunelog.db")

# db for song list
DB_PATH_LIB = os.path.join(os.path.dirname(__file__), "Data", "songlist.db")


# DB for USER / admin

DB_PATH_USR = os.path.join(os.path.dirname(__file__), "Data", "users.db")

# Database connection

def get_db_connection():
    os.makedirs(os.path.dirname(DB_PATH_LOG), exist_ok=True)
    conn = sqlite3.connect(DB_PATH_LOG)
    conn.row_factory = sqlite3.Row
    return conn

# for library sync
def get_db_connection_lib():
    os.makedirs(os.path.dirname(DB_PATH_LIB), exist_ok=True)
    conn = sqlite3.connect(DB_PATH_LIB)
    conn.row_factory = sqlite3.Row
    return conn


# for library sync
def get_db_connection_usr():
    os.makedirs(os.path.dirname(DB_PATH_USR), exist_ok=True)
    conn = sqlite3.connect(DB_PATH_USR)
    conn.row_factory = sqlite3.Row
    return conn


def init_db_usr():
    conn = get_db_connection_usr()
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS user (
            username     TEXT PRIMARY KEY,
            password       TEXT,
            isAdmin     BOOLEAN
            
        )
    """
    )

    conn.commit()
    conn.close()


def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS listens (
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        song_id TEXT NOT NULL,
        title TEXT,
        artist TEXT,
        album TEXT,
        genre TEXT,
        duration   INTEGER,
        played  INTEGER,
        percent_played  REAL,
        signal TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        user_id     TEXT DEFAULT "default"
        
        
        )
        """
    )

    conn.commit()
    conn.close()


def init_db_lib():
    conn = get_db_connection_lib()
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS library (
            song_id     TEXT PRIMARY KEY,
            title       TEXT,
            artist      TEXT,
            album       TEXT,
            genre       TEXT,
            duration    INTEGER,
            last_synced TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            explicit    TEXT
        )
    """
    )

    conn.commit()
    conn.close()


if __name__ == "__main__":
    init_db()
    init_db_lib()
    print("asdasd")
    init_db_usr()
