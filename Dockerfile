FROM bitnami/minideb:latest

Label MAINTAINER Amir Pourmand

RUN apt-get update -y && apt-get install -y --no-install-recommends \
    locales \ 
    imagemagick \
    ruby-full \
    build-essential \
    zlib1g-dev \
    python3-pip && rm -rf /var/lib/apt/lists/*
    

RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen

ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8 \
    JEKYLL_ENV=production 

RUN python3 -m pip install jupyter --break-system-packages --no-cache-dir

# install jekyll and dependencies
RUN gem install jekyll bundler

RUN mkdir /srv/jekyll

ADD Gemfile /srv/jekyll

WORKDIR /srv/jekyll

RUN bundle install --no-cache 
# && rm -rf /var/lib/gems/3.1.0/cache
EXPOSE 8080

CMD ["/bin/bash", "-c", "rm -f Gemfile.lock && exec jekyll serve --watch --port=8080 --host=0.0.0.0 --livereload --verbose --trace"]
