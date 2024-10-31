import jwt from "jsonwebtoken";
import { secretKey } from "../constants/key.js";

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

  res.status(200).json({ message: "Login successful", token });
};

export default login;
