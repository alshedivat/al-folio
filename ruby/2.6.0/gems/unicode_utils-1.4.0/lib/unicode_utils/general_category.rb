# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"
require "unicode_utils/gc"

module UnicodeUtils

  GENERAL_CATEGORY_ALIAS_MAP =
    Impl.read_symbol_map("general_category_aliases") # :nodoc:

  # Get the long general category alias of char.
  #
  # Example:
  #
  #   require "unicode_utils/general_category"
  #   UnicodeUtils.general_category("A") # => :Uppercase_Letter
  #
  # Returns a symbol if char is in the Unicode code point range, nil
  # otherwise.
  #
  # See also: UnicodeUtils.gc, UnicodeUtils.char_type
  def general_category(char)
    GENERAL_CATEGORY_ALIAS_MAP[UnicodeUtils.gc(char)]
  end
  module_function :general_category

end
