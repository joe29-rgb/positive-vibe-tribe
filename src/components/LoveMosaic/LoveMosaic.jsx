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
`;

const Mosaic = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 50px);
  gap: 6px;
  width: 100%;
  max-width: 1200px;
  mask: url('/assets/love-mask.svg') center/contain no-repeat;
  -webkit-mask: url('/assets/love-mask.svg') center/contain no-repeat;
  position: relative;
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 36px);
    gap: 3px;
  }
`;

const Tile = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  ${({ $active }) =>
    $active &&
    css`
      position: absolute;
      width: 160px;
      height: 160px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotateX(-12deg);
      transform-style: preserve-3d;
      border-radius: 12px;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
      z-index: 2;
      transition: transform 0.6s, box-shadow 0.6s;
      @media (max-width: 600px) {
        width: 120px;
        height: 120px;
        transform: translate(-50%, -50%) rotateX(-8deg);
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