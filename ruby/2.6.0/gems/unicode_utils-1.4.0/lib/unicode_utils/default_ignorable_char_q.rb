# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  PROP_DEFAULT_IGNORABLE_SET =
    Impl.read_code_point_set("prop_set_default_ignorable") # :nodoc:

  # True if the given character has the Unicode property
  # Default_Ingorable_Code_Point (see section 5.3 in Unicode 6.0.0).
  #
  # When a system (e.g. font) can't display a default ignorable
  # code point, it is allowed to simply ignore, i.e. skip it (as
  # opposed to other characters, which must at least be displayed with
  # a replacement character).
  def default_ignorable_char?(char)
    PROP_DEFAULT_IGNORABLE_SET.include?(char.ord)
  end
  module_function :default_ignorable_char?

end
