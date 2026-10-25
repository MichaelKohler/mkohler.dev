// Playwright only writes PNG or JPEG, so screenshots are taken as PNG and
// re-encoded to WebP by the browser itself (no extra image tooling needed).
import fs from 'node:fs';

export async function encodeWebp(page, png, file, quality = 0.8) {
  const data = await page.evaluate(async ({ b64, quality }) => {
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const bitmap = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    canvas.getContext('2d').drawImage(bitmap, 0, 0);
    const blob = await canvas.convertToBlob({ type: 'image/webp', quality });
    const buf = new Uint8Array(await blob.arrayBuffer());
    let out = '';
    for (let i = 0; i < buf.length; i += 0x8000) out += String.fromCharCode(...buf.subarray(i, i + 0x8000));
    return btoa(out);
  }, { b64: png.toString('base64'), quality });
  fs.writeFileSync(file, Buffer.from(data, 'base64'));
}

export async function screenshotWebp(page, file, options = {}, quality) {
  const png = await page.screenshot({ ...options, type: 'png' });
  await encodeWebp(page, png, file, quality);
}
