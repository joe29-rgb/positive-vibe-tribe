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

const TrendingItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover { background: var(--warm-beige); }
`;

// Util to escape regex special chars
function escapeRegex(str='') {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function SearchBar(){
  const [term,setTerm]=useState('');
  const [results,setResults]=useState([]);
  const [showTrending,setShowTrending]=useState(false);
  const [trending,setTrending]=useState([]);

  const fuseRef=useRef(null);
  const wrapperRef=useRef(null);
  const timerRef=useRef(null);

  // Load trending searches from localStorage
  useEffect(()=>{
    const stored=localStorage.getItem('pvt-trending-searches');
    if(stored){
      try {
        setTrending(JSON.parse(stored));
      } catch (err) {
        /* eslint-disable no-console */
        console.error('Failed to parse trending searches', err);
      }
    }
  },[]);

  // Build local Fuse index for offline fallback (with caching)
  useEffect(()=>{
    const cached=localStorage.getItem('pvt-product-cache');
    const oneDay=24*60*60*1000;
    if(cached){
      try {
        const { ts, data } = JSON.parse(cached);
        if (Date.now() - ts < oneDay && Array.isArray(data) && data.length) {
          fuseRef.current = new Fuse(data, {
            keys: ['name', 'description', 'symbolism'],
            threshold: 0.3,
          });
          return; // up to date
        }
      } catch (err) {
        console.error('Error reading product cache', err);
      }
    }
    // fetch fresh data and cache
    fetch('/api/products')
      .then(r=>r.json())
      .then(data => {
        try {
          localStorage.setItem('pvt-product-cache', JSON.stringify({ ts: Date.now(), data }));
        } catch (err) {
          console.error('Failed to store product cache', err);
        }
        fuseRef.current = new Fuse(data, { keys: ['name', 'description', 'symbolism'], threshold: 0.3 });
      })
      .catch((err) => {
        console.error('SearchBar: failed to fetch products', err);
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
        .catch((err) => {
          console.error('Search API failed, falling back to local Fuse', err);
          if (fuseRef.current) {
            const hits = fuseRef.current.search(term).slice(0, 6).map((r) => r.item);
            setResults(hits);
          } else {
            setResults([]);
          }
        });
    },300);
    return ()=> clearTimeout(timerRef.current);
  },[term]);

  // Input focus handler to show trending
  const handleFocus=()=>{
    if(!term.trim() && trending.length){ setShowTrending(true); }
  };

  // Click outside hide trending as well
  useEffect(()=>{
    const handler=e=>{ if(wrapperRef.current && !wrapperRef.current.contains(e.target)){ setShowTrending(false); } };
    document.addEventListener('mousedown',handler);
    return()=> document.removeEventListener('mousedown',handler);
  },[]);

  // Save term to trending list
  const recordTrending=(value)=>{
    const next = [value, ...trending.filter((t) => t !== value)].slice(0, 10);
    setTrending(next);
    try {
      localStorage.setItem('pvt-trending-searches', JSON.stringify(next));
    } catch (err) {
      console.error('Failed to save trending searches', err);
    }
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Input aria-label="Search products" placeholder="Search products…" value={term} onFocus={handleFocus} onChange={e=>{setTerm(e.target.value);setShowTrending(false);}} />
      { (results.length>0 || (showTrending && trending.length)) && (
        <Results>
          {showTrending ? (
            trending.map(t=> (
              <TrendingItem key={t} onClick={()=>{ setTerm(t); setShowTrending(false); }}>
                <span role="img" aria-label="fire">🔥</span> {t}
              </TrendingItem>
            ))
          ) : (
            results.map(p=> {
              const regex=new RegExp(`(${escapeRegex(term)})`,'gi');
              const parts=p.name.split(regex);
              return (
                <li key={p._id}>
                  <Item to={`/product/${p._id}`} onClick={()=>{setTerm('');recordTrending(p.name);}}>
                    <LazyImage src={p.image} alt="" widths={[96,128]} sizes="96px" style={{width:48,height:48,borderRadius:8}} />
                    <span>{parts.map((part,i)=> regex.test(part) ? <mark key={i}>{part}</mark> : part)}</span>
                    <span style={{marginLeft:'auto',fontWeight:600}}>${p.price}</span>
                  </Item>
                </li>
              );
            })
          )}
        </Results>
      )}
    </Wrapper>
  );
}

export default SearchBar; 