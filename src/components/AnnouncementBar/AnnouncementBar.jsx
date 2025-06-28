import React from 'react';
import styled, { keyframes } from 'styled-components';

const slide = keyframes`
  0%{transform:translateY(0%);} 33%{transform:translateY(-100%);} 66%{transform:translateY(-200%);} 100%{transform:translateY(-300%);}
`;

const Bar = styled.div`
  background: var(--primary-red);
  color: #fff;
  font-size: var(--fs-sm);
  height: 36px;
  overflow: hidden;
  position: relative;
`;

const Track = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: ${slide} 12s cubic-bezier(0.4,0,0.2,1) infinite;
`;

function AnnouncementBar(){
  const msgs=[
    'Free shipping on orders over $100',
    '10% of profits go to Treaty 6 Youth',
    'New Kokopelli SS25 Hoodies just dropped',
  ];
  return (
    <Bar aria-label="Site announcements">
      <Track>
        {msgs.concat(msgs[0]).map(m=> <span key={m} style={{height:36,display:'flex',alignItems:'center',justifyContent:'center',padding:'0 16px'}}>{m}</span>)}
      </Track>
    </Bar>
  );
}

export default AnnouncementBar; 