import { doc, esc, fmt, socialLinks, navLinks, navKey } from '../_tools/shared.mjs';

export const meta = {
  name: 'Swiss Grid',
  title: 'International Typographic Style, from Bern',
  summary: 'A nod to the Bern origin: a strict, visible 12-column grid, a tight grotesk in large sizes, hairline rules, numbered sections and big numerals. Navy is the only colour and appears as solid blocks, much like the header panels of today’s site, only louder.',
  ideas: [
    'The name is set huge across the grid, with the portrait in a square grid cell. The tagline sits on a full-width navy band.',
    'Every section is numbered (01 Experience, 02 Skills …). Years work as big numerals in the margin, which makes the timeline scannable.',
    'Asymmetric layouts: metadata always sits in the left columns and content starts at column 4, on every page type.',
    'No rounded corners, no shadows and no gradients. Hierarchy comes from size, weight and space alone, which makes for a very sharp print CV.',
  ],
  typography: 'Inter Tight (display, 600–800) + Inter (text)',
  dark: false,
  fit: 'Best if the site should look confident and designed, with a clear point of view and a Swiss reference.',
};

const FONTS = 'family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500;600';

const num = (n) => String(n).padStart(2, '0');

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, postsByYear, featuredPost, talks, formatDate } = c;

  const layout = (page, title, main) => doc({
    title: `${title} · ${profile.name}`,
    fonts: FONTS,
    body: `
<header class="top grid">
  <a class="top__name" href="index.html">${profile.name}</a>
  <p class="top__role">${profile.title}<br>${profile.place}</p>
  <nav class="top__nav" aria-label="Main">${navLinks(navKey(page), { cls: 'nav' })}</nav>
</header>
<main class="${page}">
${main}
</main>
<footer class="foot">
  <div class="grid">
    <p class="foot__big">${profile.firstName}<br>${profile.lastName}</p>
    <div class="foot__col">
      <p class="label">Pages</p>
      ${navLinks(navKey(page), { cls: 'foot__nav' })}
    </div>
    <div class="foot__col">
      <p class="label">Elsewhere</p>
      ${socialLinks({ cls: 'foot__social', labels: true })}
    </div>
    <p class="foot__note">${profile.footerTagline}.</p>
  </div>
</footer>`,
  });

  const sectionHead = (n, title, aside = '') => `
  <header class="sec-head grid">
    <p class="sec-head__num">${num(n)}</p>
    <h2 class="sec-head__title">${title}</h2>
    ${aside ? `<p class="sec-head__aside">${aside}</p>` : ''}
  </header>`;

  const pageHero = (label, title, lead = '') => `
<section class="hero hero--page grid">
  <p class="label hero__label">${label}</p>
  <h1 class="hero__title">${title}</h1>
  ${lead ? `<p class="hero__lead">${lead}</p>` : ''}
</section>`;

  const cv = layout('cv', 'CV', `
<section class="hero grid">
  <h1 class="hero__name">${profile.firstName}<br>${profile.lastName}</h1>
  <figure class="hero__photo"><img src="${profile.photo}" alt="Michael Kohler in Berlin" width="480" height="480"></figure>
  <dl class="facts">
    <div><dt>Role</dt><dd>${profile.title}</dd></div>
    <div><dt>Based in</dt><dd>${profile.place}<br>${profile.origin.replace('originally from', 'from')}</dd></div>
    <div><dt>Languages</dt><dd>${profile.languages}</dd></div>
    <div><dt>Contact</dt><dd><a href="mailto:${profile.email}">${profile.email}</a></dd></div>
  </dl>
</section>

<section class="band">
  <div class="grid">
    <p class="band__text">${profile.tagline}.</p>
    ${profile.intro.map((b, i) => `<div class="band__col band__col--${i + 1}"><p class="label">${b.title}</p><p>${b.text}</p></div>`).join('')}
  </div>
</section>

<section class="sec">
  ${sectionHead(1, 'Experience', `${experience.length} positions since 2008`)}
  ${experience.map((job) => `
  <article class="job grid">
    <p class="job__year">${job.start}</p>
    <div class="job__meta">
      <p>${job.from} – ${job.to}</p>
      ${job.volunteer ? '<p class="label">Volunteer</p>' : ''}
    </div>
    <div class="job__body">
      <h3><a href="${job.url}">${job.company}</a></h3>
      ${job.suffix ? `<p class="muted">${job.suffix}</p>` : ''}
      ${job.note ? `<p class="muted">${job.note}</p>` : ''}
      ${job.roles.map((r) => `
      <div class="role">
        <p class="role__title">${r.title}</p>
        ${r.stack ? `<p class="muted">${r.stack}</p>` : ''}
        <ul>${r.items.map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>
  </article>`).join('')}
</section>

<section class="sec">
  ${sectionHead(2, 'Skills')}
  <div class="skills grid">
    ${skills.map((s) => `<div class="skill"><p class="label">${s.group}</p><ul>${s.items.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}
  </div>
</section>`);

  const table = (items, head = true) => `
  <table class="table">
    ${head ? '<thead><tr><th>Date</th><th>Type</th><th>Description</th></tr></thead>' : ''}
    <tbody>${items.map((x) => `<tr><td>${x.date}</td><td>${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}</td><td>${esc(x.description)}</td></tr>`).join('')}</tbody>
  </table>`;

  const opensource = layout('opensource', 'Open Source', `
${pageHero('Open Source', `${openSource.tagline}.`)}
<section class="numbers grid">
  <div><p class="numbers__n">${fmt(contributions.total)}</p><p class="label">Tracked contributions</p></div>
  <div><p class="numbers__n">${new Date().getFullYear() - 2008}</p><p class="label">Years at Mozilla</p></div>
  <div><p class="numbers__n">250+</p><p class="label">Firefox patches</p></div>
  <div><p class="numbers__n">130+</p><p class="label">Bugs filed</p></div>
</section>

<section class="sec">
  ${sectionHead(1, 'Mozilla')}
  <div class="text grid">
    <div class="text__aside">
      <p class="label">Profiles</p>
      <ul class="plain">${openSource.profiles.map((p) => `<li><a href="${p.href}">${p.label}</a></li>`).join('')}<li><a href="talks.html">Talks</a></li></ul>
    </div>
    <div class="text__body">${openSource.mozillaIntro.map((p) => `<p>${p}</p>`).join('')}</div>
  </div>
</section>

<section class="sec">
  ${sectionHead(2, 'Areas')}
  <div class="areas grid">
    ${openSource.areas.map((a, i) => `
    <article class="area">
      <img src="${a.image}" alt="${a.alt}" loading="lazy">
      <p class="label">${num(i + 1)} — ${a.years}</p>
      <h3>${a.title}</h3>
      <ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
    </article>`).join('')}
  </div>
</section>

<section class="sec">
  ${sectionHead(3, 'Latest', `<a href="contributions.html">All contributions →</a>`)}
  <div class="grid"><div class="span-content">${table(contributions.latest)}</div></div>
</section>`);

  const contributionsPage = layout('contributions', 'Contributions', `
${pageHero('<a href="opensource.html">Open Source</a> / Contributions', 'Contributions', c.contributionsNote)}
<section class="numbers numbers--small grid">
  ${contributions.bySource.slice(0, 8).map((s) => `<div><p class="numbers__n">${fmt(s.count)}</p><p class="label">${s.label}</p></div>`).join('')}
</section>
<section class="sec">
  ${sectionHead(1, 'Log', `Page 1 / ${contributions.pageCount}`)}
  <div class="grid"><div class="span-content">${table(contributions.items)}
    <nav class="pager" aria-label="Pagination"><span class="muted">← Newer</span><a href="#">Older →</a></nav>
  </div></div>
</section>`);

  const blog = layout('blog', 'Blog', `
${pageHero('Blog', 'Writing', `${posts.length} posts, ${posts.at(-1).year}–${posts[0].year}`)}
<section class="sec">
  ${Object.keys(postsByYear).sort().reverse().map((y) => `
  <div class="year grid">
    <p class="year__n">${y}</p>
    <ol class="year__list">
      ${postsByYear[y].map((p) => `<li><a href="post.html"><span class="year__title">${p.title}</span><span class="year__date">${formatDate(p.date, 'short')}</span></a></li>`).join('')}
    </ol>
  </div>`).join('')}
</section>`);

  const post = layout('post', featuredPost.title, `
<article class="article">
  <header class="hero hero--page grid">
    <p class="label hero__label"><a href="blog.html">Blog</a> / ${featuredPost.year}</p>
    <h1 class="hero__title">${featuredPost.title}</h1>
  </header>
  <div class="grid article__grid">
    <aside class="article__meta">
      <p class="label">Published</p><p>${formatDate(featuredPost.date)}</p>
      <p class="label">Reading time</p><p>${featuredPost.readingMinutes} minutes</p>
      <p class="label">Author</p><p>${profile.name}</p>
      <p><a href="blog.html">← All posts</a></p>
    </aside>
    <div class="article__body">${featuredPost.bodyHtml}</div>
  </div>
</article>`);

  const talksPage = layout('talks', 'Talks', `
${pageHero('Talks', 'Talks', c.talksTagline)}
<section class="sec">
  <div class="talks grid">
    ${talks.map((t, i) => `
    <a class="talk" href="${t.url}">
      <p class="talk__index">${num(i + 1)}/${talks.length}</p>
      <img src="${t.image}" alt="" loading="lazy">
      <p class="label">${t.date} · ${t.tags.join(', ')}</p>
      <h3>${t.title}</h3>
    </a>`).join('')}
  </div>
</section>`);

  const notfound = layout('notfound', 'Not found', `
<section class="hero hero--404 grid">
  <p class="big404">404</p>
  <div class="notfound__text">
    <p class="label">Not found</p>
    <p>The page you’re looking for couldn’t be found.</p>
    <p><a href="index.html">Back to the CV →</a></p>
  </div>
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
