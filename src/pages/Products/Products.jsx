import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductGrid from '../../components/ProductGrid/ProductGrid.jsx';
import FacetSidebar from '../../components/ProductFilters/FacetSidebar.jsx';
import Fuse from 'fuse.js';
import { Helmet } from 'react-helmet-async';

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 40px 20px;
`;

function Products() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState({ sizes: [], materials: [], category: [], symbolism: [] });
  const [searchTerm, setSearchTerm] = useState('');

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
    const { sizes, materials, category, symbolism } = selected;
    if (sizes.length) list = list.filter((p) => p.sizes?.some((s) => sizes.includes(s)));
    if (materials.length) list = list.filter((p) => materials.includes(p.material));
    if (category.length) list = list.filter((p) => category.includes(p.category));
    if (symbolism.length) list = list.filter((p) => p.symbolism && symbolism.some((sym) => p.symbolism.includes(sym)));

    setFiltered(list);
  }, [products, selected, searchTerm, fuse]);

  // derive facet options
  const facets = useMemo(() => {
    const sizeSet = new Set();
    const materialSet = new Set();
    const catSet = new Set();
    const symSet = new Set();
    products.forEach((p) => {
      p.sizes?.forEach((s) => sizeSet.add(s));
      if (p.material) materialSet.add(p.material);
      if (p.category) catSet.add(p.category);
      p.symbolism?.forEach((s) => symSet.add(s));
    });
    return {
      sizes: Array.from(sizeSet),
      materials: Array.from(materialSet),
      category: Array.from(catSet),
      symbolism: Array.from(symSet),
    };
  }, [products]);

  const toggleFilter = (key, value) => {
    setSelected((prev) => {
      const arr = prev[key] || [];
      const exists = arr.includes(value);
      return { ...prev, [key]: exists ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

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
    <Wrapper>
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
  );
}

export default Products; 