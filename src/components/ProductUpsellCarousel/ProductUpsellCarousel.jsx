import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../ProductGrid/ProductCard';

const Section = styled.section`
  margin: 80px 0;
`;

const Heading = styled.h3`
  font-family: 'UnifrakturCook', cursive;
  font-size: var(--fs-2xl);
  margin-bottom: 32px;
  color: var(--dark-brown);
  text-align:center;
`;

function ProductUpsellCarousel({ currentId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products?limit=10')
      .then(res=>res.json())
      .then(data=>{
        const filtered=data.filter(p=>p._id!==currentId).slice(0,6);
        setProducts(filtered);
      });
  }, [currentId]);

  if(!products.length) return null;

  return (
    <Section>
      <Heading>You might also like</Heading>
      <Swiper modules={[Navigation]} navigation spaceBetween={24} breakpoints={{0:{slidesPerView:1.2},640:{slidesPerView:2.2},1024:{slidesPerView:3.2}}}>
        {products.map(p=> (
          <SwiperSlide key={p._id}>
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
}

export default ProductUpsellCarousel; 