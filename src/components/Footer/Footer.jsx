import React from 'react';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Foot = styled.footer`
  background: var(--night-sky);
  color: #fff;
  padding: 64px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const SiteMap = styled.nav`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;

  a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;

    &:hover {
      color: var(--copper-tan);
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
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--sunset-orange);
    color: #fff;
    transition: transform 0.25s;
    font-size: 1.1rem;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Foot>
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