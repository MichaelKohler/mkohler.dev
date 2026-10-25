import { doc, esc, fmt, socialLinks, navLinks, navKey, icon } from '../_tools/shared.mjs';
import { yearBars } from '../_tools/charts.mjs';

export const meta = {
  name: 'Bento',
  title: 'Everything at a glance',
  summary: 'The home page becomes a modular grid of rounded tiles, each one fact: the portrait, the current role, the location, eighteen years at Mozilla, contribution volume per year, the latest post and the latest talk. Inner pages reuse the same tiles, so the whole site feels like one dashboard of a life in software.',
  ideas: [
    'The portrait gets the biggest tile, and the navy name tile next to it reuses the two-tone navy header of today’s site.',
    'Real numbers from the contribution data (13k+ items, a per-year bar chart, a breakdown by source) make the volunteer work tangible.',
    'A floating pill navigation with a mini avatar stays at the top on every page.',
    'Tiles collapse to one column on mobile, so order is decided once and keeps working at every size. Dark mode is included.',
  ],
  typography: 'Bricolage Grotesque for display, Inter for text',
  dark: true,
  fit: 'Best if the home page should be a quick, friendly overview that links deeper, rather than a full CV up front.',
};

const FONTS = 'family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Inter:wght@400;500;600';

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, postsByYear, featuredPost, talks, formatDate, social } = c;

  const layout = (page, title, main) => doc({
    title: `${title} · ${profile.name}`,
    fonts: FONTS,
    body: `
<header class="topbar">
  <nav class="pill-nav" aria-label="Main">
    <a class="pill-nav__me" href="index.html"><img src="${profile.photo}" alt="" width="32" height="32"><span>${profile.name}</span></a>
    ${navLinks(navKey(page), { cls: 'pill-nav__links' })}
  </nav>
</header>
<main class="wrap ${page}">
${main}
</main>
<footer class="wrap footer">
  <div class="tile tile--navy footer__tile">
    <div>
      <p class="footer__name">${profile.name}</p>
      <p>${profile.footerTagline}</p>
    </div>
    ${socialLinks({ cls: 'footer__social' })}
  </div>
</footer>`,
  });

  const head = (eyebrow, h1, lead = '') => `
  <section class="tile tile--hero">
    <p class="eyebrow">${eyebrow}</p>
    <h1>${h1}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </section>`;

  const current = experience[0];
  const latestTalk = talks[0];
  const years = new Date().getFullYear() - 2008;

  const cv = layout('cv', 'CV', `
<div class="bento bento--home">
  <figure class="tile tile--photo"><img src="${profile.photo}" alt="Michael Kohler in Berlin" width="600" height="600"></figure>

  <section class="tile tile--navy tile--intro">
    <p class="eyebrow eyebrow--light">Hello, I’m</p>
    <h1>${profile.name}</h1>
    <p class="intro__role">${profile.title}</p>
    <p class="intro__tag">${profile.tagline}.</p>
  </section>

  <section class="tile tile--now">
    <p class="eyebrow">Currently</p>
    <p class="big">${current.company}</p>
    <p class="muted">${current.roles[0].title} · since ${current.from}</p>
    <p>${current.roles[0].items[0]}</p>
  </section>

  <section class="tile tile--place">
    <p class="eyebrow">Based in</p>
    <p class="big">Berlin</p>
    <p class="muted">${profile.origin}</p>
    <p class="langs">${profile.languages.split(', ').map((l) => `<span>${l}</span>`).join('')}</p>
  </section>

  <a class="tile tile--accent tile--mozilla" href="opensource.html">
    <p class="eyebrow eyebrow--light">Mozilla volunteer</p>
    <p class="huge">${years}<small>years</small></p>
    <p>Since April 2008: Firefox, Common Voice, Reps and community building.</p>
  </a>

  <a class="tile tile--chart" href="contributions.html">
    <div class="tile__row"><p class="eyebrow">Tracked contributions</p><span class="arrow">↗</span></div>
    <p class="big">${fmt(contributions.total)}</p>
    ${yearBars(contributions.byYear)}
  </a>

  <a class="tile tile--post" href="post.html">
    <div class="tile__row"><p class="eyebrow">Latest post</p><span class="arrow">↗</span></div>
    <p class="mid">${posts[0].title}</p>
    <p class="muted">${formatDate(posts[0].date)} · ${posts[0].readingMinutes} min read</p>
  </a>

  <a class="tile tile--talk" href="talks.html">
    <img src="${latestTalk.image}" alt="" loading="lazy">
    <div class="tile--talk__body">
      <p class="eyebrow">Latest talk</p>
      <p class="mid">${latestTalk.title}</p>
    </div>
  </a>

  <section class="tile tile--about">
    ${profile.intro.map((b) => `<div><p class="eyebrow">${b.title}</p><p>${b.text}</p></div>`).join('')}
  </section>

  <section class="tile tile--social">
    <p class="eyebrow">Elsewhere</p>
    <ul class="social-list">
      ${social.map((s) => `<li><a href="${s.href}">${icon(s)}<span>${s.label}</span></a></li>`).join('')}
    </ul>
  </section>
</div>

<h2 class="section-title">Experience</h2>
<div class="bento bento--jobs">
  ${experience.map((job, i) => `
  <article class="tile job${i < 2 ? ' job--wide' : ''}">
    <div class="tile__row">
      <p class="eyebrow">${job.from} – ${job.to}</p>
      ${job.volunteer ? '<span class="tag">Volunteer</span>' : ''}
    </div>
    <h3><a href="${job.url}">${job.company}</a></h3>
    ${job.suffix ? `<p class="muted">${job.suffix}</p>` : ''}
    ${job.roles.map((r) => `
    <div class="role">
      <p class="role__title">${r.title}</p>
      ${r.stack ? `<p class="muted small">${r.stack}</p>` : ''}
      <ul>${r.items.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>`).join('')}
  </article>`).join('')}
</div>

<h2 class="section-title">Skills</h2>
<div class="bento bento--skills">
  ${skills.map((s) => `
  <section class="tile skill">
    <p class="eyebrow">${s.group}</p>
    <ul class="chips">${s.items.map((x) => `<li>${x}</li>`).join('')}</ul>
  </section>`).join('')}
  <section class="tile skill tile--navy">
    <p class="eyebrow eyebrow--light">Get in touch</p>
    <p class="mid"><a href="mailto:${profile.email}">${profile.email}</a></p>
  </section>
</div>`);

  const sourceMax = contributions.bySource[0].count;
  const rows = (items) => items.map((x) => `
    <li class="row">
      <time>${formatDate(x.date, 'short')}</time>
      <span class="row__type">${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}</span>
      <span class="row__desc">${esc(x.description)}</span>
    </li>`).join('');

  const opensource = layout('opensource', 'Open Source', `
<div class="bento bento--os">
  ${head('Open Source', `${openSource.tagline}.`, 'Volunteering for Mozilla since 2008.')}
  <a class="tile tile--chart tile--os-chart" href="contributions.html">
    <div class="tile__row"><p class="eyebrow">${fmt(contributions.total)} contributions</p><span class="arrow">↗</span></div>
    ${yearBars(contributions.byYear)}
  </a>
  <section class="tile tile--story">
    <p class="eyebrow">Mozilla</p>
    ${openSource.mozillaIntro.map((p) => `<p>${p}</p>`).join('')}
  </section>
  <section class="tile tile--profiles">
    <p class="eyebrow">Profiles</p>
    <ul class="link-list">
      ${openSource.profiles.map((p) => `<li><a href="${p.href}"><span>${p.label}</span><span class="arrow">↗</span></a></li>`).join('')}
      <li><a href="talks.html"><span>${talks.length} Talks</span><span class="arrow">↗</span></a></li>
    </ul>
  </section>
  ${openSource.areas.map((a) => `
  <article class="tile area">
    <img src="${a.image}" alt="${a.alt}" loading="lazy">
    <div class="area__body">
      <div class="tile__row"><h2>${a.title}</h2><span class="tag">${a.years}</span></div>
      <ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
  </article>`).join('')}
  <section class="tile tile--latest">
    <div class="tile__row"><p class="eyebrow">Latest contributions</p><a class="tag" href="contributions.html">See all</a></div>
    <ol class="rows">${rows(contributions.latest)}</ol>
  </section>
</div>`);

  const contributionsPage = layout('contributions', 'Contributions', `
<div class="bento bento--contrib">
  ${head('<a href="opensource.html">Open Source</a> / Contributions', `${fmt(contributions.total)} contributions`, c.contributionsNote)}
  <section class="tile tile--chart tile--contrib-chart">
    <p class="eyebrow">Per year</p>
    ${yearBars(contributions.byYear)}
  </section>
  <section class="tile tile--sources">
    <p class="eyebrow">By source</p>
    <ul class="meter">
      ${contributions.bySource.map((s) => `<li><span>${s.label}</span><b>${fmt(s.count)}</b><i style="--v:${(s.count / sourceMax).toFixed(3)}"></i></li>`).join('')}
    </ul>
  </section>
  <section class="tile tile--log">
    <div class="tile__row">
      <p class="eyebrow">Page 1 of ${contributions.pageCount}</p>
      <nav class="pager" aria-label="Pagination"><a class="tag is-disabled" href="#">← Newer</a><a class="tag" href="#">Older →</a></nav>
    </div>
    <ol class="rows">${rows(contributions.items)}</ol>
  </section>
</div>`);

  const blog = layout('blog', 'Blog', `
<div class="bento bento--blog">
  ${head('Blog', 'Writing', `${posts.length} posts about Mozilla, communities and Firefox, from ${posts.at(-1).year} to ${posts[0].year}.`)}
  <a class="tile tile--navy tile--feature" href="post.html">
    <p class="eyebrow eyebrow--light">Latest · ${formatDate(posts[0].date)}</p>
    <h2>${posts[0].title}</h2>
    <p>${esc(posts[0].excerptText)}</p>
    <span class="tag tag--light">Read · ${posts[0].readingMinutes} min</span>
  </a>
  ${posts.slice(1).map((p) => `
  <a class="tile post-tile" href="post.html">
    <p class="eyebrow">${formatDate(p.date, 'short')}</p>
    <h3>${p.title}</h3>
    <p class="muted small">${p.readingMinutes} min read</p>
  </a>`).join('')}
</div>`);

  const post = layout('post', featuredPost.title, `
<div class="bento bento--post">
  <header class="tile tile--hero tile--post-hero">
    <p class="eyebrow"><a href="blog.html">Blog</a> / ${featuredPost.year}</p>
    <h1>${featuredPost.title}</h1>
    <p class="meta"><img src="${profile.photo}" alt="" width="36" height="36">${profile.name} · ${formatDate(featuredPost.date)} · ${featuredPost.readingMinutes} min read</p>
  </header>
  <article class="tile prose">
    ${featuredPost.bodyHtml}
  </article>
  <a class="tile tile--navy tile--back" href="blog.html"><span class="arrow">←</span> Back to all ${posts.length} posts</a>
</div>`);

  const talksPage = layout('talks', 'Talks', `
<div class="bento bento--talks">
  ${head('Talks', `${talks.length} talks & slides`, c.talksTagline)}
  ${talks.map((t, i) => `
  <a class="tile talk${i === 0 ? ' talk--feature' : ''}" href="${t.url}">
    <img src="${t.image}" alt="" loading="lazy">
    <div class="talk__body">
      <p class="eyebrow">${formatDate(t.date, 'short')}</p>
      <h3>${t.title}</h3>
      <ul class="chips chips--small">${t.tags.map((g) => `<li>${g}</li>`).join('')}</ul>
    </div>
  </a>`).join('')}
</div>`);

  const notfound = layout('notfound', 'Not found', `
<div class="bento bento--404">
  <section class="tile tile--navy tile--404">
    <p class="huge">404</p>
  </section>
  <section class="tile tile--hero">
    <p class="eyebrow">Not found</p>
    <h1>This tile is missing.</h1>
    <p class="lead">The page you’re looking for couldn’t be found.</p>
  </section>
  <a class="tile" href="index.html"><p class="eyebrow">Go to</p><p class="mid">CV ↗</p></a>
  <a class="tile" href="blog.html"><p class="eyebrow">Go to</p><p class="mid">Blog ↗</p></a>
  <a class="tile" href="talks.html"><p class="eyebrow">Go to</p><p class="mid">Talks ↗</p></a>
</div>`);

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
