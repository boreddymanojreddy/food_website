import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', 
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="container-custom relative z-10 text-white pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 leading-tight">
            Exquisite Dining <br />Delivered to You
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200">
            Experience fine dining in the comfort of your own home with our gourmet menu and seamless service.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/menu" 
              className="btn bg-primary-500 hover:bg-primary-600 text-white border border-primary-500 hover:border-primary-600"
            >
              View Our Menu
            </Link>
            <Link 
              to="/register" 
              className="btn bg-transparent hover:bg-white/10 text-white border border-white"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;