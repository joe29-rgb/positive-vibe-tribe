import React from 'react';
import styled from 'styled-components';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { motionOK } from '../../utils/motion';

const Base = styled(motion.section)`
  padding: var(--section-padding, 110px 20px);
  position: relative;
  overflow: hidden;
  background: var(--canvas-beige);
`;

function buildClip(top, bottom) {
  if (top && bottom)
    return 'polygon(0 0, 100% 4vw, 100% calc(100% - 4vw), 0 100%)';
  if (top)
    return 'polygon(0 0, 100% 4vw, 100% 100%, 0 100%)';
  if (bottom)
    return 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)';
  return 'none';
}

const AngleSection = ({ angleTop = false, angleBottom = false, parallax = false, factor = 0.2, children, ...rest }) => {
  const clipPath = buildClip(angleTop, angleBottom);

  // Set up transforms (hooks must run unconditionally)
  const { scrollY } = useViewportScroll();
  const yTransform = useTransform(scrollY, [0, 1200], [0, -1200 * factor]);

  // Determine whether to apply parallax (respect prefers-reduced-motion)
  const parallaxStyle = parallax && motionOK() ? { y: yTransform } : {};

  const style = {
    ...(clipPath !== 'none' && { clipPath }),
    ...parallaxStyle,
  };

  return (
    <Base
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      {...rest}
    >
      {children}
    </Base>
  );
};

export default AngleSection; 