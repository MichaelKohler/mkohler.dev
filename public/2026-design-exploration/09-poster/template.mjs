import { doc, esc, fmt, socialLinks, navLinks, navKey } from '../_tools/shared.mjs';

export const meta = {
  name: 'Duotone Poster',
  title: 'Gig-poster energy in two shades of navy',
  summary: 'Every page opens like a poster: a full-bleed navy panel, a condensed display face at enormous sizes and photos turned into navy and pale-blue duotones, so even the conference snapshots and slide thumbnails belong to one palette. Below the poster, content alternates between navy and light panels.',
  ideas: [
    'One CSS-only duotone treatment (grayscale plus two blend layers) recolours the portrait, the area photos and all 40 talk thumbnails. Hovering a talk shows its original colours.',
    'The name is set across the full width, overlapping the portrait, on the CV. On every other page, a single big word (“Writing”, “On stage”, “404”) plays that role.',
    'Experience reads like a festival line-up: the employers are huge, stacked names, with dates and roles in small text beside them.',
    'Panels alternate navy and light, which gives the long CV and Open Source pages a rhythm without needing cards or boxes.',
  ],
  typography: 'Anton (display) + Archivo (text)',
  dark: false,
  darkNote: 'No, but half the panels are navy',
  fit: 'Best if the site should feel bold and graphic, and the photos should become part of the design.',
};

