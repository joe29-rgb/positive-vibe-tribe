import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import founderPortrait from '../../assets/founder-portrait.png';
import beaverImg from '../../assets/teachings/beaver.png';
import eagleImg from '../../assets/teachings/eagle.png';
import buffaloImg from '../../assets/teachings/buffalo.png';
import bearImg from '../../assets/teachings/bear.png';
import ravenImg from '../../assets/teachings/raven.png';
import wolfImg from '../../assets/teachings/wolf.png';
import turtleImg from '../../assets/teachings/turtle.png';

//-------------------- Shared Styled Helpers --------------------//
const Wrapper = styled.main`
  background: #fff;
  color: var(--dark-brown);
  --section-padding: 80px 20px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const H2 = styled.h2`
  font-family: 'UnifrakturCook', cursive;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: var(--dark-brown);
`;

const Section = styled.section`
  padding: var(--section-padding);
`;

//-------------------- Hero --------------------//
const HeroGrid = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  min-height: 80vh;
  padding: var(--section-padding);
  background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;
const HeroTitle = styled.h1`
  font-family: 'UnifrakturCook', cursive;
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
  color: var(--primary-color, #2d4a3e);
`;
const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
  color: var(--text-light, #666);
  margin-bottom: 2rem;
`;
const CTAGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
const CtaPrimary = styled.a`
  background-color: var(--primary-color, #2d4a3e);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.25s ease;
  &:hover {
    background-color: transparent;
    color: var(--primary-color, #2d4a3e);
    border: 2px solid var(--primary-color, #2d4a3e);
  }
`;
const CtaSecondary = styled(CtaPrimary)`
  background: transparent;
  color: var(--primary-color, #2d4a3e);
  border: 2px solid var(--primary-color, #2d4a3e);
  &:hover {
    background: var(--primary-color, #2d4a3e);
    color: #fff;
  }
`;
const HeroImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

//-------------------- Teachings --------------------//
const TeachGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;
const Card = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  text-align: center;
  transition: transform 0.25s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;
const CardImg = styled.img`
  width:100%;border-radius:8px;object-fit:cover;height:160px;margin-bottom:1rem;`;
const ImpactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;
const Stat = styled.div`
  background:#fafafa;
  padding:1.5rem;
  border-left:4px solid var(--primary-color,#2d4a3e);
  border-radius:8px;
`;
const StatNumber = styled.h3`
  font-size:2.5rem;
  margin-bottom:0.5rem;
  color:var(--primary-color,#2d4a3e);
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  margin-top: 3rem;
  iframe {
    position: absolute;
    top:0; left:0;
    width:100%; height:100%;
    border:0;
  }
`;

const CtaLight = styled(CtaPrimary)`
  background: #fff;
  color: var(--primary-color, #2d4a3e);
  &:hover {
    background: transparent;
    color: #fff;
    border: 2px solid #fff;
  }
`;

const CtaOutlineLight = styled(CtaSecondary)`
  border-color: #fff;
  color: #fff;
  &:hover {
    background: #fff;
    color: var(--primary-color, #2d4a3e);
  }
`;

function About() {
  return (
    <Wrapper>
      <Helmet>
        <title>About – Positive Vibe Tribe</title>
        <meta
          name="description"
          content="Discover how Positive Vibe Tribe weaves the Ojibwe Seven Grandfather Teachings into modern design, spreading positivity across Canada and beyond."
        />
      </Helmet>

      {/* Hero */}
      <HeroGrid>
        <div>
          <HeroTitle>Guided by Ancient Wisdom, Creating Positive Change</HeroTitle>
          <HeroSubtitle>
            We weave the Ojibwe Seven Grandfather Teachings into every thread—spreading positive energy, cultural
            respect, and joyful connection across Canada and beyond.
          </HeroSubtitle>
          <CTAGroup>
            <CtaPrimary href="#our-story">Discover Our Story</CtaPrimary>
            <CtaSecondary href="/products">Shop Our Mission</CtaSecondary>
          </CTAGroup>
        </div>
        <HeroImg src={founderPortrait} alt="Founder of Positive Vibe Tribe standing in nature, representing Indigenous-inspired mission" loading="lazy" />
      </HeroGrid>

      {/* Mission */}
      <Section id="mission" style={{ background: 'var(--primary-color,#2d4a3e)', color: '#fff', textAlign: 'center' }}>
        <Container>
          <H2 style={{ color: '#fff' }}>Our Mission</H2>
          <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            To craft meaningful products that embody the Seven Teachings, foster community connection, and give back to
            the Indigenous knowledge-keepers who inspire us.
          </p>
        </Container>
      </Section>

      {/* Teachings */}
      <Section id="teachings" style={{ background: '#fafafa' }}>
        <Container>
          <H2>The Seven Grandfather Teachings</H2>
          <p style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            These sacred principles—shared by the Anishinaabe people—guide everything we do. Each teaching is a
            blueprint for living in harmony with ourselves, our community, and the earth.
          </p>
          <TeachGrid>
            <Card>
              <CardImg src={beaverImg} alt="Beaver symbol" />
              <h3>Nibwaakaawin – Wisdom</h3>
              <p>
                Cherish knowledge and use it wisely—always considering the next seven generations. Every material, cut,
                and colorway is chosen with purposeful care.
              </p>
            </Card>
            <Card>
              <CardImg src={eagleImg} alt="Eagle symbol" />
              <h3>Zaagi&apos;idiwin – Love</h3>
              <p>
                Love starts within and radiates outward. Our garments nurture self-love, then ripple positivity into every
                circle you move through.
              </p>
            </Card>
            <Card>
              <CardImg src={buffaloImg} alt="Buffalo symbol" />
              <h3>Minaadendamowin – Respect</h3>
              <p>
                We honor all creation—from the cotton farmer to the courier. Ethical sourcing and fair partnerships are
                non-negotiable.
              </p>
            </Card>
            <Card>
              <CardImg src={bearImg} alt="Bear symbol" />
              <h3>Aakode&apos;ewin – Bravery</h3>
              <p>
                Courage means standing for what&apos;s right. We amplify Indigenous voices and embrace bold, joy-filled
                designs.
              </p>
            </Card>
            <Card>
              <CardImg src={ravenImg} alt="Raven symbol" />
              <h3>Gwayakwaadiziwin – Honesty</h3>
              <p>
                Radical transparency in our pricing, supply chain, and storytelling builds the trust our Tribe deserves.
              </p>
            </Card>
            <Card>
              <CardImg src={wolfImg} alt="Wolf symbol" />
              <h3>Dabaadendiziwin – Humility</h3>
              <p>
                We are one thread in a vast tapestry. Every success is shared; every misstep becomes a lesson.
              </p>
            </Card>
            <Card>
              <CardImg src={turtleImg} alt="Turtle symbol" />
              <h3>Debwewin – Truth</h3>
              <p>
                We speak and act from lived experience, honoring the origins of every word and pattern we share.
              </p>
            </Card>
          </TeachGrid>
          <VideoWrapper>
            <iframe src="https://www.youtube.com/embed/sASjfNI_lD0" title="Seven Teachings video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </VideoWrapper>
        </Container>
      </Section>

      {/* Founder Story */}
      <Section id="our-story">
        <Container>
          <H2>The Heart Behind Positive Vibe Tribe</H2>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong>Airport Encounter — Love for No Reason</strong>
            <br />San Antonio, Texas. A missed flight. A distressed traveler unleashing a storm of profanity. Our founder
            offered help anyway.
            <br />&quot;Why do you care?&quot; she snapped.
            <br />&quot;Because if people can hate for no reason,&quot; he replied, &quot;I can love for no reason.&quot;
            <br />He quietly paid for her drink and watched an entire bar erupt in applause as her anger dissolved into
            gratitude.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong>Gas-Station Revelation — Finding Light in Dark Places</strong>
            <br />Months later in Lethbridge, Alberta, a woman noted the faint <em>Positive Vibez</em> decal on his rear
            window: &quot;It&apos;s a little hard to see.&quot;
            <br />&quot;Just like life,&quot; he answered. &quot;Every day might not be great, but there&apos;s always something to be positive about. Sometimes you just have to look a little harder.&quot; She cried, thanked him, and another ripple of
            kindness spread.
          </p>
          <p>
            From those encounters grew a simple creed: <em>love loudly, shine quietly, and let positivity travel farther
            than you do.</em> Rooted in the Seven Grandfather Teachings—and the joy-bearing songs of Kokopelli—Positive
            Vibe Tribe turns everyday moments into opportunities for connection.
          </p>
        </Container>
      </Section>

      {/* Honouring Section */}
      <Section id="connection" style={{ background: '#fafafa' }}>
        <Container>
          <H2>Honoring Wiikwemkoong</H2>
          <p style={{ maxWidth: '800px', margin: '0 auto 2rem', textAlign: 'center' }}>
            We acknowledge that the Seven Grandfather Teachings originate with the Anishinaabe people of Wiikwemkoong
            Unceded Territory on Manitoulin Island. We remain students—committed to cultural humility, continuous
            learning, and meaningful reciprocity.
          </p>
          <ImpactGrid>
            <Stat>
              <StatNumber>5%</StatNumber>
              <p>Of profits donated to Indigenous youth &amp; language programs in Alberta</p>
            </Stat>
            <Stat>
              <StatNumber>13</StatNumber>
              <p>Canadian provinces &amp; territories represented in our Tribe</p>
            </Stat>
            <Stat>
              <StatNumber>100%</StatNumber>
              <p>Ethically sourced, traceable cotton</p>
            </Stat>
          </ImpactGrid>
        </Container>
      </Section>

      {/* Community Impact */}
      <Section id="impact">
        <Container>
          <H2>Community Impact</H2>
          <ImpactGrid>
            <Stat as="div">
              <StatNumber>$10k+</StatNumber>
              <p>Contributed to Indigenous cultural preservation &amp; land-based healing</p>
            </Stat>
            <Stat as="div">
              <StatNumber>100%</StatNumber>
              <p>Recyclable packaging since launch</p>
            </Stat>
            <Stat as="div">
              <StatNumber>1000s</StatNumber>
              <p>Of teaching cards shipped, sparking conversations coast-to-coast</p>
            </Stat>
          </ImpactGrid>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section style={{ background: 'var(--primary-color,#2d4a3e)', color: '#fff', textAlign: 'center' }}>
        <Container>
          <H2 style={{ color: '#fff' }}>Join the Tribe</H2>
          <p style={{ maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.25rem' }}>
            Choose the teaching that speaks to your journey and help us spread positivity—one beautifully crafted piece
            at a time.
          </p>
          <CTAGroup style={{ justifyContent: 'center' }}>
            <CtaLight href="/products">Shop the Collection</CtaLight>
            <CtaOutlineLight href="/newsletter">Get Tribe Updates</CtaOutlineLight>
          </CTAGroup>
        </Container>
      </Section>
    </Wrapper>
  );
}

export default About; 