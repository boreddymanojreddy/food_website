import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Order {
  _id: string;
  orderNumber: string;
  paymentMethod: string;
  subTotal: number;
  tax: number;
  date: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{
    _id: string;
    image: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

const OrderHistoryPage: React.FC = () => {
  const { isAuthenticated, getOrders } = useAuth();
  const [orderData, setOrderData] = useState<Order[]>();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { redirectTo: "/orders" } });
    }
  }, [isAuthenticated, navigate]);

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (!isAuthenticated) {
    return null;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders();
        setOrderData(orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">
            Order History
          </h1>

          {orderData?.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-serif font-bold mb-2">
                No Orders Yet
              </h2>
              <p className="text-gray-600 mb-8">
                You haven't placed any orders with us yet.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/menu")}
              >
                Browse Our Menu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orderData?.map((order: Order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="card overflow-hidden"
                >
                  <div
                    className="p-5 cursor-pointer hover:bg-gray-50 flex flex-col md:flex-row md:items-center justify-between"
                    onClick={() => toggleOrderDetails(order._id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="mb-2 md:mb-0 md:mr-6">
                        <div className="text-sm text-gray-500 mb-1">
                          Order Number
                        </div>
                        <div className="font-medium">{order.orderNumber}</div>
                      </div>

                      <div className="mb-2 md:mb-0 md:mr-6">
                        <div className="text-sm text-gray-500 mb-1">Date</div>
                        <div>{formatDate(order.createdAt)}</div>
                      </div>

                      <div className="mb-2 md:mb-0 md:mr-6">
                        <div className="text-sm text-gray-500 mb-1">Total</div>
                        <div className="font-medium">
                          ₹{order.total.toFixed(2)}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500 mb-1">Status</div>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                          <Clock size={12} className="mr-1" />
                          {order.status}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mt-4 md:mt-0">
                      <button className="text-primary-500 flex items-center">
                        {expandedOrder === order._id ? (
                          <>
                            <span className="mr-1">Hide Details</span>
                            <ChevronUp size={18} />
                          </>
                        ) : (
                          <>
                            <span className="mr-1">View Details</span>
                            <ChevronDown size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {expandedOrder === order._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 p-5"
                    >
                      <div className="mb-4">
                        <h3 className="font-medium text-lg mb-2">
                          Order Items
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Item
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Quantity
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Price
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Total
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {order.items.map((item) => (
                                <tr key={item._id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="font-medium text-gray-900">
                                      {item.name}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {item.quantity}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    ₹{item.price.toFixed(2)}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">Payment Mode</h3>
                          <p className="text-gray-600">
                            {order.paymentMethod === "cash"
                              ? "Cash on Delivery"
                              : "Online Payment"}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Order Summary</h3>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal:</span>
                              <span>
                                ₹
                                {(
                                  order.total -
                                  3.99 -
                                  order.total * 0.08
                                ).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Delivery Fee:
                              </span>
                              <span>₹00.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tax:</span>
                              <span>₹{(order.total * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-medium pt-1 border-t border-gray-200">
                              <span>Total:</span>
                              <span>₹{order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
