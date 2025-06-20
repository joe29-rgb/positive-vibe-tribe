import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import bear from '../../assets/teachings/bear.png';
import beaver from '../../assets/teachings/beaver.png';
import buffalo from '../../assets/teachings/buffalo.png';
import eagle from '../../assets/teachings/eagle.png';
import raven from '../../assets/teachings/raven.png';
import turtle from '../../assets/teachings/turtle.png';
import wolf from '../../assets/teachings/wolf.png';

const teachings = [
  { name: 'Wisdom', animal: 'Beaver', img: beaver, desc: 'Use your gifts wisely and build for the future.' },
  { name: 'Love', animal: 'Eagle', img: eagle, desc: 'Let your heart soar and care for all creation.' },
  { name: 'Respect', animal: 'Buffalo', img: buffalo, desc: 'Honor the earth and give selflessly.' },
  { name: 'Bravery', animal: 'Bear', img: bear, desc: 'Face challenges with courage.' },
  { name: 'Honesty', animal: 'Sabe', img: raven, desc: 'Walk tall and speak truth.' },
  { name: 'Humility', animal: 'Wolf', img: wolf, desc: 'Know your place in the great circle and value the pack over self.' },
  { name: 'Truth', animal: 'Turtle', img: turtle, desc: 'Carry the teachings with you every day.' },
];

const WheelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Wheel = styled.div`
  position: relative;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.15) 100%);
`;

const Icon = styled.button`
  position: absolute;
  width: ${(props) => props.$icon}px;
  height: ${(props) => props.$icon}px;
  border: none;
  padding: 0;
  background: transparent;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  ${(props) =>
    props.$active &&
    css`
      transform: scale(1.15);
      box-shadow: 0 0 0 4px var(--lux-gold, #ffd98b);
    `}
  &:focus-visible { outline: 2px solid var(--lux-gold); outline-offset: 2px; }
  img { width: 100%; height: 100%; object-fit: contain; }
`;

const Info = styled.div`
  margin-top: 1.5rem;
  max-width: 380px;
  text-align: center;
`;
const InfoTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: var(--primary-red);
`;
const InfoText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: var(--dark-brown);
`;

export default function TeachingsWheel({ onSelect }) {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(320);

  React.useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      if (vw < 480) setSize(260);
      else if (vw < 768) setSize(320);
      else setSize(480);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const center = size / 2;
  const icon = size * 0.22; // proportionally scale icon
  const radius = center - icon / 2 - 10;

  return (
    <WheelWrapper>
      <Wheel role="list" $size={size}>
        {teachings.map((t, i) => {
          const angle = (i / teachings.length) * 2 * Math.PI - Math.PI/2;
          const x = center + radius * Math.cos(angle) - 36; // 36 half icon
          const y = center + radius * Math.sin(angle) - 36;
          return (
            <Icon
              key={t.name}
              style={{ left: x, top: y }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => onSelect && onSelect({ title: `${t.name} – ${t.animal}`, quote: t.desc })}
              $active={active === i}
              $icon={icon}
              aria-label={`${t.name} – ${t.animal}`}
            >
              <img src={t.img} alt="" />
            </Icon>
          );
        })}
      </Wheel>
      <Info aria-live="polite">
        <InfoTitle>{teachings[active].name} – {teachings[active].animal}</InfoTitle>
        <InfoText>{teachings[active].desc}</InfoText>
      </Info>
    </WheelWrapper>
  );
} 