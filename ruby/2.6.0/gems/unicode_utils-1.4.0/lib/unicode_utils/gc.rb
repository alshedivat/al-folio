# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  GENERAL_CATEGORY_PER_CP_MAP =
    Impl.read_general_category_per_cp("general_category_per_cp") # :nodoc:

  GENERAL_CATEGORY_RANGES =
    Impl.read_general_category_ranges("general_category_ranges") # :nodoc:

  # Get the two letter general category alias of the given char. The
  # first letter denotes a major class, the second letter a subclass
  # of the major class.
  #
  # See section 4.5 in Unicode 6.0.0.
  #
  # Example:
  #
  #   require "unicode_utils/gc"
  #   UnicodeUtils.gc("A") # => :Lu (Letter, uppercase)
  #
  # Returns nil for ordinals outside the Unicode code point range, a
  # two letter symbol otherwise.
  #
  # See also: UnicodeUtils.general_category, UnicodeUtils.char_type
  def gc(char)
    cp = char.ord
    cat = GENERAL_CATEGORY_PER_CP_MAP[cp] and return cat
    GENERAL_CATEGORY_RANGES.each { |pair|
      return pair[1] if pair[0].cover?(cp)
    }
    if cp >= 0x0 && cp <= 0x10FFFF
      :Cn # Other, not assigned
    else
      nil
    end
  end
  module_function :gc

end
