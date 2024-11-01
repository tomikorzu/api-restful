import db from "../config/users-db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.get(`SELECT email,password FROM users WHERE email = ?`, [email], (err, row) => {
    if (err) {
        console.error(err);
        
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!row) {
      return res.status(404).json({ error: "User not found" });
    }

    bcrypt.compare(password, row.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!result) {
        return res.status(401).json({ error: "Incorrect password" });
      }
      const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful", token });
    });
  });
};

export default login;
