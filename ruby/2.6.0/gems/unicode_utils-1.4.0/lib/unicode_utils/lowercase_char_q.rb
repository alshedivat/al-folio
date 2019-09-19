# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  PROP_LOWERCASE_SET = Impl.read_code_point_set("prop_set_lowercase") # :nodoc:

  # True if the given character has the Unicode property Lowercase.
  def lowercase_char?(char)
    PROP_LOWERCASE_SET.include?(char.ord)
  end
  module_function :lowercase_char?

end
