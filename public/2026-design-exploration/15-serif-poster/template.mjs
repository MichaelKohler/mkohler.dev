import { BUILD } from '../_tools/shared.mjs';
import { remix } from '../14-poster-remix/template.mjs';

export const meta = {
  name: 'Serif Poster',
  title: 'The match-off structure, set like a magazine',
  summary: 'The same winning structure as Poster Remix (14), but typeset entirely in Newsreader, the face that won reading on desktop and on phones. The posters keep their scale but turn into large serif titles with the surname in italic, as in the 13 mobile header that won. Photos stay in full colour under a navy gradient, and the page alternates between paper and a soft blue tint instead of solid navy, so it reads calmer and more literary.',
  ideas: [
    'One typeface family across the whole site: Newsreader for every heading, Inter only for labels, numbers and the navigation.',
    'The CV hero is 09’s layout (name across the full width, overlapping the portrait), with “Michael” set upright and “Kohler” in italic, like 13’s mobile header.',
    'Photos keep their colour. A navy gradient, not a duotone, keeps text readable, and the talk thumbnails stay as they are.',
    'Navy is kept for the hero, the blog stage, the top bar and the footer. Skills and the Open Source areas sit on a pale tint, so long pages feel lighter than in 14.',
  ],
  typography: 'Newsreader (display and text) + Inter (interface)',
  dark: false,
  darkNote: 'No, it is a light, print-like design',
  fit: 'For the match-off layout with Editorial’s calmer, more literary tone.',
};

const FONTS = 'family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400';

export function render(c) {
  return Object.fromEntries(Object.entries(remix(c, { fonts: FONTS })).map(([file, html]) => [file, html.replace(
    `<link rel="stylesheet" href="style.css?v=${BUILD}">`,
    `<link rel="stylesheet" href="../14-poster-remix/style.css?v=${BUILD}">\n  <link rel="stylesheet" href="style.css?v=${BUILD}">`,
  )]));
}
