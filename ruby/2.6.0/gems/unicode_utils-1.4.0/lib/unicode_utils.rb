# -*- encoding: utf-8 -*-

require "unicode_utils/version"
require "unicode_utils/char_name"
require "unicode_utils/simple_upcase"
require "unicode_utils/simple_downcase"
require "unicode_utils/upcase"
require "unicode_utils/downcase"
require "unicode_utils/titlecase_char_q"
require "unicode_utils/lowercase_char_q"
require "unicode_utils/uppercase_char_q"
require "unicode_utils/cased_char_q"
require "unicode_utils/case_ignorable_char_q"
require "unicode_utils/soft_dotted_char_q"
require "unicode_utils/combining_class"
require "unicode_utils/hangul_syllable_decomposition"
require "unicode_utils/jamo_short_name"
require "unicode_utils/canonical_decomposition"
require "unicode_utils/nfd"
require "unicode_utils/canonical_equivalents_q"
require "unicode_utils/nfc"
require "unicode_utils/compatibility_decomposition"
require "unicode_utils/nfkd"
require "unicode_utils/nfkc"
require "unicode_utils/codepoint"
require "unicode_utils/grep"
require "unicode_utils/simple_casefold"
require "unicode_utils/casefold"
require "unicode_utils/each_grapheme"
require "unicode_utils/each_word"
require "unicode_utils/titlecase"
require "unicode_utils/east_asian_width"
require "unicode_utils/display_width"
require "unicode_utils/default_ignorable_char_q"
require "unicode_utils/gc"
require "unicode_utils/graphic_char_q"
require "unicode_utils/general_category"
require "unicode_utils/char_type"
require "unicode_utils/char_display_width"
require "unicode_utils/debug"
require "unicode_utils/code_point_type"
require "unicode_utils/name_aliases"
require "unicode_utils/sid"
require "unicode_utils/white_space_char_q"

# This version of UnicodeUtils implements algorithms as defined by
# version 6.2.0 of the Unicode standard. Each public method is
# declared as a +module_function+ of the UnicodeUtils module and
# defined in a separate file under the +unicode_utils+ directory.
#
# As a convenience, the toplevel +unicode_utils+ file loads all
# methods (needs lots of memory!). Also as a convenience for irb
# usage, the file <tt>unicode_utils/u</tt> assigns the UnicodeUtils
# module to the toplevel U constant and loads all methods:
#
#   $ irb -r unicode_utils/u
#   irb(main):001:0> U.grep /angstrom/
#   => [#<U+212B "Å" ANGSTROM SIGN utf8:e2,84,ab>]
#
# If a method takes a character as argument (usually named +char+),
# that argument can be an integer or a string (in which case the
# first code point counts) or any other object that responds to +ord+
# by returning an integer.
#
# All methods are non-destructive, string return values are in the
# same encoding as strings passed as arguments, which must be in one
# of the Unicode encodings.
#
# Highlevel methods are:
#
# UnicodeUtils.upcase:: full conversion to uppercase
# UnicodeUtils.downcase:: full conversion to lowercase
# UnicodeUtils.titlecase:: full conversion to titlecase
# UnicodeUtils.casefold:: case folding (case insensitive string comparison)
# UnicodeUtils.nfd:: Normalization Form D
# UnicodeUtils.nfc:: Normalization Form C
# UnicodeUtils.nfkd:: Normalization Form KD
# UnicodeUtils.nfkc:: Normalization Form KC
# UnicodeUtils.each_grapheme:: grapheme boundaries
# UnicodeUtils.each_word:: word boundaries
# UnicodeUtils.char_name:: character names
# UnicodeUtils.grep:: find code points by character name
module UnicodeUtils
end
