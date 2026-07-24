FROM mcr.microsoft.com/devcontainers/jekyll

# Fix: Remove the broken Yarn repository from the apt sources.
# This prevents 'apt-get update' from failing due to the missing GPG key.
# (Yarn is already provided by the dev container features/nvm, so this system repo is unnecessary)
# See issue #3487
RUN rm -f /etc/apt/sources.list.d/yarn.list
