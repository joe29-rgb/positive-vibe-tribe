import React from 'react';
import styled from 'styled-components';
import founderImg from '../../assets/founder.jpg'; // place the provided photo here

const Section = styled.section`
  background: #faf7f3;
  padding: 80px 20px;
  color: var(--dark-brown);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Photo = styled.img`
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
`;

const Heading = styled.h2`
  font-family: 'UnifrakturCook', cursive;
  font-size: 2.5rem;
  margin-bottom: 24px;
`;

const Paragraph = styled.p`
  margin-bottom: 16px;
  line-height: 1.6;
`;

function FounderStory() {
  return (
    <Section>
      <Container>
        <div>
          <Heading>Meet the Founder</Heading>
          <Paragraph>
            Our founder believes in loving for no reason. It began at an airport bar in San Antonio when he
            offered kindness to a stranger who had missed her flight. Even after she rejected his help, he
            quietly paid for her drink. When questioned, he replied, “If there are people who hate for no
            reason, I can love for no reason.” The entire bar applauded, proving that authentic positivity is
            contagious.
          </Paragraph>
          <Paragraph>
            Months later, a simple conversation at an Alberta gas station revealed a deeper truth. Pointing to
            the faint Positive Vibez decal on his window, he said, “Positivity is always there—you just have to
            look a little harder.” That moment crystallised Positive Vibe Tribe&apos;s mission: carry Indigenous
            teachings of Kokopelli&apos;s joy and the wolf pack&apos;s loyalty into everyday life.
          </Paragraph>
          <Paragraph>
            Today, every garment spreads unconditional kindness, hides subtle symbols for those who seek
            meaning, and supports local Indigenous communities. Join the movement to love for no reason and
            find the hidden good in every day.
          </Paragraph>
        </div>
        <Photo src={founderImg} alt="Founder smiling" />
      </Container>
    </Section>
  );
}

export default FounderStory; 