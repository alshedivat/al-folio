# jekyll-docker, but with ImageMagick6 instead of ImageMagic7.

FROM jekyll/jekyll:stable

LABEL maintainer="Daniel Graziotin, daniel@ineed.coffee"

RUN apk --no-cache del imagemagick-dev \
    && apk --no-cache add imagemagick6-dev