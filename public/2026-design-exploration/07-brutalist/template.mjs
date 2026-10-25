import { doc, esc, fmt, socialLinks, navLinks, navKey } from '../_tools/shared.mjs';

export const meta = {
  name: 'Neo-Brutalist',
  title: 'Thick lines, hard shadows, loud and friendly',
  summary: 'Everything sits in a box with a thick navy outline and a hard offset shadow, like stickers on a laptop lid. Type is a quirky grotesk at big sizes, the portrait is a tilted sticker, and skills, tags and sources become chunky labels. It keeps the two navy tones but uses them as flat fills instead of gradients.',
  ideas: [
    'One visual rule, used everywhere: 3px navy border plus a 6px hard shadow. Hovering a link presses it down into its shadow.',
    'The CV opens with a “sticker sheet”: the portrait, a name plate, and the tagline as a speech-bubble card.',
    'Experience is a stack of index-card boxes, each with the year range as a tab sticking out at the top.',
    'Talks and posts are equal cards in a grid with a coloured tag strip, so the 40 talks and 40 posts feel like a collection.',
  ],
  typography: 'Space Grotesk (display and text) + Space Mono (labels, dates)',
  dark: false,
  fit: 'Best if the site should feel playful and personal, and stand out from typical developer CV sites.',
};

