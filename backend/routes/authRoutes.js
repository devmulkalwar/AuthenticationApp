import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  createProfile,
  updateProfile,
  deleteProfile,
  changePassword
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
// import { upload } from "../middleware/multerMiddleware.js"; // Uncomment if using file upload

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Email verification and password management routes
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/change-password", verifyToken, changePassword);

// Protected routes (require authentication)
router.get("/check-auth", verifyToken, checkAuth);
router.post("/create-profile", verifyToken, createProfile); // Create profile
router.post("/edit-profile", verifyToken, updateProfile); // Edit profile
router.post("/delete-profile", verifyToken, deleteProfile); // Delete profile

export default router;