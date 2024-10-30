import usersDB from "../config/users.js";
import { authenticate, logger } from "../middlewares/logger.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.status(200).json(rows);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * from users where id = ?`, [id], (err, row) => {
    if (err) {
      res.status(500).json({ message: err });
    }
    if (row) {
      res.status(200).json(row);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

router.post("/", authenticate, (req, res) => {
  const { name, email } = req.body;
  db.run(`INSERT INTO users (name, email) VALUES (?, ?)`),
    [name, email],
    (err) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      res.status(200).json({
        message: "User adde succesfully",
        name,
        email,
        id: this.lastID,
      });
    };
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  db.run(
    `UPDATE users SET name = ?, email = ? WHERE id = ?`,
    [name, email, id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      if (this.changer > 0) {
        res
          .status(200)
          .json({ message: "User updated successfully", id, name, email });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  );
});

export default router;
