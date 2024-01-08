import { Router } from "express";
import { register, login } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
