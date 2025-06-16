import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import kokopelli from '../../assets/kokopelli.png';
import look3 from '../../assets/collage/look3.jpg';
import look7 from '../../assets/collage/look7.jpg';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BgImage = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 800px;
  text-align: center;
  color: #fff;
  padding: 0 20px;
`;

const Headline = styled.h2`
  font-family: 'UnifrakturCook', cursive;
  font-size: 3rem;
  margin-bottom: 16px;
`;

const Para = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
`;

function StorySection({ bg, children }) {
  return (
    <Section>
      <BgImage
        src={bg}
        alt="background"
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />
      <Content
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {children}
      </Content>
    </Section>
  );
}

function ScrollStory() {
  return (
    <div>
      <StorySection bg={look3}>
        <Headline>Where Kokopelli Dances</Headline>
        <Para>
          Our journey begins with the ancient flute player, carrying seeds of abundance across the prairies.
          Each stitch we sew echoes his melody of joy.
        </Para>
      </StorySection>
      <StorySection bg={look7}>
        <Headline>Guided by the Wolf Pack</Headline>
        <Para>
          Loyalty and collective strength run through our threads. Stand with the pack, wear the wisdom.
        </Para>
      </StorySection>
      <StorySection bg={kokopelli}>
        <Headline>Join the Tribe</Headline>
        <Para>
          Step into the story—discover collections that honour Treaty 6 territory and celebrate positive
          energy.
        </Para>
        <motion.a
          href="/products"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'inline-block',
            marginTop: 24,
            background: 'var(--primary-red)',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Shop the Story
        </motion.a>
      </StorySection>
    </div>
  );
}

export default ScrollStory; 