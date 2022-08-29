#!/usr/bin/bash
# Publish to github pages on gh-pages branch
# Source: https://github.com/chrjabs/Grape-Academic-Theme/blob/master/_scripts/publish.sh
# Github Actions version: https://martinopilia.com/posts/2020/02/22/migration.html
# NOte: we might actually not need this since we have a `deploy.yml` action already!

if [ -n "$(git status --porcelain)" ]; then
  echo "Please commit all changes before publishing with this script"
  exit 1
fi

if [ ! -f "_config.yml" ]; then
  echo "Please run this script from the base project directory"
  exit 1
fi

commit_hash=$(git rev-parse HEAD)
branch=$(git rev-parse --abbrev-ref HEAD)
if [ -d "_scripts/publish.d" ]; then
  # clean existing publishing scripts 
  rm -r "/tmp/publish.d"
  # copy current publishing scripts
  cp -r "_scripts/publish.d" "/tmp/publish.d"
fi
bundle exec jekyll b -d /tmp/gh-pages-publish
git checkout gh-pages
git pull
git ls-files -z -- . ':!:.git*' | xargs -0 rm -f
cp -r /tmp/gh-pages-publish/* .
for script in "/tmp/publish.d/*"; do
  $script
done
git add .
git commit -m "publish commit ${commit_hash}"
git push
git checkout ${branch}