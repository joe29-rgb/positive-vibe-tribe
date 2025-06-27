import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background: #f5f1eb;
  padding: 80px 20px;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const Heading = styled.h2`
  font-size: var(--fs-3xl);
  margin-bottom: 48px;
  font-family: 'UnifrakturCook', cursive;
  color: var(--dark-brown);
  text-align: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 32px;
`;
const Item = styled.div`
  background: #fff;
  padding: 28px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  text-align: center;
`;
const ItemTitle = styled.h3`
  font-size: var(--fs-lg);
  margin: 12px 0 8px;
  color: var(--dark-brown);
`;
const ItemText = styled.p`
  font-size: var(--fs-sm);
  color: var(--medium-gray);
`;

const DATA = [
  { icon: '🔒', title: 'Secure Shopping', text: 'SSL encrypted checkout, safe payment processing' },
  { icon: '🚚', title: 'Free Shipping', text: 'Across Canada on orders over $100' },
  { icon: '↺', title: 'Easy Returns', text: '30-day happiness guarantee' },
  { icon: '🏆', title: 'Edmonton Local', text: 'Designed & shipped from Treaty 6 territory' },
  { icon: '♻️', title: 'Cultural Respect', text: 'Authentic Indigenous partnerships' },
  { icon: '⭐', title: '500+ Reviews', text: 'Average 4.8/5 stars' },
];

function TrustCredentials() {
  return (
    <Section>
      <Container>
        <Heading>Why Choose Positive Vibe Tribe?</Heading>
        <Grid>
          {DATA.map((item) => (
            <Item key={item.title} data-hover="card">
              <div style={{ fontSize: 'var(--fs-2xl)' }} aria-hidden="true">
                {item.icon}
              </div>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemText>{item.text}</ItemText>
            </Item>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default TrustCredentials; 