# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  PROP_UPPERCASE_SET = Impl.read_code_point_set("prop_set_uppercase") # :nodoc:

  # True if the given character has the Unicode property Uppercase.
  def uppercase_char?(char)
    PROP_UPPERCASE_SET.include?(char.ord)
  end
  module_function :uppercase_char?

end
