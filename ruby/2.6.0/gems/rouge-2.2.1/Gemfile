source 'http://rubygems.org'

gemspec

gem 'bundler', '~> 1.15'
gem 'rake', '~> 12.0'

gem 'minitest', '~> 4.0'
gem 'wrong'

gem 'rubocop', '~> 0.49.1' if RUBY_VERSION >= '2.0.0'

# don't try to install redcarpet under jruby
gem 'redcarpet', :platforms => :ruby

group :development do
  gem 'pry'

  # docs
  gem 'yard'
  gem 'github-markup'

  # for visual tests
  gem 'sinatra'
  gem 'shotgun'
end
