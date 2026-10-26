import { socialLinks, navLinks, navKey, BUILD } from '../_tools/shared.mjs';
import { meta as poster, render as renderPoster } from '../17-editorial-poster/template.mjs';

export const meta = {
  ...poster,
  name: 'Editorial, timeline header',
  title: 'Editorial with the Timeline’s header',
  summary: 'Proposal 17 with the header of the Timeline (06) instead of the poster. The CV opens on a centred navy gradient: a large round portrait, the name and role, fact chips and the social links. Inner pages get the same gradient as a shorter band, aligned with the page below. The header is set in Editorial’s Newsreader and Inter small caps, so it reads as the top of the same magazine page.',
  ideas: [
    'Everything below the header is 17: Editorial’s ledes, experience list, archive and reading layout, plus the contribution charts. This proposal imports 17’s template and only replaces the header.',
    'The header keeps 06’s structure: a transparent top bar over a navy gradient, a centred round portrait, the name and pill-shaped facts. 06’s tagline is left out, because Editorial’s lede repeats it right below. The bold sans is swapped for Newsreader light with the surname in italic, as in 17.',
    'Navigation uses Editorial’s spaced small caps; the current page gets 06’s light pill. On the CV the bar holds only the navigation, so the name isn’t repeated.',
    'Instead of 06’s timeline spine, a short fading rule closes the header and leads into the page, since Editorial has no spine.',
    'Inner pages get a shorter band with a kicker and one word (“Open Source”, “Writing”, “On stage”), left-aligned with Editorial’s lede and headline below it. Only the blog post keeps it centred, like its article head.',
    'On phones the bar stacks, centred, with the pills below the name, and the portrait shrinks; the facts wrap into a centred column.',
  ],
  darkNote: 'No, but the header is navy',
};

const words = { opensource: 'Open Source', contributions: 'Contributions', blog: 'Writing', post: 'Writing', talks: 'On stage', notfound: '404' };
const kickers = { opensource: 'Since 2008', contributions: 'Open Source · log', blog: 'Blog', post: 'Blog', talks: 'Talks', notfound: 'Not found' };

export function render(c) {
  const { profile } = c;
  const pages = renderPoster(c);

  const header = (page) => {
    // On the CV the header already sets the name, so the bar only holds the navigation.
    const bar = `
  <div class="crest__bar">
    ${page === 'cv' ? '' : `<a class="crest__me" href="index.html"><img src="${profile.photo}" alt="" width="36" height="36"><span>${profile.name}</span></a>`}
    <nav aria-label="Main">${navLinks(navKey(page), { cls: 'crest__nav' })}</nav>
  </div>`;
    if (page === 'cv') return `
<header class="crest crest--cv">${bar}
  <img class="crest__photo" src="${profile.photo}" alt="Michael Kohler in Berlin" width="320" height="320">
  <p class="crest__name">${profile.firstName} <em>${profile.lastName}</em></p>
  <p class="crest__kicker">${profile.title} · ${profile.place}</p>
  <ul class="crest__facts">
    <li><b>${profile.languages}</b> fluent</li>
    <li><a href="mailto:${profile.email}">${profile.email}</a></li>
    <li><b>${new Date().getFullYear() - 2008}</b> years with Mozilla</li>
  </ul>
  ${socialLinks({ cls: 'crest__social' })}
  <span class="crest__stem" aria-hidden="true"></span>
</header>`;
    return `
<header class="crest crest--page${page === 'post' ? ' crest--short' : ''}">${bar}
  <p class="crest__kicker">${kickers[page]}</p>
  <p class="crest__word">${words[page]}</p>
  <span class="crest__stem" aria-hidden="true"></span>
</header>`;
  };

  return Object.fromEntries(Object.entries(pages).map(([file, html]) => {
    const page = html.match(/<main class="([^"]+)">/)[1];
    return [file, html
      .replace(`<link rel="stylesheet" href="style.css?v=${BUILD}">`, `<link rel="stylesheet" href="../17-editorial-poster/style.css?v=${BUILD}">\n  <link rel="stylesheet" href="style.css?v=${BUILD}">`)
      .replace(/<header class="poster[^"]*">[\s\S]*?<\/header>/, header(page))];
  }));
}
