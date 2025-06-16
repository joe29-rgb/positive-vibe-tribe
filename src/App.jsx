import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Analytics />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <MobileNav />
          <Footer />
        </Router>
      </HelmetProvider>
    </Provider>
  );
}

export default App; 