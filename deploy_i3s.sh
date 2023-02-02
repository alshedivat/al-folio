bundle exec jekyll build
rsync -vcrPi --del _site/ guimard@bastion.i3s.unice.fr:/net0/www/guimard/public_html/
