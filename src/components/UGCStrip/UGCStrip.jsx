import React from 'react';
import styled from 'styled-components';

const photos = [
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750795564/IMG_20250612_105309_dquhjm.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750795856/IMG_20250624_140048_niri2p.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750795822/IMG_20250624_140001_ococex.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750796000/IMG_20250624_140246_dzgtlg.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750793008/look6_sacx1i.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750793005/look5_gk9ufg.jpg',
  'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750793010/look7_i8csvt.jpg',
];

const Wrapper = styled.section`
  padding: 60px 0;
  background: #fff;
  overflow-x: auto;
`;

const Track = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 20px;
  width: max-content;
`;

const Thumb = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  flex-shrink: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 90;
`;

const ModalImg = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
`;

export default function UGCStrip() {
  const [active, setActive] = React.useState(null);

  return (
    <Wrapper>
      <Track>
        {photos.concat(photos).map((src, i) => (
          <Thumb key={i} src={src} alt="Tribe member" loading="lazy" onClick={() => setActive(src)} />
        ))}
      </Track>

      {active && (
        <ModalOverlay onClick={() => setActive(null)}>
          <ModalImg src={active} alt="Tribe member" />
        </ModalOverlay>
      )}
    </Wrapper>
  );
} 