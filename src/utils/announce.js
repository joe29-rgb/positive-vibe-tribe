export function announce(message) {
    if (typeof document === 'undefined') return;
    const el = document.getElementById('sr-announcer');
    if (el) {
        el.textContent = '';
        setTimeout(() => {
            el.textContent = message;
        }, 50);
    }
}