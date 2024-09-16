docker run --rm -v "$(pwd):/srv/jekyll" -p "8080:8080" -it amirpourmand/al-folio:v0.10.1 /bin/sh -c "bundle install && jekyll serve --host 0.0.0.0"
