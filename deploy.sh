bundle exec jekyll build
gsutil -m rsync -r _site/ gs://virajm.com
