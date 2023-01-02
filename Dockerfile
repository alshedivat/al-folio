FROM bitnami/minideb:latest
Label MAINTAINER Amir Pourmand
RUN apt-get update -y
RUN apt-get install --no-install-recommends ruby-full build-essential zlib1g-dev -y \
    && apt-get install imagemagick -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/
ENV GEM_HOME='$HOME/gems' \
    PATH="$HOME/gems/bin:${PATH}"
RUN gem install jekyll bundler
RUN mkdir /srv/jekyll
ADD Gemfile /srv/jekyll
WORKDIR /srv/jekyll
RUN bundle install