const FONTS = 'family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700';

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, featuredPost, talks, formatDate } = c;

  const layout = (page, title, main) => doc({
    title: `${title} · ${profile.name}`,
    fonts: FONTS,
    body: `
<header class="top">
  <a class="plate" href="index.html"><img src="${profile.photo}" alt="" width="44" height="44"><span>${profile.name}</span></a>
  <nav aria-label="Main">${navLinks(navKey(page), { cls: 'nav' })}</nav>
</header>
<main class="wrap ${page}">
${main}
</main>
<footer class="foot">
  <div class="wrap foot__inner">
    <p class="foot__tag">${profile.footerTagline}.</p>
    ${socialLinks({ cls: 'foot__social', labels: true })}
  </div>
</footer>`,
  });

  const hero = (kicker, h1, lead = '') => `
<section class="pagehead">
  <p class="tag">${kicker}</p>
  <h1>${h1}</h1>
  ${lead ? `<p class="pagehead__lead box">${lead}</p>` : ''}
</section>`;

  const cv = layout('cv', 'CV', `
<section class="sheet">
  <figure class="sheet__photo box"><img src="${profile.photo}" alt="Michael Kohler in Berlin" width="420" height="420"></figure>
  <div class="sheet__name box box--navy">
    <p class="tag tag--light">Hello, I’m</p>
    <h1>${profile.name}</h1>
    <p class="sheet__role">${profile.title}</p>
  </div>
  <p class="sheet__bubble box">${profile.tagline}.</p>
  <ul class="sheet__facts">
    <li class="box box--sm"><span class="mono">Based in</span>${profile.place}</li>
    <li class="box box--sm"><span class="mono">From</span>Bern, Switzerland</li>
    <li class="box box--sm"><span class="mono">Speaks</span>${profile.languages}</li>
    <li class="box box--sm"><a href="mailto:${profile.email}"><span class="mono">Say hi</span>${profile.email}</a></li>
  </ul>
</section>

<section class="intro">
  ${profile.intro.map((b) => `<div class="box"><h2 class="h3">${b.title}</h2><p>${b.text}</p></div>`).join('')}
</section>

<section class="block">
  <h2 class="h2">Experience</h2>
  <div class="jobs">
    ${experience.map((job) => `
    <article class="job box${job.volunteer ? ' job--volunteer' : ''}">
      <p class="job__tab mono">${job.from} → ${job.to}</p>
      <h3 class="h3"><a href="${job.url}">${job.company}</a> ${job.suffix ? `<small>${job.suffix}</small>` : ''}</h3>
      ${job.note ? `<p class="muted">${job.note}</p>` : ''}
      ${job.roles.map((r) => `
      <div class="role">
        <p class="role__title">${r.title}</p>
        ${r.stack ? `<p class="mono role__stack">${r.stack}</p>` : ''}
        <ul>${r.items.map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>`).join('')}
    </article>`).join('')}
  </div>
</section>

<section class="block">
  <h2 class="h2">Skills</h2>
  <div class="skills">
    ${skills.map((s, i) => `
    <div class="skill box">
      <h3 class="h3">${s.group}</h3>
      <ul class="stickers">${s.items.map((x, j) => `<li class="sticker" style="--r:${(((i + j) % 5) - 2) * 1.2}deg">${x}</li>`).join('')}</ul>
    </div>`).join('')}
  </div>
</section>`);

  const table = (items) => `
  <div class="table box">
    <table>
      <thead><tr><th>Date</th><th>Source</th><th>What</th></tr></thead>
      <tbody>${items.map((x) => `<tr><td class="mono">${x.date}</td><td><span class="sticker sticker--src">${esc(c.sourceLabels[x.source] || x.source)}</span></td><td>${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}<br><span class="muted">${esc(x.description)}</span></td></tr>`).join('')}</tbody>
    </table>
  </div>`;

  const opensource = layout('opensource', 'Open Source', `
${hero('Open Source', `${openSource.tagline}.`)}
<section class="stats">
  <p class="stat box box--navy"><b>${fmt(contributions.total)}</b><span>tracked contributions</span></p>
  <p class="stat box"><b>${c.yearsActive}</b><span>years with Mozilla</span></p>
  <p class="stat box"><b>250+</b><span>Firefox patches</span></p>
  <p class="stat box"><b>${talks.length}</b><span><a href="talks.html">talks</a></span></p>
</section>
<section class="block prose box">
  <h2 class="h2">Mozilla</h2>
  ${openSource.mozillaIntro.map((p) => `<p>${p}</p>`).join('')}
  <p class="links">${openSource.profiles.map((p) => `<a class="btn" href="${p.href}">${p.label} ↗</a>`).join('')}<a class="btn" href="talks.html">Talks →</a></p>
</section>
<section class="block">
  <h2 class="h2">What I worked on</h2>
  <div class="areas">
    ${openSource.areas.map((a) => `
    <article class="area box">
      <img src="${a.image}" alt="${a.alt}" loading="lazy">
      <div class="area__body">
        <p class="tag">${a.years}</p>
        <h3 class="h3">${a.title}</h3>
        <ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>
    </article>`).join('')}
  </div>
</section>
<section class="block">
  <h2 class="h2">Latest contributions</h2>
  ${table(contributions.latest)}
  <p><a class="btn btn--navy" href="contributions.html">See all ${fmt(contributions.total)} →</a></p>
</section>`);

  const contributionsPage = layout('contributions', 'Contributions', `
${hero('<a href="opensource.html">Open Source</a> / Contributions', 'Contributions', c.contributionsNote)}
<ul class="sources">
  ${contributions.bySource.map((s) => `<li class="box box--sm"><b>${fmt(s.count)}</b> ${s.label}</li>`).join('')}
</ul>
${table(contributions.items)}
<nav class="pager" aria-label="Pagination">
  <span class="btn is-disabled">← Newer</span>
  <span class="mono">Page 1 of ${contributions.pageCount}</span>
  <a class="btn btn--navy" href="#">Older →</a>
</nav>`);

  const blog = layout('blog', 'Blog', `
${hero('Blog', 'Things I wrote down', `${posts.length} posts about Mozilla, Common Voice, Firefox and the odd tech topic.`)}
<section class="cards">
  ${posts.map((p, i) => `
  <a class="card box${i === 0 ? ' card--big box--navy' : ''}" href="post.html">
    <p class="mono card__date">${formatDate(p.date, 'short')}</p>
    <h2 class="h3">${p.title}</h2>
    ${i < 7 ? `<p class="card__excerpt">${esc(p.excerptText.slice(0, 180))}${p.excerptText.length > 180 ? '…' : ''}</p>` : ''}
    <span class="card__more">Read · ${p.readingMinutes} min</span>
  </a>`).join('')}
</section>`);

  const post = layout('post', featuredPost.title, `
<article class="article">
  <header class="pagehead">
    <p class="tag"><a href="blog.html">Blog</a> / ${formatDate(featuredPost.date)}</p>
    <h1>${featuredPost.title}</h1>
    <p class="mono">${featuredPost.readingMinutes} min read · by ${profile.name}</p>
  </header>
  <div class="article__body box">${featuredPost.bodyHtml}</div>
  <p class="article__back"><a class="btn" href="blog.html">← All posts</a></p>
</article>`);

  const talksPage = layout('talks', 'Talks', `
${hero('Talks', 'On stage', c.talksTagline)}
<section class="cards cards--talks">
  ${talks.map((t) => `
  <a class="talk box" href="${t.url}">
    <img src="${t.image}" alt="" loading="lazy">
    <div class="talk__body">
      <p class="mono card__date">${t.date}</p>
      <h2 class="h3">${t.title}</h2>
      <ul class="stickers">${t.tags.map((x) => `<li class="sticker">${x}</li>`).join('')}</ul>
    </div>
  </a>`).join('')}
</section>`);

  const notfound = layout('notfound', 'Not found', `
<section class="lost">
  <p class="lost__code box box--navy">404</p>
  <div class="lost__text box">
    <h1 class="h2">This page fell off the laptop lid.</h1>
    <p>The page you’re looking for couldn’t be found.</p>
    <p><a class="btn btn--navy" href="index.html">Back to the CV →</a></p>
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
