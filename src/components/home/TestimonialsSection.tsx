import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Enthusiast',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'The flavors were absolutely incredible. I ordered the Chicken Biryani and it was cooked to perfection. The Service was prompt and the food arrived hot. Definitely my new favorite restaurant for special occasions!',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Regular Customer',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: "I've been ordering from Quick Service Automation for the past few months. Their attention to detail and consistency is remarkable. The online ordering system is smooth and user-friendly. Highly recommended.!",
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Culinary Blogger',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    text: 'As someone who writes about food for a living, I\'m incredibly impressed with Quick Service Automation. Their commitment to quality ingredients shines through in every dish. The Kachori is a masterpiece of flavor and texture.',
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our satisfied customers about their dining experiences with Quick Service Automation.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-accent-500 text-accent-500" />
                ))}
              </div>
              
              <p className="text-gray-700 italic mb-6">"{testimonials[currentIndex].text}"</p>
              
              <h4 className="font-serif font-semibold text-lg">{testimonials[currentIndex].name}</h4>
              <p className="text-gray-500 text-sm">{testimonials[currentIndex].role}</p>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Buttons */}
          <button 
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none"
            onClick={prevTestimonial}
          >
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          
          <button 
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none"
            onClick={nextTestimonial}
          >
            <ChevronRight size={24} className="text-gray-700" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;