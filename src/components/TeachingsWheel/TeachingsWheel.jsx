import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const bear = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431659/bear_fkrsts.png';
const beaver = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431659/beaver_w7q6k2.png';
const buffalo = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431660/buffalo_ervhuw.png';
const eagle = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431660/eagle_wmajiu.png';
const raven = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431660/raven_yvebyp.png';
const turtle = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431660/eagle_wmajiu.png';
const wolf = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431662/wolf_kerexd.png';
const kokopelli = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431541/kokopelli_j7olov.png';

const teachings = [
  { name: 'Wisdom', animal: 'Beaver', img: beaver, desc: 'Use your gifts wisely and build for the future.', video:'S7wbE9YJ5_o' },
  { name: 'Love', animal: 'Eagle', img: eagle, desc: 'Let your heart soar and care for all creation.', video:'pOPpCWAdsiU' },
  { name: 'Respect', animal: 'Buffalo', img: buffalo, desc: 'Honor the earth and give selflessly.', video:'5ZCE5wUzqZM' },
  { name: 'Bravery', animal: 'Bear', img: bear, desc: 'Face challenges with courage.', video:'duNnuC86pmE' },
  { name: 'Honesty', animal: 'Sabe', img: raven, desc: 'Walk tall and speak truth.', video:'gcyswnThOH8' },
  { name: 'Humility', animal: 'Wolf', img: wolf, desc: 'Know your place in the great circle and value the pack over self.', video:'0x32iacMyvk' },
  { name: 'Truth', animal: 'Turtle', img: turtle, desc: 'Carry the teachings with you every day.', video:'1lb8WQX3bCE' },
];

// Culturally relevant colours for each teaching (matches order in teachings[])
const ringColours = ['#5b92e5', '#d4af37', '#8b572a', '#333333', '#6d6d6d', '#c0c0c0', '#2e8b57'];

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

const Center = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props)=>props.$icon*1.2}px;
  height: ${(props)=>props.$icon*1.2}px;
  border-radius: 50%;
  background: var(--primary-red);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(200,16,46,0.3);
  border: none;
  cursor: pointer;
  img{width:65%;height:65%;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));}
`;

const LinesSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  stroke: var(--secondary-brown,#8b6f47);
  stroke-width: 2;
  stroke-dasharray: 4 4;
  opacity: 0.25;
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
  const icon = size * 0.26; // slightly larger icons
  const radius = center - icon / 2 - 10;

  // Pre-compute icon centres for lines
  const positions = teachings.map((_, i) => {
    const angle = (i / teachings.length) * 2 * Math.PI - Math.PI/2;
    const cx = center + radius * Math.cos(angle);
    const cy = center + radius * Math.sin(angle);
    return { cx, cy };
  });

  return (
    <WheelWrapper>
      <Wheel role="list" $size={size}>
        {/* connecting dashed lines */}
        <LinesSvg viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          {positions.map((p, idx) => (
            <line key={idx} x1={center} y1={center} x2={p.cx} y2={p.cy} />
          ))}
        </LinesSvg>

        {/* central Kokopelli */}
        <Center $icon={icon} aria-label="Kokopelli – Joy">
          <img src={kokopelli} alt="" />
        </Center>

        {/* animal icons */}
        {teachings.map((t, i) => {
          const { cx, cy } = positions[i];
          const x = cx - icon / 2;
          const y = cy - icon / 2;
          return (
            <Icon
              key={t.name}
              style={{ left: x, top: y, border: `3px solid ${ringColours[i]}` }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => onSelect && onSelect({ title: `${t.name} – ${t.animal}`, quote: t.desc, video: t.video })}
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