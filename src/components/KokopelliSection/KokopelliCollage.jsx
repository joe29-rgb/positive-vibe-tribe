import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

const Wrapper = styled.section`
  margin: 3rem 0;
`;
const SlideImg = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 50%;
  border: 6px solid var(--primary-red, #c8102e);
`;
const Caption = styled.h4`
  margin-top: 0.75rem;
  text-align: center;
  font-family: 'Playfair Display', serif;
  color: #c8102e;
`;

export default function KokopelliCollage({ chapters = [] }) {
  return (
    <Wrapper>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={24}
        slidesPerView={1.25}
        centeredSlides
        grabCursor
        loop
        breakpoints={{
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
      >
        {chapters.map((c) => (
          <SwiperSlide key={c.title}>
            <SlideImg src={c.img} alt={c.title} />
            <Caption>{c.title}</Caption>
            {c.text && <p style={{fontSize:'0.95rem',lineHeight:1.6,marginTop:'0.5rem'}}>{c.text}</p>}
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
} 