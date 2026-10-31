// Removes duplicates from src/_data/contributions.json. The GitHub filter matches on the
// repository name, so a commit shows up once per fork or mirror that contains it.
import fs from "node:fs/promises";

const outputFile = `${import.meta.dirname}/../src/_data/contributions.json`;

const COMMIT_LINK =
  /^https:\/\/github\.com\/([^/]+)\/[^/]+\/commit\/([0-9a-f]+)/;

// Lower is better: which repository's link to keep for a commit found in several.
const ownerRank = (owner) => {
  if (/^(mozilla|common-voice)$/i.test(owner)) return 0;
  if (/^mozilla/i.test(owner)) return 1;
  if (/^michaelkohler$/i.test(owner)) return 2;
  return 3;
};

// Only commits are compared by SHA, a PR or comment is a separate contribution.
const parseCommit = ({ source, link }) => {
  const [, owner, sha] =
    (source === "github-commit" && link.match(COMMIT_LINK)) || [];
  return { owner, sha };
};

const contributions = JSON.parse(await fs.readFile(outputFile, "utf8"));

const bestCommits = new Map();
for (const contribution of contributions) {
  const { owner, sha } = parseCommit(contribution);
  if (!sha) continue;
  const best = bestCommits.get(sha);
  if (!best || ownerRank(owner) < best.rank) {
    bestCommits.set(sha, { rank: ownerRank(owner), contribution });
  }
}

const seen = new Set();
const deduped = contributions.filter((contribution) => {
  const { sha } = parseCommit(contribution);
  if (sha && bestCommits.get(sha).contribution !== contribution) return false;

  // Private commits have no link, so identical rows can still be different commits.
  if (!contribution.link) return true;

  const key = JSON.stringify(contribution);
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

await fs.writeFile(outputFile, `${JSON.stringify(deduped, null, 2)}\n`);
console.log(
  `Removed ${contributions.length - deduped.length} duplicate contributions`,
);
