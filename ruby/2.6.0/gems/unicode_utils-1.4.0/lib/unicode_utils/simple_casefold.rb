# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  CASEFOLD_C_MAP = Impl.read_code_point_map("casefold_c_map") # :nodoc:

  CASEFOLD_S_MAP = Impl.read_code_point_map("casefold_s_map") # :nodoc:

  # Perform simple case folding. Contrary to full case folding, this
  # uses only one to one mappings, so that the length of the returned
  # string is equal to the length of +str+.
  #
  # The purpose of case folding is case insensitive string comparison.
  #
  # Examples:
  #
  #   require "unicode_utils/simple_casefold"
  #   UnicodeUtils.simple_casefold("Ümit") == UnicodeUtils.simple_casefold("ümit") => true
  #   UnicodeUtils.simple_casefold("WEISS") == UnicodeUtils.simple_casefold("weiß") => false
  #
  # See also: UnicodeUtils.casefold
  def simple_casefold(str)
    String.new.force_encoding(str.encoding).tap do |res|
      str.each_codepoint { |cp|
        res << (CASEFOLD_C_MAP[cp] || CASEFOLD_S_MAP[cp] || cp)
      }
    end
  end
  module_function :simple_casefold

end
