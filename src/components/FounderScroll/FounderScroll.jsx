import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import look3 from '../../assets/collage/look3.jpg';
import look7 from '../../assets/collage/look7.jpg';
const founderImg = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431546/founder_yjlzto.jpg';

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const Bg = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6));
  z-index: 0;
`;
const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 900px;
  text-align: center;
  color: #fff;
  padding: 0 20px;
`;
const Headline = styled.h2`
  font-family: 'UnifrakturCook', cursive;
  font-size: 3rem;
  margin-bottom: 1rem;
`;
const Para = styled.p`
  font-size: 1.125rem;
  line-height: 1.7;
`;

const chapters = [
  {
    bg: look3,
    title: 'An Airport Epiphany',
    text: '“If others can hate for no reason, I can love for no reason.”  A simple act of kindness in San Antonio revealed the philosophy that fuels Positive Vibe Tribe today.',
  },
  {
    bg: look7,
    title: 'Hidden Positivity',
    text: 'In Lethbridge, a tearful stranger discovered a subtle Positive Vibez decal—proof that quiet optimism can shine light in dark places.',
  },
  {
    bg: founderImg,
    title: 'Building a Movement',
    text: 'From Kokopelli\'s joyful seeds to Wolf-pack strength, our founder weaves Indigenous wisdom into garments that spark community connection.',
  },
];

export default function FounderScroll() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Progress dots */}
      <div style={{position:'fixed',right:24,top:'50%',transform:'translateY(-50%)',zIndex:50,display:'flex',flexDirection:'column',gap:12}}>
        {chapters.map((_,i)=>(<span key={i} style={{width:10,height:10,borderRadius:'50%',background:i===active?'var(--primary-red)':'rgba(255,255,255,0.4)'}} />))}
      </div>
      {chapters.map((c, idx) => {
        return (
          <Chapter key={idx} chapter={c} index={idx} refs={refs} setActive={setActive} />
        );
      })}
    </div>
  );
}

function Chapter({ chapter, index, refs, setActive }) {
  const ref = useRef(null);
  refs.current[index] = ref;
  const inView = useInView(ref, { amount: 0.6, once: false });

  React.useEffect(()=>{ if(inView) setActive(index); }, [inView,index,setActive]);

  return (
    <Section ref={ref}>
      <Bg src={chapter.bg} alt={chapter.title} initial={{scale:1.2}} whileInView={{scale:1}} transition={{duration:1.2,ease:'easeOut'}} />
      <Overlay />
      <Content initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} transition={{duration:0.8,ease:'easeOut'}}>
        <Headline>{chapter.title}</Headline>
        <Para>{chapter.text}</Para>
      </Content>
    </Section>
  );
} 