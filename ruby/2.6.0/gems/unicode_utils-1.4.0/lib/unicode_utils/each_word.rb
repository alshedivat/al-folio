# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"

module UnicodeUtils

  # Maps code points to integer codes. For the integer code to property
  # mapping, see #compile_word_break_property in data/compile.rb.
  WORD_BREAK_MAP =
    Impl.read_hexdigit_map("word_break_property") # :nodoc:

  # Split +str+ along word boundaries according to Unicode's Default
  # Word Boundary Specification, calling the given block with each
  # word. Returns +str+, or an enumerator if no block is given.
  #
  # Example:
  #
  #   require "unicode_utils/each_word"
  #   UnicodeUtils.each_word("Hello, world!").to_a => ["Hello", ",", " ", "world", "!"]
  def each_word(str)
    return enum_for(__method__, str) unless block_given?
    cs = str.each_codepoint.map { |c| WORD_BREAK_MAP[c] }
    cs << nil << nil # for negative indices
    word = String.new.force_encoding(str.encoding)
    i = 0
    str.each_codepoint { |c|
      word << c
      if Impl.word_break?(cs, i) && !word.empty?
        yield word
        word = String.new.force_encoding(str.encoding)
      end
      i += 1
    }
    yield word unless word.empty?
    str
  end
  module_function :each_word

  module Impl # :nodoc:all

    def self.word_break?(cs, i)
      # wb3
      cs_i = cs[i]
      i1 = i + 1
      cs_i1 = cs[i1]
      if cs_i == 0x0 && cs_i1 == 0x1
        return false
      end
      # wb3a
      if cs_i == 0x2 || cs_i == 0x0 || cs_i == 0x1
        return true
      end
      # wb3b
      if cs_i1 == 0x2 || cs_i1 == 0x0 || cs_i1 == 0x1
        return true
      end
      # wb5
      i0 = i
      # inline skip_l
      c = nil
      loop { c = cs[i0]; break unless c == 0x3 || c == 0x4; i0 -= 1 }
      ci0 = c
      if ci0 == 0x6 && cs_i1 == 0x6
        return false
      end
      # wb6
      i2 = i1 + 1
      # inline skip_r
      loop { c = cs[i2]; break unless c == 0x3 || c == 0x4; i2 += 1 }
      if ci0 == 0x6 && (cs_i1 == 0x7 || cs_i1 == 0x9) && cs[i2] == 0x6
        return false
      end
      # wb7
      i_1 = i0 - 1
      # inline skip_l
      loop { c = cs[i_1]; break unless c == 0x3 || c == 0x4; i_1 -= 1 }
      if cs[i_1] == 0x6 && (ci0 == 0x7 || ci0 == 0x9) && cs_i1 == 0x6
        return false
      end
      # wb8
      if ci0 == 0xA && cs_i1 == 0xA
        return false
      end
      # wb9
      if ci0 == 0x6 && cs_i1 == 0xA
        return false
      end
      # wb10
      if ci0 == 0xA && cs_i1 == 0x6
        return false
      end
      # wb11
      if cs[i_1] == 0xA && (ci0 == 0x8 || ci0 == 0x9) && cs_i1 == 0xA
        return false
      end
      # wb12
      if ci0 == 0xA && (cs_i1 == 0x8 || cs_i1 == 0x9) && cs[i2] == 0xA
        return false
      end
      # wb13
      if ci0 == 0x5 && cs_i1 == 0x5
        return false
      end
      # wb13a
      if (ci0 == 0x6 || ci0 == 0xA || ci0 == 0x5 || ci0 == 0xB) && cs_i1 == 0xB
        return false
      end
      # wb13b
      if ci0 == 0xB && (cs_i1 == 0x6 || cs_i1 == 0xA || cs_i1 == 0x5)
        return false
      end
      # wb13c
      if ci0 == 0xC && cs_i1 == 0xC
        return false
      end
      # break unless next char is Extend/Format
      cs_i1 != 0x3 && cs_i1 != 0x4
    end

  end

end
