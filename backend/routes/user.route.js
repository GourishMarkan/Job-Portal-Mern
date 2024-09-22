import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  getUserProfile,
  updateProfile,
  updatePassword,
  updateResume,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticatedUser, logout);
router.get("/getUser", isAuthenticatedUser, getUserProfile);
router.put("/update-profile", isAuthenticatedUser, updateProfile);
router.put("/update-password", isAuthenticatedUser, updatePassword);
router.put("/update-resume", isAuthenticatedUser, updateResume);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
