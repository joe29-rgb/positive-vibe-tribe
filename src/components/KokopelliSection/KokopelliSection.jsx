import React from 'react';
import styled from 'styled-components';
import KokopelliCollage from './KokopelliCollage';
import kokopelliLocal from '../../assets/kokopelli.png';
import look1 from '../../assets/kokopelli-collage/kokopelli-1.png';
import look2 from '../../assets/kokopelli-collage/kokopelli-2.png';
import look3 from '../../assets/kokopelli-collage/kokopelli-3.png';
import look4 from '../../assets/kokopelli-collage/kokopelli-4.png';
import look5 from '../../assets/kokopelli-collage/kokopelli-5.png';

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
        {img:look1,title:'Chapter 1: The Arrival',text:'A haunting flute melody heralds Kokopelli\'s arrival, bringing hope to a thirsty land.'},
        {img:look2,title:'Chapter 2: The Gifts',text:'He scatters seeds of wisdom, laughter, and kindness—blooming wherever his shadow falls.'},
        {img:look3,title:'Chapter 3: Trickster\'s Lessons',text:'Playful mischief teaches that laughter is medicine and life should never be too serious.'},
        {img:look4,title:'Chapter 4: The Seven Teachings',text:'Around a great fire he weaves the sacred teachings of Wisdom, Love, Respect, Bravery, Honesty, Humility, and Truth.'},
        {img:look5,title:'Chapter 5: The Legacy',text:'At dawn he departs, reminding us to plant these teachings in our hearts and spread abundance.'},
      ]} />
    </Section>
  );
} 