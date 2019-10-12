# clear out the previous info
rm -rf _site/
rm -rf orionweller.github.io/*

# create the new files in _site/
bundle exec jekyll build
cp -r _site/* orionweller.github.io/

# update github pages site
cd orionweller.github.io/
git add .
git commit -m "updated site"
git push

# update this websitebuilder repo
cd ..
git add .
git commit -m "updated submodule and pages"
git push


