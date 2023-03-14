FROM bitnami/minideb:latest
Label MAINTAINER Amir Pourmand
RUN apt-get update -y
# add locale
RUN apt-get -y install locales
# Set the locale
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

# add ruby and jekyll
RUN apt-get install --no-install-recommends ruby-full build-essential zlib1g-dev python3-pip -y
RUN apt-get install imagemagick -y
RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/
# ENV GEM_HOME='root/gems' \
#     PATH="root/gems/bin:${PATH}"
RUN gem install jekyll bundler
RUN pip3 install --upgrade jupyter
RUN pip3 cache purge
RUN mkdir /srv/jekyll
ADD Gemfile /srv/jekyll
WORKDIR /srv/jekyll
RUN bundle install