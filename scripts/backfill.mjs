// One-off backfill of older GitHub contributions, e.g. after adding a new
// organization to the GitHub `filter` in config.mjs. Regular fetch runs only
// fetch contributions newer than the ones already saved.
import { backfillGitHub } from "volunteer-contributions-fetch";

import { config } from "./config.mjs";

await backfillGitHub(config, {
  orgs: ["NEEOInc", "interledger", "wicg", "tailscale"],
});
