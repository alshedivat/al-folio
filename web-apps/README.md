# web-apps

This directory is a copy of [yoonholee/web-apps](https://github.com/yoonholee/web-apps), served at [yoonholee.com/web-apps](https://yoonholee.com/web-apps/).

To update, sync from the source repo:

```bash
rsync -av --delete \
  --exclude='.git' --exclude='agent_notes' --exclude='.claude' \
  --exclude='.DS_Store' --exclude='.pre-commit-config.yaml' \
  --exclude='CLAUDE.md' --exclude='README.md' \
  --exclude='notes_html.py' --exclude='delay-extension' \
  ~/repos/web-apps/ ~/repos/yoonholee.github.io/web-apps/
```
