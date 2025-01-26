import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Ensures HTTPS URLs
});

// Upload a file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Ensure the URL is secure (HTTPS)
    if (!response.secure_url) {
      throw new Error("Cloudinary did not return a secure URL");
    }

    console.log("File uploaded to Cloudinary:");

    // Delete the local file after upload
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // Delete the local file if the upload fails
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Error uploading to Cloudinary:", error.message);
    return null;
  }
};

// Extract the public ID from the secure_url
const extractPublicId = (secureUrl) => {
  const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i;
  const match = secureUrl.match(regex);
  return match ? match[1] : null;
};

// Delete an image from Cloudinary using secure_url
const deleteImageBySecureUrl = async (secureUrl) => {
  try {
    const publicId = extractPublicId(secureUrl);
    if (!publicId) {
      throw new Error("Failed to extract public ID from the URL.");
    }

    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted successfully:");
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error.message);
    return null;
  }
};

export { uploadOnCloudinary, deleteImageBySecureUrl };
