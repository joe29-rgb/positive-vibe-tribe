import React from 'react';
import styled from 'styled-components';
import LazyImage from '../LazyImage/LazyImage';
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
  font-size: 3rem;
  margin-bottom: 32px;
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
              Every Positive&nbsp;Vibe&nbsp;Tribe piece is crafted in small, intentional batches so you&#39;re wearing
              energy&mdash;not just fabric. Premium ring-spun cotton, eco-conscious dyes, buttery-soft fleece&mdash;the sort of
              quality reserved for heritage labels.
            </Text>
            <Text>
              Each garment is blessed with Kokopelli&#39;s spirit of joy and our Wolf&nbsp;Pack code of unity&mdash;so you feel
              unstoppable the moment it touches your skin.
            </Text>
            <Text>
              10% of every order fuels Alberta First Nations youth programs and language revitalization. When you
              wear the Tribe, you invest in community.
            </Text>
            <a href="/products" className="btn btn-gradient">Feel&nbsp;the&nbsp;Fabric</a>

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

          <LazyImage
            src={look5}
            alt="Edmonton landscape with Indigenous cultural elements"
            style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}
          />
        </Grid>
      </Container>
    </Section>
  );
}

export default BrandStory; 