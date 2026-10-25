import { doc, esc, fmt, socialLinks, navLinks, navKey } from '../_tools/shared.mjs';

export const meta = {
  name: 'Field Notes',
  title: 'A notebook kept since 2008',
  summary: 'The site as a personal notebook: grid paper, a ruled margin, notebook tabs for navigation and handwritten notes in navy ink beside the printed content. The portrait and the area photos are taped-in polaroids, talks are pinned snapshots and posts are index cards. Warm and human, but the body text stays a highly legible sans.',
  ideas: [
    'The navigation is a row of notebook divider tabs. The active tab joins the page below it.',
    'Handwriting is only used for annotations: margin dates, photo captions, a doodled arrow to the name. Everything you need to read is set in Atkinson Hyperlegible.',
    'A highlighter stroke marks the one key phrase per page, the way you would mark up your own notes.',
    'Blog posts are index cards, talks are polaroids pinned at slight angles, and the contributions log is a ruled ledger.',
  ],
  typography: 'Atkinson Hyperlegible (text) + Caveat (handwritten notes)',
  dark: false,
  fit: 'Best if the site should feel personal and approachable, with the volunteer and community story at the front.',
};

const FONTS = 'family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Caveat:wght@500;700';

const arrow = `<svg class="doodle" viewBox="0 0 120 70" aria-hidden="true"><path d="M112 8c-30 4-62 14-84 40m0 0 4-18m-4 18 18-3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, postsByYear, featuredPost, talks, formatDate } = c;
  const tilt = (i) => [-2.2, 1.4, -0.8, 2, -1.6, 0.9][i % 6];

  const layout = (page, title, main) => doc({
    title: `${title} · ${profile.name}`,
    fonts: FONTS,
    body: `
<header class="top">
  <a class="top__name" href="index.html">${profile.name}<span class="hand">’s notebook</span></a>
  <nav aria-label="Main">${navLinks(navKey(page), { cls: 'tabs' })}</nav>
</header>
<main class="sheet ${page}">
${main}
</main>
<footer class="foot">
  <p class="hand">${profile.footerTagline}.</p>
  ${socialLinks({ cls: 'foot__social', labels: true })}
</footer>`,
  });

  const head = (note, h1, lead = '') => `
<header class="pagehead">
  <p class="margin hand">${note}</p>
  <div>
    <h1>${h1}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </div>
</header>`;

  const cv = layout('cv', 'CV', `
<section class="hello">
  <figure class="polaroid" style="--t:-3deg">
    <img src="${profile.photo}" alt="Michael Kohler in Berlin" width="360" height="360">
    <figcaption class="hand">Berlin, by the Spree</figcaption>
  </figure>
  <div class="hello__text">
    <p class="hand hello__note">that’s me ${arrow}</p>
    <h1>${profile.name}</h1>
    <p class="hello__role">${profile.title} · ${profile.place}</p>
    <p class="lead"><mark>${profile.tagline}</mark>.</p>
    <p class="muted">${profile.origin[0].toUpperCase()}${profile.origin.slice(1)}. I speak ${profile.languages}. Write to <a href="mailto:${profile.email}">${profile.email}</a>.</p>
  </div>
</section>

<section class="notes">
  ${profile.intro.map((b, i) => `<div class="sticky" style="--t:${tilt(i + 1)}deg"><h2 class="hand">${b.title}</h2><p>${b.text}</p></div>`).join('')}
</section>

<section class="ruled">
  <h2 class="h2">Experience</h2>
  ${experience.map((job) => `
  <article class="entry">
    <p class="margin hand">${job.from.slice(3)} – ${job.to === 'now' ? 'now' : job.to.slice(3)}${job.volunteer ? '<br><span>(volunteer!)</span>' : ''}</p>
    <div>
      <h3><a href="${job.url}">${job.company}</a>${job.suffix ? ` <span class="muted">${job.suffix}</span>` : ''}</h3>
      ${job.note ? `<p class="muted">${job.note}</p>` : ''}
      ${job.roles.map((r) => `
      <h4>${r.title}</h4>
      ${r.stack ? `<p class="stack">${r.stack}</p>` : ''}
      <ul>${r.items.map((x) => `<li>${x}</li>`).join('')}</ul>`).join('')}
    </div>
  </article>`).join('')}
</section>

