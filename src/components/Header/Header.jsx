import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import diamondSvg from '../../assets/corner-diamond.svg';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import AnnouncementBar from '../AnnouncementBar/AnnouncementBar';
import SearchBar from '../SearchBar/SearchBar';

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
  background: rgba(255,255,255,0.6);
  @supports (backdrop-filter: blur(8px)) {
    background: rgba(250,245,238,0.35); /* warm beige tint */
  }
  transition: background 0.3s ease, padding 0.3s ease;

  &.scrolled {
    background: var(--sunset-orange);
    padding: 0.5rem 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    /* invert nav colours */
    a, span {
      color: #fff !important;
    }
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
  .scrolled & {
    color: #fff;
  }
  font-family: 'UnifrakturCook', cursive;
  font-size: var(--fs-xl);
  font-weight: 700;
  letter-spacing: 0.02em;
  position: relative;
  transition: color 0.3s ease;
  padding-bottom: 6px;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 100%;
    height: 2px;
    background: var(--primary-red);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }
  &:hover {
    color: var(--primary-red);
  }
  &:hover::after {
    transform: scaleX(1);
  }
`;

const NavItem = styled.div`
  position: relative;
`;

const NavLink = styled.a`
  ${linkBase};
`;

const CartBadge = styled.span`
  position: absolute;
  top: -6px;
  right: -10px;
  background: var(--primary-red);
  color: #fff;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: var(--fs-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
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
  font-size: var(--fs-xl);
  box-shadow: 0 2px 8px rgba(200,16,46,0.08);
  transition: background 0.2s, color 0.2s;
  &:hover {
    color: #fff;
    background-color: var(--primary-red);
  }
`;

/* Mega menu */
const MegaMenu = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% + 8px);
  background: #fff;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
  padding: 32px 48px;
  border-radius: 12px;
  width: clamp(320px, 60vw, 720px);
  max-width: calc(100vw - 32px);
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(180px,1fr));
  gap: 24px;
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

/* Desktop social icons */
const SocialBar = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  a {
    color: var(--primary-red);
    font-size: 1rem;
    transition: transform .25s;
    &:hover { transform: scale(1.15); }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ---------- Row Layout ---------- */
const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const UtilityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }

  /* Hide when header shrinks */
  .scrolled & {
    transform: translateY(-120%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }
`;

const MainRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

/* ------------------------------------
   React Component
+------------------------------------ */
function Header() {
  const [open, setOpen] = React.useState(false);
  const [megaOpen, setMegaOpen] = React.useState(false);
  const megaRef = React.useRef(null);

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

  const defaultCats=[
    { name:'Hoodies',slug:'Hoodies' },
    { name:'Tees',slug:'Tees' },
    { name:'Caps',slug:'Caps' },
    { name:'Tanks',slug:'Tanks' },
  ];

  const [categories,setCategories]=React.useState(defaultCats.map(c=>({...c,image:''})));

  React.useEffect(()=>{
    fetch('/api/products')
      .then(r=>r.json())
      .then(data=>{
        const catMap={};
        data.forEach(p=>{ if(!catMap[p.category]) catMap[p.category]=p.image; });
        setCategories(prev=> prev.map(c=>({...c,image:catMap[c.slug]||c.image})));
      })
      .catch(()=>{});
  },[]);

  // Reposition mega-menu to fit viewport
  React.useEffect(()=>{
    if(!megaOpen || !megaRef.current) return;
    const menu=megaRef.current;
    const rect=menu.getBoundingClientRect();
    const padding=16;
    if(rect.right>window.innerWidth-padding){
      menu.style.left='auto';
      menu.style.transform='none';
      menu.style.right=`${padding}px`;
    }else if(rect.left<padding){
      menu.style.right='auto';
      menu.style.left=`${padding}px`;
      menu.style.transform='none';
    }else{
      menu.style.left='50%';
      menu.style.transform='translateX(-50%)';
      menu.style.right='auto';
    }
  },[megaOpen]);

  // Redux cart selector
  const itemCount = useSelector((state) => state.cart.itemCount);

  const kokopelliImg = 'https://res.cloudinary.com/dhm8ttqnk/image/upload/v1750431541/kokopelli_j7olov.png';

  const socialLinks = [
    {href:'https://facebook.com/PositiveVibeTribe', icon:<FaFacebookF/>, label:'Facebook'},
    {href:'https://twitter.com/PositiveVibeTribe', icon:<FaTwitter/>, label:'Twitter'},
    {href:'https://instagram.com/PositiveVibeTribe', icon:<FaInstagram/>, label:'Instagram'},
    {href:'https://youtube.com/@PositiveVibeTribe', icon:<FaYoutube/>, label:'YouTube'},
  ];

  return (
    <>
      <AnnouncementBar />
      <HeaderContainer ref={headerRef} role="navigation" aria-label="Primary">
        <Inner>
          {/* Utility Row */}
          <UtilityRow>
            <SearchBar />
            <SocialBar>
              {socialLinks.map(s=> (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>{s.icon}</a>
              ))}
            </SocialBar>
          </UtilityRow>

          {/* Main Row */}
          <MainRow>
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
                  ref={megaRef}
                  aria-label="Shop categories"
                  initial={{ opacity: 0, y: 20, pointerEvents: 'none' }}
                  animate={{ opacity: megaOpen ? 1 : 0, y: megaOpen ? 0 : 20, pointerEvents: megaOpen ? 'auto' : 'none' }}
                  transition={{ duration: 0.25 }}
                >
                  {categories.map((cat) => (
                    <CatCard key={cat.slug} to={`/products?category=${cat.slug}`}>
                      <CatImg src={cat.image||'https://via.placeholder.com/160'} alt={cat.name} loading="lazy" />
                      <CatLabel>{cat.name}</CatLabel>
                    </CatCard>
                  ))}
                </MegaMenu>
              </NavItem>
              <NavLink href="/about">About</NavLink>
              <NavItem>
                <NavLink id="cart-icon" href="/cart" style={{position:'relative'}}>
                  <FaShoppingCart size={20} />
                  {itemCount > 0 && <CartBadge>{itemCount}</CartBadge>}
                </NavLink>
              </NavItem>
            </Nav>

            {/* Hamburger */}
            <Hamburger onClick={toggleMenu} className={open ? 'open' : ''} aria-label="Toggle menu">
              <span />
            </Hamburger>
          </MainRow>
        </Inner>
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
        <NavItem
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <NavLink id="cart-icon-mobile" href="/cart" style={{position:'relative'}}>
            <FaShoppingCart size={20} />
            {itemCount > 0 && <CartBadge>{itemCount}</CartBadge>}
          </NavLink>
        </NavItem>
        <motion.a href="/products" className="btn btn-gradient" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Shop the Tribe
        </motion.a>
        <SocialRow>
          {socialLinks.map(s=> (
            <SocialIcon key={s.label} href={s.href} target="_blank" aria-label={s.label}>{s.icon}</SocialIcon>
          ))}
        </SocialRow>
      </MobileMenu>
    </>
  );
}

export default Header; 