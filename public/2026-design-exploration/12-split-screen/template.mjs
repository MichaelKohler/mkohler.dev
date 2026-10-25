import { doc, esc, fmt, socialLinks, navLinks, navKey } from '../_tools/shared.mjs';

export const meta = {
  name: 'Split Screen',
  title: 'A fixed stage on the left, the story on the right',
  summary: 'Every page is split in two. The left half is a fixed navy stage holding the one thing that page is about: the portrait on the CV, the photo of the area you are reading about on Open Source, the slide of the talk you are pointing at, the title of the post. The right half scrolls with the content, set in a sharp serif and sans pairing.',
  ideas: [
    'The stage responds to the content: on Open Source it swaps photos as you scroll through the areas, and on Talks it previews the slide of whichever talk you hover or focus.',
    'The portrait finally gets real space: half the screen on the CV, with the name set over it in a large serif.',
    'The talks page becomes a plain, scannable list of titles, because the images live on the stage instead of in 40 cards.',
    'On mobile the stage becomes a header block above the content, and the hover previews are simply skipped. Dark mode is included.',
  ],
  typography: 'Instrument Serif (display) + Instrument Sans (text)',
  dark: true,
  fit: 'Best if the photos and slides should carry more of the story, and each page should feel like a single focused spread.',
};

const FONTS = 'family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600;700';

