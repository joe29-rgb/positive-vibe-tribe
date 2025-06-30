import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ProductGrid from '../components/ProductGrid/ProductGrid.jsx';
import { Helmet } from 'react-helmet-async';

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('wishlist') || '[]' : '[]');
    if (stored.length === 0) {
      setLoading(false);
      return;
    }
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const list = data.filter((p) => stored.includes(p._id));
        setProducts(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading your wishlist…</div>;
  }

  if (products.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Your wishlist is empty.</p>
        <a href="/products" className="cart-btn">Continue Shopping</a>
      </div>
    );
  }

  return (
    <Wrapper>
      <Helmet>
        <title>Your Wishlist | Positive Vibe Tribe</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Breadcrumbs items={[{ label: 'Home', url: '/' }, { label: 'Wishlist' }]} />
      <h1 style={{ marginBottom: '24px' }}>Your Wishlist</h1>
      <ProductGrid products={products} />
    </Wrapper>
  );
}

export default Wishlist; 