import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import kokopelliVideo from '../../assets/kokopelli.mp4.mp4';
import kokopelliImg from '../../assets/kokopelli.png';

const HeroContainer = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--warm-beige) 0%, var(--light-beige) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
`;

const LogoBase = css`
  width: 140px;
  height: 140px;
  margin-bottom: 30px;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.15));

  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const LogoImg = styled(motion.img)`
  ${LogoBase};
`;

const LogoVideo = styled(motion.video)`
  ${LogoBase};
  object-fit: contain;
  pointer-events: none;
  -webkit-user-select: none;
  user-select: none;
  mix-blend-mode: screen;
  background: transparent;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.15));
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
`;

const HeroSubtitle = styled.p`
  font-size: 2.1rem;
  color: var(--warm-brown);
  margin-bottom: 40px;
  font-weight: 500;
  font-family: 'Dancing Script', 'Satisfy', 'Allura', cursive;
  line-height: 1.3;
  max-width: 700px;
  letter-spacing: 0.01em;
  text-align: center;
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(45deg, var(--primary-red), var(--secondary-red));
  color: #fff;
  border: none;
  padding: 18px 40px;
  font-size: 1.1rem;
  border-radius: var(--border-radius-pill);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  transition: var(--transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
`;

const HeadlineBlack = styled.h1`
  font-family: 'UnifrakturCook', cursive;
  font-size: 5rem;
  line-height: 1;
  margin: 0;
  color: var(--dark-brown);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;
const HeadlineScript = styled.h2`
  font-family: 'Dancing Script', 'Satisfy', 'Allura', cursive;
  font-size: 3rem;
  margin: 0 0 24px;
  color: var(--dark-brown);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Reassure = styled.span`
  display: block;
  margin-top: 8px;
  font-size: 0.875rem;
  color: var(--medium-gray);
`;

// Dancing key-frames (left ↔ right, slight hop, gentle rotation)
const kokoDance = {
  animate: {
    x: [-18, 18, -18],
    y: [0, -10, 0],
    rotate: [-6, 6, -6],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

function Hero() {
  // Add state to track whether video can play successfully
  var _ref = React.useState(true);
  var hasVideo = _ref[0];
  var setHasVideo = _ref[1];

  function handleVideoError() {
    // If the video fails to load/play, fallback to the static image
    setHasVideo(false);
  }

  return (
    <HeroContainer>
      <HeroContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {hasVideo ? (
          <LogoVideo
            src={kokopelliVideo}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{ backgroundColor: 'transparent' }}
            aria-label="Positive Vibe Tribe Kokopelli video logo"
            variants={kokoDance}
            animate="animate"
            onError={handleVideoError}
          />
        ) : (
          <LogoImg
            className="red"
            src={kokopelliImg}
            alt="Positive Vibe Tribe Kokopelli"
            variants={kokoDance}
            animate="animate"
          />
        )}
        <HeadlineBlack>Positive</HeadlineBlack>
        <HeadlineScript>Vibe Tribe</HeadlineScript>
        <HeroSubtitle>
          If there&apos;s people out there that can hate for no reason, then we can love for no reason
        </HeroSubtitle>
        <CTAButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={function() {
            window.location.href = '/products';
          }}
        >
          Shop the Tribe
        </CTAButton>
        <Reassure>Free shipping on orders over $50</Reassure>
      </HeroContent>
    </HeroContainer>
  );
}

export default Hero; 