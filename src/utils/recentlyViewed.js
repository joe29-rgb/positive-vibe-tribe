const STORAGE_KEY = 'pvt_recently_viewed';
const LIMIT = 10;

export function addRecentProduct(product) {
    if (!product || !product._id) return;
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const simplified = {
        _id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
    };
    // remove existing duplicate
    const filtered = stored.filter((p) => p._id !== product._id);
    const updated = [simplified, ...filtered].slice(0, LIMIT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getRecentProducts(excludeId) {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return stored.filter((p) => p._id !== excludeId);
}