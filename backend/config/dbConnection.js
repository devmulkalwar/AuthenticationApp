// Import mongoose and dotenv in ESM style
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); 
  }
};

// Export the function using ES module syntax
export default connectDB;
