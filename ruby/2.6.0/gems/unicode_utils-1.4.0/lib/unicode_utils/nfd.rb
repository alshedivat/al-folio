# -*- encoding: utf-8 -*-

require "unicode_utils/canonical_decomposition"

module UnicodeUtils

  # Get +str+ in Normalization Form D.
  #
  # Alias for UnicodeUtils.canonical_decomposition.
  def nfd(str)
    UnicodeUtils.canonical_decomposition(str)
  end
  module_function :nfd

end
