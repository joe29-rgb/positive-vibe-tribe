import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  position: fixed;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 60;
  pointer-events: none;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(p) => (p.$active ? 'var(--primary-red)' : 'rgba(0,0,0,0.25)')};
  transition: background 0.3s;
`;

export default function SectionProgress({ sectionIds = [] }) {
  const [active, setActive] = React.useState(null);

  React.useEffect(() => {
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  if (sectionIds.length === 0) return null;

  return (
    <Wrap>
      {sectionIds.map((id) => (
        <Dot key={id} $active={id === active} />
      ))}
    </Wrap>
  );
} 