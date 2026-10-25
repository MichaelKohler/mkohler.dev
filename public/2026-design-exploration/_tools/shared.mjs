// Small markup helpers shared by every proposal template.
import { ASSET, nav, social } from './content.mjs';

export const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const fmt = (n) => n.toLocaleString('en-US');

// Font Awesome subset that the current site already ships.
export const iconFontCss = `
@font-face {
  font-family: "Font Awesome 6 Free Extended";
  font-style: normal;
  font-weight: 900;
  font-display: block;
  src: url("${ASSET}/fonts/fa-v6.1.2-mini-extended.woff2") format("woff2");
}
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.fab, .fas { font-family: "Font Awesome 6 Free Extended"; font-style: normal; font-weight: 900; line-height: 1; display: inline-block; -webkit-font-smoothing: antialiased; }
`;

export const icon = (s) => `<i class="${s.cls}" aria-hidden="true">${s.icon}</i>`;

export const socialLinks = ({ cls = 'social', labels = false } = {}) => `
<ul class="${cls}">
  ${social.map((s) => `<li><a href="${s.href}" aria-label="${s.label}" rel="me noopener">${icon(s)}${labels ? `<span>${labels === 'handle' ? s.handle : s.label}</span>` : ''}</a></li>`).join('\n  ')}
</ul>`;

export const navLinks = (active, { cls = 'nav', wrap = (n) => n.label } = {}) => `
<ul class="${cls}">
  ${nav.map((n) => `<li><a href="${n.href}"${n.key === active ? ' aria-current="page"' : ''}>${wrap(n)}</a></li>`).join('\n  ')}
</ul>`;

// Open Source owns the contributions page and the blog owns the post, for nav highlighting.
export const navKey = (page) => ({ contributions: 'opensource', post: 'blog', notfound: null }[page] ?? page);

// Appended to stylesheet URLs so browsers pick up CSS changes after every rebuild.
export const BUILD = Date.now().toString(36);

export const doc = ({ title, fonts = '', body, bodyClass = '', head = '', script = '' }) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="theme-color" content="#23395B">
  ${fonts ? `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts}&display=swap">` : ''}
  <link rel="icon" href="${ASSET}/favicon.ico">
  <link rel="stylesheet" href="../shared/icons.css?v=${BUILD}">
  <link rel="stylesheet" href="style.css?v=${BUILD}">
  ${head}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${body}
${script ? `<script>${script}</script>` : ''}
</body>
</html>
`;
