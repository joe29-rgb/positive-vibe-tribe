import { useEffect } from 'react';

export default function useScrollReveal(selector = '.reveal', rootMargin = '0px 0px -10% 0px') {
    useEffect(() => {
        const els = document.querySelectorAll(selector);
        if (!('IntersectionObserver' in window) || els.length === 0) return;
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin, threshold: 0.2 });

        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, [selector, rootMargin]);
}