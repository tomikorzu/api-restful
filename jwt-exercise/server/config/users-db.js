import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./jwt-exercise/server/databases/users.db");

db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        fullname TEXT NOT NULL,
        role TEXT NOT NULL
    )`);

export default db;
