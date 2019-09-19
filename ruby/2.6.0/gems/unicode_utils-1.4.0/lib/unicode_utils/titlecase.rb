# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"
require "unicode_utils/conditional_casing"
require "unicode_utils/each_word"
require "unicode_utils/cased_char_q"
require "unicode_utils/downcase"

module UnicodeUtils

  SIMPLE_TITLECASE_MAP = Impl.read_code_point_map("simple_tc_map") # :nodoc:
  SPECIAL_TITLECASE_MAP = Impl.read_multivalued_map("special_tc_map") # :nodoc:

  # Convert the first cased character after each word boundary to
  # titlecase and all other cased characters to lowercase. For many,
  # but not all characters, the titlecase mapping is the same as the
  # uppercase mapping.
  #
  # Some conversion rules are language dependent, these are in effect
  # when a non-nil +language_id+ is given. If non-nil, the
  # +language_id+ must be a two letter language code as defined in BCP
  # 47 (http://tools.ietf.org/rfc/bcp/bcp47.txt) as a symbol. If a
  # language doesn't have a two letter code, the three letter code is
  # to be used. If locale independent behaviour is required, +nil+
  # should be passed explicitely, because a later version of
  # UnicodeUtils may default to something else.
  #
  # Example:
  #
  #   require "unicode_utils/titlecase"
  #   UnicodeUtils.titlecase("hello, world!") => "Hello, World!"
  def titlecase(str, language_id = nil)
    String.new.force_encoding(str.encoding).tap do |res|
      # ensure O(1) lookup by index
      str = str.encode(Encoding::UTF_32LE)
      i = 0
      each_word(str) { |word|
        cased_char_found = false
        word.each_codepoint { |cp|
          cased = cased_char?(cp)
          if !cased_char_found && cased
            cased_char_found = true
            special_mapping =
              Impl.conditional_titlecase_mapping(cp, str, i, language_id) ||
              SPECIAL_TITLECASE_MAP[cp]
            if special_mapping
              special_mapping.each { |m| res << m }
            else
              res << (SIMPLE_TITLECASE_MAP[cp] || cp)
            end
          elsif cased
            special_mapping =
              Impl.conditional_downcase_mapping(cp, str, i, language_id) ||
              SPECIAL_DOWNCASE_MAP[cp]
            if special_mapping
              special_mapping.each { |m| res << m }
            else
              res << (SIMPLE_DOWNCASE_MAP[cp] || cp)
            end
          else
            res << cp
          end
          i += 1
        }
      }
    end
  end
  module_function :titlecase

end
