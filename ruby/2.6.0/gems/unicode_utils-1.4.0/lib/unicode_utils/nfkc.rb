# -*- encoding: utf-8 -*-

require "unicode_utils/compatibility_decomposition"
require "unicode_utils/nfc"

module UnicodeUtils

  # Get +str+ in Normalization Form KC.
  #
  # Normalization Form KC is compatibiliy decomposition (NFKD)
  # followed by composition. Like NFKD, this normalization can alter
  # how a string is displayed.
  #
  # Example:
  #
  #   require "unicode_utils/nfkc"
  #   # LATIN SMALL LIGATURE FI => LATIN SMALL LETTER F, LATIN SMALL LETTER I
  #   UnicodeUtils.nfkc("ﬁ") => "fi"
  #
  # See also: UnicodeUtils.compatibility_decomposition
  def nfkc(str)
    str = UnicodeUtils.compatibility_decomposition(str)
    Impl.composition(str)
  end
  module_function :nfkc

end
