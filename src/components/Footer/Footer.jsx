import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Foot = styled.footer`
  margin-top: 40px;
  position: relative;
  background: #23160E; /* lighter than night-sky for contrast */
  color: #fff;
  padding: 64px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  /* subtle diamond watermark */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('/assets/diamond-tile.svg');
    background-size: 180px 180px;
    opacity: 0.06;
    pointer-events: none;
    mix-blend-mode: screen;
  }
`;

const SiteMap = styled.nav`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;

  a {
    color: var(--copper-tan);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
    transition: color 0.2s;

    &:hover {
      color: var(--sunset-orange);
    }
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: 20px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--sunset-orange);
    color: #fff;
    transition: transform 0.25s;
    font-size: 1.1rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.25);

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export default function Footer() {
  const year = new Date().getFullYear();

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Positive Vibe Tribe',
    url: 'https://positivevibetribe.com',
    logo: 'https://positivevibetribe.com/assets/logo-kokopelli.svg',
    sameAs: [
      'https://facebook.com/PositiveVibeTribe',
      'https://twitter.com/PositiveVibeTribe',
      'https://instagram.com/PositiveVibeTribe',
      'https://youtube.com/@PositiveVibeTribe'
    ]
  };

  const navLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'SiteNavigationElement', position:1, name:'Home', url:'https://positivevibetribe.com/'},
      { '@type': 'SiteNavigationElement', position:2, name:'Shop', url:'https://positivevibetribe.com/products'},
      { '@type': 'SiteNavigationElement', position:3, name:'About', url:'https://positivevibetribe.com/about'},
      { '@type': 'SiteNavigationElement', position:4, name:'Policies', url:'https://positivevibetribe.com/policies'},
      { '@type': 'SiteNavigationElement', position:5, name:'Contact', url:'https://positivevibetribe.com/contact'}
    ]
  };

  return (
    <Foot>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
        <script type="application/ld+json">{JSON.stringify(navLd)}</script>
      </Helmet>
      <SiteMap aria-label="Footer navigation">
        <a href="/">Home</a>
        <a href="/products">Shop</a>
        <a href="/about">About</a>
        <a href="/policies">Policies</a>
        <a href="/contact">Contact</a>
      </SiteMap>

      <SocialRow>
        <a
          href="https://facebook.com/PositiveVibeTribe"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com/PositiveVibeTribe"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com/PositiveVibeTribe"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://youtube.com/@PositiveVibeTribe"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <FaYoutube />
        </a>
      </SocialRow>

      <small>&copy; {year} Positive Vibe Tribe</small>
    </Foot>
  );
} 