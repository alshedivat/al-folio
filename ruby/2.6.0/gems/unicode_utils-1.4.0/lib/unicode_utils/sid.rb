# -*- encoding: utf-8 -*-

require "unicode_utils/name_aliases"
require "unicode_utils/code_point_type"

module UnicodeUtils

  CP_PREFERRED_ALIAS_STRING_MAP = Hash.new.tap do |map|
    NAME_ALIASES_MAP.each { |cp, aliases|
      al =
        (aliases.find { |al| al.type == :correction } ||
         aliases.find { |al| al.type == :control } ||
         aliases.find { |al| al.type == :figment } ||
         aliases.find { |al| al.type == :alternate })
      map[cp] = al.name if al
    }
  end #:nodoc:

  # Returns a unique string identifier for every code point. Returns
  # nil if +code_point+ is not in the Unicode codespace. +code_point+
  # must be an Integer.
  #
  # The returned string identifier is either the non-empty Name
  # property value of +code_point+, a non-empty Name_Alias string
  # property value of +code_point+, or the code point label as
  # described by section "Code Point Labels" in chapter 4.8 "Name" of
  # the Unicode standard.
  #
  # If the returned identifier starts with "<", it is a code point
  # label and it ends with ">". Otherwise it is the normative name or
  # a formal alias string.
  #
  # The exact name/alias/label selection algorithm may change even in
  # minor UnicodeUtils releases, but overall behaviour will stay the
  # same in spirit.
  #
  # The selection process in this version of UnicodeUtils is:
  # 1. Use an alias of type :correction, :control, :figment or
  #    :alternate (with listed precendence) if available
  # 2. Use the Unicode Name property value if it is not empty
  # 3. Construct a code point label in angle brackets.
  #
  # Examples:
  #
  #     require "unicode_utils/sid"
  #
  #     U.sid 0xa     # => "LINE FEED"
  #     U.sid 0x0     # => "NULL"
  #     U.sid 0xfeff  # => "BYTE ORDER MARK"
  #     U.sid 0xe000  # => "<private-use-E000>"
  #     U.sid 0x61    # => "LATIN SMALL LETTER A"
  #     U.sid -1      # => nil
  def sid(code_point)
    s = CP_PREFERRED_ALIAS_STRING_MAP[code_point] and return s
    cn = UnicodeUtils.char_name(code_point)
    return cn if cn && cn !~ /\A(\<|\z)/
    ct = UnicodeUtils.code_point_type(code_point) or return nil
    ts = ct.to_s.downcase.gsub('_', '-')
    "<#{ts}-#{code_point.to_s(16).upcase.rjust(4, '0')}>"
  end
  module_function :sid

end
