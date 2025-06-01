import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import MobileMenu from '../components/common/MobileMenu';

const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;