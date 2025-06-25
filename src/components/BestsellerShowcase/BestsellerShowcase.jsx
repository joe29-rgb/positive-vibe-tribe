import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProductCard from '../ProductGrid/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

/* -------------------------------------------------------------------------
   Styled Components
---------------------------------------------------------------------------*/
const Section = styled.section`
  background: #faf7f3;
  padding: 60px 20px 80px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 32px;
  font-family: 'UnifrakturCook', cursive;
  color: var(--dark-brown);
  text-align: center;
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
`;

const FilterButton = styled.button`
  background: ${(p) => (p.active ? 'var(--primary-red)' : '#fff')};
  color: ${(p) => (p.active ? '#fff' : 'var(--dark-brown)')};
  border: 1px solid var(--primary-red);
  padding: 8px 18px;
  font-size: 0.875rem;
  border-radius: var(--border-radius-pill);
  cursor: pointer;
  transition: background 0.25s, color 0.25s;
  &:hover {
    background: var(--primary-red);
    color: #fff;
  }
`;

const CarouselWrap = styled.div`
  position: relative;
  .swiper-button-prev, .swiper-button-next {
    color: var(--dark-brown);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  }
`;

function BestsellerShowcase({ tag = 'bestseller', limit = 8, categories = [] }) {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    axios
      .get(`/api/products?tag=${tag}&limit=${limit}`)
      .then((res) => setProducts(res.data))
      .catch(() => setProducts([]));
  }, [tag, limit]);

  const displayed = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  if (!products.length) return null;

  // Build category list from products if not provided
  const derivedCats = Array.from(new Set(products.map((p) => p.category))).slice(0, 6);
  const pills = ['All', ...categories, ...derivedCats].filter((v, i, a) => a.indexOf(v) === i);

  return (
    <Section>
      <Container>
        <Heading>Bestsellers</Heading>
        <FilterRow>
          {pills.map((cat) => (
            <FilterButton key={cat} active={cat === activeCategory} onClick={() => setActiveCategory(cat)}>
              {cat}
            </FilterButton>
          ))}
        </FilterRow>
        <CarouselWrap>
          <Swiper
            modules={[Autoplay, Navigation]}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation
            breakpoints={{
              0: { slidesPerView: 1.1, spaceBetween: 16 },
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3.2, spaceBetween: 32 },
            }}
          >
            {displayed.map((prod, idx) => (
              <SwiperSlide key={prod._id}>
                <ProductCard product={prod} index={idx} />
              </SwiperSlide>
            ))}
          </Swiper>
        </CarouselWrap>
      </Container>
    </Section>
  );
}

export default BestsellerShowcase; 