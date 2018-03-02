## starting the site

1. `bundle exec jekyll build`

1. `bundle exec jekyll serve`

## copying to main site

In the al-folio folder, run:
    
    rsync -avh _site/ dario@atps.cps.unizar.es:~/public_html/
