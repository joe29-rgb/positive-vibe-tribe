import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background: var(--dark-brown);
  color: #fff;
  padding: 80px 20px;
`;
const Container = styled.div`
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
`;
const Heading = styled.h2`
  font-size: var(--fs-2xl);
  margin-bottom: var(--space-4);
  font-family: 'UnifrakturCook', cursive;
`;
const Text = styled.p`
  font-size: var(--fs-base);
  margin-bottom: var(--space-6);
`;
const Form = styled.form`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1 1 240px;
  padding: 14px 18px;
  font-size: var(--fs-base);
  border-radius: 8px;
  border: none;
`;
const Button = styled.button`
  background: linear-gradient(45deg, var(--primary-red), var(--secondary-red));
  color: #fff;
  border: none;
  padding: 14px 28px;
  border-radius: var(--border-radius-pill);
  font-size: var(--fs-base);
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.25s ease;
  &:hover {
    opacity: 0.85;
  }
`;
const Note = styled.p`
  font-size: var(--fs-sm);
  margin-top: var(--space-4);
  opacity: 0.8;
`;

function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail('');
  };

  return (
    <Section>
      <Container>
        <Heading>Join the Positive Vibe Tribe</Heading>
        <Text>
          Get exclusive access to new collections, Indigenous cultural stories, and special offers.
        </Text>
        {submitted ? (
          <Text>Thank you for joining! Positive vibes headed your way.</Text>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              aria-label="Email address"
            />
            <Button type="submit">Join the Tribe</Button>
          </Form>
        )}
        <Note>We respect your inbox. No spam, just positive vibes and meaningful content.</Note>
      </Container>
    </Section>
  );
}

export default Newsletter; 