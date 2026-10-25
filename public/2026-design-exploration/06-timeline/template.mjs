import { doc, esc, fmt, socialLinks, navLinks, navKey } from '../_tools/shared.mjs';
import { yearBars } from '../_tools/charts.mjs';

export const meta = {
  name: 'Timeline',
  title: 'Two careers, one line',
  summary: 'The story is told chronologically. A single vertical spine starts at the portrait and runs through every page. On the CV it splits into two lanes: paid work on one side, eighteen years of Mozilla volunteering on the other, so both careers can be read side by side, year by year.',
  ideas: [
    'The hero is a navy gradient with a large round portrait. The spine grows out of it and connects every section below.',
    'Two-lane CV: jobs on the left, community milestones on the right (Rep in 2012, Council in 2015, Common Voice in 2018, FOSDEM in 2022), plus the number of talks given each year.',
    'Open Source gets a small Gantt-style chart of the four areas over time. Blog posts and talks hang off the spine, grouped by year.',
    'Blog posts get a reading-progress bar and a table of contents drawn as a mini timeline. A dark theme is included.',
  ],
  typography: 'Sora (display) + Source Sans 3 (text)',
  dark: true,
  fit: 'Best if the long-term Mozilla commitment should stand next to the professional career, not hidden on a separate page.',
};

const FONTS = 'family=Sora:wght@400;600;700;800&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400';

