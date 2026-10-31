// Aggregates _data/contributions.json for the charts on the Open Source and
// contributions pages: per year, per year × month and per source.
import fs from "node:fs";
import { TIME_ZONE } from "../scripts/timezone.mjs";

const contributions = JSON.parse(
  fs.readFileSync(new URL("./contributions.json", import.meta.url), "utf8"),
);

const sourceLabels = {
  "github-commit": "GitHub commits",
  "github-comments": "GitHub comments",
  "github-issues-created": "Issues opened",
  "github-pr-created": "Pull requests",
  "github-reviews": "Reviews",
  "bugzilla-comments": "Bugzilla comments",
  "bugzilla-created": "Bugs filed",
  "discourse-posts": "Discourse posts",
  "discourse-topics": "Discourse topics",
  reps: "Mozilla Reps activities",
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const format = (n) => n.toLocaleString("en-US");

// en-CA formats as YYYY-MM, which also keeps the keys sortable.
const monthFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
});
const monthOf = (c) => monthFormat.format(new Date(c.createdAt));
const yearOf = (c) => monthOf(c).slice(0, 4);

const countBy = (fn) =>
  contributions.reduce((acc, contribution) => {
    const key = fn(contribution);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

export default () => {
  if (!contributions.length) {
    return { total: 0 };
  }

  const perYear = countBy(yearOf);
  const perMonth = countBy(monthOf);
  const perSource = countBy((c) => c.source);
  const years = contributions.map((c) => Number(yearOf(c)));
  const firstYear = Math.min(...years);
  const lastYear = Math.max(...years);
  const yearRange = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, i) => firstYear + i,
  );

  const maxYear = Math.max(...yearRange.map((year) => perYear[year] || 0));
  const byYear = yearRange.map((year) => {
    const count = perYear[year] || 0;
    return {
      year,
      count,
      label: format(count),
      value: (count / maxYear).toFixed(3),
      peak: count === maxYear,
    };
  });

  // Five levels on a log scale, so quiet years stay visible next to the busiest ones.
  const maxMonth = Math.max(...Object.values(perMonth));
  const level = (count) =>
    count
      ? Math.max(
          1,
          Math.ceil((Math.log(count + 1) / Math.log(maxMonth + 1)) * 4),
        )
      : 0;
  // Months after the latest contribution haven't happened yet, so they get no cell.
  const lastMonth = contributions
    .map(monthOf)
    .reduce((a, b) => (a > b ? a : b));
  const byMonth = yearRange.map((year) => ({
    year,
    total: format(perYear[year] || 0),
    months: monthNames.map((name, i) => {
      const key = `${year}-${String(i + 1).padStart(2, "0")}`;
      if (key > lastMonth) {
        return { name, future: true };
      }
      const count = perMonth[key] || 0;
      return { name, count: format(count), level: level(count) };
    }),
  }));

  const sources = Object.entries(perSource).sort((a, b) => b[1] - a[1]);
  const bySource = sources.map(([key, count]) => ({
    label: sourceLabels[key] || key,
    count: format(count),
    value: (count / sources[0][1]).toFixed(3),
  }));

  return {
    total: format(contributions.length),
    firstYear,
    lastYear,
    byYear,
    byMonth,
    bySource,
    monthInitials: monthNames.map((name) => name[0]),
  };
};
