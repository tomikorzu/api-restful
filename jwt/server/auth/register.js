import jwt from "jsonwebtoken";
import { secretKey } from "../constants/key.js";
import db from "../config/users.js";

const register = (req, res) => {
  const { name, lastName, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, existingUser) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (existingUser) {
        return res.status(409).json({ error: "Email already in use" });
      }

      db.run(
        "INSERT INTO users (name, lastName, email, password) VALUES (?, ?, ?, ?)",
        [name, lastName, email, password],
        (err) => {
          if (err) {
            return res.status(500).json({ error: "Error registering user" });
          }

          const token = jwt.sign({ name, lastName, email }, secretKey, {
            expiresIn: "1h",
          });

          res
            .status(201)
            .json({ message: "User registered successfully", token });
        }
      );
    }
  );
};

export default register;
