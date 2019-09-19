# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"
require "unicode_utils/hangul_syllable_decomposition"
require "unicode_utils/jamo_short_name"

module UnicodeUtils

  NAME_MAP = Impl.read_names("names") # :nodoc:

  # Get the normative Unicode name of the given character.
  #
  # Private Use code points have no name, this function returns nil for
  # such code points.
  #
  # All control characters have the special name "<control>". All
  # other characters have a unique name.
  #
  # Example:
  #
  #   require "unicode_utils/char_name"
  #   UnicodeUtils.char_name "ᾀ" => "GREEK SMALL LETTER ALPHA WITH PSILI AND YPOGEGRAMMENI"
  #   UnicodeUtils.char_name "\t" => "<control>"
  #
  # Note that this method deviates from the Unicode Name property in two
  # points:
  #
  # 1. It returns "<control>" for control codes, the Unicode Name property for
  #    these code points is an empty string
  # 2. It returns nil for other non-graphic, non-format code points, the
  #    Unicode Name property for these code points is an empty string
  #
  # See also: UnicodeUtils.sid
  def char_name(char)
    # TODO: improve with code point labels, see section 4.8 in Unicode 6.0.0
    if char.kind_of?(Integer)
      cp = char
      str = nil
    else
      cp = char.ord
      str = char
    end
    NAME_MAP[cp] ||
      case cp
      when 0x3400..0x4DB5, 0x4E00..0x9FCC, 0x20000..0x2A6D6, 0x2A700..0x2B734, 0x2B740..0x2B81D
        "CJK UNIFIED IDEOGRAPH-#{sprintf('%04X', cp)}"
      when 0xAC00..0xD7A3
        str ||= cp.chr(Encoding::UTF_8)
        "HANGUL SYLLABLE ".tap do |n|
          hangul_syllable_decomposition(str).each_char { |c|
            n << (jamo_short_name(c) || '')
          }
        end
      end
  end
  module_function :char_name

end
