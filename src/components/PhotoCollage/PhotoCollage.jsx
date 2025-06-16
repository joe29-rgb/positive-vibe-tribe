import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import diamondSvg from '../../assets/corner-diamond.svg';

// Local product shots (placed in src/assets)
import look1 from '../../assets/collage/look1.jpg';
import look2 from '../../assets/collage/look2.jpg';
import look3 from '../../assets/collage/look3.jpg';
import look4 from '../../assets/collage/look4.jpg';
import look5 from '../../assets/collage/look5.jpg';
import look6 from '../../assets/collage/look6.jpg';
import look7 from '../../assets/collage/look7.jpg';
import look8 from '../../assets/collage/look8.jpg';
import look9 from '../../assets/collage/look9.jpg';

const images = [
  look1,
  look2,
  look3,
  look4,
  look5,
  look6,
  look7,
  look8,
  look9,
];

// Enhanced Masonry Grid inspired by luxury fashion sites
const Grid = styled.div`
  --gap: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: masonry;
  grid-auto-flow: dense;
  gap: var(--gap);
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  padding: 0;
  background: #f5f1eb;
  position: relative;
  /* Subtle blue diamond in each corner */
  &::before, &::after, &::backdrop, &::marker {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    background: url(${diamondSvg}) no-repeat center center;
    background-size: contain;
    opacity: 0.08;
    z-index: 1;
    pointer-events: none;
  }
  &::before { left: 0; top: 0; }
  &::after { right: 0; top: 0; }
  &::backdrop { left: 0; bottom: 0; }
  &::marker { right: 0; bottom: 0; }

  /* Fallback for browsers without masonry */
  @supports not (grid-template-rows: masonry) {
    column-count: 4;
    column-gap: var(--gap);
    & > * {
      break-inside: avoid;
      margin-bottom: var(--gap);
    }
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    @supports not (grid-template-rows: masonry) {
      column-count: 3;
    }
    &::before, &::after, &::backdrop, &::marker { width: 60px; height: 60px; }
  }

  @media (max-width: 640px) {
    @supports not (grid-template-rows: masonry) {
      column-count: 2;
    }
    &::before, &::after, &::backdrop, &::marker { width: 32px; height: 32px; }
  }
`;

const Item = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  cursor: pointer;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);

  /* Add varied height by spanning rows (progressive enhancement) */
  &:nth-child(3n) {
    grid-row-end: span 2;
  }
  &:nth-child(5n) {
    grid-row-end: span 3;
  }

  /* Luxury gradient swipe on hover */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, transparent, rgba(200, 16, 46, 0.2), transparent);
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 0.6s ease, transform 0.6s ease;
    z-index: 2;
  }

  &:hover::before {
    opacity: 1;
    transform: translateX(100%);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);

  ${Item}:hover & {
    transform: scale(1.1) rotate(2deg);
    filter: brightness(1.05) contrast(1.05);
  }
`;

const popVariant = {
  rest: {
    zIndex: 0,
    scale: 1,
    rotate: 0,
    boxShadow: '0 6px 14px rgba(0,0,0,0.08)',
  },
  hover: {
    zIndex: 2,
    scale: 1.08,
    rotate: 0,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    transition: { duration: 0.35 },
  },
  cycle: (i) => ({
    scale: [1, 1.12, 1],
    rotate: [0, 3, 0],
    transition: { delay: i * 0.05, duration: 0.8, ease: 'easeInOut' },
  }),
};

export default function PhotoCollage({ auto = true }) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [auto]);

  return (
    <Grid>
      {images.map((src, i) => (
        <Item
          key={i}
          custom={i}
          initial="rest"
          whileHover="hover"
          animate={active === i ? 'cycle' : 'rest'}
          variants={popVariant}
        >
          <Img src={src} alt={`Look ${i + 1}`} />
        </Item>
      ))}
    </Grid>
  );
} 