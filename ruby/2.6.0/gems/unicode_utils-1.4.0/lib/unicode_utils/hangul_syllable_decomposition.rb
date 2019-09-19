# -*- encoding: utf-8 -*-

module UnicodeUtils

  # Derives the canonical decomposition of the given Hangul syllable.
  #
  # Example:
  #
  #   require "unicode_utils/hangul_syllable_decomposition"
  #   UnicodeUtils.hangul_syllable_decomposition("\u{d4db}") => "\u{1111}\u{1171}\u{11b6}"
  def hangul_syllable_decomposition(char)
    String.new.force_encoding(char.encoding).tap do |str|
      Impl.append_hangul_syllable_decomposition(str , char.ord)
    end
  end
  module_function :hangul_syllable_decomposition

  module Impl # :nodoc:

    def self.append_hangul_syllable_decomposition(str, s)
      # constants
      sbase = 0xAC00
      lbase = 0x1100
      vbase = 0x1161
      tbase = 0x11A7
      scount = 11172
      lcount = 19
      vcount = 21
      tcount = 28
      ncount = vcount * tcount

      sindex = s - sbase
      if 0 <= sindex && sindex < scount
        l = lbase + sindex / ncount
        v = vbase + (sindex % ncount) / tcount
        t = tbase + sindex % tcount
        str << l << v
        str << t if t != tbase
      else
        str << s
      end
    end

  end

end
