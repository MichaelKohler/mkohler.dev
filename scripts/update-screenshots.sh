#!/usr/bin/env bash
# Updates local Playwright screenshot baselines from a GitHub Actions artifact.
#
# Usage:
#   GITHUB_TOKEN=<token> ./scripts/update-screenshots.sh [run-id]
#
# If run-id is omitted, the latest failed Test run on the current branch is used.
#
# Requires: curl, jq, unzip

set -euo pipefail

REPO="MichaelKohler/mkohler.dev"
ARTIFACT_NAME="playwright-report-test"
SNAPSHOTS_DIR="tests/visual-regression.spec.js-snapshots"
PROJECTS=("chromium-desktop" "chromium-mobile" "firefox-desktop" "firefox-mobile")
TMP_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  echo "Error: GITHUB_TOKEN environment variable is required" >&2
  exit 1
fi

for cmd in curl jq unzip; do
  if ! command -v "$cmd" &>/dev/null; then
    echo "Error: '$cmd' is required but not found" >&2
    exit 1
  fi
done

api() {
  curl -fsSL \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "$@"
}

if [[ -n "${1:-}" ]]; then
  RUN_ID="$1"
  echo "Using provided run ID: $RUN_ID"
else
  BRANCH="$(git rev-parse --abbrev-ref HEAD)"
  echo "Querying latest failed Test run on branch: $BRANCH"

  RUN_ID="$(api "https://api.github.com/repos/$REPO/actions/runs?branch=$BRANCH&status=failure&per_page=10" \
    | jq -r '.workflow_runs[] | select(.name == "Test") | .id' \
    | head -1)"

  if [[ -z "$RUN_ID" ]]; then
    echo "Error: No failed Test run found for branch '$BRANCH'" >&2
    exit 1
  fi
  echo "Found run ID: $RUN_ID"
fi

echo "Fetching artifacts for run $RUN_ID..."
ARTIFACT_ID="$(api "https://api.github.com/repos/$REPO/actions/runs/$RUN_ID/artifacts" \
  | jq -r --arg name "$ARTIFACT_NAME" '.artifacts[] | select(.name == $name) | .id' \
  | head -1)"

if [[ -z "$ARTIFACT_ID" ]]; then
  echo "Error: No artifact named '$ARTIFACT_NAME' found in run $RUN_ID" >&2
  echo "Available artifacts:" >&2
  api "https://api.github.com/repos/$REPO/actions/runs/$RUN_ID/artifacts" \
    | jq -r '.artifacts[].name' >&2
  exit 1
fi

echo "Downloading artifact $ARTIFACT_ID..."
curl -fsSL \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -L "https://api.github.com/repos/$REPO/actions/artifacts/$ARTIFACT_ID/zip" \
  -o "$TMP_DIR/artifact.zip"

echo "Extracting artifact..."
unzip -q "$TMP_DIR/artifact.zip" -d "$TMP_DIR/extracted"

echo "Mapping and copying screenshots..."
UPDATED=0
SKIPPED=0

while IFS= read -r -d '' src; do
  filename="$(basename "$src")"

  # Only process actual screenshots
  if [[ "$filename" != *"-actual.png" ]]; then
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  # Strip "-actual" suffix: homepage-actual.png → homepage.png
  base="${filename%-actual.png}"

  # Determine project from parent directory name
  dir_name="$(basename "$(dirname "$src")")"
  found_project=""
  for project in "${PROJECTS[@]}"; do
    if [[ "$dir_name" == *"-${project}"* ]]; then
      found_project="$project"
      break
    fi
  done

  if [[ -z "$found_project" ]]; then
    echo "  Warning: could not determine project for $src (dir: $dir_name), skipping" >&2
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  target="$SNAPSHOTS_DIR/${base}-${found_project}.png"
  cp "$src" "$target"
  echo "  Updated: $target"
  UPDATED=$((UPDATED + 1))
done < <(find "$TMP_DIR/extracted" -name "*.png" -print0)

echo ""
echo "Done. Updated $UPDATED screenshot(s), skipped $SKIPPED file(s)."
