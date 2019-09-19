# -*- encoding: utf-8 -*-

require "unicode_utils/gc"

module UnicodeUtils

  GENERAL_CATEGORY_IS_GRAPHIC_MAP = {
    Lu: true, Ll: true, Lt: true, Lm: true, Lo: true,
    Mn: true, Mc: true, Me: true,
    Nd: true, Nl: true, No: true,
    Pc: true, Pd: true, Ps: true, Pe: true, Pi: true, Pf: true, Po: true,
    Sm: true, Sc: true, Sk: true, So: true,
    Zs: true, Zl: false, Zp: false,
    Cc: false, Cf: false, Cs: false, Co: false, Cn: false
  } # :nodoc:

  # Returns true if the given char is a graphic char, false otherwise.
  # See table 2-3 in section 2.4 of Unicode 6.0.0.
  #
  # Examples:
  #
  #   require "unicode_utils/graphic_char_q"
  #   UnicodeUtils.graphic_char?("a")  # => true
  #   UnicodeUtils.graphic_char?("\n") # => false
  #   UnicodeUtils.graphic_char?(0x0)  # => false
  def graphic_char?(char)
    GENERAL_CATEGORY_IS_GRAPHIC_MAP[UnicodeUtils.gc(char)]
  end
  module_function :graphic_char?

end
