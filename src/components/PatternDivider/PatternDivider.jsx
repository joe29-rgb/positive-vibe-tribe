import React from 'react';
import styled from 'styled-components';

const Strip = styled.div`
  width: 100%;
  height: 14px;
  background-image: url("data:image/svg+xml,%3Csvg width='64' height='14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 14h16L8 0zM16 14h16l-8-14zM32 14h16l-8-14zM48 14h16l-8-14z' fill='%23c8102e'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
`;

export default function PatternDivider() {
  return <Strip aria-hidden="true" />;
} 