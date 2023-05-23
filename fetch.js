const { fetchAll } = require('volunteer-contributions-fetch');

const config = {
  outputFile: `${__dirname}/_data/contributions.json`,
  communityPortal: {
    enabled: true,
    baseUrl: 'https://community.mozilla.org/people',
    username: 'mkohler',
  },
  discourse: {
    enabled: true,
    baseUrl: 'https://discourse.mozilla.org',
    username: 'mkohler',
  },
  mediaWiki: {
    enabled: true,
    baseUrl: 'https://wiki.mozilla.org/api.php?action=feedcontributions',
    username: 'michaelkohler',
    stopDate: '2012-05-01',
  },
  github: {
    enabled: true,
    allowPrivate: true, // needed due to using fine-grained PAT
    username: 'MichaelKohler',
    stopDate: '2008-01-01',
    filter: 'mozilla|common-voice|reps|remo|sc-scripts|webmaker|firefox|activate|surprisera|fxos|foxfooding|arewetenyet|asknot|community_dashboard_participation|appday|matrix',
  },
  bugzilla: {
    enabled: true,
    baseUrl: 'https://bugzilla.mozilla.org',
    username: 'me@michaelkohler.info',
    stopDate: '2008-01-01',
  },
};

fetchAll(config);
