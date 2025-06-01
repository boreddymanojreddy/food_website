import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, Star } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
  allergens: string[];
  preparationTime: string;
}

interface MenuItemsProps {
  items: MenuItem[];
}

const MenuItems: React.FC<MenuItemsProps> = ({ items }) => {
  const { addToCart } = useCart();
  
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      layout
    >
      <AnimatePresence mode="popLayout">
        {items.map((menuItem) => (
          <motion.div
            key={menuItem._id}
            className="card group"
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative overflow-hidden h-60">
              <motion.img 
                src={menuItem.image} 
                alt={menuItem.name}
                className="w-full h-full object-cover"
                layoutId={`image-${menuItem._id}`}
                transition={{ duration: 0.3 }}
              />
              
              {menuItem.popular && (
                <motion.div 
                  className="absolute top-0 left-0 bg-accent-500 text-gray-900 font-medium text-sm py-1 px-3 rounded-br-lg flex items-center"
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Star size={14} className="mr-1 fill-gray-900" />
                  Popular
                </motion.div>
              )}
              
              <motion.div 
                className="absolute top-0 right-0 bg-white bg-opacity-90 text-gray-800 font-medium text-sm py-1 px-3 rounded-bl-lg flex items-center"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Clock size={14} className="mr-1" />
                {menuItem.preparationTime}
              </motion.div>
            </div>
            
            <motion.div 
              className="p-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-serif font-semibold">{menuItem.name}</h3>
                <span className="text-primary-500 font-bold">₹{menuItem.price.toFixed(2)}</span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{menuItem.description}</p>
              
              {menuItem.allergens.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Allergens:</p>
                  <div className="flex flex-wrap gap-1">
                    {menuItem.allergens.map((allergen) => (
                      <span 
                        key={allergen} 
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-auto">
                <Link 
                  to={`/menu/${menuItem._id}`}
                  className="text-primary-500 font-medium hover:text-primary-600 transition-colors"
                >
                  View Details
                </Link>
                
                <motion.button 
                  className="btn btn-primary flex items-center text-sm py-1.5"
                  onClick={() => addToCart({
                    _id: menuItem._id,
                    name: menuItem.name,
                    price: menuItem.price,
                    image: menuItem.image
                  }, 1)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={16} className="mr-1" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default MenuItems;