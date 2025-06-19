import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Emily, Treaty 6',
    quote:
      'My Positive Vibe Tribe hoodie sparks conversations everywhere I go. It feels good knowing my purchase supports Indigenous youth.',
  },
  {
    name: 'Jonah, Mi\'kma\'ki',
    quote:
      'The quality is unreal and the teachings card reminded me to lead with love. 10/10 brand with purpose.',
  },
  {
    name: 'Sasha, Vancouver',
    quote:
      'Finally a company walking the talk. The subtle symbols are gorgeous and I feel part of something bigger.',
  },
];

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  scroll-snap-type: x mandatory;
  padding-bottom: 8px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled(motion.blockquote)`
  flex: 0 0 80vw;
  max-width: 500px;
  background: linear-gradient(#fff, #fdf9f5);
  padding: 2rem 1.5rem;
  border-radius: 12px;
  scroll-snap-align: start;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  font-size: 1.125rem;
  line-height: 1.6;
  position: relative;
  &:before {
    content: '“';
    font-family: serif;
    position: absolute;
    top: -10px;
    left: 12px;
    font-size: 4rem;
    color: var(--primary-color, #2d4a3e);
    opacity: 0.15;
  }
`;

const Cite = styled.cite`
  display: block;
  margin-top: 1rem;
  font-style: normal;
  font-weight: 600;
  color: var(--primary-color, #2d4a3e);
`;

function Testimonials() {
  return (
    <Carousel>
      {testimonials.map((t) => (
        <Card key={t.name} data-hover="card">
          {t.quote}
          <Cite>— {t.name}</Cite>
        </Card>
      ))}
    </Carousel>
  );
}

export default Testimonials; 