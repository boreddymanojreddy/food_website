import React from 'react';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="w-full md:w-auto overflow-x-auto pb-2">
      <motion.div 
        className="flex space-x-2 min-w-max"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
              selectedCategory === category
                ? 'text-white'
                : 'text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => onSelectCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
            {selectedCategory === category && (
              <motion.div
                layoutId="categoryBackground"
                className="absolute inset-0 bg-primary-500 rounded-full -z-10"
                initial={false}
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoryFilter;