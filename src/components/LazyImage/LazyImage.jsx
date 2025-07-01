import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { buildSrcSets } from '../../utils/imageSrcSet';

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

function LazyImage({ src, alt = '', sizes = '(max-width: 640px) 100vw, 800px', widths=[320,480,640,768,960,1200], ...rest }) {
  const [loaded, setLoaded] = useState(false);

  const sets = buildSrcSets(src, widths);

  return (
    <picture>
      {sets.avif && <source type="image/avif" srcSet={sets.avif} sizes={sizes} />}
      {sets.webp && <source type="image/webp" srcSet={sets.webp} sizes={sizes} />}
      <Img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        srcSet={sets.jpg || undefined}
        sizes={sets.jpg ? sizes : undefined}
        $loading={!loaded}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
    </picture>
  );
}

export default LazyImage; 