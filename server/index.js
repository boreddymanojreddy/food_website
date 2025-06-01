import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-db-name';

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

// Define schemas
// In a real app, these would be in separate files

// User schema
const userSchema = {
  name: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  createdAt: Date
};

// MenuItem schema
const menuItemSchema = {
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  popular: Boolean,
  allergens: [String],
  preparationTime: String
};

// Order schema
const orderSchema = {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: Number,
    price: Number,
    specialInstructions: String
  }],
  total: Number,
  status: String,
  deliveryAddress: String,
  paymentMethod: String,
  createdAt: Date
};

// Mock data and functions for demo purposes
const users = [
  {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
    phone: '(123) 456-7890',
    address: '123 Main St, New York, NY 10001',
    createdAt: new Date()
  }
];

const menuItems = [
  // This would use the data from src/data/menuItems.ts in a real app
];

const orders = [
  // Mock orders
];

// Authentication middleware
const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // In a real app, verify the token with JWT
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded;
    
    // For demo purposes
    req.user = { _id: '1' };
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// API Routes

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      _id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    // In a real app, save to database
    users.push(newUser);
    
    // Generate JWT token
    const token = jwt.sign({ _id: newUser._id }, 'your_jwt_secret', { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(user => user.email === email);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, 'your_jwt_secret', { expiresIn: '7d' });
    
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// User routes
app.get('/api/users/me', auth, async (req, res) => {
  try {
    const user = users.find(user => user._id === req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't send password
    const { password, ...userData } = user;
    
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/users/me', auth, async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    
    const userIndex = users.findIndex(user => user._id === req.user._id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email,
      phone: phone || users[userIndex].phone,
      address: address || users[userIndex].address
    };
    
    // Don't send password
    const { password, ...userData } = users[userIndex];
    
    res.json(userData);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Menu routes
app.get('/api/menu', async (req, res) => {
  try {
    // In a real app, fetch from database
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/menu/:id', async (req, res) => {
  try {
    const menuItem = menuItems.find(item => item._id === req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Order routes
app.post('/api/orders', auth, async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod, total } = req.body;
    
    // Create new order
    const newOrder = {
      _id: Date.now().toString(),
      user: req.user._id,
      items,
      total,
      status: 'Pending',
      deliveryAddress,
      paymentMethod,
      createdAt: new Date()
    };
    
    // In a real app, save to database
    orders.push(newOrder);
    
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/orders', auth, async (req, res) => {
  try {
    // Get user's orders
    const userOrders = orders.filter(order => order.user === req.user._id);
    
    res.json(userOrders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/orders/:id', auth, async (req, res) => {
  try {
    const order = orders.find(order => order._id === req.params.id && order.user === req.user._id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  // Connect to MongoDB
  // await connectDB();
  console.log(`Server running on port ${PORT}`);
});