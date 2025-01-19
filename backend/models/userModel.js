import mongoose from "mongoose";

// Regular expression for validating social media URLs
const socialMediaUrlRegex = {
  instagram: /^https:\/\/(www\.)?instagram\.com(\/.*)?$/,
  linkedin: /^https:\/\/(www\.)?linkedin\.com(\/.*)?$/,
  github: /^https:\/\/(www\.)?github\.com(\/.*)?$/,
  x: /^https:\/\/(www\.)?x\.com(\/.*)?$/,
};

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      unique: true, 
      required: true, 
    },
    bio: {
      type: String,
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
      instagram: {
        type: String,
        trim: true, 
        match: [socialMediaUrlRegex.instagram, 'Please enter a valid Instagram URL'],
        default: 'https://instagram.com/',
      },
      linkedin: {
        type: String,
        trim: true,
        match: [socialMediaUrlRegex.linkedin, 'Please enter a valid LinkedIn URL'],
        default: 'https://linkedin.com/',
      },
      github: {
        type: String,
        trim: true,
        match: [socialMediaUrlRegex.github, 'Please enter a valid GitHub URL'],
        default: 'https://github.com/',
      },
      twitter : {
        type: String,
        trim: true,
        match: [socialMediaUrlRegex.x, 'Please enter a valid X.com (formerly Twitter) URL'],
        default: 'https://x.com/',
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
    isProfileComplete: {
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
