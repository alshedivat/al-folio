# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  JAMO_SHORT_NAME_MAP = Impl.read_names("jamo_short_names") # :nodoc:

  # The Jamo Short Name property of the given character (defaults
  # to nil).
  #
  # Example:
  #
  #   require "unicode_utils/jamo_short_name"
  #   UnicodeUtils.jamo_short_name("\u{1101}") => "GG"
  def jamo_short_name(char)
    JAMO_SHORT_NAME_MAP[char.ord]
  end
  module_function :jamo_short_name

end
