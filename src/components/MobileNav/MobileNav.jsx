import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: #fff;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
  display: none;
  z-index: 90;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavItem = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${(p) => (p.$active ? 'var(--primary-red)' : 'var(--dark-brown)')};
  font-size: var(--fs-xs);
`;

function MobileNav() {
  const location = useLocation();

  const items = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Cart', path: '/cart' },
  ];

  return (
    <NavBar as={motion.nav} initial={{ y: 80 }} animate={{ y: 0 }} transition={{ duration: 0.4 }}>
      {items.map((it) => (
        <NavItem key={it.path} to={it.path} aria-label={it.label} $active={location.pathname === it.path}>
          {it.label}
        </NavItem>
      ))}
    </NavBar>
  );
}

export default MobileNav; 