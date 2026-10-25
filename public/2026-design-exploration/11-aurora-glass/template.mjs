import { doc, esc, fmt, socialLinks, navLinks, navKey } from '../_tools/shared.mjs';
import { monthHeatmap } from '../_tools/charts.mjs';

export const meta = {
  name: 'Aurora Glass',
  title: 'Frosted panels over soft navy light, with ⌘K',
  summary: 'A contemporary product-site look: soft blurred blobs of the navy and accent blue drift behind frosted glass panels, with a glowing ring around the portrait. Open Source becomes a small dashboard with a year-by-month heatmap of all contributions, and a working command palette (⌘K or the search button) jumps to any page, post or talk.',
  ideas: [
    'The aurora background is just two or three large blurred radial gradients, so it costs nothing to render and works in light and dark.',
    'A heatmap of all 13k contributions by month shows the Mozilla years at a glance: the 2009 start, the 2015 to 2019 peak and the quieter years after.',
    'The command palette indexes every page, all 40 posts and all 40 talks, and it works with the keyboard only (⌘K / Ctrl+K, arrows, Enter, Esc).',
    'Dark mode is the showcase, with glowing aurora on deep navy. Light mode keeps the same glass over pale blue.',
  ],
  typography: 'Manrope (display and text)',
  dark: true,
  fit: 'Best if the site should look current and techy, and finding things quickly matters.',
};

