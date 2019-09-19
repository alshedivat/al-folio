# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  EAST_ASIAN_WIDTH_MAP_PER_CP =
    Impl.read_east_asian_width_per_cp("east_asian_width_property_per_cp") # :nodoc:

  EAST_ASIAN_WIDTH_RANGES =
    Impl.read_east_asian_width_ranges("east_asian_width_property_ranges") # :nodoc:

  # Returns the default with of the given code point as described in
  # "UAX #11: East Asian Width" (http://unicode.org/reports/tr11/).
  #
  # Each code point is mapped to one of the following six symbols:
  # :Neutral, :Ambiguous, :Halfwidth, :Wide, :Fullwidth, :Narrow.
  def east_asian_width(char)
    cp = char.ord
    EAST_ASIAN_WIDTH_RANGES.each { |pair|
      return pair[1] if pair[0].cover?(cp)
    }
    EAST_ASIAN_WIDTH_MAP_PER_CP[cp]
  end
  module_function :east_asian_width

end
