import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Import routes using ES Modules
import userRoutes from "./routes/user.routes.js"; // Note: Must include file extension
import menuRoutes from "./routes/menu.routes.js";
import orderRoutes from "./routes/order.routes.js";

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1); // Exit the process to avoid running in an unstable state
});

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection (same as before)
const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/your-db-name";

    const conn = await mongoose.connect(mongoURI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Routes (now using imported modules)
app.use("/api", userRoutes);
app.use("/api", menuRoutes);
app.use("/api", orderRoutes);

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  server.close(() => {
    process.exit(1); // Exit the process to avoid running in an unstable state
  });
});
