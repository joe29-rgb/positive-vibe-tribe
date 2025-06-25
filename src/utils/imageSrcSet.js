export function buildSrcSet(url, width) {
    // expects cloudinary URLs or other where /upload/ part present -> use transformations
    if (!url) return '';
    const base = url.split('/upload/');
    if (base.length !== 2) return '';
    const [pre, post] = base;
    const quality = 'q_auto';
    const crop = `c_fill,w_${width}`;
    const avif = `${pre}/upload/f_avif,${quality},${crop}/${post} ${width}w`;
    const webp = `${pre}/upload/f_webp,${quality},${crop}/${post} ${width}w`;
    const jpg = `${pre}/upload/${quality},${crop}/${post} ${width}w`;
    return `${avif}, ${webp}, ${jpg}`;
}