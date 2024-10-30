import usersDB from "../config/users.js";
import { authenticate, logger } from "../middlewares/logger.js";
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    res.status(200).json(rows)
  });
});

export default router;
