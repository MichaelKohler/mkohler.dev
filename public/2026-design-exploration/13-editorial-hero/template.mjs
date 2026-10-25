import { socialLinks, navLinks, navKey, BUILD } from '../_tools/shared.mjs';
import { meta as editorial, render as renderEditorial } from '../01-editorial/template.mjs';

export const meta = {
  ...editorial,
  name: 'Editorial, photo header',
  title: 'Editorial on desktop, Split Screen’s photo header on mobile',
  summary: 'Proposal 01 unchanged on desktop and tablet. On phones the centred masthead gives way to the full-bleed header from Split Screen (12): the portrait fills the top of the screen, the navigation sits over it in white, and the name is set large in Newsreader at the bottom of the photo. Inner pages get a shorter photo band with the same treatment.',
  ideas: [
    'Desktop is exactly Editorial: this proposal imports its template and stylesheet and only adds a mobile header.',
    'On the CV the portrait takes about three quarters of the first screen, with a navy gradient so the white name, role and social icons stay readable.',
    'Every other page keeps the photo as a shorter band, so the person is present on every page without pushing the content too far down.',
    'The mobile navigation is always visible at the top of the photo, which fixes the cramped small-caps row of the original on phones.',
  ],
};

export function render(c) {
  const { profile } = c;
  const pages = renderEditorial(c);

  const hero = (page) => {
    const full = page === 'cv' || page === 'notfound';
    return `
<header class="mhero${full ? ' mhero--full' : ''}">
  <img class="mhero__photo" src="${profile.photo}" alt="" width="900" height="900">
  <div class="mhero__top">
    <a class="mhero__name" href="index.html">${profile.name}</a>
    <nav aria-label="Main">${navLinks(navKey(page), { cls: 'mhero__nav' })}</nav>
  </div>
  <div class="mhero__text">
    <p class="mhero__kicker">${profile.title} · ${profile.place}</p>
    ${full
      ? `<p class="mhero__title">${profile.firstName}<br><em>${profile.lastName}</em></p>${socialLinks({ cls: 'mhero__social' })}`
      : `<p class="mhero__title mhero__title--sm">${profile.firstName} <em>${profile.lastName}</em></p>`}
  </div>
</header>`;
  };

  return Object.fromEntries(Object.entries(pages).map(([file, html]) => {
    const page = html.match(/<main class="([^"]+)">/)[1];
    return [file, html
      .replace(`<link rel="stylesheet" href="style.css?v=${BUILD}">`, `<link rel="stylesheet" href="../01-editorial/style.css?v=${BUILD}">\n  <link rel="stylesheet" href="style.css?v=${BUILD}">`)
      .replace(/(<header class="masthead">[\s\S]*?<\/header>)/, (m) => `${hero(page)}\n${m}`)];
  }));
}
