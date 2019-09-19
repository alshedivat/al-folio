# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  WHITE_SPACE_SET = Impl.read_code_point_set("white_space_set") # :nodoc:

  # True if the given character has the Unicode property White_Space.
  # 
  # Example:
  #
  #   require "unicode_utils/general_category"
  #   require "unicode_utils/white_space_char_q"
  #
  #   UnicodeUtils.general_category("\n")   => :Control
  #   UnicodeUtils.white_space_char?("\n")  => true
  def white_space_char?(char)
    WHITE_SPACE_SET.include?(char.ord)
  end
  module_function :white_space_char?

end
