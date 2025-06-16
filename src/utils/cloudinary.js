export function getCdnImage(url, width = 800, quality = 'auto') {
    if (!url || !url.includes('/upload/')) return url;
    const parts = url.split('/upload/');
    return `${parts[0]}/upload/f_auto,q_${quality},w_${width}/${parts[1]}`;
}

export function buildSrcSet(url, widths = [320, 480, 640, 960, 1280]) {
    return widths.map((w) => `${getCdnImage(url, w)} ${w}w`).join(', ');
}