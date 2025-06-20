import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
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
  z-index: -1;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 0;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 800px;
  text-align: center;
  color: #fff;
  padding: 0 20px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
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

const kokopelli = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431541/kokopelli_j7olov.png';

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
      <Overlay />
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
        <motion.a href="/products" className="btn btn-gradient" whileHover={{scale:1.05}} whileTap={{scale:0.95}} style={{marginTop:24}}>
          Shop the Story
        </motion.a>
      </StorySection>
    </div>
  );
}

export default ScrollStory; 