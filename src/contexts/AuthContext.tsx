import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (name: string, email: string) => Promise<void>;
  makeOrder: (orderData: any) => Promise<any>;
  getOrders: () => Promise<any[]>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          // Verify token validity if needed
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Failed to initialize auth", err);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data;

      // Store token in httpOnly cookie or localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      // Set authorization header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      console.error("Login failed:", errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      setError(errorMessage);
      console.error("Registration failed:", errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const updateProfile = async (
    name: string,
    email: string,
    phone?: string,
    address?: string
  ) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/users/me`,
        {
          name,
          email,
          phone,
          address,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Update failed";
      setError(errorMessage);
      console.error("Profile update failed:", errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  interface OrderData {
    user: string;
    items: {
      image: string;
      name: string;
      price: number;
      quantity: number;
    }[];
    total: number;
    subTotal: number;
    tax: number;
    paymentMethod: string;
  }

  const makeOrder = async (orderData: OrderData) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Order failed";
      setError(errorMessage);
      console.error("Order creation failed:", errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrders = async () => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch orders";
      setError(errorMessage);
      console.error("Order fetching failed:", errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        register,
        logout,
        makeOrder,
        updateProfile,
        clearError,
        getOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
