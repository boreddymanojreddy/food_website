import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, AlertCircle, CreditCard, Wallet } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

const TAX_RATE = 0.08;

// Payment method options
const paymentMethods = [
  { id: "credit-card", name: "Credit Card", icon: <CreditCard size={20} /> },
  { id: "cash", name: "Cash on Payment", icon: <Wallet size={20} /> },
];

const CheckoutPage: React.FC = () => {
  const { user, makeOrder } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0].id
  );
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: user?.name || "",
    expiryDate: "",
    cvv: "",
  });

  // Calculate totals
  const tax = cartTotal * TAX_RATE;
  const orderTotal = cartTotal + tax;

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    makeOrder({
      userId: user?._id,
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      paymentMethod: selectedPaymentMethod,
      cardDetails: selectedPaymentMethod === "credit-card" ? cardDetails : null,
      total: orderTotal,
      tax,
      subtotal: cartTotal,
    })
      .then(() => {
        console.log("Order placed successfully");
      })
      .catch((error) => {
        console.error("Failed to place order:", error);
      });

    // Clear cart
    clearCart();

    // Navigate to confirmation page
    alert("Your order has been placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Payment Method */}
                <div className="card p-6 mb-6">
                  <h2 className="text-xl font-serif font-bold mb-4">
                    Payment Method
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`border rounded-md p-3 flex items-center cursor-pointer transition-colors ${
                          selectedPaymentMethod === method.id
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={selectedPaymentMethod === method.id}
                          onChange={() => setSelectedPaymentMethod(method.id)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 ${
                            selectedPaymentMethod === method.id
                              ? "border-primary-500 bg-primary-500"
                              : "border-gray-400"
                          }`}
                        >
                          {selectedPaymentMethod === method.id && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                        <span className="flex items-center">
                          {method.icon}
                          <span className="ml-2">{method.name}</span>
                        </span>
                      </label>
                    ))}
                  </div>

                  {selectedPaymentMethod === "credit-card" && (
                    <div className="border border-gray-200 rounded-md p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            htmlFor="cardNumber"
                            className="block text-gray-700 mb-1"
                          >
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleCardChange}
                            className="input"
                            placeholder="XXXX XXXX XXXX XXXX"
                            required={selectedPaymentMethod === "credit-card"}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="cardHolder"
                            className="block text-gray-700 mb-1"
                          >
                            Card Holder
                          </label>
                          <input
                            type="text"
                            id="cardHolder"
                            name="cardHolder"
                            value={cardDetails.cardHolder}
                            onChange={handleCardChange}
                            className="input"
                            required={selectedPaymentMethod === "credit-card"}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="expiryDate"
                            className="block text-gray-700 mb-1"
                          >
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={cardDetails.expiryDate}
                            onChange={handleCardChange}
                            className="input"
                            placeholder="MM/YY"
                            required={selectedPaymentMethod === "credit-card"}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="cvv"
                            className="block text-gray-700 mb-1"
                          >
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                            className="input"
                            placeholder="XXX"
                            required={selectedPaymentMethod === "credit-card"}
                          />
                        </div>
                      </div>

                      <div className="flex items-start mt-4 text-sm text-gray-600">
                        <AlertCircle
                          size={16}
                          className="mt-0.5 mr-2 flex-shrink-0"
                        />
                        <p>
                          For this demo, you can enter any test values. No real
                          payment will be processed.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:hidden">
                  <OrderSummary
                    cartItems={cartItems}
                    cartTotal={cartTotal}
                    tax={tax}
                    orderTotal={orderTotal}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full py-3 text-lg"
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Order Summary (desktop) */}
            <div className="hidden lg:block">
              <OrderSummary
                cartItems={cartItems}
                cartTotal={cartTotal}
                tax={tax}
                orderTotal={orderTotal}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface OrderSummaryProps {
  cartItems: any[];
  cartTotal: number;
  tax: number;
  orderTotal: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  cartTotal,
  tax,
  orderTotal,
}) => {
  return (
    <div className="card p-6 sticky top-24 mb-6">
      <h2 className="text-xl font-serif font-bold mb-4">Order Summary</h2>

      <div className="max-h-60 overflow-y-auto mb-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between py-2 border-b border-gray-100"
          >
            <div className="flex items-center">
              <span className="bg-primary-100 text-primary-800 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                {item.quantity}
              </span>
              <span className="font-medium">{item.name}</span>
            </div>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <span className="font-bold text-lg">Total</span>
        <span className="font-bold text-lg">₹{orderTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CheckoutPage;
