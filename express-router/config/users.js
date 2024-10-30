import sqlite3 from "sqlite3";

const db = sqlite3.Database("./databases/users.db");

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )
        `);
});

