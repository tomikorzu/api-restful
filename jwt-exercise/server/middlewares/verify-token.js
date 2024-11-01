import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).json({ message: "No token provided" });
  }

  const onlyToken = token.split(" ")[1];

  jwt.verify(onlyToken, secretKey, (err, decoded) => {
    if (err) {
      console.error(err, "ERrrrrr");
      res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

export default verifyToken;
