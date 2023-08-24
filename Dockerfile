FROM ruby:3.0.2

LABEL maintainer="<giangvl giangvl.cs@gmail.com>"

WORKDIR /app

# Install nodejs and, install mermaid.cli
RUN apt update
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN npm install -g mermaid.cli

# Update ruby gem
RUN gem install rubygems-update
RUN update_rubygems
RUN gem update --system

COPY Gemfile /app/

# Install dependencies
RUN bundle install

COPY . /app/

CMD bundle exec jekyll --trace serve
