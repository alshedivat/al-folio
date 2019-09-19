# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  SOFT_DOTTED_SET = Impl.read_code_point_set("soft_dotted_set") # :nodoc:

  # Returns true if the given character has the Unicode property
  # Soft_Dotted.
  def soft_dotted_char?(char)
    SOFT_DOTTED_SET.include?(char.ord)
  end
  module_function :soft_dotted_char?

end
