import React from 'react';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import styled from 'styled-components';

const Wrapper = styled.div `
  max-width: 1400px;
  margin: 0 auto;
`;

function Products() {
    return ( <
        Wrapper >
        <
        Breadcrumbs / >
        <
        ProductGrid / >
        <
        /Wrapper>
    );
}

export default Products;