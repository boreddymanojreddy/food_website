import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizers', 'Main Course', 'Seafood', 'Pasta', 'Vegetarian', 'Desserts', 'Beverages']
  },
  popular: {
    type: Boolean,
    default: false
  },
  allergens: {
    type: [String],
    default: []
  },
  preparationTime: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;