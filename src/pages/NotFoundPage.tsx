import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-serif font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-3xl font-serif font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link 
          to="/"
          className="btn btn-primary inline-flex items-center"
        >
          <Home size={18} className="mr-2" />
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;