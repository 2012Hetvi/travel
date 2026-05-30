import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES Modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.resolve(__dirname, '../wanderlust.sqlite');

class DatabaseWrapper {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
      } else {
        console.log('Connected to the SQLite database at:', DB_PATH);
        this.initializeSchema();
      }
    });
  }

  private initializeSchema() {
    // Enable Foreign Keys
    this.db.run('PRAGMA foreign_keys = ON');

    // Create Users table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Tours table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS tours (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        destination TEXT NOT NULL,
        image TEXT NOT NULL,
        price TEXT NOT NULL,
        duration TEXT NOT NULL,
        rating REAL DEFAULT 0.0,
        reviews INTEGER DEFAULT 0,
        description TEXT NOT NULL,
        highlights TEXT NOT NULL, -- JSON string representing string[]
        included TEXT NOT NULL,   -- JSON string representing string[]
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL
      )
    `);

    // Create Destinations table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS destinations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        country TEXT NOT NULL,
        image TEXT NOT NULL,
        price TEXT NOT NULL,
        rating REAL DEFAULT 0.0,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        featured INTEGER DEFAULT 0 -- 0 for false, 1 for true
      )
    `);

    // Create Bookings table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        tour_id INTEGER NOT NULL,
        booking_date TEXT NOT NULL,
        guests INTEGER NOT NULL,
        total_price TEXT NOT NULL,
        status TEXT DEFAULT 'Confirmed', -- 'Confirmed' or 'Cancelled'
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (tour_id) REFERENCES tours (id) ON DELETE CASCADE
      )
    `);

    // Create Reviews table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        tour_id INTEGER NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (tour_id) REFERENCES tours (id) ON DELETE CASCADE
      )
    `);

    // Create Wishlist table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        item_id INTEGER NOT NULL,
        item_type TEXT NOT NULL, -- 'tour' or 'destination'
        UNIQUE(user_id, item_id, item_type),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    console.log('Database tables initialized.');
  }

  // Promise-based run helper
  run(sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  }

  // Promise-based get helper (single row)
  get<T>(sql: string, params: any[] = []): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row as T);
        }
      });
    });
  }

  // Promise-based all helper (multiple rows)
  all<T>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows as T[]);
        }
      });
    });
  }
}

const db = new DatabaseWrapper();
export default db;
