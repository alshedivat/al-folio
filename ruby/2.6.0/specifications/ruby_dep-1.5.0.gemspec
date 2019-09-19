# -*- encoding: utf-8 -*-
# stub: ruby_dep 1.5.0 ruby lib

Gem::Specification.new do |s|
  s.name = "ruby_dep".freeze
  s.version = "1.5.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Cezary Baginski".freeze]
  s.bindir = "exe".freeze
  s.date = "2016-10-09"
  s.description = "Creates a version constraint of supported Rubies,suitable for a gemspec file".freeze
  s.email = ["cezary@chronomantic.net".freeze]
  s.homepage = "https://github.com/e2/ruby_dep".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(["~> 2.2".freeze, ">= 2.2.5".freeze])
  s.rubygems_version = "3.0.3".freeze
  s.summary = "Extracts supported Ruby versions from Travis file".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.12"])
    else
      s.add_dependency(%q<bundler>.freeze, ["~> 1.12"])
    end
  else
    s.add_dependency(%q<bundler>.freeze, ["~> 1.12"])
  end
end
