import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { motionOK } from '../../utils/motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import LazyImage from '../LazyImage/LazyImage.jsx';
import KokopelliCollage from '../KokopelliCollage/KokopelliCollage';
import { Helmet } from 'react-helmet-async';

// Replaced dancing Kokopelli assets with collage logo

const HeroContainer = styled.section`
  min-height: 100vh;
  /* fallback gradient behind image */
  background: linear-gradient(135deg, var(--warm-beige) 0%, var(--light-beige) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  /* Fade to beige at bottom so hero blends with subsequent sections */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: clamp(80px, 15vh, 140px);
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, var(--canvas-beige) 100%);
    pointer-events: none;
    z-index: 1;
  }
`;

// Preload hero bg url (cloudinary source)
const HERO_BG_URL = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750972974/hero-bg.jpg';

// Full-bleed background image layer
const HeroBg = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: url(${HERO_BG_URL}) center/cover no-repeat;
  background-repeat: no-repeat;
  z-index: 0;
  /* slow horizontal cloud drift */
  @keyframes cloudDrift {
    from { background-position-x: 0; }
    to   { background-position-x: -200px; }
  }
  @media (prefers-reduced-motion: no-preference) {
    animation: cloudDrift 60s linear infinite;
  }
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

const HeroSubtitle = styled.p`
  font-size: var(--fs-2xl);
  color: var(--dark-brown);
  margin-bottom: 40px;
  font-weight: 500;
  font-family: var(--font-primary);
  line-height: 1.3;
  max-width: 700px;
  letter-spacing: 0.01em;
  text-align: center;
`;

const Glow = styled(motion.div)`
  position: absolute;
  width: 1200px;
  height: 1200px;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
  filter: blur(180px);
  opacity: 0.55;
  pointer-events: none;
  z-index: 1;
`;

// Use global button utility classes instead of custom component

const HeadlineBlack = styled.h1`
  font-family: 'UnifrakturCook', cursive;
  font-size: var(--fs-7xl);
  line-height: 1;
  margin: 0;
  color: #F9E2BF;

  @media (max-width: 768px) {
    font-size: var(--fs-4xl);
  }
`;
const HeadlineScript = styled.h2`
  font-family: 'Dancing Script', 'Satisfy', 'Allura', cursive;
  font-size: var(--fs-5xl);
  margin: 0 0 24px;
  color: #F9E2BF;

  @media (max-width: 768px) {
    font-size: var(--fs-2xl);
  }
`;

const Reassure = styled.span`
  display: block;
  margin-top: 8px;
  font-size: var(--fs-sm);
  color: var(--medium-gray);
`;

/* Spotlight product box */
const Spotlight = styled.div`
  margin-top: 56px;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SpotImgStyled = styled(LazyImage)`
  width: 100%;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const SpotPrice = styled.p`
  font-weight: 600;
  color: var(--primary-red);
  margin: 8px 0 16px;
  font-size: var(--fs-lg);
`;

const AddBtn = styled.button`
  background: var(--primary-red);
  color: #fff;
  border: none;
  padding: 12px 32px;
  border-radius: var(--border-radius-pill);
  font-size: var(--fs-sm);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s;
  &:hover {
    background: var(--secondary-red);
  }
`;

const Chevron = styled(motion.button)`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  width: 34px;
  height: 34px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 3;
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    border-left: 4px solid var(--primary-red);
    border-bottom: 4px solid var(--primary-red);
    transform: rotate(-45deg);
    display: block;
  }
`;

function Hero() {
  const [featured, setFeatured] = useState(null);
  const dispatch = useDispatch();

  // Fetch featured product once
  useEffect(() => {
    fetch('/api/products?tag=featured&limit=1')
      .then((res) => res.json())
      .then((data) => setFeatured(data[0]))
      .catch(() => setFeatured(null));
  }, []);

  const handleAdd = () => {
    if (featured) dispatch(addToCart({ product: featured, size: 'default', quantity: 1 }));
  };

  // Parallax on scroll (disabled if reduced motion)
  const { scrollY } = useViewportScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, -180]);

  return (
    <>
      <Helmet><link rel="preload" as="image" href={HERO_BG_URL} /></Helmet>
      <HeroContainer>
        <HeroBg
          style={{
            backgroundPositionY: bgY instanceof Object ? bgY : 0,
          }}
        />
        <Glow
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.55 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <HeroContent
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div style={{ marginBottom: 30 }}
            animate={motionOK() ? { y: [0, 8, 0] } : { y: 0 }}
            transition={motionOK() ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : {}}
          >
            <KokopelliCollage />
          </motion.div>
          <HeadlineBlack>Positive</HeadlineBlack>
          <HeadlineScript>Vibe Tribe</HeadlineScript>
          <HeroSubtitle>
            If there&apos;s people out there that can hate for no reason, then we can love for no reason
          </HeroSubtitle>
          <motion.a
            href="/products"
            className="btn btn-gradient"
            style={{ background: 'linear-gradient(135deg, var(--primary-red) 0%, #f5e04b 100%)', padding: '14px 36px', borderRadius:'50px', fontWeight:700, color:'#fff' }}
            whileHover={{ scale: 1.06, boxShadow: '0 8px 24px rgba(0,0,0,0.18)' }}
            whileTap={{ scale: 0.96 }}
          >
            Shop the Tribe
          </motion.a>
          <Reassure>Free shipping on orders over $100.00</Reassure>

          {/* Featured product spotlight */}
          {featured && (
            <Spotlight>
              <SpotImgStyled src={featured.image} alt={featured.name} widths={[320,480]} sizes="(max-width:640px) 80vw, 320px" />
              <h3 style={{ margin: '0 0 4px' }}>{featured.name}</h3>
              <SpotPrice>${featured.price.toFixed(2)}</SpotPrice>
              <AddBtn onClick={handleAdd}>Add to Cart</AddBtn>
            </Spotlight>
          )}
        </HeroContent>

        <Chevron
          aria-label="Scroll for more"
          initial={{ y: 0, opacity: 0 }}
          animate={motionOK() ? { y: [0, 8, 0], opacity: 1 } : { opacity: 1 }}
          transition={motionOK() ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.8 }}
          onClick={() => document.querySelector('#featured-collections')?.scrollIntoView({ behavior: 'smooth' })}
        />
      </HeroContainer>
    </>
  );
}

export default Hero; 