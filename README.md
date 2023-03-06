
# Set up

Install ruby:

```bash
cd $HOME
sudo apt update 
sudo apt install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libxml2-dev libxslt1-dev libcurl4-openssl-dev libffi-dev

git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(rbenv init -)"' >> ~/.zshrc
exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.zshrc
exec $SHELL

rbenv install 2.7.5
rbenv global 2.7.5
ruby -v

gem install bundler
rbenv rehash
```

Back on projects folder:
```bash

$ bundle install # install bundle gems
$ sudo apt install imagemagick php-imagick # install imagemagick
```

To serve the website:

```bash--
$ bundle exec jekyll serve
```
