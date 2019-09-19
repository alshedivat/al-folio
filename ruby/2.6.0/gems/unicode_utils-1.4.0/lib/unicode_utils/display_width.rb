# -*- encoding: utf-8 -*-

require "unicode_utils/east_asian_width"
require "unicode_utils/gc"
require "unicode_utils/graphic_char_q"

module UnicodeUtils

  GENERAL_CATEGORY_BASIC_WIDTH_MAP = Hash.new.tap do |h|
    GENERAL_CATEGORY_IS_GRAPHIC_MAP.each_pair { |key, value|
      if value && key != :Mn && key != :Me
        h[key] = 1
      else
        h[key] = 0
      end
    }
  end # :nodoc:

  # Get the width of +str+ when displayed with a fixed pitch font.
  #
  # Counts code points, where code points with an east asian width of
  # +Wide+ or +Fullwidth+ count for two, non-graphic code points (e.g.
  # control characters, including newline!) and non-spacing marks
  # count for zero and all others count for one.
  #
  # Examples:
  #
  #   require "unicode_utils/display_width"
  #   "別れ".length => 2
  #   UnicodeUtils.display_width("別れ") => 4
  #   "12".length => 2
  #   UnicodeUtils.display_width("12") => 2
  #   "a\u{308}".length => 2
  #   UnicodeUtils.display_width("a\u{308}") => 1
  #
  # Unicode assigns some reserved code points an east asian width of
  # +Wide+. Some systems correctly display a double width replacement
  # character, others not.
  #
  # See also: UnicodeUtils.graphic_char?, UnicodeUtils.east_asian_width
  def display_width(str)
    str.each_codepoint.reduce(0) { |sum, cp|
      sum +
        case UnicodeUtils.east_asian_width(cp)
        when :Wide, :Fullwidth then 2
        else GENERAL_CATEGORY_BASIC_WIDTH_MAP[UnicodeUtils.gc(cp)]
        end
    }
  end
  module_function :display_width

end