const FONTS = 'family=Manrope:wght@400;500;600;700;800';

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, featuredPost, talks, formatDate, nav } = c;

  const index = [
    ...nav.map((n) => ({ t: n.label, k: 'Page', h: n.href })),
    { t: 'Contributions', k: 'Page', h: 'contributions.html' },
    ...posts.map((p) => ({ t: p.title, k: `Post · ${p.year}`, h: 'post.html' })),
    ...talks.map((t) => ({ t: t.title, k: `Talk · ${t.year}`, h: t.url })),
  ];

  const palette = `
<dialog class="palette" aria-label="Search">
  <form method="dialog" class="palette__box">
    <input class="palette__input" type="search" placeholder="Jump to a page, post or talk…" autocomplete="off" aria-label="Search">
    <ul class="palette__list" role="listbox"></ul>
    <p class="palette__hint"><kbd>↑</kbd><kbd>↓</kbd> to move · <kbd>Enter</kbd> to open · <kbd>Esc</kbd> to close</p>
  </form>
</dialog>`;

  const script = `
const items = ${JSON.stringify(index)};
const dialog = document.querySelector('.palette');
const input = dialog.querySelector('input');
const list = dialog.querySelector('ul');
let active = 0, shown = [];
const esc = (s) => s.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const draw = () => {
  const q = input.value.trim().toLowerCase();
  shown = items.filter((i) => !q || (i.t + ' ' + i.k).toLowerCase().includes(q)).slice(0, 8);
  active = Math.min(active, Math.max(shown.length - 1, 0));
  list.innerHTML = shown.length
    ? shown.map((i, n) => '<li role="option" aria-selected="' + (n === active) + '"><a href="' + esc(i.h) + '"><span>' + esc(i.t) + '</span><small>' + esc(i.k) + '</small></a></li>').join('')
    : '<li class="palette__empty">Nothing found</li>';
};
const open = () => { dialog.showModal(); input.value = ''; active = 0; draw(); input.focus(); };
document.querySelectorAll('[data-palette]').forEach((b) => b.addEventListener('click', open));
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dialog.open ? dialog.close() : open(); }
});
input.addEventListener('input', () => { active = 0; draw(); });
input.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); active = (active + (e.key === 'ArrowDown' ? 1 : shown.length - 1)) % Math.max(shown.length, 1); draw(); }
  if (e.key === 'Enter' && shown[active]) { e.preventDefault(); location.href = shown[active].h; }
});
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });`;

  const layout = (page, title, main) => doc({
    title: `${title} · ${profile.name}`,
    fonts: FONTS,
    script,
    body: `
<div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
<header class="bar glass">
  <a class="bar__me" href="index.html"><img src="${profile.photo}" alt="" width="34" height="34"><span>${profile.name}</span></a>
  <nav aria-label="Main">${navLinks(navKey(page), { cls: 'nav' })}</nav>
  <button class="bar__search" type="button" data-palette><span>Search</span><kbd>⌘K</kbd></button>
</header>
<main class="wrap ${page}">
${main}
</main>
<footer class="wrap foot">
  <p>${profile.footerTagline}.</p>
  ${socialLinks({ cls: 'foot__social' })}
</footer>
${palette}`,
  });

  const head = (eyebrow, h1, lead = '') => `
<section class="pagehead">
  <p class="eyebrow">${eyebrow}</p>
  <h1 class="gradient">${h1}</h1>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</section>`;

  const kpis = (rows) => `<section class="kpis">${rows.map(([n, l]) => `<div class="kpi glass"><b>${n}</b><span>${l}</span></div>`).join('')}</section>`;

  const cv = layout('cv', 'CV', `
<section class="hero">
  <div class="ring"><img src="${profile.photo}" alt="Michael Kohler in Berlin" width="220" height="220"></div>
  <p class="eyebrow">${profile.title} · ${profile.place}</p>
  <h1 class="gradient">${profile.name}</h1>
  <p class="lead">${profile.tagline}.</p>
  <p class="hero__actions"><a class="btn btn--solid" href="mailto:${profile.email}">Get in touch</a><a class="btn" href="opensource.html">Open Source work</a></p>
</section>
${kpis([[`${new Date().getFullYear() - 2010}+`, 'years in software'], [c.yearsActive, 'years at Mozilla'], [fmt(contributions.total), 'contributions'], [talks.length, 'talks']])}

<section class="duo">
  ${profile.intro.map((b) => `<div class="glass panel"><h2 class="h3">${b.title}</h2><p>${b.text}</p></div>`).join('')}
</section>

<section class="block">
  <h2 class="h2">Experience</h2>
  <div class="jobs">
    ${experience.map((job) => `
    <article class="glass panel job">
      <header class="job__head">
        <div>
          <h3 class="h3"><a href="${job.url}">${job.company}</a></h3>
          ${job.suffix ? `<p class="muted">${job.suffix}</p>` : ''}
        </div>
        <p class="pill">${job.from} – ${job.to}</p>
      </header>
      ${job.note ? `<p class="muted">${job.note}</p>` : ''}
      ${job.roles.map((r) => `
      <div class="role">
        <h4>${r.title}</h4>
        ${r.stack ? `<ul class="chips">${r.stack.split(', ').map((x) => `<li>${x}</li>`).join('')}</ul>` : ''}
        <ul class="role__items">${r.items.map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>`).join('')}
    </article>`).join('')}
  </div>
</section>

<section class="block">
  <h2 class="h2">Skills</h2>
  <div class="skills">
    ${skills.map((s) => `<div class="glass panel"><h3 class="eyebrow">${s.group}</h3><ul class="chips">${s.items.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}
  </div>
</section>`);

  const maxSource = contributions.bySource[0].count;
  const table = (items) => `
  <div class="glass table">
    <table>
      <thead><tr><th>Date</th><th>Source</th><th>Activity</th></tr></thead>
      <tbody>${items.map((x) => `<tr><td class="num">${x.date}</td><td><span class="pill pill--sm">${esc(c.sourceLabels[x.source] || x.source)}</span></td><td>${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}<br><span class="muted">${esc(x.description)}</span></td></tr>`).join('')}</tbody>
    </table>
  </div>`;

  const opensource = layout('opensource', 'Open Source', `
${head('Open Source', openSource.tagline, openSource.mozillaIntro[0])}
${kpis([[fmt(contributions.total), 'tracked contributions'], [c.yearsActive, 'years at Mozilla'], ['250+', 'Firefox patches'], ['130+', 'bugs filed']])}
<section class="dash">
  <div class="glass panel dash__heat">
    <header class="dash__head"><h2 class="h3">Activity by month</h2><p class="muted">${contributions.firstYear}–${contributions.lastYear}, all sources</p></header>
    ${monthHeatmap(contributions.byMonth)}
  </div>
  <div class="glass panel dash__sources">
    <header class="dash__head"><h2 class="h3">By source</h2></header>
    <ul class="meters">${contributions.bySource.map((s) => `<li><span>${s.label}</span><b>${fmt(s.count)}</b><i style="--v:${(s.count / maxSource).toFixed(3)}"></i></li>`).join('')}</ul>
  </div>
</section>
<section class="block">
  <h2 class="h2">Areas</h2>
  <div class="areas">
    ${openSource.areas.map((a) => `
    <article class="glass area">
      <img src="${a.image}" alt="${a.alt}" loading="lazy">
      <div class="area__body">
        <p class="pill pill--sm">${a.years}</p>
        <h3 class="h3">${a.title}</h3>
        <ul class="role__items">${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>
    </article>`).join('')}
  </div>
</section>
<section class="block duo">
  <div class="glass panel">${openSource.mozillaIntro.slice(1).map((p) => `<p>${p}</p>`).join('')}</div>
  <div class="glass panel"><h2 class="h3">Elsewhere</h2><p>${openSource.talksNote}</p><p class="hero__actions">${openSource.profiles.map((p) => `<a class="btn" href="${p.href}">${p.label}</a>`).join('')}</p></div>
</section>
<section class="block">
  <h2 class="h2">Latest</h2>
  ${table(contributions.latest)}
  <p><a class="btn btn--solid" href="contributions.html">All contributions →</a></p>
</section>`);

  const contributionsPage = layout('contributions', 'Contributions', `
${head('<a href="opensource.html">Open Source</a> / Contributions', 'Contributions', c.contributionsNote)}
<section class="glass panel">${monthHeatmap(contributions.byMonth, { cls: 'heat heat--compact' })}</section>
<section class="block">
  ${table(contributions.items)}
  <nav class="pager" aria-label="Pagination"><span class="btn is-disabled">← Newer</span><span class="muted">Page 1 of ${contributions.pageCount}</span><a class="btn" href="#">Older →</a></nav>
</section>`);

  const [latest, ...rest] = posts;
  const blog = layout('blog', 'Blog', `
${head('Blog', 'Writing', `${posts.length} posts. Press <kbd>⌘K</kbd> to search them all.`)}
<a class="glass feature" href="post.html">
  <p class="pill pill--sm">Latest · ${formatDate(latest.date, 'short')}</p>
  <h2 class="h2">${latest.title}</h2>
  <p>${esc(latest.excerptText)}</p>
  <span class="btn btn--solid">Read · ${latest.readingMinutes} min</span>
</a>
<section class="posts">
  ${rest.map((p) => `
  <a class="glass post-card" href="post.html">
    <p class="muted num">${formatDate(p.date, 'short')}</p>
    <h3 class="h3">${p.title}</h3>
    <p class="muted">${p.readingMinutes} min read</p>
  </a>`).join('')}
</section>`);

  const post = layout('post', featuredPost.title, `
<article class="article">
  ${head(`<a href="blog.html">Blog</a> · ${formatDate(featuredPost.date)} · ${featuredPost.readingMinutes} min read`, featuredPost.title)}
  <div class="glass article__body">${featuredPost.bodyHtml}</div>
</article>`);

  const talksPage = layout('talks', 'Talks', `
${head('Talks', 'Talks', c.talksTagline)}
<section class="talks">
  ${talks.map((t) => `
  <a class="glass talk" href="${t.url}">
    <img src="${t.image}" alt="" loading="lazy">
    <div class="talk__body">
      <p class="muted num">${formatDate(t.date, 'short')}</p>
      <h2 class="h3">${t.title}</h2>
      <ul class="chips">${t.tags.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
  </a>`).join('')}
</section>`);

  const notfound = layout('notfound', 'Not found', `
<section class="hero hero--404">
  <p class="big404 gradient">404</p>
  <h1 class="h2">This page drifted off</h1>
  <p class="lead">The page you’re looking for couldn’t be found.</p>
  <p class="hero__actions"><button class="btn btn--solid" type="button" data-palette>Search the site <kbd>⌘K</kbd></button><a class="btn" href="index.html">Back to the CV</a></p>
</section>`);

  return {
    'index.html': cv,
    'opensource.html': opensource,
    'contributions.html': contributionsPage,
    'blog.html': blog,
    'post.html': post,
    'talks.html': talksPage,
    '404.html': notfound,
  };
}
