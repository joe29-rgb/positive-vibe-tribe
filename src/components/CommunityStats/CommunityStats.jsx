import React from 'react';
import styled from 'styled-components';

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
  font-size: 2rem;
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
const Number = styled.span`
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--primary-red);
`;
const Label = styled.span`
  font-size: 0.9375rem;
  color: var(--medium-gray);
`;

function CommunityStats() {
  return (
    <Section>
      <Container>
        <Heading>The Tribe in Numbers</Heading>
        <Grid>
          <Item>
            <Number>2,500+</Number>
            <Label>Tribe Members</Label>
          </Item>
          <Item>
            <Number>98%</Number>
            <Label>Satisfaction Rate</Label>
          </Item>
          <Item>
            <Number>$15k+</Number>
            <Label>Donated to Indigenous Communities</Label>
          </Item>
        </Grid>
      </Container>
    </Section>
  );
}

export default CommunityStats; 