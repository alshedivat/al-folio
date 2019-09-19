# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"
require "unicode_utils/simple_casefold"

module UnicodeUtils

  CASEFOLD_F_MAP = Impl.read_multivalued_map("casefold_f_map") # :nodoc:

  # Perform full case folding. The returned string may be longer than
  # +str+. The purpose of case folding is case insensitive string
  # comparison.
  #
  # Examples:
  #
  #   require "unicode_utils/casefold"
  #   UnicodeUtils.casefold("Ümit") == UnicodeUtils.casefold("ümit") => true
  #   UnicodeUtils.casefold("WEISS") == UnicodeUtils.casefold("weiß") => true
  def casefold(str)
    String.new.force_encoding(str.encoding).tap do |res|
      str.each_codepoint { |cp|
        if mapping = CASEFOLD_C_MAP[cp]
          res << mapping
        elsif mapping = CASEFOLD_F_MAP[cp]
          mapping.each { |m| res << m }
        else
          res << cp
        end
      }
    end
  end
  module_function :casefold

end
