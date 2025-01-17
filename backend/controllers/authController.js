import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/userModel.js";
import { generateTokenSetCookie } from "../utils/generateTokenSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../nodemailer/emails.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Register new user
export const register = async (req, res) => {
  const { email, password, confirmPassword  } = req.body;

  try {
    console.log("Request body:", req.body);

    if (!email || !password || !confirmPassword ) {
      throw new Error("All fields are required");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate verification token
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    console.log("User data before saving:", user);

    await user.save();
    console.log("User saved successfully");

    // Generate JWT token and set cookie
    const token = generateTokenSetCookie(res, user._id);
    console.log(token);

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "Signup successful and verification email sent",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(400).json({ success: false, message: error.message || "Error during signup" });
  }
};

// Verify user email
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.fullName);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in email verification ", error);
    res.status(500).json({ success: false, message: "Error in email verification" });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("from backend", email, password);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    generateTokenSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Logout user
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email Id" });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    console.log("Stored token from forgot pass:", resetToken);
    console.log("Token expiration date:", resetTokenExpiresAt);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    // Send password reset email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Reset password email sent successfully",
      resetToken: user.resetPasswordToken,
    });
  } catch (error) {
    console.log("Error in Forgot password ", error);
    res.status(400).json({ success: false, message: "Error in Forgot password" });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    console.log("Reset password route hit!");
    console.log("token from reset password", token, password);

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
    }

    console.log("Stored token:", user.resetPasswordToken);
    console.log("Token expiration date:", user.resetPasswordExpiresAt);

    console.log("old password", user.password);

    // Update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    console.log(user.password);
    await sendResetSuccessEmail(user.email);

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: "Error in resetPassword" });
  }
};

// Check for authenticated user
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: "Error in checkAuth" });
  }
};

// Change password
export const changePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the current password is correct
    const isPasswordValid = await bcryptjs.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid current password" });
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log("Error in changePassword ", error);
    res.status(500).json({ success: false, message: "Error changing password" });
  }
};

// Create profile
export const createProfile = async (req, res) => {
  const { userId ,fullName, profilePicture, socialMedia } = req.body;
 console.log(userId);
  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update profile fields
    user.fullName = fullName;
    user.profilePicture = profilePicture;
    user.socialMedia = socialMedia;
    user.isProfileComplete = true;
    await user.save();

    res.status(200).json({ success: true, message: "Profile created successfully", user });
  } catch (error) {
    console.log("Error in createProfile ", error);
    res.status(500).json({ success: false, message: "Error creating profile" });
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  const { userId, fullName, profilePicture, socialMedia } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update profile fields
    user.fullName = fullName || user.fullName;
    user.profilePicture = profilePicture || user.profilePicture;
    user.socialMedia = socialMedia || user.socialMedia;
    await user.save();

    res.status(200).json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.log("Error in updateProfile ", error);
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
};

// Delete profile
export const deleteProfile = async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Validate the password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProfile:", error);
    res.status(500).json({ success: false, message: "Error deleting profile" });
  }
};
