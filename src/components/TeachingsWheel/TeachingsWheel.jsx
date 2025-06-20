import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const bear = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431659/bear_fkrsts.png';
const beaver = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431659/beaver_w7q6k2.png';
const buffalo = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431660/buffalo_ervhuw.png';
const eagle = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431660/eagle_wmajiu.png';
const raven = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431660/raven_yvebyp.png';
const turtle = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431663/turtle_zuok1v.png';
const wolf = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431662/wolf_kerexd.png';
const kokopelli = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431541/kokopelli_j7olov.png';

const teachings = [
  { name: 'Wisdom', ojibwe:'Nbwaakaawin', animal: 'Beaver', img: beaver, desc: 'Use your gifts wisely and build for the future.', video:'S7wbE9YJ5_o' },
  { name: 'Love', ojibwe:'Zaagii\'idiwin', animal: 'Eagle', img: eagle, desc: 'Let your heart soar and care for all creation.', video:'pOPpCWAdsiU' },
  { name: 'Respect', ojibwe:'Mnaadendimowin', animal: 'Buffalo', img: buffalo, desc: 'Honor the earth and give selflessly.', video:'5ZCE5wUzqZM' },
  { name: 'Bravery', ojibwe:'Aakode\'ewin', animal: 'Bear', img: bear, desc: 'Face challenges with courage.', video:'duNnuC86pmE' },
  { name: 'Honesty', ojibwe:'Gwekwaadziwin', animal: 'Sabe', img: raven, desc: 'Walk tall and speak truth.', video:'gcyswnThOH8' },
  { name: 'Humility', ojibwe:'Dbaadendiziwin', animal: 'Wolf', img: wolf, desc: 'Know your place in the great circle and value the pack over self.', video:'0x32iacMyvk' },
  { name: 'Truth', ojibwe:'Debwewin', animal: 'Turtle', img: turtle, desc: 'Carry the teachings with you every day.', video:'1lb8WQX3bCE' },
];

// Animation keyframes for line draw
const draw = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 1.2, ease: 'easeInOut' } },
};

// Culturally relevant colours for each teaching (matches order in teachings[])
const ringColours = ['#5b92e5', '#d4af37', '#8b572a', '#333333', '#6d6d6d', '#c0c0c0', '#2e8b57'];

const WheelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Wheel = styled(motion.div)`
  position: relative;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.15) 100%);
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle, #f8f4e9 0%, rgba(248,244,233,0) 85%);
    z-index: -1;
  }
`;

const Icon = styled(motion.button)`
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
      box-shadow: 0 0 0 4px var(--lux-gold, #ffd98b);
    `}
  &:focus-visible { outline: 2px solid var(--lux-gold); outline-offset: 2px; }
  img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
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

// Animated outer ring path length
const OuterRing = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--secondary-brown,#8b6f47);
  pointer-events:none;
