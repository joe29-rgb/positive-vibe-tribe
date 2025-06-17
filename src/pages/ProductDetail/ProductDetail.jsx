import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Helmet } from 'react-helmet-async';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import { flyToCart } from '../../utils/flyToCart';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  color: var(--dark-brown);
`;

const Img = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
`;

const AddBtn = styled.button`
  background: var(--primary-red);
  color: #fff;
  border: none;
  padding: 14px 32px;
  border-radius: var(--border-radius-pill);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 24px;
  transition: background 0.25s;
  &:hover { background: var(--secondary-red); }
`;

const shimmer = keyframes`0%{background-position:-400px 0}100%{background-position:400px 0}`;
const SkeletonBox = styled.div`
  width: 100%;
  padding-top: 60%;
  border-radius:16px;
  background:#f6f7f8;
  background-image:linear-gradient(to right,#f6f7f8 0%,#edeef1 20%,#f6f7f8 40%,#f6f7f8 100%);
  background-size:800px 100%;
  animation:${shimmer} 1.2s linear infinite;
`;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return (
      <Wrapper>
        <SkeletonBox />
        <div style={{height:24}} />
        <SkeletonBox style={{paddingTop:'10%',maxWidth:400}} />
      </Wrapper>
    );
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${window.location.origin}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: `${window.location.origin}/products`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${window.location.origin}/product/${product._id}`,
      },
    ],
  };

  const galleryItems = [product.image, product.altImage].filter(Boolean).map((src) => ({ original: src, thumbnail: src }));

  const handleAdd = () => {
    dispatch(addToCart({ product, size: 'default', quantity: 1 }));
    toast.success(`${product.name} added to cart`);
    if (imgRef.current) {
      flyToCart(imgRef.current);
    }
  };

  return (
    <Wrapper>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <Breadcrumbs productName={product.name} />
      <h2 style={{ fontFamily: 'UnifrakturCook,cursive', fontSize: '2.5rem' }}>{product.name}</h2>
      {galleryItems.length ? (
        <ImageGallery items={galleryItems} showPlayButton={false} showFullscreenButton={true} />
      ) : (
        <Img ref={imgRef} src={product.image} alt={product.name} loading="lazy" />
      )}
      <p style={{ marginTop: '24px' }}>{product.description}</p>
      <p style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--primary-red)' }}>${product.price}</p>
      <AddBtn onClick={handleAdd}>Add to Cart</AddBtn>
    </Wrapper>
  );
}

export default ProductDetail; 