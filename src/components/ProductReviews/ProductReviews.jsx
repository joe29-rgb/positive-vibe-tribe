import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Wrapper = styled.section`
  margin: 80px 0;
`;

const Heading = styled.h3`
  font-family: 'UnifrakturCook', cursive;
  font-size: var(--fs-2xl);
  color: var(--dark-brown);
  margin-bottom: 32px;
  text-align: center;
`;

const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: center;
  font-size: var(--fs-lg);
`;

const Star = styled.span`
  color: #ffb400;
  font-size: 1.25rem;
`;

const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
  max-width: 700px;
  margin: 0 auto;
`;

const Item = styled(motion.li)`
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  margin-bottom: 20px;
`;

const Reviewer = styled.strong`
  display: block;
  margin-top: 12px;
  color: var(--dark-brown);
`;

// Temporary mock data – would come from backend in production
const mockReviews = [
  { id: 'r1', name: 'Ava P.', rating: 5, text: 'Love this hoodie! Super comfy and the design gets tons of compliments.' },
  { id: 'r2', name: 'Marcus T.', rating: 4, text: 'Great quality and fits true to size. Shipping was quick too.' },
  { id: 'r3', name: 'Janelle W.', rating: 5, text: 'Exceeded my expectations – the fabric is soft and the message is powerful.' },
  { id: 'r4', name: 'Carter L.', rating: 4, text: 'Really like it, wish there were more colours available.' },
];

function Stars({ count }) {
  return (
    <span>{Array.from({ length: 5 }).map((_, i) => (
      <Star key={i}>{i < count ? '★' : '☆'}</Star>
    ))}</span>
  );
}

function ProductReviews() {
  const [showAll, setShowAll] = useState(false);

  const reviews = showAll ? mockReviews : mockReviews.slice(0, 3);
  const avgRating = mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length;

  return (
    <Wrapper>
      <Heading>Customer Reviews</Heading>
      <SummaryRow>
        <Stars count={Math.round(avgRating)} />
        <span>{avgRating.toFixed(1)} / 5 · {mockReviews.length} reviews</span>
      </SummaryRow>
      <ReviewList>
        <AnimatePresence>
          {reviews.map((r) => (
            <Item key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <Stars count={r.rating} />
              <p style={{ marginTop: 8 }}>{r.text}</p>
              <Reviewer>— {r.name}</Reviewer>
            </Item>
          ))}
        </AnimatePresence>
      </ReviewList>
      {mockReviews.length > 3 && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{ background: 'none', border: 'none', color: 'var(--primary-red)', cursor: 'pointer', fontWeight: 600 }}
          >
            {showAll ? 'Show less' : 'Read all reviews'}
          </button>
        </div>
      )}
    </Wrapper>
  );
}

export default ProductReviews; 