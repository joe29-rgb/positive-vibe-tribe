import React from 'react';
import styled from 'styled-components';

const Band = styled.div`
  width: 100%;
  height: 64px;
  background-image: url('/assets/ojibwe-divider.svg');
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