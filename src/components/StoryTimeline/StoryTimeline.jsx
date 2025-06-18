import React from 'react';
import styled from 'styled-components';
import LazyImage from '../LazyImage/LazyImage';
import look1 from '../../assets/collage/look1.jpg';
import look3 from '../../assets/collage/look3.jpg';
import look4 from '../../assets/collage/look4.jpg';
import look5 from '../../assets/collage/look5.jpg';
import founderPortrait from '../../assets/founder-portrait.png';

const events = [
  {
    title: 'Airport Epiphany',
    subtitle: 'Love for No Reason',
    quote: '“If people can hate for no reason, I can love for no reason.” A spontaneous act of kindness in San Antonio sparked our entire movement.',
    img: founderPortrait,
  },
  {
    title: 'Hidden Positivity',
    subtitle: 'A Decal\'s Lesson',
    quote: 'Positivity is everywhere—just like a subtle decal, sometimes you have to look a little harder to see it.',
    img: look3,
  },
  {
    title: 'First Hoodie Run',
    subtitle: 'Treaty 6, Edmonton',
    quote:
      'A 24-piece batch sold out in three hours, proving the world was hungry for positivity-rich apparel.',
    img: look4,
  },
  {
    title: 'Seven Teachings Partnership',
    subtitle: 'Elders & Knowledge Keepers',
    quote:
      'We embedded Anishinaabe teachings into every tag, pledging reciprocity with the communities who share their wisdom.',
    img: look5,
  },
  {
    title: 'Ripple Effect',
    subtitle: 'Today & Beyond',
    quote:
      'Over $10k donated, 1K teaching cards shipped, and a growing Tribe spanning 13 provinces & territories.',
    img: look1,
  },
];

const TimelineWrap = styled.div`
  overflow-x: auto;
  display: flex;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 0;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Panel = styled.div`
  position: relative;
  flex: 0 0 100vw;
  height: 80vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  overflow: hidden;
`;

const Bg = styled(LazyImage)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
`; 

const Copy = styled.div`
  position: relative;
  z-index: 2;
  max-width: 640px;
  text-align: center;
  padding: 0 20px;
`;

const Title = styled.h3`
  font-family: 'UnifrakturCook', cursive;
  font-size: clamp(1.75rem, 4vw, 3rem);
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-family: var(--font-secondary);
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const Quote = styled.blockquote`
  font-family: var(--font-primary);
  font-size: clamp(1.125rem, 2.5vw, 1.75rem);
  line-height: 1.6;
  font-style: italic;
`;

function StoryTimeline() {
  return (
    <TimelineWrap>
      {events.map((ev) => (
        <Panel key={ev.title}>
          <Bg src={ev.img} alt="story background" loading="lazy" />
          <Copy>
            <Title>{ev.title}</Title>
            <Subtitle>{ev.subtitle}</Subtitle>
            <Quote>{ev.quote}</Quote>
          </Copy>
        </Panel>
      ))}
    </TimelineWrap>
  );
}

export default StoryTimeline; 