import React from 'react';
import styled from 'styled-components';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

function Products() {
  return (
    <Wrapper>
      <Breadcrumbs />
      <ProductGrid />
    </Wrapper>
  );
}

export default Products; 