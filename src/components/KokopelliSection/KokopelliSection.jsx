import React from 'react';
import styled from 'styled-components';
import KokopelliCollage from './KokopelliCollage';
import kokopelliLocal from '../../assets/kokopelli.png';

const kokopelliImg = kokopelliLocal;

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

const urls = {
  one: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750789108/kokopelli-1_ykngib.png',
  two: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750789109/kokopelli-2_ww1kop.png',
  three: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750789110/kokopelli-3_hpwpxa.png',
  four: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750789112/kokopelli-4_vqwllc.png',
  five: 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750789108/kokopelli-5_zrhhts.png',
};

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
    <Section>
      <ContentGrid>
        <ImageWrap>
          <HeroImg src={kokopelliImg} alt="Kokopelli" />
        </ImageWrap>
        <div>
          <Heading>Kokopelli – The Bringer of Joy</Heading>
          <Subtitle>
            A timeless symbol of abundance, music, and playful spirit. Journey with Kokopelli across the prairies and
            hoodoos of Turtle Island.
          </Subtitle>
          <button className="btn btn-gradient" onClick={handleClick}>Read the Legend</button>
        </div>
      </ContentGrid>

      {/* Collage with chapter snippets */}
      <KokopelliCollage chapters={[
        {img:urls.one,title:'Chapter 1: The Arrival',text:'A haunting flute melody heralds Kokopelli\'s arrival, bringing hope to a thirsty land.'},
        {img:urls.two,title:'Chapter 2: The Gifts',text:'He scatters seeds of wisdom, laughter, and kindness—blooming wherever his shadow falls.'},
        {img:urls.three,title:'Chapter 3: Trickster\'s Lessons',text:'Playful mischief teaches that laughter is medicine and life should never be too serious.'},
        {img:urls.four,title:'Chapter 4: The Seven Teachings',text:'Around a great fire he weaves the sacred teachings of Wisdom, Love, Respect, Bravery, Honesty, Humility, and Truth.'},
        {img:urls.five,title:'Chapter 5: The Legacy',text:'At dawn he departs, reminding us to plant these teachings in our hearts and spread abundance.'},
      ]} />
    </Section>
  );
} 