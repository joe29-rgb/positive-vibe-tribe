import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 1rem 0 0.5rem;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 18px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.04);
  font-size: 0.8rem;
  font-weight: 600;
  color: #222;
  min-width: 80px;
`;

const BADGES = [
  'Apple Pay',
  'Google Pay',
  'PayPal',
  'Visa',
  'Mastercard',
  'Amex',
];

function ExpressCheckoutBadges() {
  return (
    <Row aria-label="Express checkout payment options">
      {BADGES.map((label) => (
        <Badge key={label}>{label}</Badge>
      ))}
    </Row>
  );
}

export default ExpressCheckoutBadges; 