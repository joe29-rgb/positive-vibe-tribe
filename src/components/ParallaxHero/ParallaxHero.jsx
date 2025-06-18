import React from 'react';
import styled from 'styled-components';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import motif from '../../assets/diamond-tile.svg';
import founderPortrait from '../../assets/founder-portrait.png';
import founder from '../../assets/founder.jpg';

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

const MotifCanvas = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${motif});
  background-size: 180px 180px;
  background-repeat: repeat;
  opacity: 0.07;
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
  text-shadow: 0 4px 18px rgba(0,0,0,0.4);
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2.2vw, 1.5rem);
  max-width: 800px;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
`;

const CTA = styled.a`
  display: inline-block;
  padding: 1rem 2.5rem;
  border-radius: var(--border-radius-pill);
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.35);
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-decoration: none;
  transition: var(--transition);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.25);
  }
`;

const Portrait = styled(motion.img)`
  width: 340px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  margin-top: 2rem;

  @media (max-width: 768px) {
    width: 220px;
  }
`;

function ParallaxHero() {
  const { scrollY } = useViewportScroll();

  // Parallax factors
  const bgY = useTransform(scrollY, [0, 500], [0, -150]);
  const motifY = useTransform(scrollY, [0, 500], [0, -70]);
  const contentY = useTransform(scrollY, [0, 300], [0, -40]);

  return (
    <HeroSection style={{ clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 100%)' }}>
      {/* Background photograph */}
      <Layer style={{ y: bgY, zIndex: 0 }}>
        <BGImage src={founder} alt="Positive Vibe Tribe founder" />
      </Layer>

      {/* Repeating tribal motif */}
      <Layer style={{ y: motifY, zIndex: 1 }}>
        <MotifCanvas />
      </Layer>

      {/* Dark gradient overlay */}
      <Layer style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 100%)', zIndex: 2 }} />

      {/* Foreground content */}
      <Content style={{ y: contentY }}>
        <Title>Guided by Ancient Wisdom</Title>
        <Subtitle>
          We weave the Seven Grandfather Teachings into every thread—spreading positive energy, cultural respect, and joyful connection across Turtle Island.
        </Subtitle>
        <CTA href="#founder-story">Discover Our Story</CTA>
        {/* Remove overlay portrait on large screens, keep on mobile */}
        <Portrait
          src={founderPortrait}
          alt="Founder portrait"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ display: 'block' }}
        />
      </Content>
    </HeroSection>
  );
}

export default ParallaxHero; 