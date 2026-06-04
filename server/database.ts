import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES Modules context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.resolve(__dirname, '../wanderlust.sqlite');

class DatabaseWrapper {
  private db: Database.Database;

  constructor() {
    try {
      this.db = new Database(DB_PATH);
      console.log('Connected to the SQLite database at:', DB_PATH);
      this.initializeSchema();
    } catch (err: any) {
      console.error('Error opening database:', err.message);
      throw err;
    }
  }

  private initializeSchema() {
    // Enable Foreign Keys
    this.db.pragma('foreign_keys = ON');

    // Create Users table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Tours table
    this.db.exec(`
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
        highlights TEXT NOT NULL,
        included TEXT NOT NULL,
        category TEXT NOT NULL,
        difficulty TEXT NOT NULL
      )
    `);

    // Create Destinations table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS destinations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        country TEXT NOT NULL,
        image TEXT NOT NULL,
        price TEXT NOT NULL,
        rating REAL DEFAULT 0.0,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        featured INTEGER DEFAULT 0
      )
    `);

    // Create Bookings table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        tour_id INTEGER NOT NULL,
        booking_date TEXT NOT NULL,
        guests INTEGER NOT NULL,
        total_price TEXT NOT NULL,
        status TEXT DEFAULT 'Confirmed',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (tour_id) REFERENCES tours (id) ON DELETE CASCADE
      )
    `);

    // Create Reviews table
    this.db.exec(`
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
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS wishlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        item_id INTEGER NOT NULL,
        item_type TEXT NOT NULL,
        UNIQUE(user_id, item_id, item_type),
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    console.log('Database tables initialized.');
  }

  // run helper
  run(sql: string, params: any[] = []): Promise<{ lastID: number; changes: number }> {
    try {
      const stmt = this.db.prepare(sql);
      const result = stmt.run(...params);
      return Promise.resolve({ lastID: result.lastInsertRowid as number, changes: result.changes });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // get helper (single row)
  get<T>(sql: string, params: any[] = []): Promise<T | undefined> {
    try {
      const stmt = this.db.prepare(sql);
      const row = stmt.get(...params);
      return Promise.resolve(row as T);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // all helper (multiple rows)
  all<T>(sql: string, params: any[] = []): Promise<T[]> {
    try {
      const stmt = this.db.prepare(sql);
      const rows = stmt.all(...params);
      return Promise.resolve(rows as T[]);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const db = new DatabaseWrapper();
export default db;