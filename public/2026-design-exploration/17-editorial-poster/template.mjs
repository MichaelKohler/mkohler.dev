import { socialLinks, navLinks, navKey, fmt, BUILD } from '../_tools/shared.mjs';
import { yearBars, monthHeatmap } from '../_tools/charts.mjs';
import { meta as editorial, render as renderEditorial } from '../01-editorial/template.mjs';

export const meta = {
  ...editorial,
  name: 'Editorial, poster header',
  title: 'Editorial with the Duotone Poster’s header',
  summary: 'Proposal 01 below the fold, with the header of the Duotone Poster (09) on top. The CV opens with a full-height navy poster: the duotone portrait on the right and the name set across it at poster size. Every other page gets a shorter navy band with one big word. The poster is set in Editorial’s Newsreader, with the surname in italic, and uses Editorial’s spaced small-caps navigation, so the header and the page below read as one design.',
  ideas: [
    'Everything below the header is 01 unchanged: the ledes, the experience list, the archive and the reading layout. This proposal imports its template and stylesheet and only replaces the masthead.',
    'The header keeps 09’s structure: the name across the full width, overlapping the duotone portrait, and the role and social links below it. The type is Newsreader instead of Anton, so the poster uses the same voice as the page under it.',
    'Inner pages get a navy band with one word (“Open Source”, “Writing”, “On stage”, “404”), set like 09’s page posters but shorter, so 01’s lede with its sentence-long headline follows quickly.',
    'Open Source and the contributions log get the charts from Bento (03) and Aurora Glass (11): contributions per year as bars, per month as a heatmap and per source as horizontal bars, drawn in Editorial’s navy and type.',
    'On phones the poster follows 09’s mobile layout: a square duotone portrait first, then the name pulled up over its bottom edge. The navigation sits at the top in white small caps.',
  ],
  typography: 'Newsreader (display and text) + Inter (labels)',
  dark: false,
  darkNote: 'No, but the header is navy',
};

const words = { opensource: 'Open Source', contributions: 'Contributions', blog: 'Writing', post: 'Writing', talks: 'On stage', notfound: '404' };
const kickers = { opensource: 'Since 2008', contributions: 'Open Source · log', blog: 'Blog', post: 'Blog', talks: 'Talks', notfound: 'Not found' };

export function render(c) {
  const { profile, contributions } = c;
  const pages = renderEditorial(c);

  // Contribution charts: year bars (03), month heatmap (11) and source bars (03 and 11).
  const maxSource = contributions.bySource[0].count;
  const activity = `
<section class="section activity">
  <h2 class="section__title">Activity</h2>
  <div class="activity__grid">
    <div class="activity__panel">
      <h3 class="label">Per year</h3>
      ${yearBars(contributions.byYear)}
    </div>
    <div class="activity__panel">
      <h3 class="label">By source</h3>
      <ul class="meters">${contributions.bySource.map((s) => `<li><span>${s.label}</span><b>${fmt(s.count)}</b><i style="--v:${(s.count / maxSource).toFixed(3)}"></i></li>`).join('')}</ul>
    </div>
    <div class="activity__panel activity__panel--wide">
      <h3 class="label">Per month, ${contributions.firstYear}–${contributions.lastYear}</h3>
      ${monthHeatmap(contributions.byMonth)}
    </div>
  </div>
</section>`;

  const header = (page) => {
    // On the CV the poster already sets the name, so the bar only holds the navigation.
    const bar = `
  <div class="poster__bar">
    ${page === 'cv' ? '' : `<a class="poster__brand" href="index.html">${profile.name}</a>`}
    <nav aria-label="Main">${navLinks(navKey(page), { cls: 'poster__nav' })}</nav>
  </div>`;
    if (page === 'cv') return `
<header class="poster poster--cv">${bar}
  <span class="duo poster__photo"><img src="${profile.photo}" alt="Michael Kohler in Berlin" width="900" height="900"></span>
  <p class="poster__name"><span>${profile.firstName}</span> <em>${profile.lastName}</em></p>
  <div class="poster__meta">
    <p class="poster__kicker">${profile.title} · ${profile.place}</p>
    ${socialLinks({ cls: 'poster__social' })}
  </div>
</header>`;
    return `
<header class="poster poster--page${page === 'post' ? ' poster--short' : ''}">${bar}
  <p class="poster__kicker">${kickers[page]}</p>
  <p class="poster__word">${words[page]}</p>
</header>`;
  };

  return Object.fromEntries(Object.entries(pages).map(([file, html]) => {
    const page = html.match(/<main class="([^"]+)">/)[1];
    return [file, html
      .replace(`<link rel="stylesheet" href="style.css?v=${BUILD}">`, `<link rel="stylesheet" href="../01-editorial/style.css?v=${BUILD}">\n  <link rel="stylesheet" href="style.css?v=${BUILD}">`)
      .replace('<section class="section">\n  <h2 class="section__title">Areas</h2>', `${activity}\n<section class="section">\n  <h2 class="section__title">Areas</h2>`)
      .replace(/<section class="section">\s*<dl class="tally">[\s\S]*?<\/dl>/, `${activity}\n<section class="section">`)
      .replace(/<header class="masthead">[\s\S]*?<\/header>/, header(page))
      // The footer keeps only the name and tagline: navigation and social links live in the header.
      .replace(/\s*<nav aria-label="Footer">[\s\S]*?<\/nav>\s*<ul class="colophon__social">[\s\S]*?<\/ul>/, '')];
  }));
}
