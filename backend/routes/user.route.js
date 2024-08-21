import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticatedUser, logout);
router.get("/user", isAuthenticatedUser, getUserProfile);
export default router;
