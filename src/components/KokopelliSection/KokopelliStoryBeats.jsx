import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import look3 from '../../assets/collage/look3.jpg';
import look7 from '../../assets/collage/look7.jpg';
import look5 from '../../assets/collage/look5.jpg';

const Wrapper = styled.section`
  position: relative;
  background: linear-gradient(180deg,#fff 0%,#faf7f3 100%);
  overflow:hidden;
`;

const PatternLayer = styled.div`
  position:absolute;
  inset:0;
  background-image:url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23e8ddd4' stroke-width='0.5'/%3E%3C/svg%3E");
  background-size:160px 160px;
  opacity:0.06;
  pointer-events:none;
  transform:translateY(var(--offset,0px));
`;

const Beat = styled(motion.div)`
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  padding:4rem 1.5rem;
  text-align:center;
`;

const Img = styled.img`
  width:100%;
  max-width:480px;
  border-radius:16px;
  box-shadow:0 8px 32px rgba(0,0,0,0.1);
  margin-bottom:2rem;
`;

const H3 = styled.h3`
  font-family:'Playfair Display',serif;
  font-size:clamp(1.75rem,4vw,2.5rem);
  color:#c8102e;
  margin-bottom:1rem;
`;

const P = styled.p`
  font-family:'Inter',sans-serif;
  font-size:1.125rem;
  line-height:1.7;
  max-width:600px;
  color:#2c1810;
`;

export default function KokopelliStoryBeats(){
  const beats=[
    {img:look3,title:'Seeds of Abundance',text:'Kokopelli travels the prairies, scattering seeds of joy that bloom wherever kindness is shown.'},
    {img:look7,title:'Song Across Turtle Island',text:'His flute carries laughter from canyon walls to northern forests, uniting diverse Nations in music.'},
    {img:look5,title:'Dance of Renewal',text:'With Spring rains, Kokopelli dances, reminding us that renewal begins with playful gratitude.'},
  ];

  return (
    <Wrapper>
      <PatternLayer as={motion.div} style={{'--offset':'-80px'}} initial={{y:0}} whileInView={{y:160}} viewport={{once:false}} />
      {beats.map((b,i)=>(
        <Beat key={i} className="scroll-animate" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.3}} transition={{duration:0.8}}>
          <Img src={b.img} alt={b.title} />
          <H3>{b.title}</H3>
          <P>{b.text}</P>
        </Beat>
      ))}
    </Wrapper>
  );
} 