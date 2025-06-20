import React from 'react';
import styled from 'styled-components';
import { getRecentProducts } from '../../utils/recentlyViewed';
import ProductCard from '../ProductGrid/ProductCard';

const Strip = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 12px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }
`;

function RecentlyViewed({ currentId }) {
  const products = React.useMemo(() => getRecentProducts(currentId), [currentId]);
  if (!products.length) return null;
  return (
    <section style={{ marginTop: '60px' }}>
      <h3 style={{ marginBottom: '20px' }}>Recently Viewed</h3>
      <Strip>
        {products.map((p, idx) => (
          <ProductCard key={p._id + idx} product={p} index={idx} />
        ))}
      </Strip>
    </section>
  );
}

export default RecentlyViewed; 