`;

const ringDraw = {
  hidden:{scale:0.8,opacity:0},
  visible:{scale:1,opacity:0.25,transition:{duration:1,ease:'easeOut'}},
};

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
  const icon = size * 0.26; // default icon diameter
  const hoverScale = 1.2; // grows to 120% (≈ Kokopelli size)
  const radius = center - (icon * hoverScale) / 2 - 10; // ensure even gap even when hovered

  // Pre-compute icon centres for lines
  const positions = teachings.map((_, i) => {
    const angle = (i / teachings.length) * 2 * Math.PI - Math.PI/2;
    const cx = center + radius * Math.cos(angle);
    const cy = center + radius * Math.sin(angle);
    return { cx, cy };
  });

  const vw = window.innerWidth;
  const isCarousel = vw >= 340 && vw < 480;

  if (isCarousel) {
    const card = 180;
    const prevIdx = (active + teachings.length - 1) % teachings.length;
    const nextIdx = (active + 1) % teachings.length;

    const handleSwipe = (_, info) => {
      if (info.offset.x < -50) setActive(nextIdx);
      if (info.offset.x > 50) setActive(prevIdx);
    };

    const renderCard = (idx, pos) => {
      const t = teachings[idx];
      const isCenter = pos === 0;
      const positions = { '-1': -120, 0: 0, '1': 120 };
      return (
        <motion.div
          key={idx}
          initial={false}
          animate={{
            x: positions[pos],
            scale: isCenter ? 1 : 0.75,
            filter: isCenter ? 'blur(0px)' : 'blur(4px)',
            opacity: isCenter ? 1 : 0.4,
            zIndex: isCenter ? 2 : 1,
          }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: card,
            height: card,
            marginLeft: -card / 2,
            cursor: 'pointer',
          }}
          onClick={() => {
            if (isCenter) {
              onSelect &&
                onSelect({ idx, name: t.name, ojibwe: t.ojibwe, animal: t.animal, desc: t.desc, video: t.video, img: t.img, color: ringColours[idx] });
            } else {
              setActive(idx);
            }
          }}
        >
          <img
            src={t.img}
            alt=""
            style={{ width: '100%', height: '100%', borderRadius: '50%', border: `4px solid ${ringColours[idx]}`, objectFit: 'cover' }}
          />
        </motion.div>
      );
    };

    return (
      <WheelWrapper style={{ height: 200 }}>
        <motion.div
          style={{ position: 'relative', width: '100%', height: 180 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleSwipe}
        >
          {renderCard(prevIdx, -1)}
          {renderCard(active, 0)}
          {renderCard(nextIdx, 1)}
        </motion.div>
        <Info aria-live="polite" style={{ marginTop: 16 }}>
          <InfoTitle style={{ color: ringColours[active] }}>{teachings[active].name} ({teachings[active].ojibwe}) – {teachings[active].animal}</InfoTitle>
          <InfoText>{teachings[active].desc}</InfoText>
        </Info>
      </WheelWrapper>
    );
  }

  if (size < 340) {
    return (
      <WheelWrapper>
        {teachings.map((t,i)=>(
          <div key={t.name} style={{display:'flex',alignItems:'center',gap:16,marginBottom:24}}>
            <img src={t.img} alt="" width={68} height={68} style={{borderRadius:'50%',border:`3px solid ${ringColours[i]}`,objectFit:'cover'}} />
            <div>
              <strong style={{color:ringColours[i]}}>{t.name} ({t.ojibwe})</strong>
              <p style={{margin:0,fontSize:'0.9rem'}}>{t.desc}</p>
            </div>
          </div>
        ))}
      </WheelWrapper>
    );
  }

  return (
    <WheelWrapper>
      <Wheel role="list" $size={size} initial="hidden" whileInView="visible" viewport={{once:true,amount:0.3}}>
        <OuterRing variants={ringDraw} initial="hidden" animate="visible" />
        {/* connecting dashed lines */}
        <LinesSvg viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          {positions.map((p, idx) => (
            <motion.line key={idx} x1={center} y1={center} x2={p.cx} y2={p.cy} variants={draw} />
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
              aria-describedby="teaching-info"
              onClick={() => onSelect && onSelect({
                idx: i,
                name: t.name,
                ojibwe: t.ojibwe,
                animal: t.animal,
                desc: t.desc,
                video: t.video,
                img: t.img,
                color: ringColours[i]
              })}
              $active={active === i}
              $icon={icon}
              role="listitem"
              aria-label={`${t.name} – ${t.animal}`}
              whileHover={{ scale: hoverScale, zIndex: 3 }}
              variants={{ hidden:{opacity:0,scale:0.6}, visible:{opacity:1,scale:1, transition:{duration:0.4}} }}
            >
              <img src={t.img} alt="" />
            </Icon>
          );
        })}
      </Wheel>
      <Info aria-live="polite" id="teaching-info">
        <InfoTitle style={{color:ringColours[active]}}>
          {teachings[active].name} ({teachings[active].ojibwe}) – {teachings[active].animal}
        </InfoTitle>
        <InfoText>{teachings[active].desc}</InfoText>
      </Info>
    </WheelWrapper>
  );
} 