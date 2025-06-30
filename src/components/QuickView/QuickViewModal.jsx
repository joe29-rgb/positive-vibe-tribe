import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import { buildSrcSet } from '../../utils/imageSrcSet';
import SpinViewer from '../SpinViewer/SpinViewer.jsx';

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 120;
`;

const Panel = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 720px;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media(max-width:640px){ grid-template-columns:1fr; }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 12px;
`;

const AddBtn = styled.button`
  background: var(--primary-red);
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: var(--border-radius-pill);
  font-weight: 600;
  cursor: pointer;
`;

function QuickViewModal({ product, onClose }){
  const dispatch = useDispatch();
  const [size, setSize] = useState('');

  if(!product) return null;

  const handleAdd=()=>{
    if(product.sizes?.length && !size) return;
    dispatch(addToCart({ product, size: size||'default', quantity:1 }));
    toast.success(`${product.name} added to cart`);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {product && (
        <>
          <Backdrop initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} />
          <Panel initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.8,opacity:0}} transition={{type:'spring',stiffness:300,damping:25}}>
            <CloseBtn aria-label="Close" onClick={onClose}><FaTimes/></CloseBtn>
            {product.spinFrames && product.spinFrames.length ? (
              <SpinViewer frames={product.spinFrames} alt={product.name} />
            ) : (
              <Img src={product.image} alt={product.name} srcSet={buildSrcSet(product.image,600)} />
            )}
            <div style={{display:'flex',flexDirection:'column'}}>
              <h2 style={{margin:'0 0 8px',fontSize:'1.5rem'}}>{product.name}</h2>
              <p style={{fontWeight:700,color:'var(--primary-red)',fontSize:'1.25rem'}}>${product.price}</p>
              {product.sizes?.length>0 && (
                <div style={{margin:'16px 0'}}>
                  <strong>Size:</strong>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:6}}>
                    {product.sizes.map(s=> (
                      <button key={s} onClick={()=>setSize(s)} style={{padding:'6px 10px',borderRadius:6,border:size===s?'2px solid var(--primary-red)':'1px solid #ccc',background:'#fff',cursor:'pointer'}}>{s}</button>
                    ))}
                  </div>
                </div>
              )}
              <AddBtn onClick={handleAdd} disabled={product.sizes?.length>0 && !size} style={product.sizes?.length>0 && !size?{opacity:0.5,cursor:'not-allowed'}:{}}>Add to Cart</AddBtn>
              <p style={{marginTop:16,fontSize:'0.9rem',color:'#555'}}>{product.description.slice(0,120)}…</p>
            </div>
          </Panel>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default QuickViewModal; 