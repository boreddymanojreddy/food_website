import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Culinary Story</h2>
            <div className="h-1 w-20 bg-primary-500 mb-6"></div>
            <p className="text-gray-600 mb-4">
             Quick service automation is rooted in a passion for great food and a vision to serve it smarter and faster.
            </p>
            <p className="text-gray-600 mb-4">
              By combining the art of cooking with the power of quick service, we’ve transformed how meals are prepared and delivered—without compromising on taste, quality, or freshness. 
            </p>
            <p className="text-gray-600">
              Whether it’s a busy lunch rush , we make sure every order is fast, flavorful, and flawlessly executed.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Restaurant interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg mt-8">
              <img 
                src="https://images.pexels.com/photos/3184188/pexels-photo-3184188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Chef preparing food"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.pexels.com/photos/2403391/pexels-photo-2403391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Fresh ingredients"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg mt-8">
              <img 
                src="https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Elegant plating"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;