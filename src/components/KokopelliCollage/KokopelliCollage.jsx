import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import kokopelliSil from '../../assets/kokopelli.png';

// Reuse customer lookbook photos (same as LoveMosaic)
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

// Build ~120 tiles
const tiles = Array.from({ length: 120 }, (_, i) => photoUrls[i % photoUrls.length]);

const Wrapper = styled.div`
  --tile: 22px;
  position: relative;
  width: clamp(220px, 40vw, 320px);
  aspect-ratio: 1 / 2; /* Kokopelli is taller than wide */
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) {
    --tile: 16px;
  }
`;

const Mosaic = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--tile));
  gap: 3px;
  width: 100%;
  height: 100%;
  mask: url(${kokopelliSil}) center/contain no-repeat;
  -webkit-mask: url(${kokopelliSil}) center/contain no-repeat;
  position: relative;
`;

const Tile = styled(motion.div)`
  width: var(--tile);
  height: var(--tile);
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  ${({ $hidden }) => $hidden && 'visibility:hidden;'}
`;

const PopTile = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(var(--tile) * 5);
  height: calc(var(--tile) * 5);
  transform: translate(-50%, -50%) rotateX(-8deg) rotateY(6deg) scale(1.1);
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.35);
  z-index: 3;
  @media (max-width: 480px) {
    width: calc(var(--tile) * 3.8);
    height: calc(var(--tile) * 3.8);
  }
`;

export default function KokopelliCollage() {
  const [active, setActive] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    const pick = () => {
      setActive(Math.floor(Math.random() * tiles.length));
      timeoutRef.current = setTimeout(pick, 5000);
    };
    pick();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Wrapper>
      <LayoutGroup>
        <Mosaic>
          {tiles.map((src, i) => (
            <Tile
              key={i}
              layoutId={`kp-${i}`}
              style={{ backgroundImage: `url(${src})` }}
              $hidden={i === active}
            />
          ))}
        </Mosaic>
        <AnimatePresence mode="wait">
          {tiles[active] && (
            <PopTile
              key={`kp-pop-${active}`}
              layoutId={`kp-${active}`}
              style={{ backgroundImage: `url(${tiles[active]})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 0.35 } }}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    </Wrapper>
  );
} 