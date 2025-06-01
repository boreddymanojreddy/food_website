import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const CartPage: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    updateSpecialInstructions,
    cartTotal,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-24 pb-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-3xl font-serif font-bold mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/menu" className="btn btn-primary">
              Browse Our Menu
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">
              Your Cart
            </h1>
            <Link
              to="/menu"
              className="text-primary-500 hover:text-primary-600 font-medium flex items-center"
            >
              <ChevronLeft size={20} className="mr-1" />
              Continue Shopping
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div
              className="lg:col-span-2"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  variants={item}
                  className="card p-4 md:p-6 mb-4 flex flex-col md:flex-row"
                >
                  <div className="w-full md:w-24 h-24 mb-4 md:mb-0 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-grow md:ml-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-primary-500 font-bold">
                          ₹{item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center mt-4 md:mt-0">
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                        >
                          <Plus size={16} />
                        </button>

                        <span className="ml-6 font-bold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>

                        <button
                          className="ml-4 text-gray-400 hover:text-error-500"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="text-sm text-gray-600 mb-1 block">
                        Special Instructions
                      </label>
                      <textarea
                        className="input text-sm h-20"
                        value={item.specialInstructions || ""}
                        onChange={(e) =>
                          updateSpecialInstructions(item._id, e.target.value)
                        }
                        placeholder="Any special requests for this item?"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="card p-6 sticky top-24">
                <h2 className="text-xl font-serif font-bold mb-4">
                  Order Summary
                </h2>

                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">₹00.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      ₹{(cartTotal * 0.08).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg">
                    ₹{(cartTotal + 0.0 + cartTotal * 0.08).toFixed(2)}
                  </span>
                </div>

                <button
                  className="btn btn-primary w-full flex items-center justify-center"
                  onClick={() => {
                    if (isAuthenticated) {
                      navigate("/checkout");
                    } else {
                      navigate("/login", {
                        state: { redirectTo: "/checkout" },
                      });
                    }
                  }}
                >
                  Proceed to Checkout
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
