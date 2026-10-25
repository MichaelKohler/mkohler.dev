// Renders exploration/index.html: the overview of all proposals with screenshots.
import { esc } from './shared.mjs';

const pageTypes = [
  { key: 'cv', label: 'CV (home)', file: 'index.html' },
  { key: 'opensource', label: 'Open Source', file: 'opensource.html' },
  { key: 'contributions', label: 'Contributions', file: 'contributions.html' },
  { key: 'blog', label: 'Blog index', file: 'blog.html' },
  { key: 'post', label: 'Blog post', file: 'post.html' },
  { key: 'talks', label: 'Talks', file: 'talks.html' },
  { key: 'notfound', label: '404 / offline', file: '404.html' },
];

const swatches = [
  ['Brand primary', 'oklch(0.31 0.06 260)'],
  ['Brand secondary', 'oklch(0.36 0.06 260)'],
  ['Accent', 'oklch(0.52 0.07 240)'],
  ['Light 300', 'oklch(0.88 0.016 227)'],
  ['Light 100', 'oklch(0.98 0.011 235)'],
  ['Text', 'oklch(0.305 0 0)'],
];

const shot = (src, alt, href) => `<a class="shot" href="${href}"><img src="${src}" alt="${esc(alt)}" loading="lazy"></a>`;

const gallery = (dir, name, href, caption = '') => `
    <div class="gallery">
      <figure>${shot(`${dir}/cv.webp`, `${name}: home page on desktop`, href)}<figcaption>Desktop${caption}</figcaption></figure>
      <figure class="gallery__mobile">${shot(`${dir}/cv-mobile.webp`, `${name}: home page on mobile`, href)}<figcaption>Mobile</figcaption></figure>
    </div>`;

