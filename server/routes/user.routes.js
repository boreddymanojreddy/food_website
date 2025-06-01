import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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

// Auth routes
router.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists (using Mongoose model)
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user (Mongoose will handle password hashing via the pre-save hook)
    const newUser = new User({
      name,
      email,
      password, // The pre-save hook will hash this automatically
    });

    // Save to database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { _id: newUser._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user in database
    const user = await User.findOne({ email }).select("+password"); // Include password field

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" }); // 401 for unauthorized
    }

    // 2. Check password using the method from your User model
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "7d" }
    );

    // 4. Return user data (excluding password)
    res.json({
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// User routes
router.get("/users/me", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    // convert userId object to string if necessary
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId)
      .select("-password -__v")
      .lean()
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Don't send password
    const { password, ...userData } = user;

    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/users/me", auth, async (req, res) => {
  try {
    // 1. Validate input
    const { name, email, phone, address } = req.body;
    console.log("Update data received:", req.body);

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
        fields: { name: !!name, email: !!email },
      });
    }

    // 2. Prepare update data
    const updateData = {
      name,
      email,
      ...(phone && { phone }),
      ...(address && { address }),
    };

    // 3. Perform update
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    }).select("-password -__v");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4. Return response
    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update error details:", error);

    // Handle duplicate email
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already in use",
        field: "email",
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.entries(error.errors).reduce((acc, [key, val]) => {
        acc[key] = val.message;
        return acc;
      }, {});

      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    res.status(500).json({
      message: "Update failed",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
});

export default router;
