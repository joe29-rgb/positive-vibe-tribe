import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import { flyToCart } from '../../utils/flyToCart';
import { addRecentProduct } from '../../utils/recentlyViewed';
import RecentlyViewed from '../../components/RecentlyViewed/RecentlyViewed';
import ProductHero from '../../components/ProductHero/ProductHero';
import ProductAccordion from '../../components/ProductAccordion/ProductAccordion';
import UGCStrip from '../../components/UGCStrip/UGCStrip';
import { buildSrcSet } from '../../utils/imageSrcSet';
import ProductReviews from '../../components/ProductReviews/ProductReviews';
import SpinViewer from '../../components/SpinViewer/SpinViewer.jsx';

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
  font-size: var(--fs-base);
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

const GalleryWrapper = styled.div`
  margin: 40px 0;
  .image-gallery-slide img { border-radius:24px; box-shadow:0 8px 24px rgba(0,0,0,0.08); }
`;

const TrustRow = styled.ul`
  display:flex;
  gap:24px;
  flex-wrap:wrap;
  list-style:none;
  padding:24px 0;
  border-top:1px solid #e9e4dd;
  border-bottom:1px solid #e9e4dd;
  margin:40px 0;
  li { display:flex; align-items:center; gap:8px; font-size:var(--fs-sm); color:var(--medium-gray); }
`;

const StickyBar = styled.div`
  position:fixed;
  bottom:0;
  left:0;
  width:100%;
  background:#fff;
  box-shadow:0 -2px 10px rgba(0,0,0,0.08);
  padding:12px 16px;
  display:none;
  z-index:90;
  @media(max-width:640px){ display:flex; justify-content:space-between; align-items:center; }
`;

const SelectorGroup = styled.div`
  margin: 24px 0;
  display:flex;
  flex-direction:column;
  gap:12px;
`;

const OptionRow = styled.div`
  display:flex;
  gap:12px;
  flex-wrap:wrap;
`;

const ColorSwatch = styled.button`
  width:32px; height:32px; border-radius:50%; border:${p=>p.$active?'3px solid var(--primary-red)':'1px solid #ccc'}; cursor:pointer;
  background:${p=>p.$color};
`;

const SizeBtn = styled.button`
  padding:8px 14px; border-radius:8px; border:${p=>p.$active?'2px solid var(--primary-red)':'1px solid #ccc'};
  background:#fff; cursor:pointer; font-size:var(--fs-sm); font-weight:600;
`;

const Grid = styled.div`
  display:block;
  @media(min-width:1024px){
    display:grid;
    grid-template-columns:600px 1fr;
    gap:60px;
    align-items:start;
  }
`;

const InfoWrapper = styled.div`
  position:sticky;
  top:80px;
  display:flex;
  flex-direction:column;
`;

const Title = styled.h2`
  font-family:'UnifrakturCook',cursive;
  font-size:var(--fs-2xl);
  margin:0 0 12px;
  color:var(--dark-brown);
`;

const Price = styled.p`
  font-size:var(--fs-2xl);
  font-weight:700;
  color:var(--primary-red);
  margin:0 0 24px;
`;

const ImageGallery = lazy(() => import('react-image-gallery'));

