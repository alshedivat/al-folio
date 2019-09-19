# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  SIMPLE_DOWNCASE_MAP = Impl.read_code_point_map("simple_lc_map") # :nodoc:

  # Map each code point in +str+ that has a single code point
  # lowercase-mapping to that lowercase mapping. The returned string
  # has the same length as the original string.
  #
  # This function is locale independent.
  #
  # Examples:
  #
  #   require "unicode_utils/simple_downcase"
  #   UnicodeUtils.simple_downcase("ÜMIT: 123") => "ümit: 123"
  #   UnicodeUtils.simple_downcase("STRASSE") => "strasse"
  def simple_downcase(str)
    String.new.force_encoding(str.encoding).tap { |res|
      str.each_codepoint { |cp|
        res << (SIMPLE_DOWNCASE_MAP[cp] || cp)
      }
    }
  end
  module_function :simple_downcase

end
