import { BUILD } from '../_tools/shared.mjs';
import { remix } from '../14-poster-remix/template.mjs';

export const meta = {
  name: 'Swiss Aurora',
  title: 'The match-off structure in a contemporary sans',
  summary: 'The same winning structure as Poster Remix (14), but drawn with the runner-ups’ style: Aurora Glass (11) came second for the first impression and won the Open Source intro, and Swiss Grid (05) came second for the blog index and mobile reading. One geometric sans (Manrope) for everything, a strict grid with hairlines, and soft navy and blue aurora gradients instead of flat navy panels. The duotone photos stay, with rounded corners.',
  ideas: [
    'The navy panels from 09 become slow aurora gradients (navy into the accent blue), so the posters keep their weight but feel less like print.',
    'Everything is set in Manrope: an extra-bold, tightly spaced display for names and section titles, and regular weight for the body, including blog posts. This is the sans alternative to 14 and 15, which use a serif for reading.',
    'Cards, KPI tiles, the contributions card and the top bar are frosted glass with a hairline border, taken from 11, on a lightly tinted page.',
    'The structure stays the same as 14: 05’s numbered sections and year numerals, 02’s filter chips, 12’s split blog page, 06’s footer, and the 13 / 01 mobile headers.',
  ],
  typography: 'Manrope (display and text)',
  dark: false,
  darkNote: 'No, but the posters are deep navy gradients',
  fit: 'For the match-off layout with a modern, product-like finish instead of print.',
};

const FONTS = 'family=Manrope:wght@400;500;600;700;800';

export function render(c) {
  return Object.fromEntries(Object.entries(remix(c, { fonts: FONTS })).map(([file, html]) => [file, html.replace(
    `<link rel="stylesheet" href="style.css?v=${BUILD}">`,
    `<link rel="stylesheet" href="../14-poster-remix/style.css?v=${BUILD}">\n  <link rel="stylesheet" href="style.css?v=${BUILD}">`,
  )]));
}
