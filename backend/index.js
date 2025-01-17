import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnection.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();

// Middleware

// Enable CORS with credentials to allow cookies to be sent and received
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true,               // Allow cookies
}));

app.use(express.json()); // To parse JSON requests
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data (like form-data)
app.use(cookieParser()); // To parse cookies in incoming requests

// Routes
app.use("/api/auth", authRoutes); // All authentication-related routes

// Error handling (optional, but recommended for debugging)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    status: "error",
    message: "Something went wrong! Please try again later.",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
