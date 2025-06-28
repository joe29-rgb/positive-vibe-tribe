import React, { useEffect, useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import FilterPillBar from '../../components/FilterBar/FilterPillBar.jsx';
import ShopHero from '../../components/ShopHero/ShopHero';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import FacetSidebar from '../../components/ProductFilters/FacetSidebar.jsx';
import Fuse from 'fuse.js';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 40px 20px;
  margin-left: 260px;
  @media(max-width:1024px){
    margin-left:0;
  }
`;

const MobileFilterButton = styled.button`
  display: none;
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--primary-red);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: var(--fs-xl);
  z-index: 80;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Drawer = styled(motion.aside)`
  position: fixed;
  top: 0;
  right: 0;
  width: 85%;
  max-width: 320px;
  height: 100vh;
  background: var(--warm-beige);
  box-shadow: -2px 0 12px rgba(0,0,0,0.08);
  z-index: 90;
  padding: 24px;
  overflow-y: auto;
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.25);
  z-index: 85;
`;

const LoadMoreBtn = styled.button`
  display: block;
  margin: 40px auto 80px;
  padding: 14px 32px;
  border: none;
  border-radius: var(--border-radius-pill);
  background: var(--primary-red);
  color: #fff;
  font-size: var(--fs-base);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s;
  &:hover {
    background: var(--secondary-red);
  }
`;

