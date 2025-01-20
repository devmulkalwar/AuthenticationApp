import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Ensures HTTPS URLs
});

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

    console.log("File uploaded to Cloudinary:", response.secure_url);

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

export { uploadOnCloudinary };