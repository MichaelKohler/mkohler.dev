// Renders every proposal's pages into static HTML next to its template.
//   node exploration/_tools/build.mjs
// Each proposal folder (NN-name/) holds a template.mjs exporting `meta` and
// `render(content)` → { 'index.html': '<html…>', … }, plus its handwritten style.css.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as content from './content.mjs';
import { renderIndex } from './index-page.mjs';
import { iconFontCss } from './shared.mjs';

const exploration = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const only = process.argv[2];

// Design drafts only: keep every page out of search engines, wherever it is served.
const noindex = (html) => html.replace('<head>', '<head>\n  <meta name="robots" content="noindex, nofollow">');

const dirs = fs.readdirSync(exploration).filter((d) => /^\d\d-/.test(d)).sort();
const metas = [];

for (const dir of dirs) {
  const template = path.join(exploration, dir, 'template.mjs');
  if (!fs.existsSync(template)) continue;
  const mod = await import(pathToFileURL(template).href);
  metas.push({ id: dir, ...mod.meta });
  if (only && only !== dir) continue;
  const files = mod.render(content);
  for (const [file, html] of Object.entries(files)) {
    fs.writeFileSync(path.join(exploration, dir, file), noindex(html));
  }
  console.log(`${dir}: ${Object.keys(files).length} pages`);
}

fs.mkdirSync(path.join(exploration, 'shared'), { recursive: true });
fs.writeFileSync(path.join(exploration, 'shared/icons.css'), iconFontCss.trimStart());
fs.writeFileSync(path.join(exploration, 'index.html'), noindex(renderIndex(metas, content)));
console.log('index.html');

// Copy every public/ file the generated pages reference into exploration/assets.
const publicDir = path.join(exploration, '..');
const generated = [
  path.join(exploration, 'index.html'),
  path.join(exploration, 'shared/icons.css'),
  ...dirs.flatMap((d) => fs.readdirSync(path.join(exploration, d)).filter((f) => /\.(html|css)$/.test(f)).map((f) => path.join(exploration, d, f))),
];
const used = new Set();
for (const file of generated) {
  for (const [, ref] of fs.readFileSync(file, 'utf8').matchAll(/assets\/([^"')\s?#]+)/g)) used.add(decodeURI(ref));
}
for (const ref of used) {
  const from = path.join(publicDir, ref);
  const to = path.join(exploration, 'assets', ref);
  // The site's AVIF photos were converted to WebP once, straight into exploration/assets.
  if (!fs.existsSync(from)) { if (!fs.existsSync(to)) console.warn(`missing asset: ${ref}`); continue; }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}
console.log(`assets: ${used.size} files`);
