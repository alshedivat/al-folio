# -*- encoding: utf-8 -*-

require "unicode_utils/compatibility_decomposition"

module UnicodeUtils

  # Get +str+ in Normalization Form KD.
  #
  # Alias for UnicodeUtils.compatibility_decomposition.
  def nfkd(str)
    UnicodeUtils.compatibility_decomposition(str)
  end
  module_function :nfkd

end
