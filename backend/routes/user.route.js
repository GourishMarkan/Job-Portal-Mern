import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updateProfile,
  updatePassword,
  updateResume,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticatedUser, logout);
router.get("/user", isAuthenticatedUser, getUserProfile);
router.put("/update-profile", isAuthenticatedUser, updateProfile);
router.put("/update-password", isAuthenticatedUser, updatePassword);
router.put("/update-resume", isAuthenticatedUser, updateResume);
export default router;
