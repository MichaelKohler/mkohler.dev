// Shared, real content for all design proposals.
// Everything here is read from the actual site sources (_data, src/blog/posts)
// or copied from the current templates, so every proposal shows the same content.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import markdownIt from 'markdown-it';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..');
const md = markdownIt({ html: true });

// Assets are copied from public/ into exploration/assets by build.mjs, so the folder is self-contained.
export const ASSET = '../assets';
const assetUrl = (url) => url.replace(/(["(])\/images\//g, `$1${ASSET}/images/`);

export const pages = {
  cv: 'index.html',
  opensource: 'opensource.html',
  contributions: 'contributions.html',
  blog: 'blog.html',
  post: 'post.html',
  talks: 'talks.html',
  notfound: '404.html',
};

export const nav = [
  { key: 'cv', label: 'CV', href: pages.cv },
  { key: 'opensource', label: 'Open Source', href: pages.opensource },
  { key: 'blog', label: 'Blog', href: pages.blog },
  { key: 'talks', label: 'Talks', href: pages.talks },
];

export const profile = {
  name: 'Michael Kohler',
  firstName: 'Michael',
  lastName: 'Kohler',
  title: 'Lead Software Engineer',
  tagline: 'Software Engineer with a passion for Web Standards and DevOps',
  footerTagline: 'Lead Software Engineer with a passion for Web Standards and DevOps',
  photo: `${ASSET}/images/profile.webp`,
  email: 'me@michaelkohler.info',
  place: 'Berlin, Germany',
  origin: 'originally from Bern, Switzerland',
  languages: 'German, English',
  intro: [
    {
      title: 'Eager to learn',
      text: 'Even though I have more than a decade of experience with Software Engineering I’m always eager to learn more to increase my knowledge.',
    },
    {
      title: 'Motivated',
      text: 'With my volunteer work for Mozilla I’m very passionate about the Open Web and Software Engineering in general. Head over to the <a href="opensource.html">dedicated Open Source page</a> to see many of my contributions.',
    },
  ],
};

// `icon` is the codepoint in the existing Font Awesome subset (public/fonts).
export const social = [
  { label: 'Mastodon', handle: '@mkohler@chaos.social', href: 'https://chaos.social/@mkohler', icon: '&#xe800;', cls: 'fab' },
  { label: 'LinkedIn', handle: 'mkohlerdev', href: 'https://www.linkedin.com/in/mkohlerdev', icon: '&#xf30c;', cls: 'fab' },
  { label: 'RSS', handle: 'feed.xml', href: '/feed.xml', icon: '&#xf09e;', cls: 'fas' },
  { label: 'GitHub', handle: 'MichaelKohler', href: 'https://www.github.com/MichaelKohler', icon: '&#xf09b;', cls: 'fab' },
  { label: 'Email', handle: 'me@michaelkohler.info', href: 'mailto:me@michaelkohler.info', icon: '&#xf0e0;', cls: 'fas' },
  { label: 'Xing', handle: 'Michael_Kohler36', href: 'https://www.xing.com/profile/Michael_Kohler36', icon: '&#xf168;', cls: 'fab' },
];

export const skills = [
  { group: 'Programming Languages', items: ['TypeScript/JavaScript', 'HTML', 'CSS', 'Gleam', 'Rust', 'Python', 'Lua', 'Bash'] },
  { group: 'DevOps', items: ['Pipelines/Actions', 'Docker', 'Kubernetes', 'Grafana', 'Prometheus', 'GitLab', 'Ansible', 'Metrics'] },
  { group: 'Databases', items: ['PostgreSQL', 'DynamoDB', 'InfluxDB', 'MongoDB'] },
  { group: 'IoT', items: ['WebThings', 'Z-Wave', 'Device Management', 'Firmware Management', 'MQTT'] },
  { group: 'Methodologies', items: ['Scrum', 'TDD', 'Feature Flags', 'Code Quality', 'Cost Analysis', 'Monitoring', 'Observability'] },
  { group: 'Product', items: ['Requirement Engineering', 'Release Management', 'Backlog Refinement', 'Sprint Planning', 'Retros', 'Analytics'] },
  { group: 'Management', items: ['Mentoring', 'Conflict Resolution', 'Personal Development'] },
];

// Each employer can hold several roles (Klarna).
export const experience = [
  {
    company: 'Interledger Foundation', url: 'https://interledger.org/', from: '07/2026', to: 'now', start: 2026, end: null,
    roles: [{ title: 'Software Engineer', items: ['Web Monetization specification, tooling and implementation'] }],
  },
  {
    company: 'Volunteer @ Mozilla Foundation', short: 'Mozilla', url: 'https://www.mozilla.org', from: '04/2008', to: 'now', start: 2008, end: null, volunteer: true,
    note: 'Head over to the <a href="opensource.html">dedicated Open Source page</a> to see many of my contributions.',
    roles: [{
      title: 'Developer, Community Builder',
      items: [
        'Mozilla Rep from 2012 to 2023 - served on the Reps Council and was a Reps Leadership Peer',
        'Maintained the Common Voice Sentence Collector (Node.js, React, MySQL) until 2023 (now part of the platform) and maintaining Sentence Extractor (Rust)',
        'Implemented several GitHub Actions to automate processes for Common Voice',
        'Created several volunteer campaign websites to boost volunteer involvement',
        'Contributions to Firefox (Testing, Coding)',
        'Contributions to Firefox OS (Testing, Coding, Evangelism, Apps)',
        'Contributions to Webmaker (Teaching), also in combination with Firefox OS',
        'Built communities in Switzerland, Germany and Austria',
      ],
    }],
  },
  {
    company: 'Klarna Bank AB', short: 'Klarna', url: 'https://www.klarna.com/', from: '01/2021', to: '06/2026', start: 2021, end: 2026,
    roles: [
      {
        title: 'Lead Engineer, Card & Banking', stack: 'React Native, TypeScript, Node.js',
        items: [
          'Responsible for the Klarna balance top-up, withdrawal, and internal transfers experience',
          'Implementation of the frontend and backend-for-frontend for the relaunched Klarna Card (credit and debit)',
          'Improvements for the Klarna Credit Card and Klarna banking products',
        ],
      },
      {
        title: 'Engineering Manager, Card Management Experience', stack: 'React Native, TypeScript, Node.js, several AWS products including AWS Glue',
        items: [
          'Responsible for the Card overview and detail screens for the Klarna Card, such as Card Details, PIN and Settings',
          'Responsible for the Digital Wallet frontend integrations, such as Apple Pay and Google Pay provisioning flows',
          'Lead engineers from multiple teams to implement the Klarna Card Monthly Fee in one project team',
        ],
      },
      {
        title: 'Senior Engineer, Klarna Card Payment Methods / Card Management', stack: 'React Native, TypeScript, Node.js',
        items: [
          'Implementing and maintaining different Payment Methods for the Klarna Card depending on the market',
          'Improvements and expansion of the Pre-Purchase Financing offer for the Klarna Card',
          'Market expansion for the Klarna Card',
          'Leading Team Ceremonies such as refinements and retrospectives',
          'Tech Lead role on new projects, mostly for technical discovery',
          'On-boarding new members of the team',
          'Helping others with personal development and mentorship',
          'Regular knowledge sharing with other team members',
        ],
      },
    ],
  },
  {
    company: 'Control4', suffix: '(NEEO until 2019)', url: 'http://www.control4.com', from: '11/2016', to: '12/2020', start: 2016, end: 2020,
    roles: [{
      title: 'Senior Software Development Engineer',
      items: [
        'Implementation of NEEO Remote - Hub, App, Cloud (including Firmware upgrade delivery)',
        'Integration of Z-Wave devices into NEEO (including certification)',
        'Integration of the Neeo Remote into the Control4 system (Node.js)',
        'Bugfixes on the Control4 remote driver (Lua)',
        'Feature Flags implementation and Release Management processes, tools and pipelines',
        'Improvements to Automated Test Infrastructure (Python, Ansible, GitLab)',
        'Implementation of Metrics Tracking and Dashboards (Node.js, SQL, Grafana)',
        'Continuous improvement of development environment',
        'Mentoring other team members',
      ],
    }],
  },
  {
    company: 'NETCASE GmbH', url: 'http://www.netcase.ch', from: '04/2015', to: '10/2016', start: 2015, end: 2016,
    roles: [{
      title: 'Web Developer',
      items: [
        'Created several smaller websites (Vanilla JS, Sails.js)',
        'Worked on a larger product management tool (Node.js, Loopback, AngularJS)',
      ],
    }],
  },
  {
    company: 'Swisscom Banking Provider AG', suffix: '(Entris Banking AG until 2014)', url: 'http://www.swisscom.ch', from: '08/2010', to: '02/2015', start: 2010, end: 2015,
    roles: [{
      title: 'Application Developer, 2nd-Level-Support Document Output Management',
      items: [
        'Worked on a large project to migrate the core banking platform of several banks',
        'Responsible for the Document Output System used to print customer documents',
        'Improvements and adjustments to documents and wizard (C#, VBA, Office)',
        'Requirement engineering and project management for the Document Output System',
      ],
    }],
  },
];

export const openSource = {
  tagline: 'Contributing to different Open Source projects',
  mozillaIntro: [
    'I’ve always been interested in the Open Web since I started creating my first websites. Mozilla’s mission is to “ensure the Internet is a global public resource, open and accessible to all”. This resonates with me very well because a lot of my knowledge comes from research on the internet. As I have contributed to Mozilla for a long time, it deserves its own section on this page.',
    'I started to use Firefox around version 1 and never have switched since then. In the beginning I was using the release channel. After my math teacher in high school introduced us to Mozilla and what he is working on for Firefox (he wrote the initial code for Session Restore) I was hooked and started to use the nightly build and report bugs. Soon after that I wrote my first patch to improve the sorting the bookmarks backup menu. Since then I have written patches, started to bring Swiss Mozillians together, went as far as Germany and Austria to help build the German speaking community and I was also involved in the Mozilla Reps (Representative) program.',
    'These days I am not as active as I was before, though I still try to contribute where I can. These days that is mostly by using and testing Firefox as well as advocating for an open internet.',
  ],
  talksNote: 'Over the years I’ve given a few talks. You can find all of them on the <a href="talks.html">dedicated talks page</a>.',
  profiles: [
    { label: 'Bugzilla', text: 'bugzilla.mozilla.org', href: 'https://bugzilla.mozilla.org/user_profile?login=me@michaelkohler.info' },
    { label: 'Mozilla Reps', text: 'community.mozilla.org', href: 'https://community.mozilla.org/people/mkohler/' },
  ],
  areas: [
    {
      title: 'Firefox', years: '2008 - now', image: `${ASSET}/images/me_firefox.webp`, alt: 'Michael hugging the fox',
      items: [
        'Using Firefox Nightly on a daily basis to test new features and look out for regressions',
        'Filed more than <a href="https://bugzilla.mozilla.org/user_profile?login=me@michaelkohler.info">130 bugs</a>',
        'Submitted more than <a href="https://bugzilla.mozilla.org/user_profile?login=me@michaelkohler.info">250 patches</a> for several different Firefox components',
      ],
    },
    {
      title: 'Common Voice', years: '2018 - 2024', image: `${ASSET}/images/me.webp`, alt: 'Michael listening at a conference',
      items: [
        'Worked on different tooling for the <a href="https://commonvoice.mozilla.org">Common Voice</a> project mostly around sentence collections',
        'Improved and maintained the <a href="https://commonvoice.mozilla.org/sentence-collector/#/">Common Voice Sentence Collector</a> before it got integrated into the platform.',
        'Maintainer of the <a href="https://github.com/common-voice/cv-sentence-extractor">Common Voice Sentence Extractor</a>',
        'Answered questions about Common Voice in the forums',
      ],
    },
    {
      title: 'Community Building', years: '2010 - 2024', image: `${ASSET}/images/me_community_building.webp`, alt: 'Michael in front of the Brandenburger Tor with a group of Mozillians',
      items: [
        'Started with another Mozillian in Switzerland to build the <a href="https://mozilla.ch">mozilla.ch</a> community',
        'Organized (almost) monthly <a href="http://www.meetup.com/Mozilla-Meetup-Switzerland/">meetups in Zurich</a>',
        'Lead <a href="http://github.com/mozillach/participation/">Participation</a> in Switzerland',
        'In 2013, 2014 and 2015 I helped develop the German-speaking community (Germany, Austria, Switzerland)',
        'I’ve spoken about Mozilla at several conferences',
        'Organized Firefox hackathons around Switzerland to share my knowledge',
        'Hosted bi-weekly Meetups in Berlin from April 2018 to early 2020, and organizing other events',
      ],
    },
    {
      title: 'Mozilla Reps', years: '2012 - 2023', image: `${ASSET}/images/reps_group.webp`, alt: 'Michael and the rest of the Reps Council and Peers in Berlin in April 2016',
      items: [
        'Started as <a href="https://wiki.mozilla.org/Reps">Mozilla Rep</a> in 2012 and was a member of the program until its sunset in 2023',
        'Officially represented Mozilla in Switzerland and supporting Community Development',
        'Reps Mentor from 2014 onwards to coach other Mozilla Reps',
        'I was voted to be a <a href="https://wiki.mozilla.org/ReMo/Council">Reps Council</a> member from May 2015 to November 2017 to bring the Reps program to the next phase and take care of operational and strategic responsibilities of the Reps program',
        'From December 2017 in the leadership body (Module Peers) of the Reps Program',
        'Organized Mozilla’s virtual presence at FOSDEM 2022, hosting a developer room with talks.',
      ],
    },
  ],
};

export const contributionsNote = 'This report includes data sources which can be queried automatically. Of course there are many contributions which can’t be tracked automatically, so they have been omitted here. Most data sources are related to Mozilla. Most notably this doesn’t include eMails, chat messages, ad-hoc meetings or working documents that never got posted on discussion forums. There are also comments on confidential bugs, such as budget requests and Reps applications, which will not show up here.';

const allContributions = JSON.parse(fs.readFileSync(path.join(root, '_data/contributions.json'), 'utf8'));

export const sourceLabels = {
  'github-commit': 'GitHub commits',
  'github-comments': 'GitHub comments',
  'github-issues-created': 'Issues opened',
  'github-pr-created': 'Pull requests',
  'github-reviews': 'Reviews',
  'bugzilla-comments': 'Bugzilla comments',
  'bugzilla-created': 'Bugs filed',
  'discourse-posts': 'Discourse posts',
  'discourse-topics': 'Discourse topics',
  reps: 'Mozilla Reps activities',
};

const countBy = (fn) => allContributions.reduce((acc, c) => {
  const k = fn(c);
  acc[k] = (acc[k] || 0) + 1;
  return acc;
}, {});

const byYear = countBy((c) => c.createdAt.slice(0, 4));
const byYearMonth = countBy((c) => c.createdAt.slice(0, 7));
const firstYear = Number(allContributions.at(-1).createdAt.slice(0, 4));
const lastYear = Number(allContributions[0].createdAt.slice(0, 4));

export const contributions = {
  total: allContributions.length,
  perPage: 500,
  pageCount: Math.ceil(allContributions.length / 500),
  // The mockups show a slice of page 1; production keeps paginating the full list.
  items: allContributions.slice(0, 60).map((c) => ({ ...c, date: c.createdAt.slice(0, 10) })),
  latest: allContributions.slice(0, 5).map((c) => ({ ...c, date: c.createdAt.slice(0, 10) })),
  bySource: Object.entries(countBy((c) => c.source)).sort((a, b) => b[1] - a[1]).map(([key, count]) => ({ key, label: sourceLabels[key] || key, count })),
  byYear: Array.from({ length: lastYear - firstYear + 1 }, (_, i) => {
    const year = firstYear + i;
    return { year, count: byYear[year] || 0 };
  }),
  // Year × month counts for calendar heatmaps.
  byMonth: Array.from({ length: lastYear - firstYear + 1 }, (_, i) => {
    const year = firstYear + i;
    return { year, months: Array.from({ length: 12 }, (_, m) => byYearMonth[`${year}-${String(m + 1).padStart(2, '0')}`] || 0) };
  }),
  firstYear,
  lastYear,
};

// Blog posts, newest first, with the excerpt rendered like the current blog index.
const postDir = path.join(root, 'src/blog/posts');
const parsePost = (file) => {
  const raw = fs.readFileSync(path.join(postDir, file), 'utf8');
  const [, front, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta = Object.fromEntries(front.split('\n').map((l) => {
    const i = l.indexOf(':');
    return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^(['"])(.*)\1$/, '$2')];
  }));
  const [excerpt] = body.split('<!-- excerpt -->');
  const words = body.replace(/<[^>]+>|[#*_\[\]()!]/g, ' ').split(/\s+/).filter(Boolean).length;
  return {
    file,
    title: meta.title,
    date: meta.date.slice(0, 10),
    datetime: meta.date,
    year: meta.date.slice(0, 4),
    excerptHtml: assetUrl(md.render(excerpt.trim())),
    excerptText: excerpt.trim().replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_#]/g, '').replace(/<[^>]+>/g, ''),
    bodyHtml: assetUrl(md.render(body)),
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
};

export const posts = fs.readdirSync(postDir)
  .filter((f) => f.endsWith('.md'))
  .map(parsePost)
  .sort((a, b) => b.datetime.localeCompare(a.datetime));

export const postsByYear = posts.reduce((acc, p) => {
  (acc[p.year] ||= []).push(p);
  return acc;
}, {});

// The one representative blog post rendered on post.html.
export const featuredPost = posts.find((p) => p.file === 'mozilla-15-years-mozillian-common-voice.md');

export const talksTagline = 'I give talks about all Mozilla-related topics. You can find the slides and recordings here.';
export const talks = JSON.parse(fs.readFileSync(path.join(root, '_data/talks.json'), 'utf8'))
  .map((t) => ({ ...t, image: `${ASSET}${t.image}`, year: t.date.slice(0, 4) }));

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const formatDate = (iso, style = 'long') => {
  const d = new Date(`${iso.slice(0, 10)}T12:00:00Z`);
  if (style === 'short') return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  if (style === 'month') return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
};

export const yearsActive = new Date().getFullYear() - 2008;
