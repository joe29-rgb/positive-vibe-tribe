import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const Sidebar = styled.aside`
  width: 260px;
  padding: 24px;
  position: fixed;
  top: 80px;
  left: 0;
  height: calc(100vh - 80px);
  overflow-y: auto;
  background: var(--warm-beige);
  box-shadow: 2px 0 8px rgba(0,0,0,0.05);
  border-right: 1px solid rgba(0,0,0,0.05);

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Section = styled.fieldset`
  margin-bottom: 32px;
`;

const Title = styled.legend`
  margin-bottom: 12px;
  font-size: var(--fs-base);
  font-weight: 600;
  color: var(--dark-brown);
  text-transform: capitalize;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--fs-sm);
  cursor: pointer;
  margin-bottom: 6px;

  input {
    accent-color: var(--primary-red);
  }
`;

const ColorSwatch = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${(p) => p.color || '#000'};
  border: 1px solid #ccc;
`;

// Visually hidden helper
const SrOnly = styled.span`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
`;

function MultiFilter({ title, options, selected, toggle, counts }) {
  const [open,setOpen]=useState(true);

  useEffect(()=>{
    // Close by default on mobile
    if(window.innerWidth<768){setOpen(false);}
  },[]);

  return (
    <Section>
      <button onClick={()=>setOpen(o=>!o)} style={{background:'none',border:'none',display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center',padding:0,marginBottom:12,cursor:'pointer'}}>
        <Title style={{margin:0}}>{title}</Title>
        <span style={{transform:open?'rotate(45deg)':'rotate(-45deg)',transition:'transform .2s'}}>{open?'-':'+'}</span>
      </button>
      {open && options.map((opt) => {
        const count=counts?.[opt] || 0;
        return (
          <Checkbox key={opt} style={{justifyContent:'space-between'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <input
                id={`${title}-${opt}`.replace(/\s+/g, '-')}
                type="checkbox"
                aria-label={`${title} ${opt}`}
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
              />
              {title.toLowerCase() === 'colors' ? (
                <>
                  <ColorSwatch color={opt} aria-hidden="true" />
                  <SrOnly>{opt}</SrOnly>
                </>
              ) : (
                opt
              )}
            </div>
            <span style={{fontSize:'0.75rem',color:'#555'}}>{count}</span>
          </Checkbox>
        );
      })}
    </Section>
  );
}

function FacetSidebar({ facets, selected, onToggle, searchTerm, onSearchChange, priceRange, onPriceChange, saleOnly, onSaleToggle, minRating, onRatingChange, suggestions, counts={}, autoFocusSearch=false }) {
  const searchRef = useRef(null);

  useEffect(()=>{
    if(autoFocusSearch && searchRef.current){
      searchRef.current.focus();
    }
  },[autoFocusSearch]);

  return (
    <Sidebar>
      <Section style={{position:'relative'}}>
        <div style={{display:'flex'}}>
          <input
            type="text"
            placeholder="Search products…"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e)=>{if(e.key==='Enter'){e.preventDefault();onSearchChange(e.target.value);}}}
            style={{ flex:1, padding:'8px 12px', borderTopLeftRadius:8, borderBottomLeftRadius:8, border:'1px solid #ddd', borderRight:'none'}}
            ref={searchRef}
          />
          <button aria-label="Search" onClick={()=>onSearchChange(searchTerm)} style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'0 16px', border:'1px solid #ddd', borderLeft:'none', background:'var(--primary-red)', color:'#fff', borderTopRightRadius:8, borderBottomRightRadius:8}}>
            <FaSearch />
          </button>
        </div>
        {suggestions?.length>0 && (
          <ul style={{position:'absolute',top:'100%',left:0,right:0,background:'#fff',border:'1px solid #ddd',zIndex:10,maxHeight:160,overflowY:'auto'}}>
            {suggestions.map((s)=>(
              <li key={s}>
                <button type="button" style={{width:'100%',textAlign:'left',padding:'6px 10px',background:'none',border:'none',cursor:'pointer'}} onMouseDown={()=>onSearchChange(s)}>
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Price range inputs */}
      {priceRange && onPriceChange && (
        <Section>
          <Title>Price Range</Title>
          <div style={{ display: 'grid', gridTemplateColumns:'1fr 24px 1fr', gap:4, marginBottom: 8 }}>
            <input
              type="number"
              min="0"
              value={priceRange[0]}
              onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
              style={{ width:'100%', padding:'6px 8px', borderRadius:6, border:'1px solid #ccc' }}
            />
            <span style={{display:'flex',alignItems:'center',justifyContent:'center'}}>-</span>
            <input
              type="number"
              min="0"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
              style={{ width:'100%', padding:'6px 8px', borderRadius:6, border:'1px solid #ccc' }}
            />
          </div>
          {/* Simple range slider */}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <input
              type="range"
              min="0"
              max="1000"
              step="5"
              value={priceRange[0]}
              onChange={(e)=> onPriceChange([Number(e.target.value), priceRange[1]]) }
              style={{ width:'100%', accentColor:'var(--primary-red)' }}
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="5"
              value={priceRange[1]}
              onChange={(e)=> onPriceChange([priceRange[0], Number(e.target.value)]) }
              style={{ width:'100%', accentColor:'var(--primary-red)', marginTop:4 }}
            />
          </div>
        </Section>
      )}

      {/* Deals */}
      {typeof saleOnly==='boolean' && onSaleToggle && (
        <Section>
          <Title>Deals</Title>
          <Checkbox>
            <input type="checkbox" id="on-sale" checked={saleOnly} onChange={onSaleToggle} />
            <span>On Sale</span>
          </Checkbox>
        </Section>
      )}

      {/* Rating */}
      {onRatingChange && (
        <Section>
          <Title>Minimum Rating</Title>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            {[0,3,4,5].map(r=> (
              <button key={r} type="button" onClick={()=>onRatingChange(r)} style={{background:minRating===r?'var(--primary-red)':'transparent',color:minRating===r?'#fff':'var(--dark-brown)',border:'1px solid var(--primary-red)',borderRadius:6,padding:'4px 8px',cursor:'pointer',fontSize:'0.8rem'}}>{r===0?'Any':`${r}+`}</button>
            ))}
          </div>
        </Section>
      )}

      {Object.entries(facets).map(([key, list]) => (
        <MultiFilter
          key={key}
          title={key.charAt(0).toUpperCase() + key.slice(1)}
          options={list}
          selected={selected[key] || []}
          counts={counts[key] || {}}
          toggle={(opt) => onToggle(key, opt)}
        />
      ))}
    </Sidebar>
  );
}

export default FacetSidebar; 