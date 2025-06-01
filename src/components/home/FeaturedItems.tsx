import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for featured items
const featuredItems = [
  {
    _id: '1',
    name: 'Chicken Biryani',
    description: 'Chicken biryani is a flavorful and aromatic rice dish made with marinated chicken.',
    price: 150,
    image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg',
    category: 'Main Course'
  },
  {
    _id: '2',
    name: 'Chicken Noodles',
    description: 'Chicken Noodles is a tasty dish made with noodles, chicken,vegetables in flavorful sauces.',
    price: 90,
    image: 'https://www.easycookingwithmolly.com/wp-content/uploads/2017/01/how-to-make-chicken-lo-mein-recipe.jpg',
    category: 'Main Course'
  },
  {
    _id: '3',
    name: 'Kachori',
    description: 'Kachori is a deep-fried snack filled with a potato mixture, popular in Indian cuisine.',
    price: 30,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rajasthani_Raj_Kachori.jpg/800px-Rajasthani_Raj_Kachori.jpg',
    category: 'Pasta'
  }
];

const FeaturedItems: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {featuredItems.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="card group"
        >
          <div className="relative overflow-hidden h-60">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-0 left-0 bg-accent-500 text-gray-900 font-medium text-sm py-1 px-3 rounded-br-lg">
              {item.category}
            </div>
          </div>
          
          <div className="p-5">
            <h3 className="text-xl font-serif font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-primary-500 font-bold text-lg">₹{item.price.toFixed(2)}</span>
              <Link 
                to={`/menu/${item._id}`}
                className="btn btn-outline text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FeaturedItems;