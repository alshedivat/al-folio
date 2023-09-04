#!/bin/bash

CONFIG_FILE=_config.yml

/bin/bash -c "rm -f Gemfile.lock && exec jekyll serve --watch --port=8080 --host=0.0.0.0 --livereload --verbose --trace" 

inotifywait -m -e modify,move,create,delete $CONFIG_FILE | while read path action file; do

  echo "Change detected to $CONFIG_FILE, restarting Jekyll service"
  
  # Kill old Jekyll process
  jekyll_pid=$(pgrep -f jekyll)
  kill -KILL $jekyll_pid

  # Start new Jekyll process
  /bin/bash -c "rm -f Gemfile.lock && exec jekyll serve --watch --port=8080 --host=0.0.0.0 --livereload --verbose --trace"

done