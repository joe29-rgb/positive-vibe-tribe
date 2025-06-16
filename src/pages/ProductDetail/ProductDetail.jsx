import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  color: var(--dark-brown);
`;

const Img = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
`;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <div style={{ padding: '2rem' }}>Loading product...</div>;
  }

  return (
    <Wrapper>
      <Breadcrumbs productName={product.name} />
      <h2 style={{ fontFamily: 'UnifrakturCook,cursive', fontSize: '2.5rem' }}>{product.name}</h2>
      <Img src={product.image} alt={product.name} loading="lazy" />
      <p style={{ marginTop: '24px' }}>{product.description}</p>
      <p style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--primary-red)' }}>${product.price}</p>
    </Wrapper>
  );
}

export default ProductDetail; 