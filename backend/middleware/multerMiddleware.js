import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; // Import the 'path' module
import fs from 'fs';

// Resolve the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the temporary directory
const tempDir = path.join(__dirname, '../../public/temp');

// Ensure the temporary directory exists
(async () => {
  try {
    await fs.promises.mkdir(tempDir, { recursive: true });
    console.log('Temporary directory ensured.');
  } catch (error) {
    console.error('Error creating temporary directory:', error);
  }
})();

// Define file filter for allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false); // Reject the file
  }
};

// Define storage with sanitized filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now(); // Add a timestamp to make filenames unique
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_'); // Remove special characters
    cb(null, `${timestamp}_${sanitizedFilename}`);
  }
});

// Configure multer with file size limit and file filter
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});
