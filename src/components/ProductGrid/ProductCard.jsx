import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const Body = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0 0 8px;
  color: var(--dark-brown);
`;

const Price = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0;
  color: var(--primary-red);
`;

function ProductCard({ product }) {
  if (!product) return null;
  return (
    <Card>
      <Img src={product.image} alt={product.name} loading="lazy" />
      <Body>
        <Title>{product.name}</Title>
        <Price>${product.price.toFixed(2)}</Price>
      </Body>
    </Card>
  );
}

export default ProductCard; 