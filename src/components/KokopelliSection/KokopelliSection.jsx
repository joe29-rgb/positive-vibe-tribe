import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import KokopelliStoryBeats from './KokopelliStoryBeats';

const kokopelliImg = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431541/kokopelli_j7olov.png';

const Section = styled.section`
  position: relative;
  padding: 6rem 2rem;
  background: linear-gradient(135deg,#f8f4f0 0%,#e8ddd4 100%);
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.618fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px){
    grid-template-columns: 1fr;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  place-self: center;

  &::before{
    content:'';
    position:absolute;
    inset:-8%;
    border-radius:50%;
    background: radial-gradient(circle,#fff6e0 0%,rgba(255,246,224,0) 70%);
    z-index:-1;
  }
`;

const HeroImg = styled.img`
  width:100%;
  height:100%;
  object-fit:cover;
`;

const Heading = styled.h2`
  font-family:'Playfair Display',serif;
  font-size:clamp(2.5rem,5vw,4rem);
  color:#c8102e;
  margin:0 0 1.5rem;
`;

const Subtitle = styled.p`
  font-family:'Inter',sans-serif;
  font-size:clamp(1.2rem,2vw,1.6rem);
  color:#2c1810;
  line-height:1.6;
  max-width:600px;
  margin-bottom:2rem;
`;

export default function KokopelliSection({ onSelect, story, videoId }){
  const handleClick = ()=>{
    onSelect && onSelect({
      name:'Kokopelli – Joy',
      ojibwe:'',
      animal:'',
      desc:'Celebrating abundance, music, and the playful spirit that unites us.',
      story,
      video: videoId,
      img: kokopelliImg,
      color:'#c8102e'
    });
  };

  return (
    <Section id="kokopelli">
      <ContentGrid>
        <ImageWrap as={motion.div} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <HeroImg src={kokopelliImg} alt="Kokopelli silhouette" onClick={handleClick} style={{cursor:'pointer'}}/>
        </ImageWrap>
        <div>
          <Heading>Kokopelli – Messenger of Joy</Heading>
          <Subtitle>
            Kokopelli carries music and laughter across the land, reminding us to spread abundance wherever we roam.
          </Subtitle>
          <motion.button whileHover={{scale:1.05}} whileTap={{scale:0.95}} className="btn btn-gradient" onClick={handleClick}>
            Hear His Story
          </motion.button>
        </div>
      </ContentGrid>
      <KokopelliStoryBeats />
    </Section>
  );
} 