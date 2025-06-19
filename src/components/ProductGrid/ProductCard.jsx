import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { motion } from 'framer-motion';
import { getVariant } from '../../utils/ab';
import { flyToCart } from '../../utils/flyToCart';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  max-width: 280px;
  margin: 0 auto;
  &:hover {
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
  }
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
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

const Overlay = styled(motion.div)`
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

// Motion variants
const overlayVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

const quickAddTap = {
  scale: 0.95,
  transition: { type: 'spring', stiffness: 400, damping: 17 },
};

function ProductCard({ product, index = 0 }) {
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  if (!product) return null;

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ product, size: 'default', quantity: 1 }));
    const msg = `${product.name} added to cart`;
    toast.success(msg);
    if (window.gtag) {
      window.gtag('event', 'quick_add', { product_id: product._id, variant: getVariant() });
    }
    // Trigger fly-to-cart animation
    if (imgRef.current) {
      flyToCart(imgRef.current);
    }
  };

  return (
    <CardLink to={`/product/${product._id}`}>
      <Card
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        data-hover="card"
        viewport={{ once: true, amount: 0.3 }}
        custom={index}
      >
        <ImgWrapper ref={imgRef}>
          <ImgPrimary src={product.image} alt={product.name} loading="lazy" />
          {product.altImage && <ImgSecondary src={product.altImage} alt={product.name} loading="lazy" />}
          <Overlay
            variants={overlayVariants}
            initial="hidden"
            whileHover="visible"
            transition={{ duration: 0.25 }}
          >
            <Price style={{ color: '#fff', fontSize: '1.1rem' }}>${product.price.toFixed(2)}</Price>
            <QuickAdd aria-label={`Add ${product.name} to cart`} onClick={handleAdd} whileTap={quickAddTap}>Quick Add</QuickAdd>
          </Overlay>
        </ImgWrapper>
        <Body>
          <Title>{product.name}</Title>
          <Price>${product.price.toFixed(2)}</Price>
        </Body>
      </Card>
    </CardLink>
  );
}

export default ProductCard; 