import React, { useState } from 'react';
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
  font-size: var(--fs-lg);
  line-height: 1.6;
  position: relative;
  &:before {
    content: '“';
    font-family: serif;
    position: absolute;
    top: -10px;
    left: 12px;
    font-size: var(--fs-5xl);
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

function QuoteCard({ t }) {
  const [open, setOpen] = useState(false);
  const short = t.quote.length > 120 && !open;
  const display = short ? t.quote.slice(0, 120) + '…' : t.quote;
  return (
    <Card data-hover="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }}>
      {display}
      {t.quote.length > 120 && (
        <button onClick={() => setOpen(!open)} style={{background:'none',border:'none',color:'var(--primary-red)',cursor:'pointer',marginTop:8,fontSize:'0.875rem'}}>
          {open ? 'Read less' : 'Read more'}
        </button>
      )}
      <Cite>— {t.name}</Cite>
    </Card>
  );
}

function Testimonials() {
  return (
    <Carousel>
      {testimonials.map((t) => (
        <QuoteCard key={t.name} t={t} />
      ))}
    </Carousel>
  );
}

export default Testimonials; 