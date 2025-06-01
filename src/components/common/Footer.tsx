import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-white mb-4">Quick Service Automation</h3>
            <p className="text-gray-400 mb-4">
              Fine dining experience with a modern twist. Serving the finest ingredients with passion since 2008.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span>ACE ENGINEERING COLLEGE, Ankushapur, Ghatkesar, Telangana 501301</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span>+91 74XXXXXXXX </span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span>info@acecanteen.com</span>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-white mb-4">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Clock size={20} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Monday - Saturday</p>
                  <p className="text-gray-400">10:00 AM - 4:40 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock size={20} className="mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium"> Sunday</p>
                  <p className="text-gray-400">10:00 AM - 11:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-white transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-white transition-colors">Order Status</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">My Account</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Bistro Elegance. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;