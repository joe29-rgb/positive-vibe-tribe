import React from 'react';
import styled from 'styled-components';

const Band = styled.div`
  width: 100%;
  height: 64px;
  background-image: url('https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750954435/pattern_euxzj6.png');
  background-repeat: repeat-x;
  background-size: auto 100%;
  mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%);
  @media (max-width: 600px) {
    height: 40px;
  }
`;

export default function OjibweDivider() {
  return <Band aria-hidden="true" />;
} 