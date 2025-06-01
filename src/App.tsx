import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import FoodDetailPage from './pages/FoodDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ReservationPage from './pages/ReservationPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="menu/:id" element={<FoodDetailPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="orders" element={<OrderHistoryPage />} />
              <Route path="reservation" element={<ReservationPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App