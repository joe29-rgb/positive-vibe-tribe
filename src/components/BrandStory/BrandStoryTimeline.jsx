import React from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { buildSrcSet } from '../../utils/imageSrcSet';
import look3 from '../../assets/collage/look3.jpg';
import look4 from '../../assets/collage/look4.jpg';
import look5 from '../../assets/collage/look5.jpg';
import look1 from '../../assets/collage/look1.jpg';

const events = [
  { title: 'Airport Epiphany', copy: '“If others can hate for no reason, I can love for no reason.”', img: look3 },
  { title: 'First Hoodie Drop', copy: '24 pieces, sold-out in hours—proof the world was ready for positivity-rich apparel.', img: look4 },
  { title: 'Seven Teachings Pact', copy: 'We embed Anishinaabe wisdom into every tag and return 10 % to community youth.', img: look5 },
  { title: 'Ripple Effect', copy: '$15k donated, 2.5k Tribe members across 13 provinces & territories.', img: look1 },
];

const colours = ['#f5e04b', '#d33a2c', '#1a1a1a', '#ffffff'];

const Section = styled.section`
  position: relative;
  height: 400vh; /* 4 panels × 100vh */
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
`;

const Panel = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 60px 20px;
  align-items: center;
  color: var(--dark-brown);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 24px;
  }
`;

const Img = styled.img`
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.15);
`;

export default function BrandStoryTimeline() {
  const { scrollYProgress } = useScroll();
  const bg = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [...colours, colours[colours.length - 1]]);

  // Hook calls must be top-level, not in loops. For 4 panels:
  const t0x = useTransform(scrollYProgress, [0.0, 0.25], ['-100%', '0%']);
  const t0o = useTransform(scrollYProgress, [0.0, 0.15, 0.25], [0, 1, 0]);

  const t1x = useTransform(scrollYProgress, [0.25, 0.5], ['100%', '0%']);
  const t1o = useTransform(scrollYProgress, [0.25, 0.4, 0.5], [0, 1, 0]);

  const t2x = useTransform(scrollYProgress, [0.5, 0.75], ['-100%', '0%']);
  const t2o = useTransform(scrollYProgress, [0.5, 0.65, 0.75], [0, 1, 0]);

  const t3x = useTransform(scrollYProgress, [0.75, 1], ['100%', '0%']);
  const t3o = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 1, 0]);

  const transforms = [
    { x: t0x, opacity: t0o },
    { x: t1x, opacity: t1o },
    { x: t2x, opacity: t2o },
    { x: t3x, opacity: t3o },
  ];

  return (
    <Section id="brand-story">
      <Sticky style={{ background: bg }}>
        {events.map((ev, i) => (
          <Panel key={ev.title} style={transforms[i]}>
            <div>
              <h2 style={{ fontFamily: 'UnifrakturCook', fontSize: 'var(--fs-800)', marginBottom: '20px' }}>{ev.title}</h2>
              <p style={{ fontSize: 'var(--fs-400)', lineHeight: 1.6 }}>{ev.copy}</p>
            </div>
            <Img
              src={ev.img}
              alt={ev.title}
              loading="lazy"
              srcSet={buildSrcSet(ev.img, 900)}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Panel>
        ))}
      </Sticky>
    </Section>
  );
} 