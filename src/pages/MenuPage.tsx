/* import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MenuItems from '../components/menu/MenuItems';
import CategoryFilter from '../components/menu/CategoryFilter';
import SearchBar from '../components/menu/SearchBar';

// Mock categories
const categories = [
  'All',
  'Starters',
  'Main Course',
  'Snacks', 
  'Drinks',
  'Icecream',
  'cake',
  'Beverages'
];

// Mock menu items
import { menuItems } from '../data/menuItems';

const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [isFiltering, setIsFiltering] = useState(false);

  // Filter items based on category and search
  useEffect(() => {
    setIsFiltering(true);
    
    const filterItems = () => {
      let filtered = menuItems;
      
      // Filter by category
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(item => item.category === selectedCategory);
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        );
      }
      
      setFilteredItems(filtered);
      setIsFiltering(false);
    };

    // Add a small delay to make the filtering animation more noticeable
    const timeoutId = setTimeout(filterItems, 300);
    return () => clearTimeout(timeoutId);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Menu</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our carefully crafted menu featuring the finest ingredients and culinary excellence. Each dish tells a story of passion and tradition.
          </p>
        </motion.div>
        
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <CategoryFilter 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
        </div>
        
        {isFiltering ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MenuItems items={filteredItems} />
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-500 text-lg mb-4">No items found matching your criteria.</p>
            <button 
              className="btn btn-outline"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;