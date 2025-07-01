import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import LazyImage from '../LazyImage/LazyImage.jsx';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  position: relative;
  max-width: 380px;
  flex: 1;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px 40px 8px 14px;
  border-radius: 24px;
  border: 1px solid rgba(0,0,0,0.15);
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(4px);
`;
const Results = styled.ul`
  position: absolute;
  top: 110%;
  left: 0; right: 0;
  background: #fff;
  border-radius:12px;
  box-shadow:0 6px 18px rgba(0,0,0,0.08);
  max-height:320px;
  overflow:auto;
  z-index:95;
`;
const Item = styled(Link)`
  display:flex;
  align-items:center;
  gap:12px;
  padding:8px 12px;
  text-decoration:none;
  color:var(--dark-brown);
  &:hover{background:var(--warm-beige);}
  img{width:48px;height:48px;object-fit:cover;border-radius:8px;}
`;

function SearchBar(){
  const [term,setTerm]=useState('');
  const [results,setResults]=useState([]);
  const fuseRef=useRef(null);
  const wrapperRef=useRef(null);
  const timerRef=useRef(null);

  // Build local Fuse index for offline fallback
  useEffect(()=>{
    fetch('/api/products')
      .then(r=>r.json())
      .then(data=>{
        fuseRef.current=new Fuse(data,{keys:['name','description','symbolism'],threshold:0.3});
      });
  },[]);

  // Debounced server-side search with fallback
  useEffect(()=>{
    if(!term.trim()) { setResults([]); return; }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(()=>{
      fetch(`/api/search?q=${encodeURIComponent(term)}`)
        .then(r=> r.ok ? r.json() : Promise.reject())
        .then(data=> setResults(data.slice(0,6)))
        .catch(()=>{
          if(fuseRef.current){
            const hits=fuseRef.current.search(term).slice(0,6).map(r=>r.item);
            setResults(hits);
          } else setResults([]);
        });
    },300);
    return ()=> clearTimeout(timerRef.current);
  },[term]);

  // click outside to close
  useEffect(()=>{
    const handler=e=>{if(wrapperRef.current && !wrapperRef.current.contains(e.target)){setResults([]);}};
    document.addEventListener('mousedown',handler);
    return()=>document.removeEventListener('mousedown',handler);
  },[]);

  return (
    <Wrapper ref={wrapperRef}>
      <Input aria-label="Search products" placeholder="Search products…" value={term} onChange={e=>setTerm(e.target.value)} />
      {results.length>0 && (
        <Results>
          {results.map(p=> (
            <li key={p._id}>
              <Item to={`/product/${p._id}`} onClick={()=>setTerm('')}>
                <LazyImage src={p.image} alt="" widths={[96,128]} sizes="96px" style={{width:48,height:48,borderRadius:8}} />
                <span>{p.name}</span>
                <span style={{marginLeft:'auto',fontWeight:600}}>${p.price}</span>
              </Item>
            </li>
          ))}
        </Results>
      )}
    </Wrapper>
  );
}

export default SearchBar; 