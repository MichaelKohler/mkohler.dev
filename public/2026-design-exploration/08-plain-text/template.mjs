import { doc, esc, fmt, socialLinks, navLinks, navKey } from '../_tools/shared.mjs';

export const meta = {
  name: 'Plain Text',
  title: 'A personal homepage, the old-fashioned way',
  summary: 'The quietest possible version: one narrow column, system fonts, underlined links and no decoration except one navy rule and a small round portrait. Every page is a document you read from top to bottom. It loads instantly, prints perfectly and will still look right in ten years.',
  ideas: [
    'No web fonts, no images in lists, no JavaScript. The pages are a few kilobytes of HTML and CSS, apart from the portrait.',
    'Navigation is one line of text under the name, the way personal homepages used to work, and the footer repeats it.',
    'Lists do all the work: experience, blog posts, talks and contributions are dated lists with tabular figures in the margin.',
    'Dark mode follows the system and is just a second set of five colour tokens.',
  ],
  typography: 'System UI stack, with ui-monospace for dates',
  dark: true,
  fit: 'Best if the content should carry the site and maintenance should stay close to zero.',
};

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, postsByYear, featuredPost, talks, formatDate } = c;

  const layout = (page, title, main) => doc({
    title: `${title} · ${profile.name}`,
    body: `
<div class="page">
<header class="head">
  <a class="head__me" href="index.html"><img src="${profile.photo}" alt="" width="64" height="64"></a>
  <div>
    <p class="head__name"><a href="index.html">${profile.name}</a></p>
    <nav aria-label="Main">${navLinks(navKey(page), { cls: 'nav' })}</nav>
  </div>
</header>
<main class="${page}">
${main}
</main>
<footer class="foot">
  <p>${profile.footerTagline}. ${profile.place}.</p>
  ${socialLinks({ cls: 'foot__links', labels: true })}
</footer>
</div>`,
  });

  const dated = (rows) => `<ul class="dated">${rows.map(([d, html]) => `<li><span class="date">${d}</span><span>${html}</span></li>`).join('')}</ul>`;

  const cv = layout('cv', 'CV', `
<h1>${profile.title}</h1>
<p class="lead">${profile.tagline}. Based in ${profile.place}, ${profile.origin}. I speak ${profile.languages}.</p>
${profile.intro.map((b) => `<p><strong>${b.title}.</strong> ${b.text}</p>`).join('')}
<p>Reach me at <a href="mailto:${profile.email}">${profile.email}</a>.</p>

<h2>Experience</h2>
${experience.map((job) => `
<section class="job">
  <h3><a href="${job.url}">${job.company}</a>${job.suffix ? ` <span class="muted">${job.suffix}</span>` : ''}</h3>
  <p class="date">${job.from} – ${job.to}</p>
  ${job.note ? `<p>${job.note}</p>` : ''}
  ${job.roles.map((r) => `
  <h4>${r.title}</h4>
  ${r.stack ? `<p class="muted">${r.stack}</p>` : ''}
  <ul>${r.items.map((x) => `<li>${x}</li>`).join('')}</ul>`).join('')}
</section>`).join('')}

<h2>Skills</h2>
<dl class="skills">
  ${skills.map((s) => `<dt>${s.group}</dt><dd>${s.items.join(', ')}</dd>`).join('')}
</dl>`);

  const contributionRow = (x) => [x.date, `${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}<br><span class="muted">${esc(x.description)}</span>`];

  const opensource = layout('opensource', 'Open Source', `
<h1>Open Source</h1>
<p class="lead">${openSource.tagline}, mostly Mozilla, since 2008. So far that adds up to ${fmt(contributions.total)} tracked contributions.</p>
${openSource.mozillaIntro.map((p) => `<p>${p}</p>`).join('')}
<p>Profiles: ${openSource.profiles.map((p) => `<a href="${p.href}">${p.label}</a>`).join(', ')}. ${openSource.talksNote}</p>
${openSource.areas.map((a) => `
<h2>${a.title} <span class="muted">${a.years}</span></h2>
<ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>`).join('')}
<h2>Latest contributions</h2>
${dated(contributions.latest.map(contributionRow))}
<p><a href="contributions.html">All ${fmt(contributions.total)} contributions →</a></p>`);

  const contributionsPage = layout('contributions', 'Contributions', `
<p class="crumb"><a href="opensource.html">Open Source</a> /</p>
<h1>Contributions</h1>
<p class="lead">${fmt(contributions.total)} contributions from ${contributions.firstYear} to ${contributions.lastYear}: ${contributions.bySource.map((s) => `${fmt(s.count)} ${s.label.toLowerCase()}`).join(', ')}.</p>
<p class="muted">${c.contributionsNote}</p>
<h2>Page 1 of ${contributions.pageCount}</h2>
${dated(contributions.items.map(contributionRow))}
<p class="pager"><span class="muted">← Newer</span> <a href="#">Older →</a></p>`);

  const blog = layout('blog', 'Blog', `
<h1>Blog</h1>
<p class="lead">${posts.length} posts since ${posts.at(-1).year}. Subscribe via <a href="/feed.xml">RSS</a>.</p>
${Object.keys(postsByYear).sort().reverse().map((y) => `
<h2>${y}</h2>
${dated(postsByYear[y].map((p) => [formatDate(p.date, 'short').replace(/ \d{4}$/, ''), `<a href="post.html">${p.title}</a>`]))}`).join('')}`);

  const post = layout('post', featuredPost.title, `
<article>
  <p class="crumb"><a href="blog.html">Blog</a> /</p>
  <h1>${featuredPost.title}</h1>
  <p class="date">${formatDate(featuredPost.date)} · ${featuredPost.readingMinutes} min read</p>
  <div class="body">${featuredPost.bodyHtml}</div>
</article>
<p><a href="blog.html">← All posts</a></p>`);

  const talksByYear = talks.reduce((acc, t) => ((acc[t.year] ||= []).push(t), acc), {});
  const talksPage = layout('talks', 'Talks', `
<h1>Talks</h1>
<p class="lead">${c.talksTagline}</p>
${Object.keys(talksByYear).sort().reverse().map((y) => `
<h2>${y}</h2>
${dated(talksByYear[y].map((t) => [formatDate(t.date, 'short').replace(/ \d{4}$/, ''), `<a href="${t.url}">${t.title}</a><br><span class="muted">${t.description}</span>`]))}`).join('')}`);

  const notfound = layout('notfound', 'Not found', `
<h1>Not found</h1>
<p class="lead">The page you’re looking for couldn’t be found.</p>
<p>Try the <a href="index.html">CV</a>, the <a href="blog.html">blog</a> or the <a href="talks.html">talks</a>.</p>`);

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