const script = `
// Areas: swap the stage photo to match the section in view.
const shots = document.querySelectorAll('[data-shot]');
const show = (id) => shots.forEach((s) => s.classList.toggle('is-active', s.dataset.shot === id));
const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && show(e.target.dataset.area)), { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('[data-area]').forEach((el) => io.observe(el));
// Talks: preview the slide of the hovered or focused talk.
const preview = document.querySelector('.stage__preview');
document.querySelectorAll('[data-preview]').forEach((a) => {
  const swap = () => { preview.src = a.dataset.preview; preview.closest('figure').querySelector('figcaption').textContent = a.dataset.caption; };
  a.addEventListener('mouseenter', swap);
  a.addEventListener('focus', swap);
});`;

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, postsByYear, featuredPost, talks, formatDate } = c;

  const layout = (page, title, stage, main, { stageCls = '' } = {}) => doc({
    title: `${title} · ${profile.name}`,
    fonts: FONTS,
    script,
    body: `
<div class="split ${page}">
  <aside class="stage ${stageCls}">
    ${stage}
  </aside>
  <div class="side">
    <header class="top">
      <a class="top__name" href="index.html">${profile.name}</a>
      <nav aria-label="Main">${navLinks(navKey(page), { cls: 'nav' })}</nav>
    </header>
    <main>
${main}
    </main>
    <footer class="foot">
      <p>${profile.footerTagline}.</p>
      ${socialLinks({ cls: 'foot__social', labels: true })}
    </footer>
  </div>
</div>`,
  });

  const stageText = (kicker, h1, lead = '', extra = '') => `
    <div class="stage__text">
      <p class="kicker">${kicker}</p>
      <h1 class="stage__title">${h1}</h1>
      ${lead ? `<p class="stage__lead">${lead}</p>` : ''}
      ${extra}
    </div>`;

  const cv = layout('cv', 'CV', `
    <img class="stage__photo" src="${profile.photo}" alt="Michael Kohler in Berlin" width="900" height="900">
    ${stageText(`${profile.title} · ${profile.place}`, `${profile.firstName}<br><em>${profile.lastName}</em>`, `${profile.tagline}.`, socialLinks({ cls: 'stage__social' }))}`, `
<section class="intro">
  ${profile.intro.map((b) => `<div><h2 class="kicker">${b.title}</h2><p>${b.text}</p></div>`).join('')}
  <dl class="facts">
    <div><dt>Based in</dt><dd>${profile.place}</dd></div>
    <div><dt>From</dt><dd>Bern, Switzerland</dd></div>
    <div><dt>Languages</dt><dd>${profile.languages}</dd></div>
    <div><dt>Email</dt><dd><a href="mailto:${profile.email}">${profile.email}</a></dd></div>
  </dl>
</section>
<section class="sec">
  <h2 class="h2">Experience</h2>
  ${experience.map((job) => `
  <article class="job">
    <p class="job__when">${job.from} – ${job.to}</p>
    <div>
      <h3 class="h3"><a href="${job.url}">${job.company}</a>${job.volunteer ? ' <span class="badge">Volunteer</span>' : ''}</h3>
      ${job.suffix ? `<p class="muted">${job.suffix}</p>` : ''}
      ${job.note ? `<p class="muted">${job.note}</p>` : ''}
      ${job.roles.map((r) => `
      <h4>${r.title}</h4>
      ${r.stack ? `<p class="stack">${r.stack}</p>` : ''}
      <ul>${r.items.map((x) => `<li>${x}</li>`).join('')}</ul>`).join('')}
    </div>
  </article>`).join('')}
</section>
<section class="sec">
  <h2 class="h2">Skills</h2>
  <dl class="skills">${skills.map((s) => `<div><dt>${s.group}</dt><dd>${s.items.join(' · ')}</dd></div>`).join('')}</dl>
</section>`, { stageCls: 'stage--photo' });

  const table = (items) => `
  <table class="log">
    <thead><tr><th>Date</th><th>Activity</th></tr></thead>
    <tbody>${items.map((x) => `<tr><td>${x.date}</td><td>${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}<br><span class="muted">${esc(x.description)}</span></td></tr>`).join('')}</tbody>
  </table>`;

  const opensource = layout('opensource', 'Open Source', `
    <div class="stage__shots">
      ${openSource.areas.map((a, i) => `<img data-shot="${c.slug(a.title)}" class="${i === 0 ? 'is-active' : ''}" src="${a.image}" alt="" loading="lazy">`).join('')}
    </div>
    ${stageText('Open Source', `${fmt(contributions.total)}<br><em>contributions</em>`, `${openSource.tagline}, mostly Mozilla, for ${c.yearsActive} years.`)}`, `
<section class="intro intro--prose">
  ${openSource.mozillaIntro.map((p) => `<p>${p}</p>`).join('')}
  <p class="links">${openSource.profiles.map((p) => `<a class="link" href="${p.href}">${p.label} ↗</a>`).join('')}<a class="link" href="talks.html">Talks →</a></p>
</section>
${openSource.areas.map((a) => `
<section class="sec area" data-area="${c.slug(a.title)}">
  <p class="kicker">${a.years}</p>
  <h2 class="h2">${a.title}</h2>
  <img class="area__img" src="${a.image}" alt="${a.alt}" loading="lazy">
  <ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
</section>`).join('')}
<section class="sec">
  <h2 class="h2">Latest</h2>
  ${table(contributions.latest)}
  <p><a class="link" href="contributions.html">All contributions →</a></p>
</section>`);

  const contributionsPage = layout('contributions', 'Contributions', `
    ${stageText('<a href="opensource.html">Open Source</a>', 'Contri&shy;butions', `${fmt(contributions.total)} entries, ${contributions.firstYear}–${contributions.lastYear}.`, `
      <ul class="stage__list">${contributions.bySource.map((s) => `<li><span>${s.label}</span><b>${fmt(s.count)}</b></li>`).join('')}</ul>`)}`, `
<section class="intro intro--prose"><p class="muted">${c.contributionsNote}</p></section>
<section class="sec">
  <h2 class="h2">Page 1 <em>of ${contributions.pageCount}</em></h2>
  ${table(contributions.items)}
  <nav class="pager" aria-label="Pagination"><span class="muted">← Newer</span><a class="link" href="#">Older →</a></nav>
</section>`);

  const years = Object.keys(postsByYear).sort().reverse();
  const blog = layout('blog', 'Blog', `
    ${stageText('Blog', '<em>Writing</em>', `${posts.length} posts since ${posts.at(-1).year}.`, `
      <nav class="stage__years" aria-label="Years">${years.map((y) => `<a href="#y${y}">${y}<sup>${postsByYear[y].length}</sup></a>`).join('')}</nav>`)}`, `
${years.map((y) => `
<section class="sec year" id="y${y}">
  <h2 class="h2">${y}</h2>
  <ol class="entries">
    ${postsByYear[y].map((p) => `
    <li><a href="post.html"><span class="entries__title">${p.title}</span><span class="entries__meta">${formatDate(p.date, 'short')} · ${p.readingMinutes} min</span></a></li>`).join('')}
  </ol>
</section>`).join('')}`);

  const post = layout('post', featuredPost.title, `
    ${stageText(`<a href="blog.html">← Blog</a>`, featuredPost.title, `${formatDate(featuredPost.date)} · ${featuredPost.readingMinutes} min read`, `<p class="stage__byline"><img src="${profile.photo}" alt="" width="40" height="40">${profile.name}</p>`)}`, `
<article class="body">${featuredPost.bodyHtml}</article>
<p class="sec"><a class="link" href="blog.html">← All posts</a></p>`, { stageCls: 'stage--post' });

  const talksPage = layout('talks', 'Talks', `
    <figure class="stage__figure"><img class="stage__preview" src="${talks[0].image}" alt=""><figcaption>${esc(talks[0].title)}</figcaption></figure>
    ${stageText('Talks', '<em>On stage</em>', c.talksTagline)}`, `
<ol class="entries entries--talks">
  ${talks.map((t) => `
  <li><a href="${t.url}" data-preview="${t.image}" data-caption="${esc(t.title)}"><span class="entries__title">${t.title}</span><span class="entries__meta">${formatDate(t.date, 'short')} · ${t.tags.join(', ')}</span></a></li>`).join('')}
</ol>`, { stageCls: 'stage--talks' });

  const notfound = layout('notfound', 'Not found', `
    <img class="stage__photo" src="${profile.photo}" alt="" width="900" height="900">
    ${stageText('404', '<em>Lost?</em>')}`, `
<section class="intro intro--prose">
  <h2 class="h2">This page doesn’t exist.</h2>
  <p>The page you’re looking for couldn’t be found.</p>
  <p><a class="link" href="index.html">Back to the CV →</a></p>
</section>`, { stageCls: 'stage--photo' });

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
