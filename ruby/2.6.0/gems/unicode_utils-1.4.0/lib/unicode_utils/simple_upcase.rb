# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  SIMPLE_UPCASE_MAP = Impl.read_code_point_map("simple_uc_map") # :nodoc:

  # Map each code point in +str+ that has a single code point
  # uppercase-mapping to that uppercase mapping. The returned string
  # has the same length as the original string.
  #
  # This function is locale independent.
  #
  # Examples:
  #
  #   require "unicode_utils/simple_upcase"
  #   UnicodeUtils.simple_upcase("ümit: 123") => "ÜMIT: 123"
  #   UnicodeUtils.simple_upcase("weiß") => "WEIß"
  def simple_upcase(str)
    String.new.force_encoding(str.encoding).tap { |res|
      str.each_codepoint { |cp|
        res << (SIMPLE_UPCASE_MAP[cp] || cp)
      }
    }
  end
  module_function :simple_upcase

end
