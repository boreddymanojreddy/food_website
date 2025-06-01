import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Order from "../models/Order.js";

const router = express.Router();

const auth = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user - ensure you're using Mongoose properly
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(500).json({ message: "Authentication failed" });
  }
};

// Order routes
router.post("/orders", auth, async (req, res) => {
  try {
    const { items, paymentMethod, total, subtotal, tax } = req.body;

    // Create new order
    const newOrder = await Order.create({
      user: req.user._id,
      items,
      paymentMethod,
      total,
      tax,
      subtotal,
      status: "Pending", // Default status
      createdAt: new Date(),
    });

    // In a real app, save to database
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", message: error.message });
  }
});

router.get("/orders", auth, async (req, res) => {
  try {
    // Get user's orders
    const userOrders = await Order.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 }) // Optional: sort by newest first
      .lean();

    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/orders/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
