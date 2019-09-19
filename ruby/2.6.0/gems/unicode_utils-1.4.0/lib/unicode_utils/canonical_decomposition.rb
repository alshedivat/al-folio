# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"
require "unicode_utils/hangul_syllable_decomposition"
require "unicode_utils/combining_class"

module UnicodeUtils

  CANONICAL_DECOMPOSITION_MAP =
    Impl.read_multivalued_map("canonical_decomposition_map") # :nodoc:
  
  # Get the canonical decomposition of the given string, also called
  # Normalization Form D or short NFD.
  #
  # The Unicode standard has multiple representations for some
  # characters. One representation as a single code point and other
  # representation(s) as a combination of multiple code points. This
  # function "decomposes" these characters in +str+ into the latter
  # representation.
  #
  # Example:
  #
  #   require "unicode_utils/canonical_decomposition"
  #   # LATIN SMALL LETTER A WITH ACUTE => LATIN SMALL LETTER A, COMBINING ACUTE ACCENT
  #   UnicodeUtils.canonical_decomposition("\u{E1}") => "\u{61}\u{301}"
  # 
  # See also: UnicodeUtils.nfd
  def canonical_decomposition(str)
    res = String.new.force_encoding(str.encoding)
    str.each_codepoint { |cp|
      if cp >= 0xAC00 && cp <= 0xD7A3 # hangul syllable
        Impl.append_hangul_syllable_decomposition(res, cp)
      else
        mapping = CANONICAL_DECOMPOSITION_MAP[cp]
        if mapping
          Impl.append_recursive_canonical_decomposition_mapping(res, mapping)
        else
          res << cp
        end
      end
    }
    Impl.put_into_canonical_order(res)
  end
  module_function :canonical_decomposition

  module Impl # :nodoc:

    def self.append_recursive_canonical_decomposition_mapping(str, mapping)
      mapping.each { |cp|
        mapping_ = CANONICAL_DECOMPOSITION_MAP[cp]
        if mapping_
          append_recursive_canonical_decomposition_mapping(str, mapping_)
        else
          str << cp
        end
      }
    end

    def self.put_into_canonical_order(str)
      reorder_needed = false
      last_cp = nil
      last_cc = nil
      str.each_codepoint { |cp|
        cc = COMBINING_CLASS_MAP[cp]
        if last_cp && cc != 0 && last_cc > cc
          reorder_needed = true
          break
        end
        last_cp = cp
        last_cc = cc
      }
      return str unless reorder_needed
      res = String.new.force_encoding(str.encoding)
      last_cp = nil
      last_cc = nil
      str.each_codepoint { |cp|
        cc = COMBINING_CLASS_MAP[cp]
        if last_cp
          if cc != 0 && last_cc > cc
            res << cp
            cp = nil
            cc = nil
          end
          res << last_cp
        end
        last_cp = cp
        last_cc = cc
      }
      res << last_cp if last_cp
      put_into_canonical_order(res)
    end

  end

end
