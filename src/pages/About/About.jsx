import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import BrandStory from '../../components/BrandStory/BrandStory';
import ScrollStory from '../../components/ScrollStory/ScrollStory.jsx';
import FounderStory from '../../components/FounderStory/FounderStory.jsx';

/* -------------------------------------------------------------------------
   Styled Components
---------------------------------------------------------------------------*/
const PageWrapper = styled.main`
  background: #fff;
  color: var(--dark-brown);
`;

const Section = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 20px;
  line-height: 1.7;
  font-size: 1.125rem;
`;

const Heading = styled.h2`
  font-size: 2.25rem;
  margin-bottom: 24px;
  font-family: 'UnifrakturCook', cursive;
  text-align: center;
`;

const Subheading = styled.h3`
  font-size: 1.5rem;
  margin: 32px 0 16px;
  font-weight: 600;
`;

function About() {
  return (
    <PageWrapper>
      <Helmet>
        <title>About – Positive Vibe Tribe</title>
        <meta
          name="description"
          content="Discover the sacred origin story, Kokopelli legacy, and wolf-spirit philosophy behind Positive Vibe Tribe – an Indigenous-inspired fashion movement rooted in Treaty 6 territory."
        />
      </Helmet>

      {/* Scroll-driven narrative */}
      <ScrollStory />

      {/* Brand overview static section */}
      <BrandStory />

      {/* Meet the founder */}
      <FounderStory />

      {/* Sacred origin narrative */}
      <Section>
        <Heading>The Sacred Origin Story</Heading>
        <p>
          In the heart of Treaty 6 territory, amid the rolling prairies of amiskwaciwâskahikan (Beaver Hills
          House), <strong>Positive Vibe Tribe</strong> was dreamed into being in 2024. What began in a humble
          two-bedroom apartment quickly grew into a movement – a celebration of Indigenous wisdom, contemporary
          self-expression, and the power of community.
        </p>
        <p>
          Guided by the sacred teachings of <strong>Kokopelli</strong>, the wandering flute player who gifts seeds of
          abundance and melodies of joy, every sketch, stitch, and shipment carries a blessing of positivity. The
          distant howl of the <strong>wolf spirit</strong> reminds us that true strength is woven from loyalty and
          pack unity; we rise together, or not at all.
        </p>
      </Section>

      {/* Kokopelli legacy */}
      <Section>
        <Subheading>The Kokopelli Legacy: Fertility, Music &amp; Abundance</Subheading>
        <p>
          For more than 3,000&nbsp;years, Kokopelli has travelled Turtle Island sharing songs, stories, and
          seeds. Pueblo, Navajo, and Hopi teachings describe his hump as overflowing with clouds, rainbows, and
          new life. Our designs honour this benevolent spirit – carrying forward his promise of prosperity with
          every thread.
        </p>
      </Section>

      {/* Wolf spirit */}
      <Section>
        <Subheading>Wolf Spirit Guidance: Loyalty, Leadership &amp; Pack Unity</Subheading>
        <p>
          Wolves teach us collaboration. From Lakota winter stories to the Pawnee belief that &quot;we are the Wolf
          People&quot;, this guardian reminds us to lead with integrity and care for the whole pack. Each Positive
          Vibe Tribe garment is both armour and invitation – a call to uplift one another through shared
          positivity.
        </p>
      </Section>

      {/* Treaty 6 acknowledgement */}
      <Section>
        <Subheading>Honouring Treaty 6 Territory</Subheading>
        <p>
          We respectfully acknowledge that our work takes place on the traditional lands of the Plains Cree,
          Nakota Sioux, Saulteaux, Dene, and Métis peoples. A portion of every purchase supports Alberta First
          Nations artisans and cultural-preservation initiatives. Fashion, for us, is a vessel for
          reconciliation and future-building.
        </p>
      </Section>
    </PageWrapper>
  );
}

export default About; 