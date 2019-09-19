# Jekyll Email Protect [![Gem Version](https://badge.fury.io/rb/jekyll-email-protect.png)](http://badge.fury.io/rb/jekyll-email-protect)

> Email protection liquid filter for Jekyll

Jekyll Email Protect is an email protection liquid filter which can be used to obfuscate `mailto:` links to protect an email address from span bots.

## Installation

This plugin is available as a [RubyGem][ruby-gem].

Add this line to your application's `Gemfile`:

```
gem 'jekyll-email-protect'
```

And then execute the `bundle` command to install the gem.

Alternatively, you can also manually install the gem using the following command:

```
$ gem install jekyll-email-protect
```

After the plugin has been installed successfully, add the following lines to your `_config.yml` in order to tell Jekyll to use the plugin:

```
plugins:
- jekyll-email-protect
```

## Getting Started

In your markup, simply use the `encode_email` liquid filter made available through this plugin:

```
{{ 'example@example.com' | encode_email }}
```

The above code will yield `%65%78%61%6D%70%6C%65@%65%78%61%6D%70%6C%65.%63%6F%6D`. Only use this filter within the `href` attribute of a given link.

You can also HTML-encode an email address with this plugin:

```
{{ 'example@example.com' | html_encode_email }}
```

## Example

The following example shows how this plugin can be used to protect the `site`'s email address:

```
<a href="mailto:{{ site.email | encode_email }}">{{ site.email | html_encode_email }}</a>
```

# Contribute

Fork this repository, make your changes and then issue a pull request. If you find bugs or have new ideas that you do not want to implement yourself, file a bug report.

# Copyright

Copyright (c) 2015 Vincent Wochnik.

License: MIT

[ruby-gem]: https://rubygems.org/gems/jekyll-email-protect
