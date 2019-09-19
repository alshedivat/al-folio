# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  TITLECASE_LETTER_SET = Impl.read_code_point_set("cat_set_titlecase") # :nodoc:

  # True if the given character has the General_Category
  # Titlecase_Letter (Lt).
  def titlecase_char?(char)
    TITLECASE_LETTER_SET.include?(char.ord)
  end
  module_function :titlecase_char?

end