<section class="ruled">
  <h2 class="h2">Skills</h2>
  <div class="checklists">
    ${skills.map((s) => `<div><h3 class="hand">${s.group}</h3><ul class="checks">${s.items.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}
  </div>
</section>`);

  const ledger = (items) => `
  <table class="ledger">
    <thead><tr><th>Date</th><th>What</th><th>Notes</th></tr></thead>
    <tbody>${items.map((x) => `<tr><td class="ledger__date">${x.date}</td><td>${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}</td><td>${esc(x.description)}</td></tr>`).join('')}</tbody>
  </table>`;

  const opensource = layout('opensource', 'Open Source', `
${head('since 04/2008', `${openSource.tagline}`, `Mostly <mark>for Mozilla</mark>, as a volunteer, for ${c.yearsActive} years and counting.`)}
<section class="tally">
  ${[[fmt(contributions.total), 'contributions'], ['250+', 'Firefox patches'], ['130+', 'bugs filed'], [talks.length, 'talks given']].map(([n, l]) => `<p><b class="circled hand">${n}</b><span>${l}</span></p>`).join('')}
</section>
<section class="ruled">
  <article class="entry">
    <p class="margin hand">why Mozilla?</p>
    <div>
      ${openSource.mozillaIntro.map((p) => `<p>${p}</p>`).join('')}
      <p>${openSource.profiles.map((p) => `<a href="${p.href}">${p.label}</a>`).join(' · ')} · <a href="talks.html">Talks</a></p>
    </div>
  </article>
</section>
<section class="ruled">
  <h2 class="h2">Areas</h2>
  ${openSource.areas.map((a, i) => `
  <article class="area${i % 2 ? ' area--flip' : ''}">
    <figure class="polaroid polaroid--sm" style="--t:${tilt(i)}deg"><img src="${a.image}" alt="${a.alt}" loading="lazy"><figcaption class="hand">${a.years}</figcaption></figure>
    <div>
      <h3>${a.title}</h3>
      <ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
  </article>`).join('')}
</section>
<section class="ruled">
  <h2 class="h2">Latest entries</h2>
  ${ledger(contributions.latest)}
  <p><a href="contributions.html">The whole logbook →</a></p>
</section>`);

  const contributionsPage = layout('contributions', 'Contributions', `
${head('<a href="opensource.html">← open source</a>', 'Contributions logbook', c.contributionsNote)}
<ul class="sources">${contributions.bySource.map((s) => `<li><b>${fmt(s.count)}</b> ${s.label}</li>`).join('')}</ul>
<section class="ruled">
  ${ledger(contributions.items)}
  <nav class="pager" aria-label="Pagination"><span class="muted">← newer</span><span class="hand">page 1 of ${contributions.pageCount}</span><a href="#">older →</a></nav>
</section>`);

  const blog = layout('blog', 'Blog', `
${head(`${posts.length} posts`, 'Blog', 'Notes on Mozilla, Common Voice, Firefox and community events, written up properly.')}
${Object.keys(postsByYear).sort().reverse().map((y) => `
<section class="year">
  <h2 class="year__n hand">${y}</h2>
  <div class="cards">
    ${postsByYear[y].map((p, i) => `
    <a class="card" href="post.html" style="--t:${tilt(i) / 2}deg">
      <p class="card__date hand">${formatDate(p.date, 'short')}</p>
      <h3>${p.title}</h3>
      <p class="card__more">${p.readingMinutes} min read</p>
    </a>`).join('')}
  </div>
</section>`).join('')}`);

  const post = layout('post', featuredPost.title, `
<article class="article">
  ${head(`${formatDate(featuredPost.date, 'short')}<br>${featuredPost.readingMinutes} min read<br><a href="blog.html">← all posts</a>`, featuredPost.title)}
  <div class="article__body">${featuredPost.bodyHtml}</div>
</article>`);

  const talksPage = layout('talks', 'Talks', `
${head(`${talks.length} so far`, 'Talks', c.talksTagline)}
<section class="board">
  ${talks.map((t, i) => `
  <a class="polaroid polaroid--talk" href="${t.url}" style="--t:${tilt(i)}deg">
    <img src="${t.image}" alt="" loading="lazy">
    <span class="hand">${formatDate(t.date, 'month')}</span>
    <b>${t.title}</b>
  </a>`).join('')}
</section>`);

  const notfound = layout('notfound', 'Not found', `
<section class="lost">
  <p class="lost__big hand">Oops.</p>
  <h1>This page was torn out</h1>
  <p class="lead">The page you’re looking for couldn’t be found.</p>
  <p><a href="index.html">Back to the first page →</a></p>
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
