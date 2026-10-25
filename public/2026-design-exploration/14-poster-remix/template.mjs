import { doc, esc, fmt, socialLinks, navLinks, navKey } from '../_tools/shared.mjs';
import { monthHeatmap } from '../_tools/charts.mjs';

export const meta = {
  name: 'Poster Remix',
  title: 'The match-off winners, put together',
  summary: 'Built from the match-off results: every component is the one that won its round, redrawn so they share one system. The CV, talks and Open Source areas use the Duotone Poster (09). The top bar and footer come from Timeline (06), the experience list from Swiss Grid (05), the filtered contributions log from Profile Rail (02), the blog index from Split Screen (12), the Open Source dashboard intro from Aurora Glass (11), and reading and the mobile pages from Editorial (01 and 13).',
  ideas: [
    'Desktop CV, talks, skills and the Open Source areas are 09’s navy posters and duotone photos. 09 won 5 of the 14 rounds and had the most wins overall.',
    'Navy top bar with the round avatar and pill navigation (06, winner) on every page, and 06’s centred footer with the round social buttons.',
    'Experience in 05’s grid, with big year numerals in the margin. Open Source opens with 11’s dashboard (key numbers, monthly heatmap, sources). Contributions use 02’s working filter chips and source badges.',
    'The blog is 12’s split page: a sticky navy stage with the year index, and the list on the right. Posts are set like 01: Newsreader, a 66-character measure and a drop cap.',
    'On phones, the CV opens with 13’s full-bleed photo header and every other page uses 01’s centred masthead. These were the two mobile winners.',
  ],
  typography: 'Anton (display) + Archivo (interface) + Newsreader (reading)',
  dark: false,
  darkNote: 'No, but the posters are navy',
  fit: 'The direct answer to the match-off: each component is the one you picked.',
};

const FONTS = 'family=Anton&family=Archivo:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400';

// Contribution filter chips (from 02): show only the rows of the chosen source.
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

