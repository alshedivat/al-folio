# frozen_string_literal: true

lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "jekyll-sitemap/version"

Gem::Specification.new do |spec|
  spec.name        = "jekyll-sitemap"
  spec.summary     = "Automatically generate a sitemap.xml for your Jekyll site."
  spec.version     = Jekyll::Sitemap::VERSION
  spec.authors     = ["GitHub, Inc."]
  spec.email       = "support@github.com"
  spec.homepage    = "https://github.com/jekyll/jekyll-sitemap"
  spec.licenses    = ["MIT"]

  spec.files         = `git ls-files -z`.split("\x0")
  spec.executables   = spec.files.grep(%r!^bin/!) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r!^(test|spec|features)/!)
  spec.require_paths = ["lib"]

  spec.add_dependency "jekyll", "~> 3.3"

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "jekyll-last-modified-at", "0.3.4"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_development_dependency "rubocop", "0.51"
end
