# -*- encoding: utf-8 -*-

require "unicode_utils/gc"
require "unicode_utils/general_category"

module UnicodeUtils

  GENERAL_CATEGORY_TYPE_MAP = Hash.new.tap { |map|
    GENERAL_CATEGORY_ALIAS_MAP.each_pair { |short, long|
      if short.length == 2
        map[short] = GENERAL_CATEGORY_ALIAS_MAP[short[0].to_sym]
      end
    }
  } # :nodoc:

  # Get the long major general category alias of char.
  #
  # Example:
  #
  #   require "unicode_utils/char_type"
  #   UnicodeUtils.char_type("1") # => :Number
  #
  # Always returns a symbol when char is in the Unicode code point
  # range.
  #
  # See also: UnicodeUtils.general_category
  def char_type(char)
    GENERAL_CATEGORY_TYPE_MAP[UnicodeUtils.gc(char)]
  end
  module_function :char_type

end
