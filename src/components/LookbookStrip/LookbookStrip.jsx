import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import LazyImage from '../LazyImage/LazyImage';
// Imagery
import look1 from '../../assets/collage/look1.jpg';
import look2 from '../../assets/collage/look2.jpg';
import look3 from '../../assets/collage/look3.jpg';
import look4 from '../../assets/collage/look4.jpg';
import look5 from '../../assets/collage/look5.jpg';
import look6 from '../../assets/collage/look6.jpg';
import look7 from '../../assets/collage/look7.jpg';
import look8 from '../../assets/collage/look8.jpg';

const images = [look1, look2, look3, look4, look5, look6, look7, look8];

const Strip = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 12px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome */
  }
`;

const Slide = styled(motion.div)`
  flex: 0 0 80vw;
  max-width: 600px;
  aspect-ratio: 3 / 4; /* Maintain visible height */
  scroll-snap-align: start;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    flex: 0 0 45vw;
    aspect-ratio: 4 / 3;
  }
`;

const zoom = keyframes`
  0% { transform: scale(1) translateZ(0); }
  100% { transform: scale(1.1) translateZ(0); }
`;

const StyledImg = styled(LazyImage)`
  height: 100%;
  object-fit: cover;
  animation: ${zoom} 18s ease-in-out alternate infinite;
`;

const Wrapper = styled.section`
  position: relative;
  padding: 60px 0;
  overflow: hidden;
`;

const PatternLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23e8ddd4' stroke-width='0.5'/%3E%3C/svg%3E");
  background-size: 160px 160px;
  opacity: 0.06;
  pointer-events: none;
  will-change: transform;
`;

function LookbookStrip() {
  const { scrollY } = useViewportScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <Wrapper>
      {/* Subtle moving pattern */}
      <PatternLayer style={{ y: bgY }} />

      <Strip as={motion.div} style={{ y: useTransform(scrollY, [0, 1000], [0, -80]) }}>
        {images.map((src, idx) => (
          <Slide key={src} data-hover="card" whileHover={{ scale: 1.03 }}>
            <StyledImg src={src} alt={`Positive Vibe Tribe look ${idx + 1}`} />
          </Slide>
        ))}
      </Strip>
    </Wrapper>
  );
}

export default LookbookStrip; 