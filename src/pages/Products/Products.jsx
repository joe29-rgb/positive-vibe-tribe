import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
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
  font-size: 1.4rem;
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
  background: #fff;
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

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState({ sizes: [], materials: [], category: [], symbolism: [], colors: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showDrawer, setShowDrawer] = useState(false);

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

    setFiltered(list);
  }, [products, selected, searchTerm, fuse, priceRange]);

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

  if (loading) return <div style={{ padding: '2rem' }}>Loading products…</div>;

  return (
    <>
      <Wrapper>
        {/* Desktop sidebar */}
        <FacetSidebar
          facets={facets}
          selected={selected}
          onToggle={toggleFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <Content>
          <Helmet>
            <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
          </Helmet>
          <Breadcrumbs />
          <ProductGrid products={filtered} />
        </Content>
      </Wrapper>

      {/* Mobile filter toggle */}
      <MobileFilterButton onClick={toggleDrawer} aria-label="Filters">≡</MobileFilterButton>

      {/* Drawer + backdrop */}
      {showDrawer && (
        <>
          <Backdrop initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={toggleDrawer} />
          <Drawer
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
            />
            {/* Price range simple inputs */}
            <div style={{ marginTop: 24 }}>
              <h4 style={{ marginBottom: 8 }}>Price Range</h4>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="number"
                  min="0"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  style={{ flex: 1, padding: '6px 8px' }}
                />
                <span>-</span>
                <input
                  type="number"
                  min="0"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  style={{ flex: 1, padding: '6px 8px' }}
                />
              </div>
            </div>
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