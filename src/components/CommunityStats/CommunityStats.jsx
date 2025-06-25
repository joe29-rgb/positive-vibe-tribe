import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';
import { motionOK } from '../../utils/motion';

const Section = styled.section`
  background: #fff;
  padding: 60px 20px;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;
const Heading = styled.h2`
  font-size: var(--fs-2xl);
  margin-bottom: 32px;
  font-family: 'UnifrakturCook', cursive;
  color: var(--dark-brown);
`;
const Grid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const NumberWrap = styled(motion.span)`
  font-size: var(--fs-2xl);
  font-weight: 700;
  color: var(--primary-red);
`;
const Label = styled.span`
  font-size: var(--fs-sm);
  color: var(--medium-gray);
`;

function CommunityStats() {
  return (
    <Section>
      <Container>
        <Heading>The Tribe in Numbers</Heading>
        <Grid>
          <StatItem value={2500} suffix="+" label="Tribe Members" />
          <StatItem value={98} suffix="%" label="Satisfaction Rate" />
          <StatItem value={15000} prefix="$" suffix="+" label="Donated to Indigenous Communities" />
        </Grid>
      </Container>
    </Section>
  );
}

function StatItem({ value, prefix = '', suffix = '', label }) {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  React.useEffect(() => {
    if (!motionOK()) return; // skip animation for reduced motion
    if (inView) {
      controls.start({ val: value, transition: { duration: 1.4, ease: 'easeOut' } });
    }
  }, [inView, value, controls]);

  return (
    <Item ref={ref}>
      {motionOK() ? (
        <NumberWrap animate={controls} initial={{ val: 0 }}>
          {({ val }) => `${prefix}${Math.round(val).toLocaleString()}${suffix}`}
        </NumberWrap>
      ) : (
        <NumberWrap>{`${prefix}${value.toLocaleString()}${suffix}`}</NumberWrap>
      )}
      <Label>{label}</Label>
    </Item>
  );
}

export default CommunityStats; 