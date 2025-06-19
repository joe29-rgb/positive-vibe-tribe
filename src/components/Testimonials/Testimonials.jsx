import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const testimonials=[
  {name:'Ashley M.',quote:'The Positive Vibe Tribe hoodie is my new favourite—super comfy and people keep asking about the design!'},
  {name:'Jordan T.',quote:'Love the subtle teachings sewn into every piece. It feels good to wear clothing with real meaning.'},
  {name:'Kaitlyn R.',quote:'Fast shipping, great quality, and I dig the mission behind the brand. Highly recommend.'},
];

const Carousel=styled.div`
  display:flex;
  gap:24px;
  overflow-x:auto;
  scroll-snap-type:x mandatory;
  -webkit-overflow-scrolling:touch;
  padding-bottom:8px;
  scrollbar-width:none;
  &::-webkit-scrollbar{display:none;}
`;

const Card=styled(motion.div)`
  flex:0 0 80vw;
  max-width:500px;
  background:#fff;
  background:linear-gradient(#fff,#fdf9f5);
  border-radius:12px;
  box-shadow:0 8px 24px rgba(0,0,0,0.07);
  padding:2rem 1.5rem;
  scroll-snap-align:start;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
`;

const Quote=styled.p`
  font-size:1.125rem;
  line-height:1.7;
  margin:0 0 1.25rem;
`;

const Name=styled.span`
  font-weight:600;
  font-size:1rem;
  color:var(--primary-color,#2d4a3e);
`;

function Testimonials(){
  return(
    <Carousel>
      {testimonials.map(t=>(
        <Card key={t.name} whileHover={{scale:1.04}} transition={{type:'spring',stiffness:200,damping:20}}>
          <Quote>“{t.quote}”</Quote>
          <Name>{t.name}</Name>
        </Card>
      ))}
    </Carousel>
  );
}

export default Testimonials; 