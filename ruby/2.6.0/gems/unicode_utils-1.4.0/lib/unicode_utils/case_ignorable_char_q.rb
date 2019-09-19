# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  CASE_IGNORABLE_SET = Impl.read_code_point_set("case_ignorable_set") # :nodoc:

  # Returns true if the given character is case-ignorable as defined
  # by Unicode 5.0, section 3.13.
  def case_ignorable_char?(char)
    CASE_IGNORABLE_SET.include?(char.ord)
  end
  module_function :case_ignorable_char?

end
