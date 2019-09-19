# -*- encoding: utf-8 -*-
# stub: jekyll-commonmark-ghpages 0.1.5 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-commonmark-ghpages".freeze
  s.version = "0.1.5"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Ashe Connor".freeze]
  s.date = "2018-02-12"
  s.email = "kivikakk@github.com".freeze
  s.homepage = "https://github.com/github/jekyll-commonmark-ghpages".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.0.3".freeze
  s.summary = "CommonMark generator for Jekyll".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<jekyll-commonmark>.freeze, ["~> 1"])
      s.add_runtime_dependency(%q<commonmarker>.freeze, ["~> 0.17.6"])
      s.add_runtime_dependency(%q<rouge>.freeze, ["~> 2"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_development_dependency(%q<rake>.freeze, [">= 0"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.6"])
    else
      s.add_dependency(%q<jekyll-commonmark>.freeze, ["~> 1"])
      s.add_dependency(%q<commonmarker>.freeze, ["~> 0.17.6"])
      s.add_dependency(%q<rouge>.freeze, ["~> 2"])
      s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.6"])
    end
  else
    s.add_dependency(%q<jekyll-commonmark>.freeze, ["~> 1"])
    s.add_dependency(%q<commonmarker>.freeze, ["~> 0.17.6"])
    s.add_dependency(%q<rouge>.freeze, ["~> 2"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.6"])
  end
end
