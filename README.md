# EVL

## Development

- git checkout deployment
- git switch -c a-new-update  (name the branch as you like)
- edit the files or add new files
- git add [new files]
- git commit -m "a new update"
- git push origin a-new-update
- git checkout deployment
- Go on github to create a pull request to merge a-new-update into deployment
  - Github should prompt you to create a pull request
  - If not, go to the branch on github and click on the "New pull request" button
  - Select the deployment branch as the base branch
  - Check for conflicts
- Add Mike/Luc/Lance as a reviewer to merge the pull request
- Wait

## Testing

On your machine (can vary depending on OS):
- sudo bundle install
- bundle exec jekyll serve --host 0.0.0.0

## Deploy on www-new

- ssh www-new
- cd EVL-Website
- git checkout deployment
- git pull origin deployment
- ./Build
- ./Deploy
