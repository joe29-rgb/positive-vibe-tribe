import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

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

const Wrapper = styled(motion.section)`
  /* Shared tile size variable so grid & pop-out stay in sync */
  --tile: 40px;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  perspective: 1000px;
  overflow: visible;
  background: linear-gradient(135deg, #fffaf6 0%, #f7f1eb 100%);
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  @media (max-width: 768px) {
    --tile: 45px;
    gap: 5px;
    width: 100%;
  }
`;

const Mosaic = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, var(--tile));
  gap: 4px;
  width: 80%;
  max-width: 1000px;
  mask: url('/assets/love-mask.svg') center/contain no-repeat;
  -webkit-mask: url('/assets/love-mask.svg') center/contain no-repeat;
  position: relative;
  filter: drop-shadow(0 12px 18px rgba(0, 0, 0, 0.12));
  @media (max-width: 768px) {
    width: 90%;
    gap: 4px;
  }
`;

const Tile = styled(motion.div)`
  width: var(--tile);
  height: var(--tile);
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  ${({ $hidden }) => $hidden && 'visibility:hidden;'}
`;

// Overlay tile that pops outside the mask
const PopTile = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(var(--tile) * 7);
  height: calc(var(--tile) * 7);
  transform: translate(-50%, -50%) rotateX(-10deg) rotateY(8deg) scale(1.12);
  transform-style: preserve-3d;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: 0 35px 70px rgba(0, 0, 0, 0.4);
  z-index: 3;
  @media (max-width: 600px) {
    width: calc(var(--tile) * 5.5);
    height: calc(var(--tile) * 5.5);
    transform: translate(-50%, -50%) rotateX(-6deg) rotateY(6deg) scale(1.1);
  }
`;

// Large conic-gradient circle placed behind the LOVE word
const MedicineWheel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: clamp(340px, 55vw, 700px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: conic-gradient(
    #f5e04b 0deg 90deg,   /* Yellow */
    #d33a2c 90deg 180deg, /* Red */
    #1a1a1a 180deg 270deg,/* Black */
    #ffffff 270deg 360deg /* White */
  );
  opacity: 0.15;
  pointer-events: none;
  filter: drop-shadow(0 8px 18px rgba(0,0,0,0.1));
  z-index: 0;
`;

export default function LoveMosaic() {
  const [active, setActive] = useState(null);
  const popRef = useRef();
  const gapRef = useRef();

  useEffect(() => {
    const cycle = () => {
      const next = Math.floor(Math.random() * tiles.length);
      setActive(next);

      // Pop-out shows for 3.5 s, then retracts
      popRef.current = setTimeout(() => {
        setActive(null);
        // 1.5-second gap before next
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
    <Wrapper
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <MedicineWheel />
      <LayoutGroup>
        <Mosaic>
          {tiles.map((src, i) => (
            <Tile
              key={i}
              layoutId={`tile-${i}`}
              style={{ backgroundImage: `url(${src})` }}
              $hidden={active !== null && i === active}
            />
          ))}
        </Mosaic>

        {/* Pop-out overlay */}
        <AnimatePresence mode="wait">
          {active !== null && (
            <PopTile
              key={`pop-${active}`}
              layoutId={`tile-${active}`}
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