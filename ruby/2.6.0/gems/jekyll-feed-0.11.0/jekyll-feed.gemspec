# frozen_string_literal: true

lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "jekyll-feed/version"

Gem::Specification.new do |spec|
  spec.name          = "jekyll-feed"
  spec.version       = Jekyll::Feed::VERSION
  spec.authors       = ["Ben Balter"]
  spec.email         = ["ben.balter@github.com"]
  spec.summary       = "A Jekyll plugin to generate an Atom feed of your Jekyll posts"
  spec.homepage      = "https://github.com/jekyll/jekyll-feed"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r!^bin/!) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r!^(test|spec|features)/!)
  spec.require_paths = ["lib"]

  spec.required_ruby_version = ">= 2.3.0"

  spec.add_dependency "jekyll", "~> 3.3"
  spec.add_development_dependency "bundler", "~> 1.15"
  spec.add_development_dependency "nokogiri", "~> 1.6"
  spec.add_development_dependency "rake", "~> 12.0"
  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency "rubocop", "~> 0.57.2"
  spec.add_development_dependency "typhoeus", ">= 0.7", "< 2.0"
end