// Community milestones, taken from the Open Source page and CV content.
const milestones = [
  { year: 2008, title: 'First Firefox contributions', text: 'Started using Nightly, reporting bugs and writing the first patch (bookmarks backup sorting).' },
  { year: 2010, title: 'Community building begins', text: 'Started the mozilla.ch community with another Mozillian, with (almost) monthly meetups in Zurich.' },
  { year: 2012, title: 'Mozilla Rep', text: 'Officially represented Mozilla in Switzerland and supported community development.' },
  { year: 2013, title: 'German-speaking community', text: 'Helped develop the community across Germany, Austria and Switzerland (2013–2015).' },
  { year: 2014, title: 'Reps Mentor', text: 'Coaching other Mozilla Reps from 2014 onwards.' },
  { year: 2015, title: 'Reps Council', text: 'Voted onto the Reps Council (May 2015 – November 2017) for operational and strategic responsibilities.' },
  { year: 2017, title: 'Reps Module Peer', text: 'Joined the leadership body of the Reps program in December 2017.' },
  { year: 2018, title: 'Common Voice & Berlin', text: 'First commit to the Sentence Collector; bi-weekly Mozilla meetups in Berlin until early 2020.' },
  { year: 2022, title: 'FOSDEM 2022', text: 'Organized Mozilla’s virtual presence at FOSDEM, hosting a developer room with talks.' },
  { year: 2023, title: 'Reps sunset · 15 years', text: 'Member of the Reps program until its sunset; still maintaining the Sentence Extractor.' },
];

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, postsByYear, featuredPost, talks, formatDate } = c;

  const layout = (page, title, main, { hero = '' } = {}) => doc({
    title: `${title} · ${profile.name}`,
    fonts: FONTS,
    bodyClass: page,
    body: `
<header class="bar">
  <a class="bar__me" href="index.html"><img src="${profile.photo}" alt="" width="36" height="36"><span>${profile.name}</span></a>
  <nav aria-label="Main">${navLinks(navKey(page), { cls: 'bar__nav' })}</nav>
</header>
${hero}
<main>
${main}
</main>
<footer class="end">
  <span class="end__dot" aria-hidden="true"></span>
  <p class="end__name">${profile.name}</p>
  <p class="end__tag">${profile.footerTagline}</p>
  ${socialLinks({ cls: 'end__social' })}
</footer>`,
  });

  const pageHero = (eyebrow, title, lead = '') => `
<section class="hero hero--page">
  <p class="eyebrow">${eyebrow}</p>
  <h1>${title}</h1>
  ${lead ? `<p class="hero__lead">${lead}</p>` : ''}
  <span class="hero__stem" aria-hidden="true"></span>
</section>`;

  // Build the two-lane rows, newest first.
  const talksPerYear = talks.reduce((acc, t) => ((acc[t.year] = (acc[t.year] || 0) + 1), acc), {});
  const jobs = experience.filter((j) => !j.volunteer);
  const years = [...new Set([...jobs.map((j) => j.start), ...milestones.map((m) => m.year), ...Object.keys(talksPerYear).map(Number)])].sort((a, b) => b - a);

  const jobCard = (job) => `
    <article class="card card--work">
      <p class="card__when">${job.from} – ${job.to}</p>
      <h3><a href="${job.url}">${job.company}</a></h3>
      ${job.suffix ? `<p class="muted">${job.suffix}</p>` : ''}
      ${job.roles.map((r) => `
      <details class="role" open>
        <summary>${r.title}</summary>
        ${r.stack ? `<p class="muted small">${r.stack}</p>` : ''}
        <ul>${r.items.map((x) => `<li>${x}</li>`).join('')}</ul>
      </details>`).join('')}
    </article>`;

  const cv = layout('cv', 'CV', `
<section class="intro">
  ${profile.intro.map((b) => `<div><h2>${b.title}</h2><p>${b.text}</p></div>`).join('')}
</section>

<section class="lanes" aria-label="Career timeline">
  <div class="lanes__head">
    <p class="lane-label lane-label--work">Work</p>
    <p class="lane-label lane-label--community">Community & Open Source</p>
  </div>
  ${years.map((y) => {
    const work = jobs.filter((j) => j.start === y);
    const comm = milestones.filter((m) => m.year === y);
    const t = talksPerYear[y];
    return `
  <div class="lanes__row">
    <div class="lanes__work">${work.map(jobCard).join('')}</div>
    <p class="lanes__year"><span>${y}</span></p>
    <div class="lanes__community">
      ${comm.map((m) => `<article class="card card--community"><h3>${m.title}</h3><p>${m.text}</p></article>`).join('')}
      ${t ? `<a class="talk-chip" href="talks.html">${t} talk${t > 1 ? 's' : ''} in ${y}</a>` : ''}
    </div>
  </div>`;
  }).join('')}
  <div class="lanes__start"><p>Started here · ${profile.origin.replace('originally from ', '')}</p></div>
</section>

<section class="print-only">${jobCard(experience.find((j) => j.volunteer))}</section>

<section class="skills">
  <h2 class="section-title">Skills</h2>
  <div class="skills__grid">
    ${skills.map((s) => `<div class="skill"><h3>${s.group}</h3><p>${s.items.join(' · ')}</p></div>`).join('')}
  </div>
</section>`, {
    hero: `
<section class="hero hero--home">
  <img class="hero__photo" src="${profile.photo}" alt="Michael Kohler in Berlin" width="320" height="320">
  <h1>${profile.name}</h1>
  <p class="hero__role">${profile.title} · ${profile.place}</p>
  <p class="hero__lead">${profile.tagline}.</p>
  <ul class="hero__facts">
    <li><b>${profile.languages}</b> fluent</li>
    <li><a href="mailto:${profile.email}">${profile.email}</a></li>
    <li><b>${new Date().getFullYear() - 2008}</b> years with Mozilla</li>
  </ul>
  <span class="hero__stem" aria-hidden="true"></span>
</section>`,
  });

  // Gantt of the four Open Source areas on a shared year axis.
  const axisFrom = 2008;
  const axisTo = new Date().getFullYear();
  const span = axisTo - axisFrom + 1;
  const areaRange = (a) => {
    const [from, to] = a.years.split(' - ');
    return { from: Number(from), to: to === 'now' ? axisTo : Number(to) };
  };
  const gantt = `
  <figure class="gantt" aria-label="Open Source areas over time">
    ${openSource.areas.map((a) => {
      const r = areaRange(a);
      return `<div class="gantt__row"><span class="gantt__label">${a.title}</span><span class="gantt__track"><span class="gantt__bar" style="--from:${(r.from - axisFrom) / span};--len:${(r.to - r.from + 1) / span}" title="${a.title}: ${a.years}">${a.years}</span></span></div>`;
    }).join('')}
    <div class="gantt__axis" aria-hidden="true"><span></span><span class="gantt__ticks">${[2008, 2012, 2016, 2020, 2024].map((y) => `<i style="--at:${(y - axisFrom) / span}">${y}</i>`).join('')}</span></div>
  </figure>`;

  const opensource = layout('opensource', 'Open Source', `
<section class="panel">
  <h2 class="section-title">Mozilla since 2008</h2>
  <div class="prose">${openSource.mozillaIntro.map((p) => `<p>${p}</p>`).join('')}<p>${openSource.talksNote}</p></div>
  ${gantt}
</section>

<section class="spine-list">
  ${openSource.areas.map((a, i) => `
  <article class="chapter ${i % 2 ? 'chapter--right' : 'chapter--left'}">
    <span class="chapter__dot" aria-hidden="true"></span>
    <div class="card chapter__card">
      <img src="${a.image}" alt="${a.alt}" loading="lazy">
      <p class="card__when">${a.years}</p>
      <h3>${a.title}</h3>
      <ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
  </article>`).join('')}
</section>

<section class="panel">
  <div class="panel__row"><h2 class="section-title">Latest contributions</h2><a href="contributions.html">All ${fmt(contributions.total)} →</a></div>
  <ol class="feed">${contributions.latest.map((x) => `<li><time>${formatDate(x.date, 'short')}</time><span>${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)} — ${esc(x.description)}</span></li>`).join('')}</ol>
  <p class="muted small">Profiles: ${openSource.profiles.map((p) => `<a href="${p.href}">${p.label}</a>`).join(' · ')}</p>
</section>`, { hero: pageHero('Open Source', `${openSource.tagline}.`, 'Firefox, Common Voice, community building and the Reps program, over almost two decades.') });

  const months = contributions.items.reduce((acc, x) => {
    const k = formatDate(x.date, 'month');
    (acc[k] ||= []).push(x);
    return acc;
  }, {});
  const contributionsPage = layout('contributions', 'Contributions', `
<section class="panel">
  <div class="panel__row"><h2 class="section-title">${fmt(contributions.total)} contributions, ${contributions.firstYear}–${contributions.lastYear}</h2></div>
  ${yearBars(contributions.byYear, { cls: 'bars' })}
  <p class="muted small">${c.contributionsNote}</p>
</section>
<section class="month-list">
  ${Object.entries(months).map(([m, items]) => `
  <div class="month">
    <p class="month__label"><span>${m}</span></p>
    <ol class="feed">${items.map((x) => `<li><time>${x.date.slice(8)}</time><span>${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)} — ${esc(x.description)}</span></li>`).join('')}</ol>
  </div>`).join('')}
  <nav class="pager" aria-label="Pagination"><span class="muted">Page 1 of ${contributions.pageCount}</span><a href="#">Earlier →</a></nav>
</section>`, { hero: pageHero('<a href="opensource.html">Open Source</a> / Contributions', 'Every tracked contribution') });

  const sides = (items, render) => items.map((item, i) => `
  <article class="chapter ${i % 2 ? 'chapter--right' : 'chapter--left'}">
    <span class="chapter__dot" aria-hidden="true"></span>
    ${render(item)}
  </article>`).join('');

  const blog = layout('blog', 'Blog', `
<section class="spine-list">
  ${Object.keys(postsByYear).sort().reverse().map((y) => `
  <p class="year-marker"><span>${y}</span></p>
  ${sides(postsByYear[y], (p) => `
    <a class="card chapter__card post-card" href="post.html">
      <p class="card__when">${formatDate(p.date)}</p>
      <h3>${p.title}</h3>
      ${p === posts[0] ? `<p>${esc(p.excerptText)}</p>` : ''}
      <p class="muted small">${p.readingMinutes} min read</p>
    </a>`)}`).join('')}
</section>`, { hero: pageHero('Blog', 'Notes along the way', `${posts.length} posts about Mozilla events, community and Firefox.`) });

  const toc = [];
  const body = featuredPost.bodyHtml.replace(/<h2>(.*?)<\/h2>/g, (_, text) => {
    const id = c.slug(text);
    toc.push({ id, text });
    return `<h2 id="${id}">${text}</h2>`;
  });
  const post = layout('post', featuredPost.title, `
<div class="progress" aria-hidden="true"></div>
<div class="article">
  <aside class="article__toc">
    <p class="eyebrow">In this post</p>
    <ol>${toc.map((t) => `<li><a href="#${t.id}">${t.text}</a></li>`).join('')}</ol>
    <a class="back" href="blog.html">← All posts</a>
  </aside>
  <article class="article__body prose">${body}</article>
</div>`, { hero: `
<section class="hero hero--page hero--post">
  <p class="eyebrow"><a href="blog.html">Blog</a> · ${formatDate(featuredPost.date)}</p>
  <h1>${featuredPost.title}</h1>
  <p class="hero__meta"><img src="${profile.photo}" alt="" width="40" height="40">${profile.name} · ${featuredPost.readingMinutes} min read</p>
  <span class="hero__stem" aria-hidden="true"></span>
</section>` });

  const talksByYear = talks.reduce((acc, t) => ((acc[t.year] ||= []).push(t), acc), {});
  const talksPage = layout('talks', 'Talks', `
<section class="spine-list">
  ${Object.keys(talksByYear).sort().reverse().map((y) => `
  <p class="year-marker"><span>${y}</span></p>
  ${sides(talksByYear[y], (t) => `
    <a class="card chapter__card talk-card" href="${t.url}">
      <img src="${t.image}" alt="" loading="lazy">
      <div>
        <p class="card__when">${formatDate(t.date)}</p>
        <h3>${t.title}</h3>
        <p class="muted small">${t.tags.join(' · ')}</p>
      </div>
    </a>`)}`).join('')}
</section>`, { hero: pageHero('Talks', `${talks.length} talks, ${talks.at(-1).year}–${talks[0].year}`, c.talksTagline) });

  const notfound = layout('notfound', 'Not found', `
<section class="lost">
  <span class="lost__gap" aria-hidden="true"></span>
  <p class="eyebrow">404</p>
  <h1>The line ends here.</h1>
  <p>The page you’re looking for couldn’t be found.</p>
  <p><a href="index.html">Back to the beginning →</a></p>
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
