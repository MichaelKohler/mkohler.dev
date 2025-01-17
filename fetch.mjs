import { fetchAll } from 'volunteer-contributions-fetch';

const config = {
  outputFile: `${import.meta.dirname}/_data/contributions.json`,
  communityPortal: {
    enabled: true,
    baseUrl: 'https://community.mozilla.org/people',
    username: 'mkohler',
  },
  discourse: {
    enabled: true,
    baseUrl: 'https://discourse.mozilla.org',
    username: 'mkohler',
    keepDeletedPost: true,
  },
  github: {
    enabled: true,
    allowPrivate: true, // needed due to using fine-grained PAT
    username: 'MichaelKohler',
    stopDate: '2008-01-01',
    filter: 'mozilla|common-voice|reps|remo|sc-scripts|webmaker|firefox|activate|surprisera|fxos|foxfooding|arewetenyet|asknot|community_dashboard_participation|appday|matrix|volunteer-contributions-fetch',
  },
  bugzilla: {
    enabled: true,
    baseUrl: 'https://bugzilla.mozilla.org',
    username: 'me@michaelkohler.info',
    stopDate: '2008-01-01',
  },
  osm: {
    enabled: true,
    displayName: 'cyphix1',
    stopDate: '2024-11-01',
  }
};

fetchAll(config);
