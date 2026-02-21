# Internal HugoBlox workflow - Updates README news section from RSS feed.
# This file only runs on the HugoBlox org repo and can be safely deleted by end users.
name: Internal - Update README News

on:
  schedule:
    - cron: 0 0 * * 0
  # Allows you to run this workflow manually from the Actions tab on GitHub.
  workflow_dispatch:

# Provide permission to clone the repo and deploy it to GitHub Pages
permissions:
  contents: write

jobs:
  update:
    if: github.repository_owner == 'HugoBlox'
    runs-on: ubuntu-latest
    steps:
      - uses: HugoBlox/gh-action-updater@v2
        with:
          feed-url: https://hugoblox.com/rss.xml
          readme-section: news
          branch: main
          github_token: ${{ secrets.GITHUB_TOKEN }}
