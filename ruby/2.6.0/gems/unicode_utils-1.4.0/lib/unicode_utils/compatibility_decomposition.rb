# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"
require "unicode_utils/canonical_decomposition"
require "unicode_utils/hangul_syllable_decomposition"

module UnicodeUtils

  COMPATIBILITY_DECOMPOSITION_MAP =
    Impl.read_multivalued_map("compatibility_decomposition_map") # :nodoc:

  # Get the compatibility decomposition of the given string, also
  # called Normalization Form KD or short NFKD.
  #
  # Compatibility decomposition decomposes more code points than
  # canonical decomposition and contrary to Normalization Form D and
  # C, this normalization can alter how a string is displayed.
  #
  # Example:
  #
  #   require "unicode_utils/compatibility_decomposition"
  #   # LATIN SMALL LIGATURE FI => LATIN SMALL LETTER F, LATIN SMALL LETTER I
  #   UnicodeUtils.compatibility_decomposition("ﬁ") => "fi"
  #
  # See also: UnicodeUtils.nfkd
  def compatibility_decomposition(str)
    res = String.new.force_encoding(str.encoding)
    str.each_codepoint { |cp|
      if cp >= 0xAC00 && cp <= 0xD7A3 # hangul syllable
        Impl.append_hangul_syllable_decomposition(res, cp)
      else
        Impl.append_recursive_compatibility_decomposition_mapping(res, cp)
      end
    }
    Impl.put_into_canonical_order(res)
  end
  module_function :compatibility_decomposition

  module Impl # :nodoc:

    def self.append_recursive_compatibility_decomposition_mapping(str, cp)
      mapping = COMPATIBILITY_DECOMPOSITION_MAP[cp]
      mapping ||= CANONICAL_DECOMPOSITION_MAP[cp]
      if mapping
        mapping.each { |c|
          append_recursive_compatibility_decomposition_mapping(str, c)
        }
      else
        str << cp
      end
    end

  end

end
