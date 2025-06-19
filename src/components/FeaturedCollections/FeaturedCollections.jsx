import React from 'react';
import styled from 'styled-components';
import look1 from '../../assets/collage/look1.jpg';
import look2 from '../../assets/collage/look2.jpg';
import look3 from '../../assets/collage/look3.jpg';

const Section = styled.section`
  background: #f5f1eb;
  padding: 80px 20px;
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
const Grid = styled.div`
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

function FeaturedCollections() {
  return (
    <Section id="collections">
      <Container>
        <Heading>Sacred Collections for the Modern Tribe</Heading>
        <Grid>
          <Card>
            <Img src={look1} alt="Kokopelli Collection" loading="lazy" />
            <Body>
              <Title>Kokopelli Collection</Title>
              <Text>
                Traditional fertility symbols meet contemporary comfort. Pieces designed to bring abundance
                and positive energy to your daily journey.
              </Text>
              <a href="/collections/kokopelli" className="btn btn-gradient">Explore Abundance</a>
            </Body>
          </Card>
          <Card>
            <Img src={look2} alt="Wolf Pack Essentials" loading="lazy" />
            <Body>
              <Title>Wolf Pack Essentials</Title>
              <Text>
                Leadership-inspired basics that embody strength, loyalty, and intuitive wisdom from ancient
                wolf teachings.
              </Text>
              <a href="/collections/wolf-pack" className="btn btn-gradient">Join the Pack</a>
            </Body>
          </Card>
          <Card>
            <Img src={look3} alt="Sacred Geometry" loading="lazy" />
            <Body>
              <Title>Sacred Geometry Line</Title>
              <Text>
                Indigenous-inspired patterns that honor traditional artistry while delivering luxury comfort
                for the modern tribe.
              </Text>
              <a href="/collections/sacred-geometry" className="btn btn-gradient">Discover Patterns</a>
            </Body>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}

export default FeaturedCollections; 