import { Router } from "express";
import { createUser, loginUser, logoutuser } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutuser);
export default router;
