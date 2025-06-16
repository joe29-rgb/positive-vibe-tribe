import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import kokopelliImg from '../../assets/kokopelli.png';
import diamondSvg from '../../assets/corner-diamond.svg';
import { Link } from 'react-router-dom';

/* ------------------------------------
   Styled Components
+------------------------------------ */
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.85);
  transition: background 0.3s ease, padding 0.3s ease;

  &.scrolled {
    background: rgba(255, 255, 255, 0.95);
    padding: 0.5rem 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`;

/* ---------- Desktop Nav ---------- */
const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const linkBase = css`
  text-decoration: none;
  color: var(--dark-brown);
  font-family: 'UnifrakturCook', cursive;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  position: relative;
  transition: color 0.3s ease;
  padding-bottom: 6px;
  &::after {
    content: '';
    display: block;
    margin: 0 auto;
    width: 18px;
    height: 10px;
    background: url(${diamondSvg}) no-repeat center center;
    background-size: contain;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    transform: translateY(6px) scale(0.7);
  }
  &:hover {
    color: var(--primary-red);
    text-shadow: 0 2px 8px rgba(200,16,46,0.08);
    transform: translateY(-2px) scale(1.05);
  }
  &:hover::after {
    opacity: 0.7;
    transform: translateY(0) scale(1);
  }
`;

const NavItem = styled.div`
  position: relative;
`;

const NavLink = styled.a`
  ${linkBase};
`;

/* ---------- Mobile Hamburger ---------- */
const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 28px;
  height: 24px;

  @media (max-width: 768px) {
    display: block;
  }

  span,
  span::before,
  span::after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: var(--dark-brown);
    transition: transform 0.4s ease, opacity 0.4s ease;
  }

  span::before {
    transform: translateY(-8px);
  }

  span::after {
    transform: translateY(6px);
  }

  &.open span {
    background: transparent;
  }

  &.open span::before {
    transform: translateY(0) rotate(45deg);
  }

  &.open span::after {
    transform: translateY(0) rotate(-45deg);
  }
`;

/* ---------- Mobile Fullscreen Menu ---------- */
const MobileMenu = styled(motion.nav)`
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  z-index: 99;
`;

/* Diamond pulse animation */
const DiamondCorner = styled(motion.div)`
  position: absolute;
  width: 64px;
  height: 64px;
  background: url(${diamondSvg}) no-repeat center center;
  background-size: contain;
  opacity: 0.12;
  z-index: 100;
  pointer-events: none;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 32px;
  justify-content: center;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: url(${diamondSvg}) no-repeat center center, #fff;
  background-size: 80% 80%, cover;
  color: var(--primary-red);
  font-size: 1.5rem;
  box-shadow: 0 2px 8px rgba(200,16,46,0.08);
  transition: background 0.2s, color 0.2s;
  &:hover {
    color: #fff;
    background-color: var(--primary-red);
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  margin-top: 36px;
  background: linear-gradient(45deg, var(--primary-red), var(--secondary-red));
  color: #fff;
  border: none;
  padding: 18px 40px;
  font-size: 1.1rem;
  border-radius: var(--border-radius-pill);
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  box-shadow: var(--shadow-medium);
  text-align: center;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  &:hover {
    background: var(--primary-red);
    color: #fff;
    box-shadow: 0 4px 16px rgba(200,16,46,0.18);
  }
`;

/* Mega menu */
const MegaMenu = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  background: #fff;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
  padding: 32px 48px;
  border-radius: 12px;
  display: grid;
  grid-template-columns: repeat(3, 200px);
  gap: 32px;
  z-index: 90;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const CatCard = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--dark-brown);
  &:hover img {
    transform: scale(1.05);
  }
`;

const CatImg = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.3s ease;
`;

const CatLabel = styled.span`
  margin-top: 12px;
  font-weight: 600;
`;

