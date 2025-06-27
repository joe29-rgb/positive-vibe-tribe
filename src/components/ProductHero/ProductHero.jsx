import React from 'react';
import styled from 'styled-components';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { motionOK } from '../../utils/motion';

const Section = styled.section`
  position: relative;
  background: #f5f1eb;
  clip-path: polygon(0 0, 100% 3%, 100% 97%, 0 100%);
  overflow: hidden;
  padding: 80px 20px;
  @media(max-width: 640px){
    padding: 60px 16px;
    clip-path:none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(300px,1fr));
  gap: 48px;
  align-items: center;
`;

const ImgWrap = styled(motion.div)`
  perspective: 1000px;
  img {
    width: 100%;
    border-radius: 24px;
    box-shadow: 0 12px 28px rgba(0,0,0,0.12);
    transform-style: preserve-3d;
  }
`;

const Info = styled.div`
  color: var(--dark-brown);
`;

const Title = styled.h1`
  font-family: 'UnifrakturCook', cursive;
  font-size: var(--fs-3xl);
  margin: 0 0 12px;
`;

const Benefit = styled.p`
  font-size: var(--fs-base);
  font-weight: 600;
  color: var(--primary-red);
  margin-bottom: 16px;
`;

const Price = styled.p`
  font-size: var(--fs-2xl);
  font-weight: 700;
  color: var(--primary-red);
`;

function ProductHero({ product, benefit = 'Ethically crafted · Limited drop' }){
  const { scrollY } = useViewportScroll();
  const prefersMotion = motionOK();
  const translateY = useTransform(scrollY, [0, 600], [0, prefersMotion ? -60 : 0]);

  if(!product) return null;

  return (
    <Section>
      <Container style={{ y: translateY }} as={motion.div}>
        <ImgWrap whileHover={{ rotateX: prefersMotion ? -4 : 0, rotateY: prefersMotion ? 4 : 0 }} transition={{ type:'spring', stiffness:120 }}>
          <img src={product.image} alt={product.name} />
        </ImgWrap>
        <Info>
          <Title>{product.name}</Title>
          <Benefit>{benefit}</Benefit>
          <Price>${product.price}</Price>
        </Info>
      </Container>
    </Section>
  );
}

export default ProductHero; 