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

// Build ~200 tiles for higher density (≈ 8 extra rows)
const tiles = Array.from({ length: 200 }, (_, i) => photoUrls[i % photoUrls.length]);

// Medicine Wheel for cultural backdrop
const MedicineWheel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(280px, 50vw, 520px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: conic-gradient(
    #f5e04b 0deg 90deg,
    #d33a2c 90deg 180deg,
    #1a1a1a 180deg 270deg,
    #ffffff 270deg 360deg
  );
  opacity: 0.12;
  pointer-events: none;
  filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.1));
  z-index: 0;
`;

const Wrapper = styled.div`
  --tile: 18px;
  position: relative;
  width: clamp(220px, 40vw, 320px);
  aspect-ratio: 1 / 2; /* Kokopelli is taller than wide */
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) {
    --tile: 14px;
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
  z-index: 1;
  background: rgba(200, 16, 46, 0.08); /* faint PVT red fills gaps */
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
  width: calc(var(--tile) * 6);
  height: calc(var(--tile) * 6);
  transform: translate(-50%, -50%) rotateX(-8deg) rotateY(6deg) scale(1.1);
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.35);
  z-index: 3;
  @media (max-width: 480px) {
    width: calc(var(--tile) * 4.8);
    height: calc(var(--tile) * 4.8);
  }
`;

export default function KokopelliCollage() {
  const [active, setActive] = useState(null);
  const popRef = useRef();
  const gapRef = useRef();

  useEffect(() => {
    const cycle = () => {
      const next = Math.floor(Math.random() * tiles.length);
      setActive(next);
      popRef.current = setTimeout(() => {
        setActive(null);
        gapRef.current = setTimeout(cycle, 1500);
      }, 3500);
    };
    cycle();
    return () => {
      clearTimeout(popRef.current);
      clearTimeout(gapRef.current);
    };
  }, []);

  return (
    <Wrapper>
      <MedicineWheel />
      <LayoutGroup>
        <Mosaic>
          {tiles.map((src, i) => (
            <Tile
              key={i}
              layoutId={`kp-${i}`}
              style={{ backgroundImage: `url(${src})` }}
              $hidden={active !== null && i === active}
            />
          ))}
        </Mosaic>
        <AnimatePresence mode="wait">
          {active !== null && (
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