// Shared markup for proposals 14–16: the same structure, each with its own stylesheet.
export function remix(c, { fonts = FONTS } = {}) {
  const { profile, experience, skills, openSource, contributions, posts, postsByYear, featuredPost, talks, formatDate } = c;

  const duo = (src, alt = '', cls = '') => `<span class="duo ${cls}"><img src="${src}" alt="${alt}" loading="lazy"></span>`;
  const num = (n) => String(n).padStart(2, '0');
  const sh = (n, title, aside = '') => `
  <header class="sh">
    <p class="sh__num">${num(n)}</p>
    <h2 class="sh__title">${title}</h2>
    ${aside ? `<p class="sh__aside">${aside}</p>` : ''}
  </header>`;

  const layout = (page, title, main, script = '') => doc({
    title: `${title} · ${profile.name}`,
    fonts,
    bodyClass: `page-${page}`,
    script,
    body: `
<header class="bar">
  <a class="bar__me" href="index.html">
    <img src="${profile.photo}" alt="" width="180" height="180">
    <span class="bar__name">${profile.name}</span>
  </a>
  <p class="bar__role">${profile.title} · ${profile.place}</p>
  <nav aria-label="Main">${navLinks(navKey(page), { cls: 'bar__nav' })}</nav>
</header>
<main class="${page}">
${main}
</main>
<footer class="end">
  <span class="end__dot" aria-hidden="true"></span>
  <p class="end__name">${profile.name}</p>
  <p class="end__tag">${profile.footerTagline}</p>
  ${socialLinks({ cls: 'end__social' })}
</footer>`,
  });

  // A page opening: a navy poster on desktop, a plain lede (01) on phones.
  const poster = (word, kicker, lead = '', extra = '') => `
<section class="poster">
  <p class="kicker">${kicker}</p>
  <h1 class="poster__word">${word}</h1>
  ${lead ? `<p class="poster__lead">${lead}</p>` : ''}
  ${extra}
</section>`;

  const cv = layout('cv', 'CV', `
<section class="hero">
  ${duo(profile.photo, 'Michael Kohler in Berlin', 'hero__photo')}
  <h1 class="hero__name"><span>${profile.firstName}</span> <span>${profile.lastName}</span></h1>
  <div class="hero__meta">
    <p class="kicker">${profile.title} · ${profile.place}</p>
    <p class="hero__lead">${profile.tagline}.</p>
    ${socialLinks({ cls: 'hero__social' })}
  </div>
</section>

<section class="intro">
  ${profile.intro.map((b) => `<div><h2 class="kicker">${b.title}</h2><p>${b.text}</p></div>`).join('')}
  <div><h2 class="kicker">Contact</h2><p><a href="mailto:${profile.email}">${profile.email}</a><br>${profile.languages}<br>${profile.origin}</p></div>
</section>

<section class="sec">
  ${sh(1, 'Experience', `${experience.length} positions since 2008`)}
  ${experience.map((job) => `
  <article class="job${job.volunteer ? ' job--volunteer' : ''}">
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

<section class="skills">
  ${sh(2, 'Skills', `${skills.reduce((n, s) => n + s.items.length, 0)} tools and practices`)}
  <div class="skills__grid">
  ${skills.map((s) => `
    <div class="skill">
      <h3 class="kicker">${s.group}</h3>
      <p class="skill__words">${s.items.map((x) => `<span>${x}</span>`).join('<i aria-hidden="true"> / </i>')}</p>
    </div>`).join('')}
  </div>
</section>`);

  const rows = (items) => items.map((x) => {
    const src = x.source.split('-')[0];
    return `
      <tr data-source="${x.source}">
        <td class="log__date">${x.date}</td>
        <td><span class="badge badge--${src}">${src}</span></td>
        <td class="log__type">${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}</td>
        <td class="log__desc">${esc(x.description)}</td>
      </tr>`;
  }).join('');
  const table = (items) => `
    <table class="log">
      <thead><tr><th>Date</th><th>Source</th><th>Type</th><th>Description</th></tr></thead>
      <tbody>${rows(items)}</tbody>
    </table>`;

  const maxSource = contributions.bySource[0].count;
  const kpis = [[fmt(contributions.total), 'tracked contributions'], [c.yearsActive, 'years at Mozilla'], ['250+', 'Firefox patches'], ['130+', 'bugs filed']];

  const opensource = layout('opensource', 'Open Source', `
<section class="dash">
  <div class="dash__head">
    <p class="kicker">Open Source · since 2008</p>
    <h1 class="dash__title">${openSource.tagline}</h1>
    <p class="dash__lead">${openSource.mozillaIntro[0]}</p>
  </div>
  <ul class="kpis">${kpis.map(([v, l]) => `<li><b>${v}</b><span>${l}</span></li>`).join('')}</ul>
  <div class="dash__panels">
    <div class="tile tile--heat">
      <h2 class="tile__title">Activity by month <span>${contributions.firstYear}–${contributions.lastYear}, all sources</span></h2>
      ${monthHeatmap(contributions.byMonth)}
    </div>
    <div class="tile">
      <h2 class="tile__title">By source</h2>
      <ul class="meters">${contributions.bySource.slice(0, 8).map((s) => `<li><span>${s.label}</span><b>${fmt(s.count)}</b><i style="--v:${(s.count / maxSource).toFixed(3)}"></i></li>`).join('')}</ul>
      <a class="more" href="contributions.html">All contributions →</a>
    </div>
  </div>
</section>

<section class="sec mozilla">
  ${sh(1, 'Mozilla', `${c.yearsActive} years as a volunteer`)}
  <div class="mozilla__cols">${openSource.mozillaIntro.slice(1).map((p) => `<p>${p}</p>`).join('')}</div>
  <p class="chips">${openSource.profiles.map((p) => `<a href="${p.href}">${p.label} ↗</a>`).join('')}<a href="talks.html">Talks →</a></p>
</section>

${openSource.areas.map((a, i) => `
<section class="area${i % 2 ? ' area--flip' : ' area--navy'}">
  ${duo(a.image, a.alt, 'area__photo')}
  <div class="area__text">
    <p class="kicker">${a.years}</p>
    <h2 class="area__title">${a.title}</h2>
    <ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
  </div>
</section>`).join('')}

<section class="sec">
  ${sh(2, 'Latest contributions', `<a href="contributions.html">All ${fmt(contributions.total)} →</a>`)}
  <div class="card">${table(contributions.latest)}</div>
</section>`);

  const contributionsPage = layout('contributions', 'Contributions', `
<section class="dash dash--compact">
  <div class="dash__head">
    <p class="kicker"><a href="opensource.html">Open Source</a> · Log</p>
    <h1 class="dash__title">All contributions</h1>
    <p class="dash__lead">${c.contributionsNote}</p>
  </div>
</section>
<section class="sec">
  <div class="card">
    <div class="filters" role="group" aria-label="Filter by source">
      <button type="button" data-filter="all" aria-pressed="true">All <span>${fmt(contributions.total)}</span></button>
      ${contributions.bySource.map((s) => `<button type="button" data-filter="${s.key}" aria-pressed="false">${s.label} <span>${fmt(s.count)}</span></button>`).join('')}
    </div>
    ${table(contributions.items)}
    <nav class="pager" aria-label="Pagination">
      <span class="muted">Showing 1–${contributions.perPage} of ${fmt(contributions.total)}</span>
      <ol>${[1, 2, 3, '…', contributions.pageCount].map((n) => n === '…' ? '<li>…</li>' : `<li><a href="#"${n === 1 ? ' aria-current="page"' : ''}>${n}</a></li>`).join('')}</ol>
    </nav>
  </div>
</section>`, filterScript);

  const years = Object.keys(postsByYear).sort().reverse();
  const blog = layout('blog', 'Blog', `
<div class="split">
  <aside class="stage">
    <div class="stage__text">
      <p class="kicker">Blog</p>
      <h1 class="stage__word">Writing</h1>
      <p class="stage__lead">${posts.length} posts on Mozilla, community events and Firefox, since ${posts.at(-1).year}.</p>
      <nav class="stage__years" aria-label="Years">${years.map((y) => `<a href="#y${y}">${y}<sup>${postsByYear[y].length}</sup></a>`).join('')}</nav>
    </div>
  </aside>
  <div class="split__main">
    ${years.map((y) => `
    <section class="year" id="y${y}">
      <h2 class="year__num">${y}</h2>
      <ol class="posts">
        ${postsByYear[y].map((p) => `<li><a href="post.html"><span class="posts__title">${p.title}</span><span class="posts__meta">${formatDate(p.date, 'short')} · ${p.readingMinutes} min</span></a></li>`).join('')}
      </ol>
    </section>`).join('')}
  </div>
</div>`);

  const post = layout('post', featuredPost.title, `
<article class="article">
  <header class="article__head">
    <p class="kicker"><a href="blog.html">Blog</a> · ${featuredPost.year}</p>
    <h1 class="article__title">${featuredPost.title}</h1>
    <p class="dek">${esc(featuredPost.excerptText.split('. ').slice(0, 2).join('. '))}.</p>
    <p class="byline"><img src="${profile.photo}" alt="" width="40" height="40"><span>By ${profile.name} · <time>${formatDate(featuredPost.date)}</time> · ${featuredPost.readingMinutes} min read</span></p>
  </header>
  <div class="article__body">
    ${featuredPost.bodyHtml}
  </div>
  <footer class="article__foot"><a href="blog.html">← All posts</a></footer>
</article>`);

  const talksPage = layout('talks', 'Talks', `
${poster('On stage', 'Talks', `${talks.length} talks and workshops, ${talks.at(-1).year}–${talks[0].year}. ${c.talksTagline}`)}
<section class="sec">
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
${poster('404', 'Not found', 'The page you’re looking for couldn’t be found. Try the <a href="index.html">CV</a>, the <a href="blog.html">blog</a> or the <a href="talks.html">talks</a>.', '<p><a class="cta" href="index.html">Back to the CV →</a></p>')}`);

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

export const render = (c) => remix(c);
