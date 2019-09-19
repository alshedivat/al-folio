# RubyDep

[![Gem Version](https://img.shields.io/gem/v/ruby_dep.svg?style=flat)](https://rubygems.org/gems/ruby_dep) [![Build Status](https://travis-ci.org/e2/ruby_dep.svg)](https://travis-ci.org/e2/ruby_dep)

Avoid incompatible, slower, buggier and insecure Ruby versions.

## IMPORTANT!! : HOW TO CORRECTLY SOLVE ISSUES

If you're here because you're having issues, try the following:

## 1. Upgrade Ruby.

Ideally to the latest stable possible. It may be a little (or very!) inconvenient, but it helps everyone in the long run. 

Show the awesome Ruby Core Team your support for their work by letting them focus on newer and better Rubies.

## 2. Upgrade Ruby anyway.

If you can't upgrade Ruby because of the environment, work out how to do so anyway.

E.g. if you can't install Ruby 2.2.5 on OSX due to RVM issues (even though Ruby 2.2.5 has been released over 5 months ago), then obviously the RVM project may need help or support of some kind. Help the RVM maintainers out - they're awesome! Or, fork the project and heroically take things into your own hands.

If Apple (or Amazon or whatever hosting service or company) doesn't provide the latest recommended, supported version of Ruby, use Homebrew (or build from sources) or complain to those companies to provide support. It's unfair for them to prevent users from getting better/faster Rubies.

## 3. Upgrade Bundler (but even the most recent Bundler may not be enough!)

Upgrade to a Bundler version that can automatically downgrade the gems for you. If that doesn't help, try this workaround: https://github.com/guard/listen/wiki/Ruby-version-requirements

Work on this "downgrading" feature in Bundler is ongoing, so the best version of Bundler for the job may still be an unreleased version (beta, release candidate, etc.). 

Help the Bundler team out if you can - they're awesome!

## 4. If all else fails, learn SemVer and USE IT!

Often, there are older versions of gems that support the Ruby version you need. See http://semver.org/ on how to set version constraints. Then, check out the release notes of the gems you need to know what you're getting (or missing out on).

E.g. You can downgrade to RubyDep 1.3.1 (`gem 'ruby_dep', '~> 1.3.1'`) which allows using Ruby 2.2.4
E.g. Or, You can use Listen 3.0.x (`gem 'listen', '~> 3.0.8'`) to avoid dealing with RubyDep and Listen.

If those gem versions are lacking for any reason (e.g. bugs in Listen 3.0.x fixed in 3.1.x), then e.g. open a request for backporting changes to the 3.0.x branch.

The idea: if you don't need the latest Ruby ... then you probably don't need the latest of every gem either.

## 5. If all that isn't possible or it doesn't work ...

Let me know about it (open an issue), because I'm likely confused about how all the above steps failed.

Or it's a bug I don't know about. Please report it - just in case...


## Description

RubyDep does 2 things right now:

1. Helps end users avoid incompatible, buggy and insecure Ruby versions.
2. Helps gem owners manage their gem's `required_ruby_version` gemspec field based on `.travis.yml`.

## Quick info

- if you want to know how to disable the warnings, see here: https://github.com/e2/ruby_dep/wiki/Disabling-warnings
- for a list of Ruby versions that can be used to install ruby_dep, see here: https://travis-ci.org/e2/ruby_dep
- if your version of Ruby is not supported, open a new issue and explain your situation/problem
- when in doubt, open a new issue or [read the FAQ on the Wiki](https://github.com/e2/ruby_dep/wiki/FAQ).
- gems using RubyDep are designed to not be installable on a given Ruby version, unless it's specifically declared supported by those gems - but it's ok to ask for supporting your Ruby if you're stuck on an older version (for whatever reason)
- discussions about Ruby versions can get complex and frustrating - please be patient and constructive, and open-minded about solutions - especially if you're having problems


## Supported Ruby versions:

NOTE: RubyDep uses it's own approach on itself. This means it can only be installed on Ruby versions tested here: [check out the Travis build status](https://travis-ci.org/e2/ruby_dep). If you need support for an different/older version of Ruby, open an issue with "backport" in the title and provide a compelling case for supporting the version of Ruby you need. 

## Problem 1: "Which version of Ruby does your project support?"

Your gem shouldn't (and likely doesn't) support all possible Ruby versions.

So you have to tell users which versions your gem supports.

But, there are at least 3 places where you list the Rubies you support:

1. Your gemspec
2. Your README
3. Your .travis.yml file
 
That breaks the principle of single responsibility.

Is it possible to just list the supported Rubies in just one place?

Yes. That's what RubyDep helps with.

## Solution to problem 1

Since Travis doesn't allow generated `.travis.yml` files, option 3 is the only choice.

With RubyDep, your gemspec's `required_ruby_version` can be automatically set based on which Rubies you test your gem on.

What about the README? Well, just insert a link to your Travis build status page!

Example: do you want to know which Ruby versions RubyDep can be installed on? Just look here: https://travis-ci.org/e2/ruby_dep

If you're running Travis builds on a Ruby you support (and it's not in the "allow failures" section), it means you support that version of Ruby, right?

RubyDep intelligently creates a version constraint to encompass Rubies listed in your `.travis.yml`.

## Usage (to solve Problem 1)

### E.g. in your gemspec file:

```ruby
  begin
    require "ruby_dep/travis"
    s.required_ruby_version = RubyDep::Travis.new.version_constraint
  rescue LoadError
    abort "Install 'ruby_dep' gem before building this gem"
  end

  s.add_development_dependency 'ruby_dep', '~> 1.1'
```

### In your `README.md`:

Replace your mentions of "supported Ruby versions" and just insert a link to your Travis build status page.

If users see their Ruby version "green" on Travis, they'll see those are the versions you support and test, right?

(Or, you can link to your project's rubygems.org page where the required Ruby version is listed).

### In your `.travis.yml`:

To add a "supported Ruby", simply add it to the Travis build. 

To test a Ruby version, but not treat it as "supported", simply add that version to the `allowed_failures` section.


## Problem 2: Users don't know they're using an obsolete/buggy/insecure version of Ruby

Users don't track news updates on https://ruby-lang.org, so they may not know their ruby has known bugs or even serious security vulnerabilities.

And sometimes, that outdated/insecure Ruby is bundled by their operation system to begin with!

## The solution to problem 2

RubyDep has a small "database" of Ruby versions with information about which are buggy and insecure.

If you like, your gem can use RubyDep to show those warnings - to encourage users to upgrade and protect them from nasty bugs or bad security holes.

This way, when most of the Ruby community has switched to newer versions, everyone can be more productive by having faster, more stable and more feature-rich tools. And less time will be wasted supporting obsolete versions that users simply don't know are worth upgrading.

This also helps users understand that they should nudge their hosting providers, managers and package maintainers to provided up-to-date versions of Ruby to that everyone can benefit.

### Usage (to solve Problem 2)

In your gemspec:

```ruby
s.add_runtime_dependency 'ruby_dep', '~> 1.1'
```

Somewhere in your library: 

```ruby
require 'ruby_dep/warnings'
RubyDep::Warning.show_warnings
ENV['RUBY_DEP_GEM_SILENCE_WARNINGS'] = '1' # to ignore repeating the warning if other gems use `ruby_dep` too
```

That way, as soon as there's a severe vulnerability discovered in Ruby (and RubyDep is updated), users will be notified quickly.


## Tips

1. To disable warnings, just set the following environment variable: `RUBY_DEP_GEM_SILENCE_WARNINGS=1`
2. If you want to support a newer version of Ruby, just add it to your `.travis.yml` (e.g. ruby-2.3.1)
3. To support an earlier version of Ruby, add it to your `.travis.yml` and release a new gem version.
4. If you want to support a range of Rubies, include the whole range without gaps in minor version numbers (e.g. 2.0, 2.1, 2.2, 2.3) and ruby_dep will use the whole range. (If there's a gap, older versions will be considered "unsupported").
5. If you want to drop support for a Ruby, remove it from the `.travis.yml` and just bump your gem's minor number (Yes! Bumping just the minor if fine according to SemVer).
5. If you just want to test a Ruby version (but not actually support it), put it into the `allow failures` part of your Travis build matrix. (ruby_dep ignores versions there).

When in doubt, open an issue and just ask.

## Roadmap

Pull Requests are welcome.

Plans include: reading supported Ruby from `.rubocop.yml` (`TargetRubyVersion` field).


## Development

Use `rake` to run tests.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/e2/ruby_dep.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
