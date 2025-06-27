import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionItem = styled.div`
  border-top: 1px solid #e9e4dd;
`;

const Header = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 18px 0;
  text-align: left;
  font-size: var(--fs-base);
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Body = styled(motion.div)`
  padding: 0 0 18px;
  font-size: var(--fs-sm);
  line-height: 1.7;
  color: var(--medium-gray);
`;

function Item({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <AccordionItem>
      <Header onClick={() => setOpen(!open)} aria-expanded={open}>
        {title}
        <span>{open ? '-' : '+'}</span>
      </Header>
      <AnimatePresence initial={false}>
        {open && (
          <Body
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </Body>
        )}
      </AnimatePresence>
    </AccordionItem>
  );
}

function ProductAccordion({ product }) {
  return (
    <div style={{ marginTop: '32px' }}>
      <Item title="Description">
        {product.description}
      </Item>
      <Item title="Fabric & Care">
        100% preshrunk cotton. Machine wash cold, tumble dry low. Do not bleach. Iron inside-out.
      </Item>
      <Item title="Shipping & Returns">
        Free standard shipping on orders over $100 within Canada & USA. 30-day hassle-free returns on unworn items.
      </Item>
    </div>
  );
}

export default ProductAccordion; 