import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { motion } from 'framer-motion';
import { buildSrcSet } from '../../utils/imageSrcSet';
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
  height: 100%;
  &:hover {
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    transform: translateY(-6px) scale(1.03);
  }
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    width: 18px;
    height: 18px;
    background: conic-gradient(#f5e04b 0deg 90deg, #d33a2c 90deg 180deg, #1a1a1a 180deg 270deg, #ffffff 270deg 360deg);
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    z-index: 2;
  }
`;

const Badge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({$type})=>{
    if($type==='new') return 'var(--sunset-orange)';
    if($type==='limited') return 'var(--dusky-red)';
    if($type==='sale') return '#119822';
    return 'var(--primary-red)';
  }};
  color: #fff;
  padding: 4px 8px;
  font-size: var(--fs-xs);
  font-weight: 700;
  border-radius: 6px;
  text-transform: uppercase;
  z-index: 2;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 square */
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
  font-size: var(--fs-base);
  margin: 0 0 8px;
  color: var(--dark-brown);
`;

const Price = styled.p`
  font-size: var(--fs-sm);
  font-weight: 600;
  margin: 0;
  color: var(--primary-red);
`;

const StrikePrice = styled.span`
  font-size: var(--fs-xs);
  margin-left: 6px;
  text-decoration: line-through;
  color: #555;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
  margin-bottom: 4px;
  span{color:#ffb400;font-size:0.8rem;}
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
  font-size: var(--fs-sm);
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
  const [chosenSize, setChosenSize] = useState('');

  if (!product) return null;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!chosenSize && product.sizes?.length) { return; }
    dispatch(addToCart({ product, size: chosenSize || 'default', quantity: 1 }));
    const msg = `${product.name} added to cart`;
    toast.success(msg);
    if (window.gtag) {
      window.gtag('event', 'quick_add', { product_id: product._id, size: chosenSize || 'default' });
    }
    // Trigger fly-to-cart animation
    if (imgRef.current) {
      flyToCart(imgRef.current);
    }
  };

  const isSale = product.salePrice && product.salePrice < product.price;
  const badgeText = product?.tag === 'new' ? 'New' : product?.tag === 'limited' ? 'Limited' : isSale ? 'Sale' : null;

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
          {badgeText && <Badge $type={isSale ? 'sale' : product.tag}>{badgeText}</Badge>}
          <ImgPrimary src={product.image} alt={product.name} loading="lazy" srcSet={buildSrcSet(product.image, 600)} sizes="(max-width:600px) 100vw, 280px" />
          {product.altImage && <ImgSecondary src={product.altImage} alt={product.name} loading="lazy" srcSet={buildSrcSet(product.altImage, 600)} sizes="(max-width:600px) 100vw, 280px" />}
          <Overlay
            variants={overlayVariants}
            initial="hidden"
            whileHover="visible"
            transition={{ duration: 0.25 }}
          >
            <Price style={{ color: '#fff', fontSize: '1.1rem' }}>
              ${isSale ? product.salePrice.toFixed(2) : product.price.toFixed(2)}
              {isSale && <StrikePrice>${product.price.toFixed(2)}</StrikePrice>}
            </Price>
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                {product.sizes.slice(0, 5).map(s => (
                  <button key={s} onClick={(e) => { e.stopPropagation(); setChosenSize(s); }} style={{ padding: '4px 8px', borderRadius: 6, border: chosenSize === s ? '2px solid var(--primary-red)' : '1px solid #fff', background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.75rem', cursor: 'pointer' }}>{s}</button>
                ))}
              </div>
            )}
            <QuickAdd aria-label={`Add ${product.name} to cart`} onClick={handleAdd} whileTap={quickAddTap} disabled={product.sizes?.length > 0 && !chosenSize} style={product.sizes?.length > 0 && !chosenSize ? { opacity: 0.6, cursor: 'not-allowed' } : {}}>Add</QuickAdd>
          </Overlay>
        </ImgWrapper>
        <Body>
          <Title>{product.name}</Title>
          {product.rating && (
            <Stars aria-label={`Rated ${product.rating} out of 5`}>
              {Array.from({length:5}).map((_,i)=>{
                const Star= i < Math.round(product.rating) ? '★':'☆';
                return <span key={i}>{Star}</span>;})}
            </Stars>
          )}
          <Price>
            ${isSale ? product.salePrice.toFixed(2) : product.price.toFixed(2)}
            {isSale && <StrikePrice>${product.price.toFixed(2)}</StrikePrice>}
          </Price>
        </Body>
      </Card>
    </CardLink>
  );
}

export default ProductCard; 