FROM jekyll/jekyll
Label MAINTAINER Amir Pourmand
WORKDIR /srv/jekyll
ADD Gemfile /srv/jekyll/
RUN bundle install
