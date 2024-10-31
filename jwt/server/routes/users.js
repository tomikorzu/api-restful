import express from "express";

import verifyToken from "../middlewares/token.js";
import register from "../auth/register.js";
import login from "../auth/login.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/", verifyToken, (req, res) => {
  res.status(200).json(req.user);
});
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "OK, you have a valid token." });
});

export default router;
