# -*- encoding: utf-8 -*-

require "unicode_utils/display_width"

module UnicodeUtils

  # Get the width of +char+ when displayed with a fixed pitch font.
  #
  # Some code points (especially from east asian scripts) take the
  # width of two characters, while others have no width.
  #
  # Examples:
  #
  #   require "unicode_utils/char_display_width"
  #   UnicodeUtils.char_display_width("別")  # => 2
  #   UnicodeUtils.char_display_width(0x308) # => 0
  #   UnicodeUtils.char_display_width("a")   # => 1
  #
  # Performs the same logic as UnicodeUtils.display_width, but for a
  # single code point.
  def char_display_width(char)
    cp = char.ord
    # copied from display_width, keep in sync!
    case UnicodeUtils.east_asian_width(cp)
    when :Wide, :Fullwidth then 2
    else GENERAL_CATEGORY_BASIC_WIDTH_MAP[UnicodeUtils.gc(cp)]
    end
  end
  module_function :char_display_width

end
