# -*- encoding: utf-8 -*-

require "unicode_utils/char_name"

module UnicodeUtils

  # A Codepoint instance represents a single Unicode code point.
  #
  #   UnicodeUtils::Codepoint.new(0x20ac) => #<U+20AC "€" EURO SIGN utf8:e2,82,ac>
  class Codepoint

    # The Unicode codespace. Any integer in this range is a Unicode
    # code point.
    RANGE = 0..0x10FFFF

    # Create a Codepoint instance that wraps the given Integer. +int+
    # must be in Codepoint::RANGE.
    def initialize(int)
      unless RANGE.include?(int)
        raise ArgumentError, "#{int} not in codespace"
      end
      @int = int
    end

    # Convert to Integer.
    def ord
      @int
    end

    # Format in U+ notation.
    #
    #   Codepoint.new(0xc5).uplus => "U+00C5"
    def uplus
      sprintf('U+%04X', @int)
    end

    # Get the normative Unicode name of this code point.
    #
    # See also: UnicodeUtils.char_name
    def name
      UnicodeUtils.char_name(@int)
    end

    # Convert this code point to an UTF-8 encoded string. Returns a new
    # string on each call and thus it is allowed to mutate the return
    # value.
    def to_s
      @int.chr(Encoding::UTF_8)
    end

    # Get the bytes used to encode this code point in UTF-8,
    # hex-formatted.
    #
    #   Codepoint.new(0xe4).hexbytes => "c3,a4"
    def hexbytes
      to_s.bytes.map { |b| sprintf("%02x", b) }.join(",")
    end

    # #<U+... char name utf8-hexbytes>
    def inspect
      "#<#{uplus} #{to_s.inspect} #{name || "nil"} utf8:#{hexbytes}>"
    end

  end

end
