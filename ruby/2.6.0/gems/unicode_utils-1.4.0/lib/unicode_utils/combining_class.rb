# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  COMBINING_CLASS_MAP = Impl.read_combining_class_map() # :nodoc:
  COMBINING_CLASS_MAP.default = 0

  # Get the combining class of the given character as an integer in
  # the range 0..255.
  def combining_class(char)
    COMBINING_CLASS_MAP[char.ord]
  end
  module_function :combining_class

end
