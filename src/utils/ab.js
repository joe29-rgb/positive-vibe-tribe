const KEY = 'pvt_ab_variant';

export function getVariant() {
    if (typeof window === 'undefined') return 'A';
    let v = localStorage.getItem(KEY);
    if (!v) {
        v = Math.random() < 0.5 ? 'A' : 'B';
        localStorage.setItem(KEY, v);
    }
    return v;
}