const ProductUpsellCarousel = lazy(()=> import('../../components/ProductUpsellCarousel/ProductUpsellCarousel'));

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const imgRef = useRef(null);

  const [color, setColor] = useState(product?.colors?.[0] || 'Default');
  const [size, setSize] = useState('');

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        addRecentProduct(data);
        setColor(data.colors?.[0] || 'Default');
      })
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

  // Build gallery items: support media array with {type:'image'|'video', src, thumb}
  const mediaItems = product.media && product.media.length ? [...product.media] : [
    {type:'image',src: color==='Black' && product.altImage ? product.altImage : product.image}
  ];

  if(product.spinFrames && product.spinFrames.length){
    mediaItems.push({type:'spin',frames:product.spinFrames,thumb:product.spinFrames[0]});
  }

  const galleryItems = mediaItems.map(m=>{
    if(m.type==='video'){
      return {
        thumbnail: m.thumb || m.src + '#t=1',
        renderItem: ()=>(
          <div className="video-wrapper" style={{position:'relative',paddingTop:'56.25%'}}>
            <video controls style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',borderRadius:24,boxShadow:'0 8px 24px rgba(0,0,0,0.08)'}} src={m.src}>
              <track kind="captions" label="Captions" src="" srcLang="en" default />
            </video>
          </div>
        )
      };
    }
    if(m.type==='spin'){
      return {
        thumbnail:m.thumb,
        renderItem:()=> <SpinViewer frames={m.frames} alt={product.name} />
      };
    }
    // default image
    return {original:m.src,thumbnail:m.thumb||m.src};
  });

  const handleAdd = () => {
    if(!size) return;
    dispatch(addToCart({ product, size, quantity: 1 }));
    toast.success(`${product.name} added to cart`);
    if (imgRef.current) {
      flyToCart(imgRef.current);
    }
  };

  return (
    <Wrapper>
      <Helmet>
        <title>{`${product.name} – Positive Vibe Tribe`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} – Positive Vibe Tribe`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} – Positive Vibe Tribe`} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={product.image} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          image: [product.image, product.altImage].filter(Boolean),
          description: product.description,
          sku: product._id,
          brand: {
            '@type': 'Brand',
            name: 'Positive Vibe Tribe',
          },
          offers: {
            '@type': 'Offer',
            url: window.location.href,
            price: product.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        })}</script>
      </Helmet>
      <Breadcrumbs productName={product.name} />
      <ProductHero product={product} />
      <Grid>
        {/* Gallery column */}
        <GalleryWrapper style={{position:'sticky',top:80}}>
          {galleryItems.length ? (
            <Suspense fallback={<SkeletonBox />}>
              <ImageGallery items={galleryItems} showPlayButton={false} showFullscreenButton={true} thumbnailPosition="bottom" />
            </Suspense>
          ) : (
            <Img
              ref={imgRef}
              src={product.image}
              alt={product.name}
              loading="lazy"
              srcSet={buildSrcSet(product.image, 800)}
              sizes="(max-width: 640px) 100vw, 600px"
            />
          )}
        </GalleryWrapper>

        {/* Details column */}
        <InfoWrapper>
          <Title>{product.name}</Title>
          <Price>${product.price}</Price>
          <TrustRow>
            <li>🔒 Secure Checkout</li>
            <li>🚚 Free shipping $100+</li>
            <li>↺ 30-day returns</li>
            <li>🌱 Ethically sourced</li>
          </TrustRow>

          <p style={{ marginTop: '24px' }}>{product.description}</p>

          <SelectorGroup>
            {product.colors && product.colors.length>1 && (
              <div>
                <strong>Colour:</strong>
                <OptionRow style={{marginTop:8}}>
                  {product.colors.map(c=> (
                    <ColorSwatch key={c} aria-label={c} $color={c.toLowerCase()==='black'?'#000':c.toLowerCase()==='grey'?'#888':c} $active={c===color} onClick={()=>setColor(c)} />
                  ))}
                </OptionRow>
              </div>
            )}

            {product.sizes && product.sizes.length>0 && (
              <div>
                <strong>Size:</strong>
                <OptionRow style={{marginTop:8}}>
                  {product.sizes.map(s=> (
                    <SizeBtn key={s} aria-label={s} $active={s===size} onClick={()=>setSize(s)}>{s}</SizeBtn>
                  ))}
                </OptionRow>
              </div>
            )}
          </SelectorGroup>

          <AddBtn onClick={handleAdd} disabled={!size} style={!size?{opacity:0.5,cursor:'not-allowed'}:{}}>Add to Cart</AddBtn>
        </InfoWrapper>
      </Grid>

      {/* Sticky bar mobile */}
      <StickyBar>
        <span style={{fontWeight:600}}>${product.price}</span>
        <AddBtn style={{margin:0}} onClick={handleAdd} disabled={!size}>Add to Cart</AddBtn>
      </StickyBar>

      <ProductAccordion product={product} />

      <ProductReviews productName={product.name} />

      <UGCStrip />

      <Suspense fallback={<div style={{height:200}} />}>
        <ProductUpsellCarousel currentId={product._id} />
      </Suspense>

      <RecentlyViewed currentId={product._id} />
    </Wrapper>
  );
}

export default ProductDetail; 