import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductCard from '../ProductGrid/ProductCard';
import { motion } from 'framer-motion';

/* -------------------------------------------------------------------------
   Styled Components
---------------------------------------------------------------------------*/
const Section = styled.section`
  background: #faf7f3;
  padding: 60px 20px 80px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 2.25rem;
  margin-bottom: 32px;
  font-family: 'UnifrakturCook', cursive;
  color: var(--dark-brown);
  text-align: center;
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
`;

const FilterButton = styled.button`
  background: ${(p) => (p.active ? 'var(--primary-red)' : '#fff')};
  color: ${(p) => (p.active ? '#fff' : 'var(--dark-brown)')};
  border: 1px solid var(--primary-red);
  padding: 8px 18px;
  font-size: 0.875rem;
  border-radius: var(--border-radius-pill);
  cursor: pointer;
  transition: background 0.25s, color 0.25s;
  &:hover {
    background: var(--primary-red);
    color: #fff;
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  gap: 24px;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));

  /* Enlarge first and every 7th card for visual rhythm */
  & > :nth-child(7n + 1) {
    grid-column: span 2;
  }

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 16px;
    padding-bottom: 8px;
    &::-webkit-scrollbar {
      display: none;
    }
    & > * {
      flex: 0 0 70%;
      scroll-snap-align: start;
    }
  }
`;

function BestsellerShowcase({ tag = 'bestseller', limit = 8, categories = [] }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    axios
      .get(`/api/products?tag=${tag}&limit=${limit}`)
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, [tag, limit]);

  const displayed = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  if (!products.length) return null;

  // Build category list from products if not provided
  const derivedCats = Array.from(new Set(products.map((p) => p.category))).slice(0, 6);
  const pills = ['All', ...categories, ...derivedCats].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <Section>
      <Container>
        <Heading>Bestsellers</Heading>
        <FilterRow>
          {pills.map((cat) => (
            <FilterButton key={cat} active={cat === activeCategory} onClick={() => setActiveCategory(cat)}>
              {cat}
            </FilterButton>
          ))}
        </FilterRow>
        <Grid drag="x" dragConstraints={{ left: 0, right: 0 }}>
          {displayed.map((prod, idx) => (
            <ProductCard key={prod._id} product={prod} index={idx} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default BestsellerShowcase; 