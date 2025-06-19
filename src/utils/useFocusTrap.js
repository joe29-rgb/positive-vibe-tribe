import { useEffect } from 'react';

export default function useFocusTrap(active, containerRef) {
    useEffect(() => {
        if (!active || !containerRef.current) return;

        const focusableSelectors = [
            'a[href]',
            'button:not([disabled])',
            'textarea:not([disabled])',
            'input[type="text"]:not([disabled])',
            'input[type="radio"]:not([disabled])',
            'input[type="checkbox"]:not([disabled])',
            'select:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ];
        const focusableEls = containerRef.current.querySelectorAll(focusableSelectors.join(','));
        if (focusableEls.length === 0) return;
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        const handleKey = (e) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                // shift + tab
                if (document.activeElement === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                // tab
                if (document.activeElement === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKey);
        // ensure first focus
        firstEl.focus();

        return () => document.removeEventListener('keydown', handleKey);
    }, [active, containerRef]);
}