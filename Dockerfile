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
RUN apt-get install --no-install-recommends ruby-full build-essential zlib1g-dev -y
RUN apt-get install imagemagick -y

# install python3 and jupyter
RUN apt-get install python3-pip -y
RUN python3 -m pip install jupyter --break-system-packages

# clean everything
RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/
RUN pip3 cache purge

# ENV GEM_HOME='root/gems' \
#     PATH="root/gems/bin:${PATH}"

# install jekyll and dependencies
RUN gem install jekyll bundler
RUN mkdir /srv/jekyll
ADD Gemfile /srv/jekyll
WORKDIR /srv/jekyll
RUN bundle install
