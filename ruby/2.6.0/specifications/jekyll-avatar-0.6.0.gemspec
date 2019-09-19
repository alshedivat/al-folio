# -*- encoding: utf-8 -*-
# stub: jekyll-avatar 0.6.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-avatar".freeze
  s.version = "0.6.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Ben Balter".freeze]
  s.date = "2018-04-03"
  s.email = ["ben.balter@github.com".freeze]
  s.homepage = "https://github.com/benbalter/jekyll-avatar".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.0.3".freeze
  s.summary = "A Jekyll plugin for rendering GitHub avatars".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<jekyll>.freeze, ["~> 3.0"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.11"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_development_dependency(%q<rspec-html-matchers>.freeze, ["~> 0.9"])
      s.add_development_dependency(%q<rubocop>.freeze, ["~> 0.50", "< 0.53"])
    else
      s.add_dependency(%q<jekyll>.freeze, ["~> 3.0"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.11"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_dependency(%q<rspec-html-matchers>.freeze, ["~> 0.9"])
      s.add_dependency(%q<rubocop>.freeze, ["~> 0.50", "< 0.53"])
    end
  else
    s.add_dependency(%q<jekyll>.freeze, ["~> 3.0"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.11"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_dependency(%q<rspec-html-matchers>.freeze, ["~> 0.9"])
    s.add_dependency(%q<rubocop>.freeze, ["~> 0.50", "< 0.53"])
  end
end
