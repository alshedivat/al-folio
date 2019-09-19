# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  # Maps code points to integer codes. For the integer code to property
  # mapping, see #compile_grapheme_break_property in data/compile.rb.
  GRAPHEME_CLUSTER_BREAK_MAP =
    Impl.read_hexdigit_map("grapheme_break_property") # :nodoc:

  # Iterate over the grapheme clusters that make up +str+. A grapheme
  # cluster is a user perceived character (the basic unit of a writing
  # system for a language) and consists of one or more code points.
  #
  # This method uses the default Unicode algorithm for extended
  # grapheme clusters.
  #
  # Returns an enumerator if no block is given.
  #
  # Examples:
  #
  #   require "unicode_utils/each_grapheme"
  #   UnicodeUtils.each_grapheme("a\r\nb") { |g| p g }
  #
  # prints:
  #
  #   "a"
  #   "\r\n"
  #   "b"
  # 
  # and
  #
  #   UnicodeUtils.each_grapheme("a\r\nb").count => 3
  def each_grapheme(str)
    return enum_for(__method__, str) unless block_given?
    c0 = nil
    c0_prop = nil
    grapheme = String.new.force_encoding(str.encoding)
    str.each_codepoint { |c|
      gbreak = false
      c_prop = GRAPHEME_CLUSTER_BREAK_MAP[c]
      
      ### rules ###
      if c0_prop == 0x0 && c_prop == 0x1
        # don't break CR LF
      elsif c0_prop == 0x0 || c0_prop == 0x1 || c0_prop == 0x2
        # break after controls
        gbreak = true
      elsif c_prop == 0x0 || c_prop == 0x1 || c_prop == 0x2
        # break before controls
        gbreak = true
      elsif c0_prop == 0x6 && (c_prop == 0x6 || c_prop == 0x7 ||
                               c_prop == 0x9 || c_prop == 0xA)
        # don't break hangul syllable
      elsif (c0_prop == 0x9 || c0_prop == 0x7) &&
            (c_prop == 0x7 || c_prop == 0x8)
        # don't break hangul syllable
      elsif (c0_prop == 0xA || c0_prop == 0x8) && c_prop == 0x8
        # don't break hangul syllable
      elsif c0_prop == 0xB && c_prop == 0xB
        # don't break between regional indicator symbols
      elsif c_prop == 0x3
        # don't break before extending characters
      elsif c_prop == 0x5
        # don't break before SpacingMarks
      elsif c0_prop == 0x4
        # don't break after Prepend characters
      else
        # break everywhere
        gbreak = true
      end
      #############

      if gbreak && !grapheme.empty?
        yield grapheme
        grapheme = String.new.force_encoding(str.encoding)
      end
      grapheme << c
      c0 = c
      c0_prop = c_prop
    }
    yield grapheme unless grapheme.empty?
  end
  module_function :each_grapheme

end