const FONTS = 'family=Anton&family=Archivo:wght@400;500;700';

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, featuredPost, talks, formatDate } = c;

  const duo = (src, alt = '', cls = '') => `<span class="duo ${cls}"><img src="${src}" alt="${alt}" loading="lazy"></span>`;

  const layout = (page, title, main) => doc({
    title: `${title} · ${profile.name}`,
    fonts: FONTS,
    body: `
<header class="bar">
  <a class="bar__name" href="index.html">${profile.name}</a>
  <nav aria-label="Main">${navLinks(navKey(page), { cls: 'nav' })}</nav>
</header>
<main class="${page}">
${main}
</main>
<footer class="foot">
  <p class="foot__big">${profile.firstName} ${profile.lastName}</p>
  <div class="foot__row">
    <p>${profile.footerTagline}.</p>
    ${socialLinks({ cls: 'foot__social' })}
  </div>
</footer>`,
  });

  const poster = (word, kicker, lead = '', extra = '') => `
<section class="poster poster--page">
  <p class="kicker">${kicker}</p>
  <h1 class="poster__word">${word}</h1>
  ${lead ? `<p class="poster__lead">${lead}</p>` : ''}
  ${extra}
</section>`;

  const cv = layout('cv', 'CV', `
<section class="poster poster--cv">
  ${duo(profile.photo, 'Michael Kohler in Berlin', 'poster__photo')}
  <h1 class="poster__name"><span>${profile.firstName}</span><span>${profile.lastName}</span></h1>
  <div class="poster__meta">
    <p class="kicker">${profile.title} · ${profile.place}</p>
    <p class="poster__lead">${profile.tagline}.</p>
  </div>
</section>

<section class="panel panel--light intro">
  ${profile.intro.map((b) => `<div><h2 class="kicker">${b.title}</h2><p>${b.text}</p></div>`).join('')}
  <div><h2 class="kicker">Contact</h2><p><a href="mailto:${profile.email}">${profile.email}</a><br>${profile.languages}<br>${profile.origin}</p></div>
</section>

<section class="panel panel--light lineup">
  <h2 class="section-word">Experience</h2>
  ${experience.map((job) => `
  <article class="act${job.volunteer ? ' act--volunteer' : ''}">
    <div class="act__head">
      <p class="act__dates">${job.from} – ${job.to}${job.volunteer ? ' · volunteer' : ''}</p>
      <h3 class="act__name"><a href="${job.url}">${job.short || job.company}</a></h3>
      ${job.suffix || job.short ? `<p class="act__full">${job.short ? job.company : ''}${job.suffix ? ` ${job.suffix}` : ''}</p>` : ''}
    </div>
    <div class="act__body">
      ${job.note ? `<p>${job.note}</p>` : ''}
      ${job.roles.map((r) => `
      <h4>${r.title}</h4>
      ${r.stack ? `<p class="act__stack">${r.stack}</p>` : ''}
      <ul>${r.items.map((x) => `<li>${x}</li>`).join('')}</ul>`).join('')}
    </div>
  </article>`).join('')}
</section>

<section class="panel panel--navy skills">
  <h2 class="section-word">Skills</h2>
  ${skills.map((s) => `
  <div class="skill">
    <h3 class="kicker">${s.group}</h3>
    <p class="skill__words">${s.items.map((x) => `<span>${x}</span>`).join(' / ')}</p>
  </div>`).join('')}
</section>`);

  const table = (items) => `
  <table class="log">
    <thead><tr><th>Date</th><th>What</th><th>Description</th></tr></thead>
    <tbody>${items.map((x) => `<tr><td class="log__date">${x.date}</td><td>${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}</td><td>${esc(x.description)}</td></tr>`).join('')}</tbody>
  </table>`;

  const opensource = layout('opensource', 'Open Source', `
${poster(fmt(contributions.total), 'Open Source · since 2008', `${openSource.tagline}. That’s how many contributions are tracked so far, ${c.yearsActive} years in.`)}
<section class="panel panel--light prose">
  <h2 class="section-word">Mozilla</h2>
  <div class="prose__cols">${openSource.mozillaIntro.map((p) => `<p>${p}</p>`).join('')}</div>
  <p class="chips">${openSource.profiles.map((p) => `<a href="${p.href}">${p.label} ↗</a>`).join('')}<a href="talks.html">Talks →</a></p>
</section>
${openSource.areas.map((a, i) => `
<section class="panel ${i % 2 ? 'panel--light' : 'panel--navy'} area${i % 2 ? ' area--flip' : ''}">
  ${duo(a.image, a.alt, 'area__photo')}
  <div class="area__text">
    <p class="kicker">${a.years}</p>
    <h2 class="section-word">${a.title}</h2>
    <ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
  </div>
</section>`).join('')}
<section class="panel panel--light">
  <h2 class="section-word">Latest</h2>
  ${table(contributions.latest)}
  <p><a class="cta" href="contributions.html">All contributions →</a></p>
</section>`);

  const contributionsPage = layout('contributions', 'Contributions', `
${poster('Contributions', '<a href="opensource.html">Open Source</a> / log', c.contributionsNote, `
  <ul class="tally">${contributions.bySource.slice(0, 6).map((s) => `<li><b>${fmt(s.count)}</b>${s.label}</li>`).join('')}</ul>`)}
<section class="panel panel--light">
  ${table(contributions.items)}
  <nav class="pager" aria-label="Pagination"><span>← Newer</span><b>1 / ${contributions.pageCount}</b><a href="#">Older →</a></nav>
</section>`);

  const blog = layout('blog', 'Blog', `
${poster('Writing', 'Blog', `${posts.length} posts, ${posts.at(-1).year}–${posts[0].year}.`)}
<section class="panel panel--light">
  <ol class="setlist">
    ${posts.map((p) => `
    <li><a href="post.html"><span class="setlist__date">${formatDate(p.date, 'month')}</span><span class="setlist__title">${p.title}</span></a></li>`).join('')}
  </ol>
</section>`);

  const post = layout('post', featuredPost.title, `
<article>
  <header class="poster poster--post">
    <span class="poster__ghost" aria-hidden="true">${featuredPost.year}</span>
    <p class="kicker"><a href="blog.html">Blog</a> · ${formatDate(featuredPost.date)} · ${featuredPost.readingMinutes} min</p>
    <h1 class="poster__title">${featuredPost.title}</h1>
  </header>
  <div class="panel panel--light">
    <div class="body">${featuredPost.bodyHtml}</div>
    <p><a class="cta" href="blog.html">← All posts</a></p>
  </div>
</article>`);

  const talksPage = layout('talks', 'Talks', `
${poster('On stage', 'Talks', c.talksTagline)}
<section class="panel panel--light">
  <div class="wall">
    ${talks.map((t) => `
    <a class="gig" href="${t.url}">
      ${duo(t.image)}
      <span class="gig__date">${formatDate(t.date, 'month')}</span>
      <span class="gig__title">${t.title}</span>
    </a>`).join('')}
  </div>
</section>`);

  const notfound = layout('notfound', 'Not found', `
${poster('404', 'Not found', 'The page you’re looking for couldn’t be found.', '<p><a class="cta cta--light" href="index.html">Back to the CV →</a></p>')}`);

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
