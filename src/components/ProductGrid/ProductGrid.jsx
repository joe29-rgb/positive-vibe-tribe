import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard.jsx';

const GridContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 20px;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 60px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background: ${(p) => (p.$active ? '#c8102e' : 'transparent')};
  color: ${(p) => (p.$active ? '#ffffff' : '#2c1810')};
  border: 2px solid #c8102e;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    background: #c8102e;
    color: #ffffff;
  }
`;

const CardGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 40px;
`;

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filterProducts = (category) => {
    setActiveFilter(category);
    setFiltered(category === 'all' ? products : products.filter((p) => p.category === category));
  };

  const categories = ['all', 'tops', 'bottoms', 'accessories', 'outerwear'];

  if (loading) return <div>Loading products...</div>;

  return (
    <GridContainer>
      <FilterBar>
        {categories.map((cat) => (
          <FilterButton key={cat} $active={activeFilter === cat} onClick={() => filterProducts(cat)}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </FilterButton>
        ))}
      </FilterBar>

      <AnimatePresence>
        <CardGrid layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.2 }}>
          {filtered.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </CardGrid>
      </AnimatePresence>
    </GridContainer>
  );
}

export default ProductGrid; 