export const renderIndex = (metas, c) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>mkohler.dev design study</title>
  <link rel="icon" href="assets/favicon.ico">
  <style>
    :root {
      color-scheme: light dark;
      --navy: oklch(0.31 0.06 260);
      --navy-2: oklch(0.36 0.06 260);
      --accent: oklch(0.52 0.07 240);
      --bg: oklch(0.985 0.005 235);
      --surface: oklch(1 0 0);
      --text: oklch(0.3 0.01 260);
      --heading: oklch(0.27 0.05 260);
      --muted: oklch(0.52 0.02 250);
      --line: oklch(0.9 0.014 230);
      --chip: oklch(0.955 0.014 235);
    }
    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) {
        --bg: oklch(0.2 0.03 260); --surface: oklch(0.245 0.035 260); --text: oklch(0.88 0.01 250);
        --heading: oklch(0.96 0.01 250); --muted: oklch(0.7 0.025 250); --line: oklch(0.32 0.035 260); --chip: oklch(0.29 0.035 260);
      }
    }
    :root[data-theme="dark"] {
      --bg: oklch(0.2 0.03 260); --surface: oklch(0.245 0.035 260); --text: oklch(0.88 0.01 250);
      --heading: oklch(0.96 0.01 250); --muted: oklch(0.7 0.025 250); --line: oklch(0.32 0.035 260); --chip: oklch(0.29 0.035 260);
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--bg); color: var(--text); font: 400 1rem/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }
    img { display: block; max-width: 100%; }
    a { color: var(--accent); }
    h1, h2, h3 { color: var(--heading); line-height: 1.2; margin: 0; letter-spacing: -0.01em; text-wrap: balance; }
    p { margin: 0 0 0.8rem; }
    .wrap { width: min(1240px, 100% - 32px); margin: 0 auto; }
    .muted { color: var(--muted); }

    .masthead { background: linear-gradient(160deg, var(--navy-2), var(--navy)); color: oklch(0.95 0.005 250); padding: 56px 0 48px; }
    .masthead .wrap { display: grid; grid-template-columns: auto 1fr; gap: 28px; align-items: center; }
    .masthead img { width: 112px; height: 112px; border-radius: 50%; object-fit: cover; border: 4px solid oklch(1 0 0 / 0.15); }
    .masthead h1 { color: inherit; font-size: clamp(2rem, 4vw, 3rem); }
    .masthead p { color: oklch(0.82 0.03 245); max-width: 70ch; margin: 0.5rem 0 0; }

    section { padding: 48px 0 0; }
    .section-title { font-size: 1.6rem; margin-bottom: 1rem; }
    .lead { font-size: 1.08rem; max-width: 75ch; }

    .brief { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-top: 1.4rem; }
    .brief > div { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 18px 20px; }
    .brief h3 { font-size: 1rem; margin-bottom: 0.4rem; }
    .brief ul { margin: 0; padding-left: 1.1rem; }
    .brief li { margin: 0.15rem 0; }

    .swatches { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 0.6rem; }
    .swatches span { display: grid; grid-template-columns: 22px auto; gap: 8px; align-items: center; font-size: 0.8rem; padding: 4px 10px 4px 4px; border-radius: 999px; background: var(--chip); }
    .swatches i { width: 22px; height: 22px; border-radius: 50%; border: 1px solid var(--line); }

    .toc { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
    .toc a { display: block; text-decoration: none; color: var(--text); background: var(--surface); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; transition: transform 0.2s, border-color 0.2s; }
    .toc a:hover { transform: translateY(-2px); border-color: var(--accent); }
    .toc img { aspect-ratio: 16 / 10; object-fit: cover; object-position: top; width: 100%; border-bottom: 1px solid var(--line); }
    .toc span { display: block; padding: 10px 12px; }
    .toc b { display: block; color: var(--heading); }
    .toc small { color: var(--muted); }

    table.matrix { width: 100%; border-collapse: collapse; font-size: 0.92rem; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; overflow: hidden; }
    .matrix th, .matrix td { text-align: left; padding: 10px 14px; border-bottom: 1px solid var(--line); vertical-align: top; }
    .matrix thead th { font-size: 0.75rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); background: var(--chip); }
    .matrix td:first-child { font-weight: 600; color: var(--heading); white-space: nowrap; }
    .matrix-wrap { overflow-x: auto; }

    .shot { display: block; border-radius: 10px; overflow: hidden; border: 1px solid var(--line); background: var(--surface); box-shadow: 0 10px 30px -22px oklch(0.2 0.05 260 / 0.6); }
    .shot img { width: 100%; }
    .shot:hover { border-color: var(--accent); }

    .proposal { border-top: 1px solid var(--line); margin-top: 56px; }
    .proposal__head { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 40px; align-items: start; }
    .proposal__num { font-weight: 700; color: var(--accent); letter-spacing: 0.08em; font-size: 0.8rem; text-transform: uppercase; }
    .proposal h2 { font-size: clamp(1.8rem, 3vw, 2.4rem); margin: 0.2rem 0 0.1rem; }
    .proposal__tagline { font-size: 1.15rem; color: var(--muted); margin-bottom: 1rem; }
    .proposal ul.ideas { margin: 0 0 1rem; padding-left: 1.1rem; }
    .proposal ul.ideas li { margin: 0.35rem 0; }
    .facts { display: grid; grid-template-columns: auto 1fr; gap: 4px 14px; font-size: 0.92rem; margin: 0 0 1rem; }
    .facts dt { color: var(--muted); }
    .facts dd { margin: 0; }
    .open { display: inline-flex; align-items: center; gap: 0.5rem; margin: 0.4rem 0 1.1rem; padding: 0.75rem 1.4rem; border-radius: 999px; background: var(--navy); color: #fff; font-weight: 600; text-decoration: none; box-shadow: 0 8px 20px -12px oklch(0.2 0.05 260 / 0.8); transition: background 0.2s, transform 0.2s; }
    .open:hover { background: var(--accent); transform: translateY(-1px); }
    .open span { transition: transform 0.2s; }
    .open:hover span { transform: translateX(3px); }
    .pages__label { margin: 0 0 0.4rem; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--muted); }
    .pages { display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; list-style: none; }
    .pages a { display: inline-block; font-size: 0.85rem; padding: 4px 12px; border-radius: 999px; background: var(--chip); color: var(--heading); text-decoration: none; }
    .pages a:hover { background: var(--navy); color: #fff; }

    /* Desktop (1440×900) and mobile (390×844) side by side at the same height */
    .gallery { margin-top: 28px; display: grid; grid-template-columns: minmax(0, 3.46fr) minmax(0, 1fr); gap: 16px; align-items: start; }
    .gallery figure { margin: 0; }
    .gallery figcaption { font-size: 0.82rem; color: var(--muted); margin-top: 4px; }
    .gallery__mobile .shot { border-radius: 14px; }

    footer { padding: 64px 0 48px; color: var(--muted); font-size: 0.9rem; }
    code { font-size: 0.88em; background: var(--chip); padding: 0.1em 0.4em; border-radius: 4px; }

    @media (max-width: 900px) {
      .proposal__head { grid-template-columns: 1fr; gap: 20px; }
    }
    @media (max-width: 560px) {
      .masthead .wrap { grid-template-columns: 1fr; }
      .masthead img { width: 80px; height: 80px; }
      .gallery { grid-template-columns: 1fr; }
      .gallery__mobile { width: min(240px, 70%); }
    }
  </style>
</head>
<body>
<header class="masthead">
  <div class="wrap">
    <img src="assets/images/profile.webp" alt="">
    <div>
      <h1>mkohler.dev design study</h1>
      <p>${metas.length} layout directions for modernising the site. Each one covers every page type, uses the real content and keeps the existing navy palette and portrait.</p>
    </div>
  </div>
</header>

<main class="wrap">
  <section>
    <h2 class="section-title">The brief</h2>
    <p class="lead">The current site is a bought template from an earlier era: a 360px photo next to two navy blocks, uppercase headings everywhere, and the navigation hidden in the footer behind a “Menu ↓” link. These proposals explore where the layout could go next. They are not production code: each one is a set of static HTML pages, generated from the same data the site uses today (<code>_data/</code>, <code>src/blog/posts</code>).</p>
    <div class="brief">
      <div>
        <h3>Kept</h3>
        <ul><li>The navy palette and its light tints</li><li>The portrait</li><li>All content, unchanged</li><li>A print style for the CV</li></ul>
        <p class="swatches">${swatches.map(([n, v]) => `<span title="${v}"><i style="background:${v}"></i>${n}</span>`).join('')}</p>
      </div>
      <div>
        <h3>Page types covered</h3>
        <ul>${pageTypes.map((p) => `<li>${p.label}</li>`).join('')}</ul>
        <p class="muted">One representative post (“${esc(c.featuredPost.title)}”) stands in for all ${c.posts.length} posts, and the contributions page shows a slice of page 1.</p>
      </div>
      <div>
        <h3>How to look at it</h3>
        <ul>
          <li>Open any page straight from disk, no build or server needed. Web fonts load from Google Fonts; production would self-host them.</li>
          <li>The screenshots show each proposal’s home page at 1440×900 and 390×844. Use the “Open” button to see every page.</li>
          <li>Try printing each proposal’s CV page.</li>
        </ul>
      </div>
    </div>
  </section>

  <section>
    <h2 class="section-title">The proposals</h2>
    <nav class="toc" aria-label="Proposals">
      <a href="#current"><img src="current/cv.webp" alt="" loading="lazy"><span><b>Today</b><small>Current mkohler.dev</small></span></a>
      ${metas.map((m, i) => `<a href="#${m.id}"><img src="${m.id}/screenshots/cv.webp" alt="" loading="lazy"><span><b>${String(i + 1).padStart(2, '0')} · ${m.name}</b><small>${m.title}</small></span></a>`).join('')}
    </nav>
  </section>

  <section>
    <h2 class="section-title">At a glance</h2>
    <div class="matrix-wrap">
      <table class="matrix">
        <thead><tr><th>Proposal</th><th>Idea</th><th>Typography</th><th>Dark mode</th><th>Best if…</th></tr></thead>
        <tbody>
          ${metas.map((m, i) => `<tr><td>${String(i + 1).padStart(2, '0')} ${m.name}</td><td>${m.title}</td><td>${m.typography}</td><td>${m.dark ? 'Yes, follows the system' : (m.darkNote || 'No, light only')}</td><td>${m.fit.replace(/^Best if /, '')}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>

  <section class="proposal" id="current">
    <div class="proposal__head">
      <div>
        <p class="proposal__num">Baseline</p>
        <h2>Today</h2>
        <p class="proposal__tagline">The current mkohler.dev, for reference.</p>
        <a class="open" href="https://mkohler.dev/">Open mkohler.dev <span aria-hidden="true">↗</span></a>
      </div>
      <p class="muted">Header: a 360px photo next to two navy bars with the name and title. Content is full width with no maximum measure. The menu lives in the footer. Headings are uppercase NebulaSans Light. On mobile the photo goes full width, and the name and title get cut off.</p>
    </div>${gallery('current', 'Current site', 'https://mkohler.dev/')}
  </section>

  ${metas.map((m, i) => `
  <section class="proposal" id="${m.id}">
    <div class="proposal__head">
      <div>
        <p class="proposal__num">Proposal ${String(i + 1).padStart(2, '0')}</p>
        <h2>${m.name}</h2>
        <p class="proposal__tagline">${m.title}</p>
        <p>${m.summary}</p>
        <a class="open" href="${m.id}/index.html">Open ${m.name} <span aria-hidden="true">→</span></a>
        <p class="pages__label">All pages</p>
        <ul class="pages">${pageTypes.map((p) => `<li><a href="${m.id}/${p.file}">${p.label}</a></li>`).join('')}</ul>
      </div>
      <div>
        <ul class="ideas">${m.ideas.map((x) => `<li>${x}</li>`).join('')}</ul>
        <dl class="facts">
          <dt>Typography</dt><dd>${m.typography}</dd>
          <dt>Dark mode</dt><dd>${m.dark ? 'Yes, follows the system setting' : (m.darkNote || 'No, light only')}</dd>
          <dt>Print</dt><dd>The CV has its own print stylesheet</dd>
          <dt>Fit</dt><dd>${m.fit}</dd>
        </dl>
      </div>
    </div>
${gallery(`${m.id}/screenshots`, m.name, `${m.id}/index.html`)}
  </section>`).join('')}
</main>

<footer class="wrap">
  <p>Rebuild after changing a template or the data: <code>node public/2026-design-exploration/_tools/build.mjs</code>, then refresh the screenshots with <code>node public/2026-design-exploration/_tools/screenshots.mjs</code> (set <code>CHROMIUM=…</code> if Playwright’s bundled browser isn’t installed). Each proposal is a <code>template.mjs</code> plus a handwritten <code>style.css</code>; shared content lives in <code>_tools/content.mjs</code>.</p>
</footer>

</body>
</html>
`;
};
