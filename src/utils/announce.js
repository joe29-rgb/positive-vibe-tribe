export function announce(message) {
    const el = document.getElementById('sr-announcer');
    if (el) {
        el.textContent = '';
        setTimeout(() => {
            el.textContent = message;
        }, 50);
    }
}