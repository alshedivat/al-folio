# -*- encoding: utf-8 -*-

require "unicode_utils/lowercase_char_q"
require "unicode_utils/uppercase_char_q"
require "unicode_utils/titlecase_char_q"

module UnicodeUtils

  # A cased char is a character that has the Unicode property
  # Lowercase or Uppercase or the general category Titlecase_Letter.
  #
  # See also: lowercase_char?, uppercase_char?, titlecase_char?
  def cased_char?(char)
    lowercase_char?(char) || uppercase_char?(char) || titlecase_char?(char)
  end
  module_function :cased_char?

end
