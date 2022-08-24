const { fetchAll } = require('volunteer-contributions-fetch');

const config = {
  outputFile: `${__dirname}/_data/contributions.json`,
  communityPortal: {
    enabled: true,
    baseUrl: 'https://community.mozilla.org/people',
    username: 'mkohler',
    participationType: 'Participated in an event',
    campaignType: 'Participated in a campaign',
  },
  discourse: {
    enabled: true,
    baseUrl: 'https://discourse.mozilla.org',
    username: 'mkohler',
    topicType: 'Created Discourse Topic',
    postType: 'Posted on Discourse Topic',
  },
  wiki: {
    enabled: true,
    baseUrl: 'https://wiki.mozilla.org/api.php?action=feedcontributions',
    username: 'michaelkohler',
    editType: 'Wiki Edit',
    stopDate: '2012-05-01',
  },
  github: {
    enabled: true,
    username: 'MichaelKohler',
    stopDate: '2008-01-01',
    filter: 'mozilla|common-voice|reps|remo|sc-scripts|webmaker|firefox|activate|surprisera|fxos|foxfooding|arewetenyet|asknot|community_dashboard_participation|appday',
    types: {
      commit: 'GitHub Commit',
      privateCommit: 'Commit in private repository',
      createdPR: 'Created PR',
      createdIssue: 'Created Issue Report',
      commentedPR: 'Commented on a Pull Request',
      approvedPR: 'Approved a Pull Request',
      changesRequestedPR: 'Requested changes on a Pull Request',
      reviewedPR: 'Reviewed a Pull Request',
    }
  },
};

fetchAll(config);
