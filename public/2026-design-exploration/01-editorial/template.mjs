import { doc, esc, fmt, socialLinks, navLinks, navKey } from '../_tools/shared.mjs';

export const meta = {
  name: 'Editorial',
  title: 'A personal broadsheet',
  summary: 'Treats the site like a well-set magazine: a centred masthead, a serif typeface with real personality, generous margins and a strict reading measure. The CV reads like a profile piece, the blog like a column.',
  ideas: [
    'Masthead with a small round portrait, the name in a large serif and the navigation set in small caps below a hairline rule.',
    'A margin column for dates and metadata runs through every page, so the CV, the archive and the contribution log share a rhythm.',
    'Blog posts get a dek, byline and reading time, a 66-character measure and a drop cap. The archive is grouped by year like a printed index.',
    'Colour is used sparingly: navy for type and rules, the light blue tint for pull-outs. The navy band survives only in the footer.',
  ],
  typography: 'Newsreader (display and text, optical sizes) + Inter for small UI labels',
  dark: false,
  fit: 'Best if writing and the CV narrative matter most and the site should feel calm and timeless.',
};

const FONTS = 'family=Inter:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..500';

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, postsByYear, featuredPost, talks, formatDate } = c;

  const layout = (page, title, main) => doc({
    title: `${title} · ${profile.name}`,
    fonts: FONTS,
    body: `
<header class="masthead">
  <a class="masthead__brand" href="index.html">
    <img src="${profile.photo}" alt="" width="180" height="180">
    <span class="masthead__name">${profile.name}</span>
  </a>
  <p class="masthead__role">${profile.title} · ${profile.place}</p>
  <nav aria-label="Main">${navLinks(navKey(page), { cls: 'masthead__nav' })}</nav>
</header>
<main class="${page}">
${main}
</main>
<footer class="colophon">
  <div class="colophon__inner">
    <div>
      <p class="colophon__name">${profile.name}</p>
      <p>${profile.footerTagline}</p>
    </div>
    <nav aria-label="Footer">${navLinks(navKey(page), { cls: 'colophon__nav' })}</nav>
    ${socialLinks({ cls: 'colophon__social' })}
  </div>
</footer>`,
  });

  const cv = layout('cv', 'CV', `
<section class="lede lede--portrait">
  <figure class="portrait"><img src="${profile.photo}" alt="Michael Kohler in Berlin" width="360" height="360"></figure>
  <p class="kicker">Curriculum Vitae</p>
  <h1>${profile.tagline}.</h1>
  <div class="lede__cols">
    ${profile.intro.map((b) => `<div><h2 class="label">${b.title}</h2><p>${b.text}</p></div>`).join('')}
  </div>
  <dl class="facts">
    <div><dt>Based in</dt><dd>${profile.place}<br><span class="muted">${profile.origin}</span></dd></div>
    <div><dt>Email</dt><dd><a href="mailto:${profile.email}">${profile.email}</a></dd></div>
    <div><dt>Languages</dt><dd>${profile.languages}</dd></div>
  </dl>
</section>

<section class="section">
  <h2 class="section__title">Experience</h2>
  ${experience.map((job) => `
  <article class="job">
    <p class="job__when"><time>${job.from}</time> – <time>${job.to}</time></p>
    <div class="job__body">
      <h3><a href="${job.url}">${job.company}</a>${job.suffix ? ` <span class="muted">${job.suffix}</span>` : ''}</h3>
      ${job.note ? `<p class="job__note">${job.note}</p>` : ''}
      ${job.roles.map((r) => `
      <div class="role">
        <p class="role__title">${r.title}${r.stack ? ` <span class="role__stack">${r.stack}</span>` : ''}</p>
        <ul>${r.items.map((i) => `<li>${i}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>
  </article>`).join('')}
</section>

<section class="section">
  <h2 class="section__title">Skills</h2>
  <dl class="skills">
    ${skills.map((s) => `<div><dt>${s.group}</dt><dd>${s.items.join(', ')}</dd></div>`).join('')}
  </dl>
</section>`);

  const contributionRows = (items) => items.map((x) => `
    <tr>
      <td class="num">${x.date}</td>
      <td>${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}</td>
      <td>${esc(x.description)}</td>
    </tr>`).join('');

  const opensource = layout('opensource', 'Open Source', `
<section class="lede lede--narrow">
  <p class="kicker">Open Source</p>
  <h1>${openSource.tagline}.</h1>
  <p class="dek">Since 2008 I have contributed to Mozilla as a volunteer: patches for Firefox, tooling for Common Voice, and more than a decade of community building across Switzerland, Germany and Austria.</p>
</section>

<section class="section essay">
  <h2 class="section__title">Mozilla</h2>
  <div class="essay__body">
    ${openSource.mozillaIntro.map((p) => `<p>${p}</p>`).join('')}
    <p>${openSource.talksNote}</p>
  </div>
  <aside class="essay__aside">
    <h3 class="label">Profiles</h3>
    <ul class="plain">${openSource.profiles.map((p) => `<li>${p.label}<br><a href="${p.href}">${p.text}</a></li>`).join('')}</ul>
    <h3 class="label">In numbers</h3>
    <p class="figure">${fmt(contributions.total)}</p>
    <p class="muted">tracked contributions since ${contributions.firstYear}</p>
  </aside>
</section>

<section class="section">
  <h2 class="section__title">Areas</h2>
  ${openSource.areas.map((a, i) => `
  <article class="area ${i % 2 ? 'area--flip' : ''}">
    <figure><img src="${a.image}" alt="${a.alt}" loading="lazy"><figcaption>${a.alt}</figcaption></figure>
    <div>
      <p class="kicker">${a.years}</p>
      <h3>${a.title}</h3>
      <ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
  </article>`).join('')}
</section>

<section class="section">
  <h2 class="section__title">Latest contributions</h2>
  <table class="log"><thead><tr><th>Date</th><th>Type</th><th>Description</th></tr></thead><tbody>${contributionRows(contributions.latest)}</tbody></table>
  <p><a class="more" href="contributions.html">All ${fmt(contributions.total)} contributions →</a></p>
</section>`);

  const months = contributions.items.reduce((acc, x) => {
    const key = formatDate(x.date, 'month');
    (acc[key] ||= []).push(x);
    return acc;
  }, {});
  const pager = `
  <nav class="pager" aria-label="Pagination">
    <span class="muted">Page 1 of ${contributions.pageCount}</span>
    <a href="#" aria-disabled="true" class="is-disabled">← Newer</a>
    <a href="#">Older →</a>
  </nav>`;
  const contributionsPage = layout('contributions', 'Contributions', `
<section class="lede lede--narrow">
  <p class="kicker"><a href="opensource.html">Open Source</a> / Contributions</p>
  <h1>Every contribution I could track, from ${contributions.firstYear} until today.</h1>
  <p class="dek">${c.contributionsNote}</p>
</section>
<section class="section">
  <dl class="tally">
    ${contributions.bySource.slice(0, 6).map((s) => `<div><dt>${s.label}</dt><dd>${fmt(s.count)}</dd></div>`).join('')}
  </dl>
  ${pager}
  ${Object.entries(months).map(([m, items]) => `
  <h3 class="month">${m}</h3>
  <table class="log"><tbody>${contributionRows(items)}</tbody></table>`).join('')}
  ${pager}
</section>`);

  const blog = layout('blog', 'Blog', `
<section class="lede lede--narrow">
  <p class="kicker">Blog</p>
  <h1>Notes on Mozilla, community events and Firefox, ${posts.at(-1).year}–${posts[0].year}.</h1>
</section>
<section class="feature">
  <p class="kicker">Latest · ${formatDate(posts[0].date)}</p>
  <h2><a href="post.html">${posts[0].title}</a></h2>
  <div class="feature__excerpt">${posts[0].excerptHtml}</div>
  <a class="more" href="post.html">Continue reading →</a>
</section>
<section class="section archive">
  <h2 class="section__title">Archive</h2>
  ${Object.keys(postsByYear).sort().reverse().map((y) => `
  <div class="archive__year">
    <h3>${y}</h3>
    <ol>
      ${postsByYear[y].map((p) => `<li><a href="post.html">${p.title}</a><time>${formatDate(p.date, 'short')}</time></li>`).join('')}
    </ol>
  </div>`).join('')}
</section>`);

  const post = layout('post', featuredPost.title, `
<article class="article">
  <header class="article__head">
    <p class="kicker"><a href="blog.html">Blog</a> · ${featuredPost.year}</p>
    <h1>${featuredPost.title}</h1>
    <p class="dek">${esc(featuredPost.excerptText.split('. ').slice(0, 2).join('. '))}.</p>
    <p class="byline"><img src="${profile.photo}" alt="" width="40" height="40"><span>By ${profile.name} · <time>${formatDate(featuredPost.date)}</time> · ${featuredPost.readingMinutes} min read</span></p>
  </header>
  <div class="article__body dropcap">
    ${featuredPost.bodyHtml}
  </div>
  <footer class="article__foot">
    <a href="blog.html">← All posts</a>
  </footer>
</article>`);

  const talksPage = layout('talks', 'Talks', `
<section class="lede lede--narrow">
  <p class="kicker">Talks</p>
  <h1>${talks.length} talks and workshops, ${talks.at(-1).year}–${talks[0].year}.</h1>
  <p class="dek">${c.talksTagline}</p>
</section>
<section class="section section--full">
  <div class="talk-grid">
    ${talks.map((t) => `
    <article class="talk">
      <a href="${t.url}"><img src="${t.image}" alt="" loading="lazy"></a>
      <p class="talk__meta"><time>${formatDate(t.date, 'short')}</time> · ${t.tags.join(', ')}</p>
      <h3><a href="${t.url}">${t.title}</a></h3>
      <p>${t.description}</p>
    </article>`).join('')}
  </div>
</section>`);

  const notfound = layout('notfound', 'Not found', `
<section class="lede lede--narrow notfound">
  <p class="kicker">Error 404</p>
  <h1>This page seems to have gone to press without us.</h1>
  <p class="dek">The page you’re looking for couldn’t be found. Try the <a href="index.html">CV</a>, the <a href="blog.html">blog archive</a> or the <a href="talks.html">talks</a>.</p>
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
