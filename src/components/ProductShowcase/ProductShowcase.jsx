import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductCard from '../ProductGrid/ProductCard';
import { Helmet } from 'react-helmet-async';

const Section = styled.section`
  background: #fff;
  padding: 60px 20px 80px;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Heading = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 32px;
  font-family: 'UnifrakturCook', cursive;
  color: var(--dark-brown);
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  gap: 24px;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));

  /* Enlarge first and every 7th card for visual rhythm */
  & > :nth-child(7n + 1) {
    grid-column: span 2;
  }

  @media (max-width: 768px) {
    & > :nth-child(7n + 1) {
      grid-column: span 1;
    }
  }
`;

function ProductShowcase({ tag = 'new', limit = 6 }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products?tag=${tag}&limit=${limit}`)
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, [tag, limit]);

  if (!products.length) return null;

  return (
    <Section>
      <Helmet>
        {products.map((p) => (
          <script type="application/ld+json" key={p._id}>{`
            {
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "${p.name}",
              "image": "${p.image}",
              "description": "${p.description}",
              "sku": "${p._id}",
              "brand": { "@type": "Brand", "name": "Positive Vibe Tribe" },
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": "${p.price}",
                "availability": "https://schema.org/${p.countInStock > 0 ? 'InStock' : 'OutOfStock'}"
              }
            }
          `}</script>
        ))}
      </Helmet>
      <Container>
        <Heading>New Arrivals</Heading>
        <Grid>
          {products.map((prod, idx) => (
            <ProductCard key={prod._id} product={prod} index={idx} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default ProductShowcase; 