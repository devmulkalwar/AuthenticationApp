import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true, 
      required: true, 
    },
    password: {
      type: String,
      required: true, 
    },
    profilePicture: {
      type: String,
      default: "https://via.placeholder.com/150", 
    },
    socialMedia: {
      twitter: {
        type: String,
        trim: true, 
      },
      linkedin: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
      instagram: {
        type: String,
        trim: true,
      },
    },
    lastLogin: {
      type: Date,
      default: Date.now, 
    },
    isVerified: {
      type: Boolean,
      default: false, 
    },
    resetPasswordToken: String, 
    resetPasswordExpiresAt: Date, 
    verificationToken: String,
    verificationTokenExpiresAt: Date, 
  },
  { timestamps: true } 
);

// Create the User model
export const User = mongoose.model("User", userSchema);