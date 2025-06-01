import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import FeaturedItems from '../components/home/FeaturedItems';
import AboutSection from '../components/home/AboutSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Signature Dishes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Indulge in our chef's selection of exquisite dishes, crafted with the finest ingredients and culinary expertise.
            </p>
          </div>
          
          <FeaturedItems />
          
          <div className="text-center mt-12">
            <Link 
              to="/menu" 
              className="btn btn-primary inline-flex items-center"
            >
              View Full Menu
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      <AboutSection />
      
      <TestimonialsSection />
      
      <section className="py-16 bg-primary-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Ready to Order?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Experience the finest dining from the comfort of your home. Our online ordering system makes it easy to enjoy our culinary creations.
          </p>
          <Link to="/menu" className="btn bg-white text-primary-500 hover:bg-gray-100 inline-flex items-center">
            Order Now
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;