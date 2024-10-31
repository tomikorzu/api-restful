import express from "express";

import login from "../auth/login.js";
import register from "../auth/register.js";
import changePassword from "../auth/change-psw.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.patch("/change-psw", changePassword);

export default router;
