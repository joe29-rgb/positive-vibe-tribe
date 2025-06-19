import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HelmetProvider } from 'react-helmet-async';
import Analytics from './components/Analytics/Analytics.jsx';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MobileNav from './components/MobileNav/MobileNav.jsx';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products.jsx';
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import About from './pages/About/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.25, ease: 'easeIn' } },
  };
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<motion.div {...pageVariants}><Home /></motion.div>}
        />
        <Route path="/products" element={<motion.div {...pageVariants}><Products /></motion.div>} />
        <Route path="/product/:id" element={<motion.div {...pageVariants}><ProductDetail /></motion.div>} />
        <Route path="/about" element={<motion.div {...pageVariants}><About /></motion.div>} />
        <Route path="/cart" element={<motion.div {...pageVariants}><Cart /></motion.div>} />
        <Route path="/checkout" element={<motion.div {...pageVariants}><Checkout /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Analytics />
        <Router>
          <a href="#main" className="skip-link">Skip to main content</a>
          <Header />
          <AnimatedRoutes />
          <MobileNav />
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
        </Router>
      </HelmetProvider>
    </Provider>
  );
}

export default App; 