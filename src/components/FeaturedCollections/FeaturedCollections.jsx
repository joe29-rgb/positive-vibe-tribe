import React from 'react';
import styled from 'styled-components';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import look1 from '../../assets/collage/look1.jpg';
import look2 from '../../assets/collage/look2.jpg';
import look3 from '../../assets/collage/look3.jpg';

const Section = styled.section`
  background: #f5f1eb;
  padding: 80px 20px;
  position: relative;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;
const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 48px;
  font-family: 'UnifrakturCook', cursive;
  color: var(--dark-brown);
`;
const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
`;
const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;
const Img = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;
const Body = styled.div`
  padding: 24px;
  flex: 1;
`;
const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: var(--dark-brown);
`;
const Text = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 24px;
  color: var(--medium-gray);
`;

const PatternLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='160' height='160' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23e8ddd4' stroke-width='0.5'/%3E%3C/svg%3E");
  background-size: 160px 160px;
  opacity: 0.04;
  pointer-events: none;
`;

function FeaturedCollections() {
  const { scrollY } = useViewportScroll();
  const translateY = useTransform(scrollY, [0, 800], [0, -120]);

  return (
    <Section>
      <PatternLayer style={{ y: useTransform(scrollY, [0, 800], [0, -60]) }} />

      <Container>
        <Heading as={motion.h2} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
          Featured Collections
        </Heading>
        <Grid style={{ y: translateY }}>
          {[{img:look1,title:'The Kokopelli Capsule',text:'Joyful prints that celebrate abundance and music.'},
            {img:look2,title:'Wolfpack Essentials',text:'Gear up with pieces symbolising strength and unity.'},
            {img:look3,title:'Sky Dancer Series',text:'Bold turquoise palettes inspired by prairie sunsets.'}].map((c)=>(
              <Card key={c.title} whileHover={{ y:-6, boxShadow:'0 12px 28px rgba(0,0,0,0.12)' }}>
                <Img src={c.img} alt={c.title} />
                <Body>
                  <Title>{c.title}</Title>
                  <Text>{c.text}</Text>
                </Body>
              </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default FeaturedCollections; 