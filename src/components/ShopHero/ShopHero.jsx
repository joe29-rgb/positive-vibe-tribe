import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  position: relative;
  background: linear-gradient(135deg, var(--warm-beige) 0%, var(--light-beige) 100%);
  clip-path: polygon(0 0, 100% 6%, 100% 94%, 0 100%);
  padding: 120px 20px;
  @media(max-width:640px){
    clip-path:none;
    padding: 80px 16px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'UnifrakturCook', cursive;
  font-size: var(--fs-5xl);
  color: var(--dark-brown);
  margin: 0;
`;

function ShopHero({ title = 'Shop' }){
  return (
    <Section>
      <Container>
        <Title>{title}</Title>
      </Container>
    </Section>
  );
}

export default ShopHero; 