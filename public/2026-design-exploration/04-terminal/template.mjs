import { doc, esc, fmt, navKey, icon } from '../_tools/shared.mjs';

export const meta = {
  name: 'Terminal',
  title: 'A home directory on the web',
  summary: 'An unapologetically developer-flavoured take. The navy turns into a terminal background, everything is set in a monospace font, and every page opens with the command that would produce it: neofetch for the CV, git log for experience and contributions, ls for the blog and talks.',
  ideas: [
    'A tmux-style tab bar replaces the header, and a status line at the bottom shows the current path and location.',
    'The CV opens with a neofetch block: the avatar on the left, key facts as “Uptime”, “Shell” and “Locale” on the right, and the navy palette as colour swatches.',
    'Experience is drawn as a git graph, with Mozilla volunteering as a long-running parallel branch next to the jobs.',
    'Contribution volume is shown as a plain-text bar chart (█), and blog posts are listed like ls -l output with reading time as the “size”.',
  ],
  typography: 'JetBrains Mono throughout',
  dark: false,
  darkNote: 'Dark by design, no light theme.',
  fit: 'Best if the site should show developer personality first and the playful tone is welcome.',
};

const FONTS = 'family=JetBrains+Mono:ital,wght@0,400;0,500;0,700;0,800;1,400';

const prompt = (cmd, path = '~') => `<p class="prompt"><span class="prompt__user">michael@berlin<span class="prompt__sep">:</span></span><span class="prompt__path">${path}</span>$ <span class="prompt__cmd">${cmd}</span></p>`;

const ym = (mmYYYY) => mmYYYY.split('/').reverse().join('-');

const bar = (value, max, width = 36) => '█'.repeat(Math.max(1, Math.round((value / max) * width)));

