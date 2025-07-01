import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Analytics from './components/Analytics/Analytics.jsx';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MobileNav from './components/MobileNav/MobileNav.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import useScrollReveal from './utils/useScrollReveal';
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home/Home'));
const Products = lazy(() => import('./pages/Products/Products.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail.jsx'));
const Cart = lazy(() => import('./pages/Cart/Cart.jsx'));
const Checkout = lazy(() => import('./pages/Checkout/Checkout.jsx'));
const CheckoutSuccess = lazy(() => import('./pages/Checkout/Success.jsx'));
const CheckoutCancel = lazy(() => import('./pages/Checkout/Cancel.jsx'));
const Wishlist = lazy(() => import('./pages/Wishlist.jsx'));
const About = lazy(() => import('./pages/About/About'));

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
        <Route path="/checkout/success" element={<motion.div {...pageVariants}><CheckoutSuccess /></motion.div>} />
        <Route path="/checkout/cancel" element={<motion.div {...pageVariants}><CheckoutCancel /></motion.div>} />
        <Route path="/wishlist" element={<motion.div {...pageVariants}><Wishlist /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useScrollReveal();
  return (
    <Provider store={store}>
      <HelmetProvider>
        <Analytics />
        <Helmet>
          <meta name="description" content="Positive Vibe Tribe – Indigenous-inspired streetwear spreading positivity." />
          <meta property="og:site_name" content="Positive Vibe Tribe" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/assets/og-share-1200x630.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="/assets/og-share-1200x630.png" />
          <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Positive Vibe Tribe',
            url: typeof window !== 'undefined' ? window.location.origin : 'https://positivevibetribe.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${typeof window!=='undefined'?window.location.origin:'https://positivevibetribe.com'}/products?search={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          })}</script>
        </Helmet>
        <Router>
          <a href="#main" className="skip-link">Skip to main content</a>
          <div id="sr-announcer" aria-live="polite" style={{position:'absolute',left:'-9999px',height:'1px',width:'1px',overflow:'hidden'}} />
          <Header />
          <React.Suspense fallback={<div style={{padding:'80px',textAlign:'center'}}>Loading…</div>}>
            <AnimatedRoutes />
          </React.Suspense>
          <MobileNav />
          <Footer />
          <ToastContainer role="status" position="top-right" autoClose={3000} hideProgressBar theme="colored" />
        </Router>
      </HelmetProvider>
    </Provider>
  );
}

export default App; 