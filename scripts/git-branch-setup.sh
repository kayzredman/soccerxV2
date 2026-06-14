#!/usr/bin/env bash
set -euo pipefail

DEFAULT_REMOTE="origin"

current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)
if [ -z "$current_branch" ] || [ "$current_branch" = "HEAD" ]; then
  git checkout -b dev
fi

git checkout -B dev
git add .

git diff --cached --quiet || git commit -m "feat: scaffold SoccerX V2 web app"

git push -u "$DEFAULT_REMOTE" dev

git checkout -B main
git push -u "$DEFAULT_REMOTE" main

git checkout dev

echo "Branches pushed: dev, main"
echo "Set default branch to dev in GitHub repo settings if your Git provider does not do it automatically."
