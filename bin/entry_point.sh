#!/bin/bash

CONFIG_FILE=_config.yml 
CONFIG_FILE_DEV=_config-dev.yml 

/bin/bash -c "rm -f Gemfile.lock && exec jekyll serve --config=$CONFIG_FILE,$CONFIG_FILE_DEV --watch --port=8080 --host=0.0.0.0 --livereload --verbose --trace --force_polling"&

while true; do

  inotifywait -q -e modify,move,create,delete $CONFIG_FILE

  if [ $? -eq 0 ]; then
 
    echo "Change detected to $CONFIG_FILE or $CONFIG_FILE_DEV, restarting Jekyll"

    jekyll_pid=$(pgrep -f jekyll)
    kill -KILL $jekyll_pid

    /bin/bash -c "rm -f Gemfile.lock && exec jekyll serve --config=$CONFIG_FILE,$CONFIG_FILE_DEV --watch --port=8080 --host=0.0.0.0 --livereload --verbose --trace --force_polling"&

  fi

done
