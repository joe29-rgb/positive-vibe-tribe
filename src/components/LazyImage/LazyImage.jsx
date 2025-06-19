import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  display: block;
  ${(props) =>
    props.$loading &&
    css`
      background: #eae7e2;
      background-image: linear-gradient(
        90deg,
        #eae7e2 0px,
        #f2efeb 40px,
        #eae7e2 80px
      );
      background-size: 200px 100%;
      animation: ${shimmer} 1.2s ease-in-out infinite;
      color: transparent;
    `}
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.$loading ? 0 : 1)};
`;

function LazyImage({ src, alt = '', ...rest }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      $loading={!loaded}
      onLoad={() => setLoaded(true)}
      {...rest}
    />
  );
}

export default LazyImage; 