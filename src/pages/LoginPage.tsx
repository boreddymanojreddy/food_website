import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      
      // Redirect to the page user was trying to access, or to home
      const redirectTo = location.state?.redirectTo || '/';
      navigate(redirectTo);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
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
            <h1 className="text-3xl font-serif font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>
          
          {error && (
            <div className="bg-error-50 text-error-500 p-3 rounded-md flex items-start mb-6">
              <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
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
            
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-primary-500 hover:text-primary-600">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            
            <button
              type="submit"
              className={`btn btn-primary w-full py-2.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Signing In...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-500 hover:text-primary-600 font-medium">
                Create an Account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;