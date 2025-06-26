import React from 'react';
import styled from 'styled-components';

const Strip = styled.div`
  width: 100%;
  height: 12px;
  opacity: 0.45;
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12h16L8 0zM16 12h16l-8-12zM32 12h16l-8-12zM48 12h16l-8-12z' fill='%23BF5A26'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  mix-blend-mode: multiply;
`;

export default function PatternDivider() {
  return <Strip aria-hidden="true" />;
} 