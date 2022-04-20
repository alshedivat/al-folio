docker run --rm -v "$PWD:/srv/jekyll/" -p "8080:8080" \
                    -it amirpourmand/ai-folio bundler  \
                    exec jekyll serve --watch --port=8080 --host=0.0.0.0 