const PatternBg = styled.div`
  position: fixed;
  inset: 0;
  background-image: repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0 2px, transparent 2px 40px);
  pointer-events: none;
  z-index: -2;
`;

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('newest');

  const [selected, setSelected] = useState({ sizes: [], materials: [], category: [], symbolism: [], colors: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [saleOnly,setSaleOnly]=useState(false);
  const [minRating,setMinRating]=useState(0);
  const [visibleCount, setVisibleCount] = useState(12);
  const sortRef = useRef(null);

  const sentinelRef = useRef(null);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const fuse = useMemo(() => new Fuse(products, { keys: ['name', 'description', 'symbolism'] }), [products]);
  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return fuse.search(searchTerm).slice(0,5).map(r=>r.item.name);
  }, [searchTerm, fuse]);

  useEffect(() => {
    let list = products;

    // Search
    if (searchTerm.trim()) {
      list = fuse.search(searchTerm).map((r) => r.item);
    }

    // Filter
    const { sizes, materials, category, symbolism, colors } = selected;
    const [minP, maxP] = priceRange;
    if (sizes.length) list = list.filter((p) => p.sizes?.some((s) => sizes.includes(s)));
    if (materials.length) list = list.filter((p) => materials.includes(p.material));
    if (category.length) list = list.filter((p) => category.includes(p.category));
    if (symbolism.length) list = list.filter((p) => p.symbolism && symbolism.some((sym) => p.symbolism.includes(sym)));
    if (colors.length) list = list.filter((p) => p.colors && p.colors.some((c) => colors.includes(c)));
    list = list.filter((p) => p.price >= minP && p.price <= maxP);

    // sale filter
    if(saleOnly){ list = list.filter(p=> p.salePrice && p.salePrice < p.price); }

    // rating filter (assumes rating field 0-5)
    if(minRating>0){ list = list.filter(p=> (p.rating||0) >= minRating ); }

    // sort list
    let sorted=list;
    if(sortBy==='price-asc') sorted=[...list].sort((a,b)=>a.price-b.price);
    else if(sortBy==='price-desc') sorted=[...list].sort((a,b)=>b.price-a.price);
    else if(sortBy==='az') sorted=[...list].sort((a,b)=>a.name.localeCompare(b.name));
    else if(sortBy==='newest') sorted=[...list].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));

    setFiltered(sorted);
  }, [products, selected, searchTerm, fuse, priceRange, sortBy, saleOnly, minRating]);

  // derive facet options
  const facets = useMemo(() => {
    const sizeSet = new Set();
    const materialSet = new Set();
    const catSet = new Set();
    const symSet = new Set();
    const colorSet = new Set();
    products.forEach((p) => {
      p.sizes?.forEach((s) => sizeSet.add(s));
      if (p.material) materialSet.add(p.material);
      if (p.category) catSet.add(p.category);
      p.symbolism?.forEach((s) => symSet.add(s));
      p.colors?.forEach((c) => colorSet.add(c));
    });
    return {
      sizes: Array.from(sizeSet),
      materials: Array.from(materialSet),
      category: Array.from(catSet),
      symbolism: Array.from(symSet),
      colors: Array.from(colorSet),
    };
  }, [products]);

  const toggleFilter = (key, value) => {
    setSelected((prev) => {
      const arr = prev[key] || [];
      const exists = arr.includes(value);
      return { ...prev, [key]: exists ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const toggleDrawer = () => setShowDrawer((p) => !p);

  const removeFilter = (key,val)=>{
    if(key==='price'){ setPriceRange([0,1000]); return; }
    if(key==='sale'){ setSaleOnly(false); return; }
    if(key==='rating'){ setMinRating(0); return; }
    toggleFilter(key,val);
  };

  const openSort = ()=>{ if(sortRef.current){ sortRef.current.focus(); } };

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
    ],
  };

  const displayList = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);

  // counts per facet option within current filtered set
  const facetCounts = useMemo(()=>{
    const countObj = { sizes:{}, materials:{}, category:{}, symbolism:{}, colors:{} };
    filtered.forEach(p=>{
      p.sizes?.forEach(s=>{countObj.sizes[s]=(countObj.sizes[s]||0)+1;});
      if(p.material) countObj.materials[p.material]=(countObj.materials[p.material]||0)+1;
      if(p.category) countObj.category[p.category]=(countObj.category[p.category]||0)+1;
      p.symbolism?.forEach(sym=>{countObj.symbolism[sym]=(countObj.symbolism[sym]||0)+1;});
      p.colors?.forEach(c=>{countObj.colors[c]=(countObj.colors[c]||0)+1;});
    });
    return countObj;
  },[filtered]);

  // infinite scroll observer
  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(c => Math.min(c + 12, filtered.length));
      }
    }, { rootMargin: '200px' });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [filtered.length]);

  const resetFilters=()=>{setSelected({sizes:[],materials:[],category:[],symbolism:[],colors:[]});setSearchTerm('');setPriceRange([0,1000]);setSaleOnly(false);setMinRating(0);};

  if (loading) return <div style={{ padding: '2rem' }}>Loading products…</div>;

  return (
    <>
      <ShopHero />
      <FilterPillBar
        selected={selected}
        priceRange={priceRange}
        saleOnly={saleOnly}
        minRating={minRating}
        onRemove={removeFilter}
        onSortClick={openSort}
        onFilterClick={toggleDrawer}
      />
      <PatternBg />
      <Wrapper>
        {/* Desktop sidebar */}
        <FacetSidebar
          facets={facets}
          selected={selected}
          onToggle={toggleFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          saleOnly={saleOnly}
          onSaleToggle={()=>setSaleOnly(s=>!s)}
          minRating={minRating}
          onRatingChange={setMinRating}
          suggestions={suggestions}
          counts={facetCounts}
        />
        <Content>
          <Helmet>
            <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
          </Helmet>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'center',gap:12,marginBottom:16}}>
            <Breadcrumbs />
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <span style={{fontSize:'0.9rem',color:'var(--medium-gray)'}}>{filtered.length} results</span>
              {Object.values(selected).some(arr=>arr.length) || searchTerm.trim() || saleOnly || minRating>0 ? (
                <button onClick={resetFilters} style={{background:'none',border:'1px solid var(--primary-red)',color:'var(--primary-red)',padding:'6px 10px',borderRadius:8,cursor:'pointer'}}>Clear filters</button>
              ):null}
              <select ref={sortRef} value={sortBy} onChange={(e)=>setSortBy(e.target.value)} style={{padding:'6px 10px'}}>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="az">A–Z</option>
              </select>
            </div>
          </div>
          <ProductGrid products={displayList} />
          {visibleCount < filtered.length && (
            <LoadMoreBtn onClick={() => setVisibleCount(c => c + 12)}>Load More</LoadMoreBtn>
          )}
          <div ref={sentinelRef} />
        </Content>
      </Wrapper>

      {/* Mobile filter toggle */}
      <MobileFilterButton onClick={toggleDrawer} aria-label="Filters">≡</MobileFilterButton>

      {/* Drawer + backdrop */}
      {showDrawer && (
        <>
          <Backdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleDrawer} />
          <Drawer
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 300 }}
            onDragEnd={(e, info)=>{ if(info.offset.x>120){ toggleDrawer(); } }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <FacetSidebar
              facets={facets}
              selected={selected}
              onToggle={toggleFilter}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              saleOnly={saleOnly}
              onSaleToggle={()=>setSaleOnly(s=>!s)}
              minRating={minRating}
              onRatingChange={setMinRating}
              counts={facetCounts}
              autoFocusSearch={true}
            />
            <button
              onClick={toggleDrawer}
              style={{ marginTop: 20, width: '100%', padding: '12px', background: 'var(--primary-red)', color: '#fff', border: 'none', borderRadius: 8 }}
            >
              Apply Filters
            </button>
          </Drawer>
        </>
      )}
    </>
  );
}

export default Products; 