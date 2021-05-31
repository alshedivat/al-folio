FROM ruby:2.5

ENV BUNDLER_VERSION='2.2.4'
RUN gem install bundler --no-document -v '2.2.4' 

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /hq 
VOLUME /hp 

COPY Gemfile Gemfile.lock Rakefile ./
RUN bundle install
RUN rake publish 
RUN bundle exec jekyll serve 

