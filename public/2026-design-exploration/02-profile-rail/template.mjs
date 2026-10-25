import { doc, esc, fmt, socialLinks, navLinks, navKey } from '../_tools/shared.mjs';

export const meta = {
  name: 'Profile Rail',
  title: 'The current header, turned on its side',
  summary: 'The navy header blocks of today’s site become a fixed rail on the left, holding the portrait, the name, the navigation and the social links on every page. The content sits on a calm tinted canvas in white cards, so it reads more like an app than a document.',
  ideas: [
    'The identity never scrolls away, and the navigation is always one click away instead of hidden behind “Menu ↓” in the footer.',
    'The CV is split into scannable cards: about, personal info, skills as chips and experience as a timeline with monogram markers.',
    'Contributions get filter chips per source (they work: click one to filter the table) and blog posts get a sticky table of contents.',
    'A dark theme follows the system setting: the rail stays navy and the canvas turns to a deeper navy.',
  ],
  typography: 'Plus Jakarta Sans throughout, with tabular numbers for dates',
  dark: true,
  fit: 'Best if the site should feel like a polished, modern product profile and navigation matters.',
};

const FONTS = 'family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400';

const monogram = (name) => name.replace(/Volunteer @ /, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('');

const filterScript = `
document.querySelectorAll('[data-filter]').forEach((chip) => {
  chip.addEventListener('click', () => {
    const value = chip.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    document.querySelectorAll('tr[data-source]').forEach((row) => {
      row.hidden = value !== 'all' && row.dataset.source !== value;
    });
  });
});`;

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, postsByYear, featuredPost, talks, formatDate } = c;

  const layout = (page, title, main, script = '') => doc({
    title: `${title} · ${profile.name}`,
    fonts: FONTS,
    script,
    body: `
<div class="shell">
  <aside class="rail">
    <a class="rail__id" href="index.html">
      <img class="rail__photo" src="${profile.photo}" alt="" width="200" height="200">
      <span class="rail__name">${profile.name}</span>
      <span class="rail__role">${profile.title}</span>
    </a>
    <nav aria-label="Main">${navLinks(navKey(page), { cls: 'rail__nav', wrap: (n) => `<span>${n.label}</span>` })}</nav>
    <div class="rail__foot">
      <p class="rail__place">${profile.place}</p>
      ${socialLinks({ cls: 'rail__social' })}
    </div>
  </aside>
  <main class="canvas ${page}">
    ${main}
    <footer class="canvas__foot">© ${new Date().getFullYear()} ${profile.name} · ${profile.footerTagline}</footer>
  </main>
</div>`,
  });

  const pageHead = (eyebrow, h1, lead = '') => `
    <header class="page-head">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${h1}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </header>`;

  const cv = layout('cv', 'CV', `
    ${pageHead('Curriculum Vitae', `Hi, I’m ${profile.firstName}.`, `${profile.tagline}.`)}
    <div class="grid grid--about">
      <section class="card">
        <h2 class="card__title">About</h2>
        <div class="about">
          ${profile.intro.map((b) => `<div><h3>${b.title}</h3><p>${b.text}</p></div>`).join('')}
        </div>
      </section>
      <section class="card">
        <h2 class="card__title">Personal info</h2>
        <dl class="kv">
          <div><dt>Name</dt><dd>${profile.name}</dd></div>
          <div><dt>Place</dt><dd>${profile.place}<br><span class="muted">${profile.origin}</span></dd></div>
          <div><dt>Email</dt><dd><a href="mailto:${profile.email}">${profile.email}</a></dd></div>
          <div><dt>Languages</dt><dd>${profile.languages} (fluent)</dd></div>
        </dl>
      </section>
    </div>

    <section class="card">
      <h2 class="card__title">Experience</h2>
      <ol class="timeline">
        ${experience.map((job) => `
        <li class="timeline__item">
          <span class="timeline__mark${job.volunteer ? ' is-volunteer' : ''}" aria-hidden="true">${monogram(job.company)}</span>
          <div class="timeline__body">
            <div class="timeline__head">
              <h3><a href="${job.url}">${job.company}</a>${job.suffix ? ` <span class="muted">${job.suffix}</span>` : ''}</h3>
              <span class="pill">${job.from} – ${job.to}</span>
            </div>
            ${job.note ? `<p class="muted">${job.note}</p>` : ''}
            ${job.roles.map((r) => `
            <div class="role">
              <p class="role__title">${r.title}</p>
              ${r.stack ? `<p class="role__stack">${r.stack.split(', ').map((s) => `<span>${s}</span>`).join('')}</p>` : ''}
              <ul>${r.items.map((i) => `<li>${i}</li>`).join('')}</ul>
            </div>`).join('')}
          </div>
        </li>`).join('')}
      </ol>
    </section>

    <section class="card">
      <h2 class="card__title">Skills</h2>
      <div class="skills">
        ${skills.map((s) => `<div class="skills__group"><h3>${s.group}</h3><ul class="chips">${s.items.map((i) => `<li>${i}</li>`).join('')}</ul></div>`).join('')}
      </div>
    </section>`);

  const rows = (items) => items.map((x) => `
        <tr data-source="${x.source}">
          <td class="date">${x.date}</td>
          <td><span class="badge badge--${x.source.split('-')[0]}">${x.source.split('-')[0]}</span></td>
          <td>${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}</td>
          <td class="desc">${esc(x.description)}</td>
        </tr>`).join('');

  const opensource = layout('opensource', 'Open Source', `
    ${pageHead('Open Source', openSource.tagline, 'Volunteering for Mozilla since 2008, across Firefox, Common Voice, the Reps program and local communities.')}
    <div class="stats">
      <div class="stat"><span class="stat__value">${fmt(contributions.total)}</span><span class="stat__label">tracked contributions</span></div>
      <div class="stat"><span class="stat__value">${new Date().getFullYear() - 2008}</span><span class="stat__label">years at Mozilla</span></div>
      <div class="stat"><span class="stat__value">250+</span><span class="stat__label">Firefox patches</span></div>
      <div class="stat"><span class="stat__value">${talks.length}</span><span class="stat__label">talks given</span></div>
    </div>

    <section class="card">
      <div class="card__row">
        <h2 class="card__title">Latest contributions</h2>
        <a class="button" href="contributions.html">See all</a>
      </div>
      <table class="table"><tbody>${rows(contributions.latest)}</tbody></table>
    </section>

    <div class="grid grid--story">
      <section class="card prose">
        <h2 class="card__title">Mozilla</h2>
        ${openSource.mozillaIntro.map((p) => `<p>${p}</p>`).join('')}
      </section>
      <section class="card">
        <h2 class="card__title">Profiles</h2>
        <ul class="links">
          ${openSource.profiles.map((p) => `<li><a href="${p.href}"><strong>${p.label}</strong><span>${p.text}</span></a></li>`).join('')}
          <li><a href="talks.html"><strong>Talks</strong><span>${talks.length} talks & slides</span></a></li>
        </ul>
      </section>
    </div>

    <div class="grid grid--areas">
      ${openSource.areas.map((a) => `
      <article class="card area">
        <img src="${a.image}" alt="${a.alt}" loading="lazy">
        <div class="area__body">
          <div class="card__row"><h3>${a.title}</h3><span class="pill">${a.years}</span></div>
          <ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
        </div>
      </article>`).join('')}
    </div>`);

  const contributionsPage = layout('contributions', 'Contributions', `
    ${pageHead('<a href="opensource.html">Open Source</a> › Contributions', 'All contributions', c.contributionsNote)}
    <section class="card">
      <div class="filters" role="group" aria-label="Filter by source">
        <button type="button" data-filter="all" aria-pressed="true">All <span>${fmt(contributions.total)}</span></button>
        ${contributions.bySource.map((s) => `<button type="button" data-filter="${s.key}" aria-pressed="false">${s.label} <span>${fmt(s.count)}</span></button>`).join('')}
      </div>
      <table class="table">
        <thead><tr><th>Date</th><th>Source</th><th>Type</th><th>Description</th></tr></thead>
        <tbody>${rows(contributions.items)}</tbody>
      </table>
      <nav class="pagination" aria-label="Pagination">
        <span class="muted">Showing 1–${contributions.perPage} of ${fmt(contributions.total)}</span>
        <ol>${[1, 2, 3, '…', contributions.pageCount].map((n) => n === '…' ? '<li>…</li>' : `<li><a href="#"${n === 1 ? ' aria-current="page"' : ''}>${n}</a></li>`).join('')}</ol>
      </nav>
    </section>`, filterScript);

  const blog = layout('blog', 'Blog', `
    ${pageHead('Blog', 'Writing', `${posts.length} posts about Mozilla, community events and Firefox.`)}
    <a class="card featured" href="post.html">
      <span class="pill">Latest · ${formatDate(posts[0].date, 'short')}</span>
      <h2>${posts[0].title}</h2>
      <p>${esc(posts[0].excerptText)}</p>
      <span class="button">Read post · ${posts[0].readingMinutes} min</span>
    </a>
    ${Object.keys(postsByYear).sort().reverse().map((y) => `
    <section class="year">
      <h2 class="year__title">${y}</h2>
      <div class="card list">
        ${postsByYear[y].map((p) => `
        <a class="list__item" href="post.html">
          <span class="list__title">${p.title}</span>
          <span class="list__meta">${formatDate(p.date, 'short')} · ${p.readingMinutes} min</span>
        </a>`).join('')}
      </div>
    </section>`).join('')}`);

  const toc = [];
  const body = featuredPost.bodyHtml.replace(/<h([23])>(.*?)<\/h\1>/g, (_, level, text) => {
    const id = c.slug(text.replace(/<[^>]+>/g, ''));
    toc.push({ level, id, text });
    return `<h${level} id="${id}">${text}</h${level}>`;
  });
  const post = layout('post', featuredPost.title, `
    <div class="article">
      <article class="card prose prose--article">
        <p class="eyebrow"><a href="blog.html">Blog</a> › ${featuredPost.year}</p>
        <h1>${featuredPost.title}</h1>
        <p class="article__meta"><img src="${profile.photo}" alt="" width="32" height="32"> ${profile.name} · ${formatDate(featuredPost.date)} · ${featuredPost.readingMinutes} min read</p>
        ${body}
      </article>
      <aside class="toc card">
        <p class="card__title">On this page</p>
        <ol>${toc.map((t) => `<li class="toc--${t.level}"><a href="#${t.id}">${t.text}</a></li>`).join('')}</ol>
        <a class="button" href="blog.html">← All posts</a>
      </aside>
    </div>`);

  const talksPage = layout('talks', 'Talks', `
    ${pageHead('Talks', 'Talks & slides', c.talksTagline)}
    <div class="grid grid--talks">
      ${talks.map((t) => `
      <a class="card talk" href="${t.url}">
        <img src="${t.image}" alt="" loading="lazy">
        <div class="talk__body">
          <ul class="tags">${t.tags.map((g) => `<li>${g}</li>`).join('')}</ul>
          <h2>${t.title}</h2>
          <p class="muted">${formatDate(t.date, 'short')}</p>
          <p>${t.description}</p>
        </div>
      </a>`).join('')}
    </div>`);

  const notfound = layout('notfound', 'Not found', `
    <section class="card empty">
      <p class="empty__code">404</p>
      <h1>Page not found</h1>
      <p class="lead">The page you’re looking for couldn’t be found.</p>
      <a class="button" href="index.html">Back to the CV</a>
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
