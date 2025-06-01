import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Menu as MenuIcon, ShoppingCart, User, Clock, CalendarDays } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-serif text-xl font-bold text-primary-500">Quick Service Automation</span>
              <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="py-2">
                <Link 
                  to="/" 
                  className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <Home size={20} className="mr-3" />
                  <span>Home</span>
                </Link>
                
                <Link 
                  to="/menu" 
                  className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <MenuIcon size={20} className="mr-3" />
                  <span>Menu</span>
                </Link>
                
                <Link 
                  to="/reservation" 
                  className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <CalendarDays size={20} className="mr-3" />
                  <span>Reserve Table</span>
                </Link>
                
                <Link 
                  to="/cart" 
                  className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <ShoppingCart size={20} className="mr-3" />
                  <span>Cart</span>
                </Link>
                
                <Link 
                  to="/orders" 
                  className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                  onClick={onClose}
                >
                  <Clock size={20} className="mr-3" />
                  <span>Orders</span>
                </Link>
              </div>
              
              <div className="border-t py-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="font-medium text-gray-800">{user?.name}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="flex items-center px-4 py-3 text-gray-800 hover:bg-gray-100"
                      onClick={onClose}
                    >
                      <User size={20} className="mr-3" />
                      <span>Profile</span>
                    </Link>
                    <button 
                      className="flex items-center w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-100"
                      onClick={() => {
                        logout();
                        onClose();
                      }}
                    >
                      <span>Sign out</span>
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-3 space-y-2">
                    <Link 
                      to="/login" 
                      className="btn btn-primary w-full justify-center"
                      onClick={onClose}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      className="btn btn-outline w-full justify-center"
                      onClick={onClose}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;