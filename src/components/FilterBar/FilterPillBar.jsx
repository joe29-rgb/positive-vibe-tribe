import styled from 'styled-components';
import { FaTimes, FaFilter, FaSort } from 'react-icons/fa';
import React from 'react';

const Bar = styled.nav`
  position: sticky;
  top: var(--pill-bar-top, 64px);
  width: 100%;
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  z-index: 70;
  overflow-x: auto;

  @media(max-width: 768px){
    position: fixed;
    top: auto;
    bottom: 0;
    box-shadow: 0 -2px 8px rgba(0,0,0,0.06);
  }

  transform: translateY(${p=>p.$offscreen?'100%':'0%'});
  display: ${p=>p.$hidden?'none':'flex'};
  transition: transform 0.25s ease, display 0.2s linear;
`;

const Pill = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--warm-beige);
  border: none;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 0.85rem;
  cursor: pointer;
  white-space: nowrap;
  svg { font-size: 0.7rem; }
`;

function FilterPillBar({ selected, priceRange, saleOnly, minRating, onRemove, onSortClick, onFilterClick, isHidden=false }){
  // Build pills list
  const pills = [];
  Object.entries(selected).forEach(([key, arr])=>{
    arr.forEach(val=> pills.push({label:`${val}`, id:`${key}-${val}`, remove:()=>onRemove(key,val)}));
  });
  if(priceRange[0]!==0 || priceRange[1]!==1000){
    pills.push({label:`$${priceRange[0]} – $${priceRange[1]}`, id:'price', remove:()=>onRemove('price')});
  }
  if(saleOnly){ pills.push({label:'On Sale', id:'sale', remove:()=>onRemove('sale')}); }
  if(minRating>0){ pills.push({label:`${minRating}★+`, id:'rating', remove:()=>onRemove('rating')}); }

  const [offscreen,setOffscreen]=React.useState(false);
  React.useEffect(()=>{
    let lastY=window.scrollY;
    const handler=()=>{
      const y=window.scrollY;
      if(Math.abs(y-lastY)<12) return;
      const down = y>lastY;
      lastY=y;
      // Only animate on mobile
      if(window.innerWidth<768){ setOffscreen(down); }
    };
    window.addEventListener('scroll',handler);
    return()=>window.removeEventListener('scroll',handler);
  },[]);

  return (
    <Bar aria-label="Active filters" $offscreen={offscreen} $hidden={isHidden}>
      <Pill onClick={onFilterClick} aria-label="Open filters"><FaFilter/>Filter</Pill>
      <Pill onClick={onSortClick} aria-label="Change sort"><FaSort/>Sort</Pill>
      {pills.map(p=> (
        <Pill key={p.id} onClick={p.remove} aria-label={`Remove filter ${p.label}`}><span>{p.label}</span><FaTimes/></Pill>
      ))}
    </Bar>
  );
}

export default FilterPillBar; 