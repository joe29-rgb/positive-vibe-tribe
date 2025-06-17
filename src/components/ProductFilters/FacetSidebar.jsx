import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.aside`
  width: 260px;
  padding: 24px;
  border-right: 1px solid var(--light-gray, #f1f1f1);
  position: sticky;
  top: 80px;
  height: calc(100vh - 80px);
  overflow-y: auto;
  background: #fff;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Section = styled.fieldset`
  margin-bottom: 32px;
`;

const Title = styled.legend`
  margin-bottom: 12px;
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark-brown);
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
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

function MultiFilter({ title, options, selected, toggle }) {
  return (
    <Section>
      <Title>{title}</Title>
      {options.map((opt) => (
        <Checkbox key={opt}>
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
        </Checkbox>
      ))}
    </Section>
  );
}

function FacetSidebar({ facets, selected, onToggle, searchTerm, onSearchChange }) {
  return (
    <Sidebar>
      <Section>
        <input
          type="text"
          placeholder="Search products…"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd' }}
        />
      </Section>
      {Object.entries(facets).map(([key, list]) => (
        <MultiFilter
          key={key}
          title={key.charAt(0).toUpperCase() + key.slice(1)}
          options={list}
          selected={selected[key] || []}
          toggle={(opt) => onToggle(key, opt)}
        />
      ))}
    </Sidebar>
  );
}

export default FacetSidebar; 