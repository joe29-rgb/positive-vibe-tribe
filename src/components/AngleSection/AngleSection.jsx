import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Base = styled(motion.section)`
  padding: var(--section-padding, 110px 20px);
  position: relative;
  overflow: hidden;
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

const AngleSection = ({ angleTop = false, angleBottom = false, children, ...rest }) => {
  const clipPath = buildClip(angleTop, angleBottom);
  return (
    <Base
      style={clipPath !== 'none' ? { clipPath } : undefined}
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