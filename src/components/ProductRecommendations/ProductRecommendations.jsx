import React, { useEffect, useState } from 'react';
import ProductGrid from '../ProductGrid/ProductGrid.jsx';

function ProductRecommendations({ currentId, category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        const recs = data.filter((p) => p._id !== currentId && p.category === category).slice(0, 4);
        setProducts(recs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentId, category]);

  if (loading || products.length === 0) return null;

  return (
    <section style={{ margin: '80px 0' }}>
      <h2 style={{ fontFamily: 'UnifrakturCook,cursive', fontSize: 'var(--fs-2xl)', textAlign: 'center', marginBottom: 32 }}>You may also like</h2>
      <ProductGrid products={products} />
    </section>
  );
}

export default ProductRecommendations; 