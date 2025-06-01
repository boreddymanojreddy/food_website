import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Plus, Minus, Clock, Info, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { menuItems } from '../data/menuItems';

const FoodDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [foodItem, setFoodItem] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const item = menuItems.find(item => item._id === id);
    if (item) {
      setFoodItem(item);
    } else {
      navigate('/menu');
    }
  }, [id, navigate]);
  
  if (!foodItem) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
          <p>Loading item details...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      _id: foodItem._id,
      name: foodItem.name,
      price: foodItem.price,
      image: foodItem.image,
      specialInstructions
    }, quantity);
    
    // Show success message (in a real app, you might use a toast notification)
    alert(`${quantity} ${foodItem.name} added to cart!`);
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <button 
          onClick={() => navigate('/menu')} 
          className="flex items-center text-gray-600 hover:text-primary-500 transition-colors mb-6"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Menu
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Food Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <img 
              src={foodItem.image} 
              alt={foodItem.name}
              className="w-full h-[400px] lg:h-[500px] object-cover"
            />
          </motion.div>
          
          {/* Food Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="bg-accent-500 text-gray-900 font-medium text-sm py-1 px-3 rounded">
                  {foodItem.category}
                </span>
                <div className="flex items-center ml-4 text-gray-600">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">{foodItem.preparationTime}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{foodItem.name}</h1>
              <p className="text-2xl text-primary-500 font-semibold mb-4">₹{foodItem.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-6">{foodItem.description}</p>
            </div>
            
            {foodItem.allergens.length > 0 && (
              <div className="mb-6">
                <div className="flex items-start">
                  <Info size={18} className="text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Allergens:</p>
                    <div className="flex flex-wrap gap-2">
                      {foodItem.allergens.map((allergen: string) => (
                        <span 
                          key={allergen} 
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="specialInstructions" className="block font-medium mb-2">
                Special Instructions (optional)
              </label>
              <textarea
                id="specialInstructions"
                className="input min-h-[80px] resize-none"
                placeholder="Any special requests for this dish?"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
            
            <div className="flex items-center mb-8">
              <span className="font-medium mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button 
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button 
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <button 
              className="btn btn-primary flex items-center justify-center py-3"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={20} className="mr-2" />
              Add to Cart - ₹{(foodItem.price * quantity).toFixed(2)}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;