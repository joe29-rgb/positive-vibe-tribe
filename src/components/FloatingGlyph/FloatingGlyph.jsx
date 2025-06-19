import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import diamond from '../../assets/corner-diamond.svg';

const Glyph = styled(motion.img)`
  position: fixed;
  width: 180px;
  height: 180px;
  opacity: 0.07;
  pointer-events: none;
  z-index: -1;
  @media (min-width: 768px) {
    opacity: 0.05;
  }
`;

function FloatingGlyph() {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 1200], [0, -200]);
  const x = useTransform(scrollY, [0, 1200], [0, -100]);

  return <Glyph src={diamond} style={{ y, x }} alt="decorative diamond" />;
}

export default FloatingGlyph; 