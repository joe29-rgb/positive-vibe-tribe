import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 120%; /* 12:10 ratio */
  overflow: hidden;
`;

const ImgBase = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.4s ease;
`;

const ImgPrimary = styled(ImgBase)``;

const ImgSecondary = styled(ImgBase)`
  opacity: 0;
  ${Card}:hover & {
    opacity: 1;
  }
`;

const Body = styled.div`
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin: 0 0 8px;
  color: var(--dark-brown);
`;

const Price = styled.p`
  font-size: 0.9375rem;
  font-weight: 600;
  margin: 0;
  color: var(--primary-red);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  ${Card}:hover & {
    opacity: 1;
  }
`;

const QuickAdd = styled(motion.button)`
  background: var(--primary-red);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: var(--border-radius-pill);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s;
  &:hover {
    background: var(--secondary-red);
  }
`;

// Framer-motion variants for scroll-trigger reveal
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' },
  }),
};

function ProductCard({ product, index = 0 }) {
  const dispatch = useDispatch();

  if (!product) return null;

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product, size: 'default', quantity: 1 }));
  };

  return (
    <Card
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={index}
      onClick={() => (window.location.href = `/product/${product._id}`)}
    >
      <ImgWrapper>
        <ImgPrimary src={product.image} alt={product.name} loading="lazy" />
        {product.altImage && <ImgSecondary src={product.altImage} alt={product.name} loading="lazy" />}
        <Overlay>
          <Price style={{ color: '#fff', fontSize: '1.1rem' }}>${product.price.toFixed(2)}</Price>
          <QuickAdd onClick={handleAdd} whileTap={{ scale: 0.9 }}>Quick Add</QuickAdd>
        </Overlay>
      </ImgWrapper>
      <Body>
        <Title>{product.name}</Title>
        <Price>${product.price.toFixed(2)}</Price>
      </Body>
    </Card>
  );
}

export default ProductCard; 