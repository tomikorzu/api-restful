import express from "express";

import login from "../auth/login.js";
import register from "../auth/register.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
