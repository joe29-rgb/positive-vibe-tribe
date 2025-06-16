import React from 'react';
import styled from 'styled-components';
import look1 from '../../assets/collage/look1.jpg';
import look2 from '../../assets/collage/look2.jpg';
import look3 from '../../assets/collage/look3.jpg';

const Section = styled.section `
  background: #f5f1eb;
  padding: 80px 20px;
`;

const Container = styled.div `
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const Heading = styled.h2 `
  font-size: 2.5rem;
  margin-bottom: 48px;
  font-family: 'UnifrakturCook', cursive;
  color: var(--dark-brown);
`;

const Grid = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 32px;
`;

const Card = styled.div `
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

const CardImg = styled.img `
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const CardBody = styled.div `
  padding: 24px;
  flex: 1;
`;

const CardTitle = styled.h3 `
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: var(--dark-brown);
`;

const Text = styled.p `
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 24px;
  color: var(--medium-gray);
`;

const CTA = styled.a `
  display: inline-block;
  background: linear-gradient(45deg, var(--primary-red), var(--secondary-red));
  color: #fff;
  padding: 12px 28px;
  border-radius: var(--border-radius-pill);
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  transition: transform 0.25s ease;
  &:hover {
    transform: translateY(-2px);
  }
`;

function FeaturedCollections() {
    return ( <
        Section id = "collections" >
        <
        Container >
        <
        Heading > Sacred Collections
        for the Modern Tribe < /Heading> <
        Grid >
        <
        Card >
        <
        CardImg src = { look1 }
        alt = "Kokopelli Collection product"
        loading = "lazy" / >
        <
        CardBody >
        <
        CardTitle > Kokopelli Collection < /CardTitle> <
        Text >
        Traditional fertility symbols meet contemporary comfort.Pieces designed to bring abundance and positive energy to your daily journey. <
        /Text> <
        CTA href = "/collections/kokopelli" > Explore Abundance < /CTA> <
        /CardBody> <
        /Card>

        <
        Card >
        <
        CardImg src = { look2 }
        alt = "Wolf Pack Essentials product"
        loading = "lazy" / >
        <
        CardBody >
        <
        CardTitle > Wolf Pack Essentials < /CardTitle> <
        Text >
        Leadership - inspired basics that embody strength, loyalty, and intuitive wisdom from ancient wolf teachings. <
        /Text> <
        CTA href = "/collections/wolf-pack" > Join the Pack < /CTA> <
        /CardBody> <
        /Card>

        <
        Card >
        <
        CardImg src = { look3 }
        alt = "Sacred Geometry apparel"
        loading = "lazy" / >
        <
        CardBody >
        <
        CardTitle > Sacred Geometry Line < /CardTitle> <
        Text >
        Indigenous - inspired patterns that honor traditional artistry
        while delivering luxury comfort
        for the modern tribe. <
        /Text> <
        CTA href = "/collections/sacred-geometry" > Discover Patterns < /CTA> <
        /CardBody> <
        /Card> <
        /Grid> <
        /Container> <
        /Section>
    );
}

export default FeaturedCollections;