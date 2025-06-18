import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Img = styled.img`
  width: 100%;
  height: auto;
  display: block;
  ${(props) =>
    props.$loading &&
    css`
      filter: blur(20px);
      transform: scale(1.05);
    `}
  transition: filter 0.8s ease, transform 0.8s ease;
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