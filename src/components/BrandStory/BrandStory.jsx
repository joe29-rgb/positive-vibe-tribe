import React from 'react';
import styled from 'styled-components';
import look5 from '../../assets/collage/look5.jpg';

const Section = styled.section`
  background: #fff;
  padding: 80px 20px;
  color: var(--dark-brown);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 24px;
  text-align: center;
  font-family: 'UnifrakturCook', cursive;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Text = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const ValuesGrid = styled.div`
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
`;

const ValueItem = styled.div`
  background: #faf7f3;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  text-align: center;
`;

const ValueTitle = styled.h3`
  margin: 12px 0 8px;
  font-size: 1.25rem;
`;

const ValueIcon = styled.span`
  font-size: 2rem;
`;

function BrandStory() {
  return (
    <Section>
      <Container>
        <Heading id="brand-story">Rooted in Edmonton, Guided by Ancient Wisdom</Heading>
        <Grid>
          <div>
            <Text>
              From the heart of Treaty&nbsp;6 territory, Positive Vibe Tribe honors the sacred teachings of
              Kokopelli — the fertility deity who brings abundance, music, and joy to communities.
            </Text>
            <Text>
              Our wolf-spirited approach ensures every piece reflects strength, loyalty, and pack unity. We
              create premium, preshrunk clothing that celebrates positive energy while respecting the
              Indigenous traditions that inspire our designs.
            </Text>
            <Text>
              A portion of every purchase supports local Alberta First Nations artisans and cultural
              preservation initiatives.
            </Text>

            <ValuesGrid>
              <ValueItem>
                <ValueIcon aria-hidden="true">🐺</ValueIcon>
                <ValueTitle>Wolf Pack Leadership</ValueTitle>
                <Text>Strength through unity</Text>
              </ValueItem>
              <ValueItem>
                <ValueIcon aria-hidden="true">🎵</ValueIcon>
                <ValueTitle>Kokopelli&apos;s Music</ValueTitle>
                <Text>Bringing joy &amp; abundance</Text>
              </ValueItem>
              <ValueItem>
                <ValueIcon aria-hidden="true">🌱</ValueIcon>
                <ValueTitle>Sacred Respect</ValueTitle>
                <Text>Honoring Mother Earth</Text>
              </ValueItem>
            </ValuesGrid>
          </div>

          <img
            src={look5}
            alt="Edmonton landscape with Indigenous cultural elements"
            loading="lazy"
            style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
          />
        </Grid>
      </Container>
    </Section>
  );
}

export default BrandStory; 