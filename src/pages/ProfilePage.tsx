import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, updateProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { redirectTo: "/profile" } });
    }
  }, [isAuthenticated, navigate]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would send this data to your backend
    updateProfile(formData.name, formData.email)
      .then(() => {
        setSuccess("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        setSuccess("Failed to update profile. Please try again.");
      });

    setSuccess("Profile updated successfully!");
    setIsEditing(false);

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif font-bold">
              My Profile
            </h1>

            {!isEditing ? (
              <button
                className="btn btn-outline flex items-center"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 size={18} className="mr-2" />
                Edit Profile
              </button>
            ) : (
              <button
                className="btn btn-primary flex items-center"
                onClick={handleSubmit}
              >
                <Save size={18} className="mr-2" />
                Save Changes
              </button>
            )}
          </div>

          {success && (
            <div className="bg-success-50 text-success-500 p-3 rounded-md flex items-start mb-6">
              <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}

          <div className="card p-6 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input pl-10"
                        required
                      />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <User size={18} className="mr-2 text-gray-400" />
                      <span className="font-medium">{formData.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Email Address
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input pl-10"
                        required
                      />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Mail size={18} className="mr-2 text-gray-400" />
                      <span className="font-medium">{formData.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input pl-10"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Phone size={18} className="mr-2 text-gray-400" />
                      <span className="font-medium">
                        {formData.phone || "Not provided"}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Default Delivery Address
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input pl-10"
                        placeholder="Your delivery address"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <MapPin size={18} className="mr-2 text-gray-400" />
                      <span className="font-medium">
                        {formData.address || "Not provided"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-serif font-semibold mb-4">
              Account Preferences
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive updates about your orders and promotions
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">
                    Receive text messages about your order status
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Save Payment Information</h3>
                  <p className="text-sm text-gray-500">
                    Securely save cards for faster checkout
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
