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

// New utility: generate srcSet strings per format across multiple widths
export function buildSrcSets(url, widths = [320, 480, 640, 768, 960, 1200]) {
    if (!url) return {};
    const base = url.split('/upload/');
    if (base.length !== 2) return {};
    const [pre, post] = base;
    const quality = 'q_auto';
    const sets = { avif: [], webp: [], jpg: [] };
    widths.forEach((w) => {
        const crop = `c_fill,w_${w}`;
        sets.avif.push(`${pre}/upload/f_avif,${quality},${crop}/${post} ${w}w`);
        sets.webp.push(`${pre}/upload/f_webp,${quality},${crop}/${post} ${w}w`);
        sets.jpg.push(`${pre}/upload/${quality},${crop}/${post} ${w}w`);
    });
    return {
        avif: sets.avif.join(', '),
        webp: sets.webp.join(', '),
        jpg: sets.jpg.join(', '),
    };
}