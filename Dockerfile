FROM jekyll/jekyll
MAINTAINER Amir Pourmand
WORKDIR /srv/jekyll
ADD Gemfile /srv/jekyll/
RUN bundle install
