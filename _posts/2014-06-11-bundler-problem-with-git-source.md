---
layout: post
title: "Bundler problem with git: source"
description: "Bundler problem with git: source"
category: 'Rails'
tags: [rails, ruby]
---

Starting with a fresh Rails application I stumbled upon a confusing problem. I started to integrate the gem [cms-fortress](https://github.com/melvinsembrano/cms-fortress) as an extension for the quite cool [ComfortableMexicanSofa](https://github.com/comfy/comfortable-mexican-sofa) CMS. The integration in the Gemfile looked like this (the source is now our [fork](https://github.com/sumcumo/cms-fortress) on github):

    gem 'cms-fortress', :git => 'git@github.com:sumcumo/cms-fortress.git', :branch => 'master'

Straight forward, but Rails was not able to use the gem. The error message when starting Rails was:

    ~/p/s/kenny git:cms-fortress ❯❯❯ rails s
    git@github.com:sumcumo/cms-fortress.git (at master) is not yet checked out. Run `bundle install` first.
    git@github.com:sumcumo/cms-fortress.git (at master) is not yet checked out. Run `bundle install` first.
    no ruby in PATH/CONFIG
    => Booting Puma
    [...]

Bundler config files
--------------------

After trying out various possible solutions with no luck, I thought it must have to do with a setting in a config file. Basically there are two config files. One is *~/.bundle/config* and the other one is in *RAILS_ROOT/.bundle/config*. Actually nothing obviously wrong in there. Removing them did not help.

Bundler cache
-------------

There are various places where bundler is caching gems. One is *~/.gems/cache/bundler/*, another is *$GEM_HOME/cache/bundler/* where *$GEM_HOME* is the directory when using *rvm* and *gemsets* and finally there is *RAILS_ROOT/vendor/cache/*. I am not sure when and if I cleared the cache directories. But it did not help anyway.

Gemfile.lock
------------

Bundler is writing all used gems and it's dependencies into the *Gemfile.lock* file. There are circumstances, where you may want to delete that file if you have some strange behaviour like not being able to install gems or during a deployment process with capistrano. No problems arise when you delete the file because when running *bundle install* it will be recreated. Deleteing the file and recreating it did not help either.

More confusion
--------------

After several attempts to fix the problem, checking out the [bundler documentation](http://bundler.io/v1.6/man/bundle.1.html), deleting the gemset with *rvm gemset delete GEMSET_NAME* and finally removing the Ruby version completely and reinstalling it, I was stuck. My attempts to find a solution at Google was also not fruitful ... beside one SO entry:

[Bundle doesn't want to install a gem (not yet checked out)](http://stackoverflow.com/questions/22554365/bundle-doesnt-want-to-install-a-gem-not-yet-checked-out)

Andreas Lyngstad pointed to the [Bundler issue page](https://github.com/bundler/bundler/blob/master/ISSUES.md) and it's troubleshooting section. It does recommend to fire these commands:

    # remove user-specific gems and git repos
    rm -rf ~/.bundle/ ~/.gem/bundler/ ~/.gems/cache/bundler/

    # remove system-wide git repos and git checkouts
    rm -rf $GEM_HOME/bundler/ $GEM_HOME/cache/bundler/

    # remove project-specific settings
    rm -rf .bundle/

    # remove project-specific cached gems and repos
    rm -rf vendor/cache/

    # remove the saved resolve of the Gemfile
    rm -rf Gemfile.lock

    # uninstall the rubygems-bundler and open_gem gems
    rvm gemset use global # if using rvm
    gem uninstall rubygems-bundler open_gem

    # try to install one more time
    bundle install

I did follow the recommendation and deleted and recreated the gemset again in addition. This is done with:

    rvm gemset delete GEMSET_NAME
    rvm use ruby-2.1.1@GEMSET_NAME --create

Then I ran *bundle install* and afterwards *rails s* ... but:

    Warning: You're using Rubygems 2.0.14 with Spring. Upgrade to at least Rubygems 2.1.0 and run `gem pristine --all` for better startup performance.
    Could not find json-1.8.1 in any of the sources
    Run `bundle install` to install missing gems.

This is completely nonsens because I am using rubgygems 2.2.2 what is confirmed by the following check:

    gem -v
    2.2.2

Strangely, when stepping out of the directory and reentering again and trying to start the application ... ta ta ... everything worked. Uh ...

Conclusion
----------

My conslusion is, that there have been basically two problems. First, bundler is installed globally and is used with the global configuration. And in addition, there is the rubygems-bundler gem what imho caused problems. Because when examining the [README](https://github.com/mpapis/rubygems-bundler) of the gem you will find

> *Generally, this gem is not needed on RubyGems >= 2.2.0.*

That means removing the gem did help. Furthermore there must have been some sttings or cached stuff what was forcing these problems. Removing everything did help at the end ... I think and hope.

But why in the world did the above output say:

> *Warning: You're using Rubygems 2.0.14 ...*

I suspect that there is a mismatch when creating a fresh gemset with the used rubygems version. And this was resolved, when reinitialising the gemset with

> *rvm use ruby-2.1.1@GEMSET_NAME*

To be honest, I have no clue why that problem occured.

I Hope it helps at least
-----------------------

Unfortunately this post is not explaining why the problems occured. I have some ideas but am not entirely sure. At least, I could find a way to solve the problem for me and hope that it will solve also issues for some other folks also. It's unfortunate, that it feels a bit like a black box with no way to shine into it ...

Thanks also to my fellow colleague Moritz for helping investigating this.

