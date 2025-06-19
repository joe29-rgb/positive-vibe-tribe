import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Base = styled(motion.section)`
  position: relative;
  overflow: hidden;
  padding: var(--section-padding, 110px 20px);
`;

const WaveSvg = styled.svg`
  position: absolute;
  left: 0;
  width: 100%;
  height: 80px;
  pointer-events: none;
`;

function WaveSection({ waveTop = false, waveBottom = false, bg = 'var(--canvas-beige)', children, ...rest }) {
  return (
    <Base style={{ background: bg }} {...rest}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {waveTop && (
        <WaveSvg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ top: 0, transform: 'translateY(-100%)' }}
        >
          <path
            d="M0,80 C480,0 960,0 1440,80 L1440 0 L0 0 Z"
            fill={bg}
          />
        </WaveSvg>
      )}
      {children}
      {waveBottom && (
        <WaveSvg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ bottom: 0 }}
        >
          <path
            d="M0,0 C480,80 960,80 1440,0 L1440 80 L0 80 Z"
            fill={bg}
          />
        </WaveSvg>
      )}
    </Base>
  );
}

export default WaveSection; 