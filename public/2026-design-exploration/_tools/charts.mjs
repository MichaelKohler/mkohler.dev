// Tiny, dependency-free charts shared by proposals that visualise contribution volume.
// Single series, single hue: bars carry the proposal's own --bar colour.
import { fmt } from './shared.mjs';

// Vertical bars per year. Hover tooltip via CSS (data-tip), peak year directly labelled,
// and a visually hidden list as the table view for assistive tech.
export const yearBars = (byYear, { cls = 'bars', label = 'Contributions per year' } = {}) => {
  const max = Math.max(...byYear.map((y) => y.count));
  const peak = byYear.find((y) => y.count === max);
  return `
<figure class="${cls}" aria-label="${label}">
  <div class="${cls}__plot" aria-hidden="true">
    ${byYear.map((y) => `<span class="${cls}__bar${y === peak ? ' is-peak' : ''}" style="--v:${(y.count / max).toFixed(3)}" data-tip="${y.year}: ${fmt(y.count)}">${y === peak ? `<b>${fmt(y.count)}</b>` : ''}</span>`).join('')}
  </div>
  <div class="${cls}__axis" aria-hidden="true"><span>${byYear[0].year}</span><span>${byYear.at(-1).year}</span></div>
  <ul class="sr-only">${byYear.map((y) => `<li>${y.year}: ${fmt(y.count)}</li>`).join('')}</ul>
</figure>`;
};

// Year × month calendar heatmap. Sequential, one hue: five levels on a log scale so
// quiet years stay visible next to 2017. Hover tooltip per cell (data-tip), a
// less→more key, and a visually hidden list of yearly totals as the table view.
export const monthHeatmap = (byMonth, { cls = 'heat', label = 'Contributions per month' } = {}) => {
  const max = Math.max(...byMonth.flatMap((y) => y.months));
  const level = (v) => (v ? Math.max(1, Math.ceil((Math.log(v + 1) / Math.log(max + 1)) * 4)) : 0);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `
<figure class="${cls}" aria-label="${label}">
  <div class="${cls}__grid" aria-hidden="true">
    <span></span>${months.map((m) => `<span class="${cls}__month">${m[0]}</span>`).join('')}
    ${byMonth.map((y) => `<span class="${cls}__year">${y.year}</span>${y.months.map((v, m) => `<span class="${cls}__cell" data-l="${level(v)}" data-tip="${months[m]} ${y.year}: ${fmt(v)}"></span>`).join('')}`).join('\n    ')}
  </div>
  <figcaption class="${cls}__key" aria-hidden="true">Less ${[0, 1, 2, 3, 4].map((l) => `<span class="${cls}__cell" data-l="${l}"></span>`).join('')} More</figcaption>
  <ul class="sr-only">${byMonth.map((y) => `<li>${y.year}: ${fmt(y.months.reduce((a, b) => a + b, 0))}</li>`).join('')}</ul>
</figure>`;
};
