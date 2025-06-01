import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage on initial load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

   /* const login = async (email: string, password: string) => {
    try {
      // This would be an API call in a real app
      // For the MVP, we'll simulate a successful login
      const mockUser = {
        _id: '1',
        name: 'John Doe',
        email
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // This would be an API call in a real app
      // For the MVP, we'll simulate a successful registration
      const mockUser = {
        _id: '1',
        name,
        email
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }; */
  const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    const user = response.data.user;

    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  } catch (error: any) {
    console.error('Login failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post('/api/auth/register', { name, email, password });
    const user = response.data.user;

    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  } catch (error: any) {
    console.error('Registration failed:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};