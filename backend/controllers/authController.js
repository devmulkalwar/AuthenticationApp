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
import { deleteImageBySecureUrl, uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Register new user
export const register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    console.log("Request body:", req.body);

    if (!email || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

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
    res.status(400).json({
      success: false,
      message: error.message || "Error during signup",
    });
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
    res
      .status(500)
      .json({ success: false, message: "Error in email verification" });
  }
};

// Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("from backend", email, password);
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
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
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// Forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email Id" });
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
    res
      .status(400)
      .json({ success: false, message: "Error in Forgot password" });
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
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
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

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
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
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
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
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the current password is correct
    const isPasswordValid = await bcryptjs.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid current password" });
    }

    // Hash the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log("Error in changePassword ", error);
    res
      .status(500)
      .json({ success: false, message: "Error changing password" });
  }
};

//Create Profile
export const createProfile = async (req, res) => {
  const { userId, fullName, socialMedia, bio } = req.body;
  const profilePicture = req.file;

  let path;
  if (profilePicture) {
    path = profilePicture.path; // Extract file path
  }

  try {
    // Validate required fields
    if (!userId || !fullName || !socialMedia || !bio) {
      throw new Error("All fields are required");
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Upload profile picture to Cloudinary
    let profilePictureUrl = "";
    if (profilePicture) {
      const cloudinaryResult = await uploadOnCloudinary(path);
      profilePictureUrl = cloudinaryResult.secure_url;
    }

    // Update user fields
    user.fullName = fullName;
    user.profilePicture = profilePictureUrl;
    user.socialMedia = socialMedia;
    user.bio = bio;
    user.isProfileComplete = true;

    // Save updated user
    await user.save();
    // Send welcome email to the new user
    await sendWelcomeEmail(user.email, user.fullName);
    res
      .status(200)
      .json({ success: true, message: "Profile created successfully", user });
  } catch (error) {
    console.error("Error in createProfile:", error);

    // Handle error response
    res.status(500).json({
      success: false,
      message: error.message || "Error creating profile",
    });
  } finally {
    // Delete local file if it exists
    if (path && fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  }
};

// Update profile
export const updateProfile = async (req, res) => {
  const { userId, fullName, bio, socialMedia } = req.body;
  const profilePictureFile = req.file; // Assuming file upload middleware like multer is used

  let profilePictureUrl = null;
  let tempFilePath = null;

  try {
    // Validate user ID
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Handle profile picture upload if a file is provided
    if (profilePictureFile) {
      tempFilePath = profilePictureFile.path; // Get the temporary file path

      // Upload the new profile picture to Cloudinary
      const cloudinaryResult = await uploadOnCloudinary(tempFilePath);

      if (!cloudinaryResult || !cloudinaryResult.secure_url) {
        throw new Error("Error uploading profile picture to Cloudinary");
      }

      // New profile picture successfully uploaded
      profilePictureUrl = cloudinaryResult.secure_url;

      // Delete the old profile picture from Cloudinary (if it exists)
      if (user.profilePicture) {
        const deleteResponse = await deleteImageBySecureUrl(user.profilePicture);
        console.log("Old profile picture deleted:", deleteResponse);
      }
    }

    // Update the user's fields only if new data is provided
    user.fullName = fullName || user.fullName;
    user.bio = bio || user.bio;
    user.profilePicture = profilePictureUrl || user.profilePicture;
    if (socialMedia) {
      user.socialMedia = {
        ...user.socialMedia,
        ...socialMedia, // Merge new social media data with existing data
      };
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error in updateProfile:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Error updating profile",
    });
  } finally {
    // Cleanup: Delete the temporary file if it exists
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
  }
};

// Delete profile
export const deleteProfile = async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Validate the password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    // Store the profile picture URL for deletion after successful account deletion
    const profilePictureUrl = user.profilePicture;

    // Delete the user
    await User.findByIdAndDelete(userId);
   
    // Clear the authentication cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    // Remove the profile picture from Cloudinary if it exists
    if (profilePictureUrl) {
      const deleteResponse = await deleteImageBySecureUrl(profilePictureUrl);
      console.log("Profile picture deleted from Cloudinary:", deleteResponse);
    }

    // Send success response
    res
      .status(200)
      .json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProfile:", error);
    res.status(500).json({ success: false, message: "Error deleting profile" });
  }
};

export const getAllUsers = async (req, res) => {
  const { userId } = req.query; // Fetch userId from the query string
  console.log(userId);

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const loggedInUser = userId;

    const users = await User.find({ _id: { $ne: loggedInUser } });
    console.log(users);

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ success: false, message: "Error getting users" });
  }
};
