// Utility to animate an element (product image) flying to the cart icon
// Lightweight vanilla JS so it works outside React tree.
// startEl: HTMLElement (typically image inside card)
// cartSelector: string CSS selector of target element (`#cart-icon`)
// duration: ms
export function flyToCart(startEl, cartSelector = '#cart-icon', duration = 800) {
    if (!startEl) return;
    const cartEl = document.querySelector(cartSelector);
    if (!cartEl) return;

    const startRect = startEl.getBoundingClientRect();
    const endRect = cartEl.getBoundingClientRect();

    // Create clone node (img) and append to body
    const clone = startEl.cloneNode(true);
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    clone.style.position = 'absolute';
    clone.style.left = startRect.left + scrollLeft + 'px';
    clone.style.top = startRect.top + scrollTop + 'px';
    clone.style.width = startRect.width + 'px';
    clone.style.height = startRect.height + 'px';
    clone.style.pointerEvents = 'none';
    clone.style.transition = `transform ${duration}ms cubic-bezier(0.4,0,0.2,1), opacity ${duration}ms`;
    clone.style.zIndex = 9999;
    document.body.appendChild(clone);

    // Compute translation
    const deltaX = (endRect.left + endRect.width / 2) - (startRect.left + startRect.width / 2);
    const deltaY = (endRect.top + endRect.height / 2) - (startRect.top + startRect.height / 2);

    // Trigger reflow then animate
    requestAnimationFrame(() => {
        clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
        clone.style.opacity = '0.2';
    });

    // Cleanup
    setTimeout(() => {
        document.body.removeChild(clone);
    }, duration + 50);
}