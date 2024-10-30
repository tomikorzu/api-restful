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

  db.get(`SELECT COUNT(*) AS count FROM users`, (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    if (row.count === 0) {
      const insertValues = db.prepare(
        `INSERT INTO users (name, email) VALUES (?, ?)`
      );

      insertValues.run("Tomas", "tomykorzu@icloud.com");
      insertValues.run("Carlos", "carlos@icloud.com");
      insertValues.run("Silvana", "silvana@icloud.com");

      insertValues.finalize((err) => {
        if (err) {
          console.error("Error inserting users:", err);
        } else {
          console.log("Users added successfully");
        }
      });
    } else {
      console.log("The table users already has content");
    }
  });
});

export default db;
