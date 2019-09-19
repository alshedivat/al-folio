= Unicode Utils - Unicode algorithms for Ruby 1.9

UnicodeUtils implements Unicode algorithms for case conversion,
normalization, text segmentation and more in pure Ruby code.

== Installation

Install with RubyGems:

    gem install unicode_utils

Or get the source from Github: http://github.com/lang/unicode_utils
and follow the instructions in INSTALL.txt.

UnicodeUtils works with Ruby 1.9.1 or later.

== Synopsis

    require "unicode_utils/upcase"
    
    UnicodeUtils.upcase("weiß") => "WEISS"

    UnicodeUtils.upcase("i", :tr) => "İ"

Start with the UnicodeUtils module in the API documentation for
complete documentation.

== License

unicode_utils is licensed under the BSD license. Read the file
LICENSE.txt in the unicode_utils package for details.

== Links

Online documentation:: http://unicode-utils.rubyforge.org
Source code:: http://github.com/lang/unicode_utils
Rubyforge project:: http://rubyforge.org/projects/unicode-utils
Home of the Unicode Consortium:: http://unicode.org

== Who?

UnicodeUtils is written by Stefan Lang. You can contact me at
<tt>langstefan AT gmx.at</tt>. Contributions welcome!
