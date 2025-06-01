import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await register(formData.name, formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError("Failed to create an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "" };

    if (password.length < 6) {
      return { strength: 1, label: "Weak" };
    } else if (password.length < 8) {
      return { strength: 2, label: "Medium" };
    } else {
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const score = [hasLowercase, hasUppercase, hasNumber, hasSpecial].filter(
        Boolean
      ).length;

      if (score >= 3) {
        return { strength: 4, label: "Strong" };
      } else {
        return { strength: 3, label: "Good" };
      }
    }
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="pt-24 pb-16 flex justify-center">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold mb-2">
              Create an Account
            </h1>
            <p className="text-gray-600">
              Join Quick Service Automation for a delightful dining experience
            </p>
          </div>

          {error && (
            <div className="bg-error-50 text-error-500 p-3 rounded-md flex items-start mb-6">
              <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                required
              />

              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex space-x-1 flex-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 rounded-full flex-1 ${
                            passwordStrength.strength >= level
                              ? level === 1
                                ? "bg-error-500"
                                : level === 2
                                ? "bg-warning-500"
                                : level === 3
                                ? "bg-accent-500"
                                : "bg-success-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs ml-2 w-12 text-right">
                      {passwordStrength.label}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 flex items-center mt-1">
                    <CheckCircle
                      size={12}
                      className={`mr-1 ${
                        formData.password.length >= 6
                          ? "text-success-500"
                          : "text-gray-300"
                      }`}
                    />
                    <span>At least 6 characters</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input ${
                  formData.confirmPassword &&
                  formData.password !== formData.confirmPassword
                    ? "border-error-500 focus:ring-error-500"
                    : ""
                }`}
                required
              />

              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-error-500 mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full py-2.5 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
