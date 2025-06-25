import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.nav`
  font-size: var(--fs-sm);
  margin: 16px 0;
  color: var(--medium-gray);
  a {
    color: var(--primary-red);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Crumb = styled.span`
  &:not(:last-child)::after {
    content: ' / ';
    margin: 0 4px;
  }
`;

function Breadcrumbs({ productName }) {
  const location = useLocation();

  const crumbs = [
    { label: 'Home', path: '/' },
  ];

  if (location.pathname.startsWith('/products')) {
    crumbs.push({ label: 'Shop', path: '/products' });
  }

  if (location.pathname.startsWith('/product/') && productName) {
    crumbs.push({ label: productName });
  }

  return (
    <Wrapper aria-label="breadcrumbs">
      {crumbs.map((c, idx) => (
        <Crumb key={idx}>{c.path ? <Link to={c.path}>{c.label}</Link> : c.label}</Crumb>
      ))}
    </Wrapper>
  );
}

export default Breadcrumbs; 