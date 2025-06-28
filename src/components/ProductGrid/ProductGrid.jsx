import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard.jsx';
import { keyframes } from 'styled-components';
import { FixedSizeGrid as WindowGrid } from 'react-window';

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

// Skeleton shimmer
const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonCard = styled.div`
  width: 100%;
  padding-top: 120%;
  border-radius: 16px;
  background: #f6f7f8;
  background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.2s linear infinite;
`;

function ProductGrid({ products: extProducts }) {
  const [products, setProducts] = useState(extProducts || []);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (extProducts) {
      // external data supplied
      setProducts(extProducts);
      setFiltered(extProducts);
      setLoading(false);
      return;
    }
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [extProducts]);

  const filterProducts = (category) => {
    setActiveFilter(category);
    setFiltered(category === 'all' ? products : products.filter((p) => p.category === category));
  };

  const categories = ['all', 'tops', 'bottoms', 'accessories', 'outerwear'];

  if (loading) {
    const placeholders = new Array(8).fill(0);
    return (
      <GridContainer>
        <CardGrid>
          {placeholders.map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </CardGrid>
      </GridContainer>
    );
  }

  // Virtualisation when many products
  if(filtered.length>40){
    const { innerWidth:vw, innerHeight:vh } = window;
    const cardW=320; const columnCount=Math.max(1,Math.floor( (vw-60)/cardW));
    const rowCount=Math.ceil(filtered.length/columnCount);
    const cardH=460;
    const GridItem=({ columnIndex,rowIndex,style })=>{
      const idx=rowIndex*columnCount+columnIndex; if(idx>=filtered.length) return null;
      const product=filtered[idx];
      return <div style={{...style,padding:20}}><ProductCard product={product}/></div>;
    };
    return (
      <GridContainer style={{height:'80vh'}}>
        <WindowGrid columnCount={columnCount} columnWidth={cardW} height={vh*0.8} rowCount={rowCount} rowHeight={cardH} width={vw-40}>
          {GridItem}
        </WindowGrid>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      {!extProducts && (
        <FilterBar>
          {categories.map((cat) => (
            <FilterButton key={cat} $active={activeFilter === cat} onClick={() => filterProducts(cat)}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </FilterButton>
          ))}
        </FilterBar>
      )}

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