export function render(c) {
  const { profile, experience, skills, openSource, contributions, posts, featuredPost, talks, formatDate, social, nav } = c;
  const paths = { cv: '~', opensource: '~/opensource', contributions: '~/opensource/contributions', blog: '~/blog', post: '~/blog', talks: '~/talks', notfound: '~/???' };

  const layout = (page, title, main) => doc({
    title: `${title} · ${profile.name}`,
    fonts: FONTS,
    body: `
<header class="tabs">
  <a class="tabs__session" href="index.html">[mkohler.dev]</a>
  <nav aria-label="Main">
    <ul>
      ${nav.map((n, i) => `<li><a href="${n.href}"${n.key === navKey(page) ? ' aria-current="page"' : ''}>${i}:${n.label.toLowerCase().replace(' ', '')}${n.key === navKey(page) ? '*' : ''}</a></li>`).join('')}
    </ul>
  </nav>
  <span class="tabs__clock">${profile.place}</span>
</header>
<main class="screen ${page}">
${main}
<p class="prompt prompt--idle">${prompt('').replace(/<\/?p[^>]*>/g, '')}<span class="cursor" aria-hidden="true"></span></p>
</main>
<footer class="status">
  <span class="status__mode">NORMAL</span>
  <span class="status__path">${paths[page]}</span>
  <span class="status__fill"></span>
  <ul class="status__links">
    ${social.map((s) => `<li><a href="${s.href}" aria-label="${s.label}">${icon(s)}</a></li>`).join('')}
  </ul>
  <span class="status__enc">utf-8 · en</span>
</footer>`,
  });

  const volunteer = experience.find((j) => j.volunteer);
  const jobs = experience.filter((j) => !j.volunteer);

  const cv = layout('cv', 'CV', `
${prompt('neofetch')}
<section class="neofetch">
  <img src="${profile.photo}" alt="Michael Kohler" width="260" height="260">
  <div>
    <p class="neofetch__title"><b>michael</b>@<b>kohler</b></p>
    <p class="neofetch__rule">${'─'.repeat(22)}</p>
    <dl>
      <div><dt>Role</dt><dd>${profile.title}</dd></div>
      <div><dt>Host</dt><dd>${experience[0].company}</dd></div>
      <div><dt>Location</dt><dd>${profile.place}</dd></div>
      <div><dt>Origin</dt><dd>Bern, Switzerland</dd></div>
      <div><dt>Locale</dt><dd>${profile.languages}</dd></div>
      <div><dt>Uptime</dt><dd>${new Date().getFullYear() - 2008} years at Mozilla</dd></div>
      <div><dt>Shell</dt><dd>TypeScript, Rust, Gleam</dd></div>
      <div><dt>Mail</dt><dd><a href="mailto:${profile.email}">${profile.email}</a></dd></div>
    </dl>
    <p class="swatches" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></p>
  </div>
</section>

${prompt('cat about.md')}
<section class="block">
  <h1 class="md-h1">${profile.tagline}</h1>
  ${profile.intro.map((b) => `<h2 class="md-h2">${b.title}</h2><p>${b.text}</p>`).join('')}
</section>

${prompt('git log --graph --all experience')}
<section class="block gitlog">
  ${jobs.map((job, i) => `
  <article class="commit${i === 0 ? ' is-head' : ''}">
    <div class="commit__graph" aria-hidden="true"><span class="lane lane--main"></span><span class="lane lane--vol"></span></div>
    <div class="commit__body">
      <p class="commit__line"><span class="hash">${ym(job.from)}</span>${i === 0 ? ' <span class="ref">(HEAD -&gt; main)</span>' : ''} <a href="${job.url}">${job.company}</a>${job.suffix ? ` <span class="dim">${job.suffix}</span>` : ''}</p>
      <p class="dim">Date: ${job.from} → ${job.to}</p>
      ${job.roles.map((r) => `
      <div class="role">
        <p class="role__title">${r.title}${r.stack ? ` <span class="dim">[${r.stack}]</span>` : ''}</p>
        <ul>${r.items.map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>`).join('')}
    </div>
  </article>`).join('')}
  <article class="commit commit--branch">
    <div class="commit__graph" aria-hidden="true"><span class="lane lane--main"></span><span class="lane lane--vol is-dot"></span></div>
    <div class="commit__body">
      <p class="commit__line"><span class="hash">${ym(volunteer.from)}</span> <span class="ref ref--vol">(volunteer)</span> <a href="${volunteer.url}">${volunteer.company}</a></p>
      <p class="dim">Date: ${volunteer.from} → ${volunteer.to} · running in parallel ever since</p>
      <div class="role">
        <p class="role__title">${volunteer.roles[0].title}</p>
        <ul>${volunteer.roles[0].items.map((x) => `<li>${x}</li>`).join('')}</ul>
        <p class="dim">→ ${volunteer.note}</p>
      </div>
    </div>
  </article>
</section>

${prompt('ls skills/')}
<section class="block skills">
  ${skills.map((s) => `
  <div class="skills__dir">
    <p class="dir">${s.group.toLowerCase().replace(/\s+/g, '-')}/</p>
    <ul>${s.items.map((x) => `<li>${x}</li>`).join('')}</ul>
  </div>`).join('')}
</section>`);

  const logRows = (items) => items.map((x) => `
    <li><time>${x.date}</time> <span class="type">${x.link ? `<a href="${x.link}">${esc(x.type)}</a>` : esc(x.type)}</span> <span class="desc">${esc(x.description)}</span></li>`).join('');

  const opensource = layout('opensource', 'Open Source', `
${prompt('cat README.md', '~/opensource')}
<section class="block">
  <h1 class="md-h1">${openSource.tagline}</h1>
  <h2 class="md-h2">Mozilla</h2>
  ${openSource.mozillaIntro.map((p) => `<p>${p}</p>`).join('')}
  <p>${openSource.talksNote}</p>
</section>

${prompt('ls -l areas/', '~/opensource')}
<section class="block areas">
  ${openSource.areas.map((a) => `
  <article class="window">
    <p class="window__bar"><span>${a.title.toLowerCase().replace(/\s+/g, '-')}/</span><span class="dim">${a.years}</span></p>
    <img src="${a.image}" alt="${a.alt}" loading="lazy">
    <ul>${a.items.map((x) => `<li>${x}</li>`).join('')}</ul>
  </article>`).join('')}
</section>

${prompt('cat profiles.txt', '~/opensource')}
<section class="block">
  <ul class="kvlist">${openSource.profiles.map((p) => `<li><span class="dim">${p.label.padEnd(14, ' ')}</span><a href="${p.href}">${p.text}</a></li>`).join('')}</ul>
</section>

${prompt('git log --oneline -5', '~/opensource')}
<section class="block">
  <ol class="oneline">${logRows(contributions.latest)}</ol>
  <p><a href="contributions.html">→ git log --all (${fmt(contributions.total)} entries)</a></p>
</section>`);

  const yearMax = Math.max(...contributions.byYear.map((y) => y.count));
  const contributionsPage = layout('contributions', 'Contributions', `
${prompt('cat NOTE.txt', '~/opensource/contributions')}
<section class="block">
  <p class="dim">${c.contributionsNote}</p>
</section>

${prompt('contributions --per-year', '~/opensource/contributions')}
<section class="block">
  <figure class="ascii" aria-label="Contributions per year">
    <pre>${contributions.byYear.map((y) => `${y.year}  <span class="ascii__bar">${y.count ? bar(y.count, yearMax) : ''}</span> ${fmt(y.count)}`).join('\n')}</pre>
    <figcaption class="dim">total: ${fmt(contributions.total)} · peak: ${contributions.byYear.find((y) => y.count === yearMax).year}</figcaption>
  </figure>
</section>

${prompt('git log --oneline | less', '~/opensource/contributions')}
<section class="block">
  <ol class="oneline">${logRows(contributions.items)}</ol>
  <p class="more"><span class="inverse">-- More -- (page 1/${contributions.pageCount})</span> <a href="#">[n]ext page</a> <span class="dim">[p]revious</span></p>
</section>`);

  const blog = layout('blog', 'Blog', `
${prompt('ls -lt blog/', '~')}
<section class="block">
  <p class="dim">total ${posts.length}</p>
  <ol class="ls">
    ${posts.map((p) => `
    <li><span class="perm dim">-rw-r--r--</span> <span class="size">${String(p.readingMinutes).padStart(2, ' ')}min</span> <time>${p.date}</time> <a href="post.html">${p.title}</a></li>`).join('')}
  </ol>
</section>
${prompt(`head -n 5 ${c.slug(posts[0].title)}.md`, '~/blog')}
<section class="block">
  <p class="md-h2">${posts[0].title}</p>
  <p>${esc(posts[0].excerptText)}</p>
  <p><a href="post.html">→ less ${c.slug(posts[0].title)}.md</a></p>
</section>`);

  const post = layout('post', featuredPost.title, `
${prompt(`less ${c.slug(featuredPost.title)}.md`, '~/blog')}
<article class="block article">
  <p class="dim">---<br>title: ${featuredPost.title}<br>date: ${featuredPost.datetime}<br>author: ${profile.name}<br>reading_time: ${featuredPost.readingMinutes} min<br>---</p>
  <h1 class="md-h1">${featuredPost.title}</h1>
  <div class="prose">${featuredPost.bodyHtml}</div>
  <p class="more"><span class="inverse">(END)</span> <a href="blog.html">[q] back to ~/blog</a></p>
</article>`);

  const talksPage = layout('talks', 'Talks', `
${prompt('cat README.md', '~/talks')}
<section class="block"><p>${c.talksTagline}</p></section>
${prompt('ls --thumbnails talks/', '~/talks')}
<section class="block talks">
  ${talks.map((t) => `
  <a class="window talk" href="${t.url}">
    <p class="window__bar"><span>${t.date}</span><span class="dim">${t.tags.map((g) => `#${g.toLowerCase().replace(/\s+/g, '-')}`).join(' ')}</span></p>
    <img src="${t.image}" alt="" loading="lazy">
    <p class="talk__title">${t.title}</p>
    <p class="dim">${t.description}</p>
  </a>`).join('')}
</section>`);

  const notfound = layout('notfound', 'Not found', `
${prompt('cd ./this-page')}
<section class="block notfound">
  <p><span class="err">bash: cd: ./this-page: No such file or directory</span></p>
  <p class="dim">The page you’re looking for couldn’t be found. Did you mean one of these?</p>
  <ul class="kvlist">${nav.map((n) => `<li><a href="${n.href}">cd ~/${n.label.toLowerCase().replace(' ', '')}</a></li>`).join('')}</ul>
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
