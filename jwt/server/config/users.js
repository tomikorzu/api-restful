import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./jwt/server/databases/users.db");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    lastName TEXT,
    role TEXT
  )
`);

export default db;
