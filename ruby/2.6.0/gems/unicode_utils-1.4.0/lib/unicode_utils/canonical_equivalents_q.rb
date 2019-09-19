# -*- encoding: utf-8 -*-

require "unicode_utils/canonical_decomposition"

module UnicodeUtils

  # The strings +a+ and +b+ are canonical equivalents if their
  # canonical decompositions are equal.
  #
  # Example:
  #
  #   require "unicode_utils/canonical_equivalents_q"
  #   UnicodeUtils.canonical_equivalents?("Äste", "A\u{308}ste") => true
  #   UnicodeUtils.canonical_equivalents?("Äste", "Aste") => false
  def canonical_equivalents?(a, b)
    UnicodeUtils.canonical_decomposition(a) ==
      UnicodeUtils.canonical_decomposition(b)
  end
  module_function :canonical_equivalents?

end
