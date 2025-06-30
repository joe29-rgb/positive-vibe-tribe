import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  user-select: none;
`;

function SpinViewer({ frames = [], alt = '', ...rest }) {
  const [idx, setIdx] = useState(0);
  const startX = useRef(null);

  if (!frames.length) return null;

  const total = frames.length;
  const updateBy = (deltaX) => {
    const percent = deltaX / 200; // 200px drag = full rotation
    const deltaFrames = Math.round(percent * total);
    setIdx((prev) => (prev + deltaFrames + total) % total);
  };

  const handleStart = (e) => {
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);
  };
  const handleMove = (e) => {
    if (startX.current == null) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    updateBy(x - startX.current);
    startX.current = x;
  };
  const handleEnd = () => {
    startX.current = null;
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleEnd);
    window.removeEventListener('touchmove', handleMove);
    window.removeEventListener('touchend', handleEnd);
  };

  return (
    <Wrapper onMouseDown={handleStart} onTouchStart={handleStart} {...rest}>
      <img src={frames[idx]} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain' }} loading="lazy" />
    </Wrapper>
  );
}

export default SpinViewer; 