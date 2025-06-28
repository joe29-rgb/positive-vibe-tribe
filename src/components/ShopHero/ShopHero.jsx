import React from 'react';
import styled from 'styled-components';
import skyline from '../../assets/edmonton-skyline.png';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

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

const Bg = styled(motion.div)`
  position:absolute; inset:0; background:url(${skyline}) center/cover no-repeat; opacity:0.08; pointer-events:none;
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

const Subtitle = styled.p`
  font-size: var(--fs-lg);
  color: var(--dark-brown);
  margin-top:16px;
`;

const Chevron = styled(motion.div)`
  width:34px; height:34px; border-left:4px solid var(--primary-red); border-bottom:4px solid var(--primary-red); transform:rotate(-45deg); margin:40px auto 0; cursor:pointer;
`;

function ShopHero({ title = 'Shop', subtitle='Explore our latest drops & classics' }){
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0,300],[0,50]);
  return (
    <Section>
      <Bg style={{y}} />
      <Container>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Chevron whileHover={{scale:1.1}} onClick={()=>window.scrollTo({top:600,behavior:'smooth'})} />
      </Container>
    </Section>
  );
}

export default ShopHero; 