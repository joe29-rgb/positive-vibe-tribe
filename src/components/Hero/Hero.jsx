import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { getCdnImage } from '../../utils/cloudinary';
import KokopelliCollage from '../KokopelliCollage/KokopelliCollage';

// Replaced dancing Kokopelli assets with collage logo

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

const HeroSubtitle = styled.p`
  font-size: 2.1rem;
  color: var(--warm-brown);
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
`;

// Use global button utility classes instead of custom component

const HeadlineBlack = styled.h1`
  font-family: 'UnifrakturCook', cursive;
  font-size: 6rem;
  line-height: 1;
  margin: 0;
  color: var(--dark-brown);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;
const HeadlineScript = styled.h2`
  font-family: 'Dancing Script', 'Satisfy', 'Allura', cursive;
  font-size: 4rem;
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

const SpotImg = styled.img`
  width: 100%;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const SpotPrice = styled.p`
  font-weight: 600;
  color: var(--primary-red);
  margin: 8px 0 16px;
  font-size: 1.125rem;
`;

const AddBtn = styled.button`
  background: var(--primary-red);
  color: #fff;
  border: none;
  padding: 12px 32px;
  border-radius: var(--border-radius-pill);
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s;
  &:hover {
    background: var(--secondary-red);
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

  return (
    <HeroContainer>
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
        <div style={{ marginBottom: 30 }}>
          <KokopelliCollage />
        </div>
        <HeadlineBlack>Positive</HeadlineBlack>
        <HeadlineScript>Vibe Tribe</HeadlineScript>
        <HeroSubtitle>
          If there&apos;s people out there that can hate for no reason, then we can love for no reason
        </HeroSubtitle>
        <motion.a
          href="/products"
          className="btn btn-gradient"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Shop the Tribe
        </motion.a>
        <Reassure>Free shipping on orders over $50</Reassure>

        {/* Featured product spotlight */}
        {featured && (
          <Spotlight>
            <SpotImg
              src={getCdnImage(featured.image, 600)}
              srcSet={getCdnImage(featured.image, 400) + ' 400w, ' + getCdnImage(featured.image, 800) + ' 800w'}
              sizes="(max-width: 600px) 100vw, 400px"
              alt={featured.name}
              loading="lazy"
              decoding="async"
            />
            <h3 style={{ margin: '0 0 4px' }}>{featured.name}</h3>
            <SpotPrice>${featured.price.toFixed(2)}</SpotPrice>
            <AddBtn onClick={handleAdd}>Add to Cart</AddBtn>
          </Spotlight>
        )}
      </HeroContent>
    </HeroContainer>
  );
}

export default Hero; 