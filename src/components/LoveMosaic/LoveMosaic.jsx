import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

// Temporary photo URLs duplicated as needed
const photoUrls = [
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750795564/IMG_20250612_105309_dquhjm.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750793010/look7_i8csvt.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750793008/look6_sacx1i.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750793005/look5_gk9ufg.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750793002/look4_vw9hyu.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750792998/look2_tp4vph.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750792997/look1_hnnrw4.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750795856/IMG_20250624_140048_niri2p.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750795822/IMG_20250624_140001_ococex.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750796000/IMG_20250624_140246_dzgtlg.jpg',
];

// Duplicate until we have ~160 thumbnails
const tiles = Array.from({ length: 160 }, (_, i) => photoUrls[i % photoUrls.length]);

const Wrapper = styled.section`
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  perspective: 1000px;
  overflow: visible;
`;

const Mosaic = styled.div`
  --tile: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--tile));
  gap: 4px;
  width: 90%;
  max-width: 650px;
  mask: url('/assets/love-mask.svg') center/contain no-repeat;
  -webkit-mask: url('/assets/love-mask.svg') center/contain no-repeat;
  position: relative;
  @media (max-width: 768px) {
    --tile: 28px;
    gap: 4px;
  }
`;

const Tile = styled(motion.div)`
  width: var(--tile);
  height: var(--tile);
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  ${({ $active }) =>
    $active &&
    css`
      position: absolute;
      width: calc(var(--tile) * 6);
      height: calc(var(--tile) * 6);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateX(-10deg) rotateY(8deg) scale(1.12);
      transform-style: preserve-3d;
      border-radius: 12px;
      box-shadow: 0 35px 70px rgba(0, 0, 0, 0.4);
      z-index: 3;
      transition: transform 0.6s, box-shadow 0.6s;
      @media (max-width: 600px) {
        width: calc(var(--tile) * 4.5);
        height: calc(var(--tile) * 4.5);
        transform: translate(-50%, -50%) rotateX(-6deg) rotateY(6deg) scale(1.1);
      }
    `}
`;

export default function LoveMosaic() {
  const [active, setActive] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    const pick = () => {
      setActive(Math.floor(Math.random() * tiles.length));
      timeoutRef.current = setTimeout(pick, 3500);
    };
    pick();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Wrapper>
      <Mosaic>
        {tiles.map((src, i) => (
          <Tile
            key={i}
            style={{ backgroundImage: `url(${src})` }}
            $active={i === active}
            initial={false}
            animate={{ opacity: i === active ? 1 : 1 }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </Mosaic>
    </Wrapper>
  );
} 