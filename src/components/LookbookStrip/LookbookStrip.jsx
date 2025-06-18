import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
  scroll-snap-align: start;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    flex: 0 0 45vw;
  }
`;

const StyledImg = styled(LazyImage)`
  height: 100%;
  object-fit: cover;
`;

function LookbookStrip() {
  // Video modal disabled

  return (
    <>
      <Strip>
        {images.map((src, idx) => (
          <Slide
            key={src}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <StyledImg src={src} alt={`Positive Vibe Tribe look ${idx + 1}`} />
            {/* overlay removed */ }
          </Slide>
        ))}
      </Strip>

      {/* Video Modal */}
      {/* overlay removed */ }
    </>
  );
}

export default LookbookStrip; 