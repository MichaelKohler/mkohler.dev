import type { Config } from "volunteer-contributions-fetch";

export const config: Config = {
  outputFile: `${import.meta.dirname}/../src/_data/contributions.json`,
  communityPortal: {
    enabled: false,
    baseUrl: "https://community.mozilla.org/people",
    username: "mkohler",
    tagRules: [{ tags: ["mozilla"] }],
  },
  discourse: {
    enabled: true,
    baseUrl: "https://discourse.mozilla.org",
    username: "mkohler",
    keepDeletedPost: true,
    tagRules: [{ tags: ["mozilla"] }],
  },
  github: {
    enabled: true,
    allowPrivate: true, // needed due to using fine-grained PAT
    username: "MichaelKohler",
    stopDate: "2008-01-01",
    delayMsPerRequest: 500,
    filter:
      "mozilla|common-voice|reps|remo|sc-scripts|webmaker|firefox|activate|surprisera|fxos|foxfooding|arewetenyet|asknot|community_dashboard_participation|appday|matrix|volunteer-contributions-fetch|interledger|NEEOInc|tailscale|wicg",
    tagRules: [
      {
        pattern:
          "mozilla|common-voice|reps|remo|sc-scripts|webmaker|firefox|activate|surprisera|fxos|foxfooding|arewetenyet|asknot|community_dashboard_participation|appday",
        tags: ["mozilla"],
      },
      {
        pattern: "interledger|wicg",
        tags: ["work"],
        dateRange: { startDate: "2026-07-01" },
      },
      {
        pattern: "NEEOInc",
        tags: ["work"],
        dateRange: { startDate: "2016-01-01", endDate: "2021-01-01" },
      },
    ],
  },
  bugzilla: {
    enabled: true,
    baseUrl: "https://bugzilla.mozilla.org",
    username: "me@michaelkohler.info",
    stopDate: "2008-01-01",
    tagRules: [{ tags: ["mozilla"] }],
  },
  osm: {
    enabled: false,
    displayName: "cyphix1",
    stopDate: "2024-11-01",
  },
};