/* ------------------------------------
   React Component
+------------------------------------ */
function Header() {
  const [open, setOpen] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);

  // Shrink on scroll
  const headerRef = React.useRef(null);
  React.useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 20) {
        headerRef.current.classList.add('scrolled');
      } else {
        headerRef.current.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setOpen((p) => !p);

  // Diamond animation variants
  const diamondVariants = {
    initial: { opacity: 0, scale: 0.7, y: -20 },
    animate: { opacity: 0.12, scale: 1, y: 0, transition: { duration: 0.7, type: 'spring' } },
    pulse: { scale: [1, 1.08, 1], transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' } },
  };

  const categories = [
    { name: 'Tops', slug: 'tops', image: '/images/cats/tops.jpg' },
    { name: 'Hoodies', slug: 'hoodies', image: '/images/cats/hoodies.jpg' },
    { name: 'Accessories', slug: 'accessories', image: '/images/cats/accessories.jpg' },
    { name: 'Bottoms', slug: 'bottoms', image: '/images/cats/bottoms.jpg' },
    { name: 'Outerwear', slug: 'outerwear', image: '/images/cats/outerwear.jpg' },
    { name: 'All Products', slug: 'all', image: '/images/cats/all.jpg' },
  ];

  return (
    <>
      <HeaderContainer ref={headerRef}>
        {/* Logo */}
        <Logo href="/">
          {(() => {
            const SmallIcon = motion.img;
            const tinyDance = {
              animate: {
                y: [0, -4, 0],
                rotate: [-4, 4, -4],
                transition: { duration: 3, ease: 'easeInOut', repeat: Infinity },
              },
            };
            return (
              <>
                <SmallIcon
                  src={kokopelliImg}
                  alt=""
                  className="red"
                  style={{ width: 32, height: 32 }}
                  variants={tinyDance}
                  animate="animate"
                />
                <span style={{fontFamily:'UnifrakturCook,cursive',fontSize:'1.4rem',color:'var(--dark-brown)'}}>Positive Vibe Tribe</span>
              </>
            );
          })()}
        </Logo>

        {/* Desktop Navigation */}
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavItem
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <NavLink href="/products">Shop</NavLink>
            <MegaMenu
              initial={{ opacity: 0, y: 20, pointerEvents: 'none' }}
              animate={{ opacity: megaOpen ? 1 : 0, y: megaOpen ? 0 : 20, pointerEvents: megaOpen ? 'auto' : 'none' }}
              transition={{ duration: 0.25 }}
            >
              {categories.map((cat) => (
                <CatCard key={cat.slug} to={`/products?category=${cat.slug}`}>
                  <CatImg src={cat.image} alt={cat.name} loading="lazy" />
                  <CatLabel>{cat.name}</CatLabel>
                </CatCard>
              ))}
            </MegaMenu>
          </NavItem>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/cart">Cart</NavLink>
        </Nav>

        {/* Hamburger */}
        <Hamburger onClick={toggleMenu} className={open ? 'open' : ''} aria-label="Toggle menu">
          <span />
        </Hamburger>
      </HeaderContainer>

      {/* Mobile Fullscreen Menu */}
      <MobileMenu
        initial={{ x: '-100%' }}
        animate={{ x: open ? 0 : '-100%' }}
        transition={{ type: 'tween', duration: 0.4 }}
        onClick={toggleMenu}
      >
        {/* Animated diamond corners */}
        <DiamondCorner
          style={{ left: 0, top: 0 }}
          initial="initial"
          animate={open ? ['animate', 'pulse'] : 'initial'}
          variants={diamondVariants}
        />
        <DiamondCorner
          style={{ right: 0, top: 0 }}
          initial="initial"
          animate={open ? ['animate', 'pulse'] : 'initial'}
          variants={diamondVariants}
        />
        <DiamondCorner
          style={{ left: 0, bottom: 0 }}
          initial="initial"
          animate={open ? ['animate', 'pulse'] : 'initial'}
          variants={diamondVariants}
        />
        <DiamondCorner
          style={{ right: 0, bottom: 0 }}
          initial="initial"
          animate={open ? ['animate', 'pulse'] : 'initial'}
          variants={diamondVariants}
        />
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Shop</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/cart">Cart</NavLink>
        <CTAButton href="/products" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Shop the Tribe
        </CTAButton>
        <SocialRow>
          <SocialIcon href="https://facebook.com/PositiveVibeTribe" target="_blank" aria-label="Facebook">
            <span style={{fontSize:'1.2rem',fontWeight:700}}>f</span>
          </SocialIcon>
          <SocialIcon href="https://instagram.com/PositiveVibeTribe" target="_blank" aria-label="Instagram">
            <span style={{fontSize:'1.2rem',fontWeight:700}}>ig</span>
          </SocialIcon>
        </SocialRow>
      </MobileMenu>
    </>
  );
}

export default Header; 