import React from 'react';
import styled from 'styled-components';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import teachingsPortrait from '../../assets/founder-portrait.png';

const HeroSection = styled.section`
  position: relative;
  height: 90vh;
  overflow: hidden;
`;

const Layer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const BGImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(20%) contrast(110%);
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--white);
  padding: 0 20px;
`;

const Title = styled.h1`
  font-family: 'UnifrakturCook', cursive;
  font-size: clamp(2.75rem, 6vw, 5rem);
  margin: 0 0 1rem;
  color: #fffbe7; /* soft heavenly glow */
  text-shadow: 0 0 8px rgba(255,245,200,0.8), 0 0 20px rgba(255,245,200,0.6);
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2.2vw, 1.5rem);
  max-width: 800px;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

function ParallaxHero() {
  const { scrollY } = useViewportScroll();

  // Parallax factors (background & content only; motif removed)
  const bgY = useTransform(scrollY, [0, 500], [0, -150]);
  const contentY = useTransform(scrollY, [0, 300], [0, -40]);

  return (
    <HeroSection style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 100%)' }}>
      {/* Background photograph */}
      <Layer style={{ y: bgY, zIndex: 0 }}>
        <BGImage src={teachingsPortrait} alt="7 Teachings portrait" />
      </Layer>

      {/* Dark gradient overlay */}
      <Layer style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 100%)', zIndex: 2 }} />

      {/* Foreground content */}
      <Content style={{ y: contentY }}>
        <Title>Guided by Ancient Wisdom</Title>
        <Subtitle>
          We weave the Seven Grandfather Teachings into every thread—spreading positive energy, cultural respect, and joyful connection across Turtle Island.
        </Subtitle>
        <a href="#founder-story" className="btn btn-glass">Discover Our Story</a>
      </Content>
    </HeroSection>
  );
}

export default ParallaxHero; 