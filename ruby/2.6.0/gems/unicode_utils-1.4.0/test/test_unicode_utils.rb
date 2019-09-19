# encoding: utf-8

require "test/unit"
require "stringio"

require "unicode_utils"

# Fast tests for allmost all UnicodeUtils functions.
class TestUnicodeUtils < Test::Unit::TestCase

  def test_unicode_version
    assert_match /\A\d+\.\d+\.\d+\z/, UnicodeUtils::UNICODE_VERSION
  end

  def test_name
    assert_equal "LATIN SMALL LETTER F", UnicodeUtils.char_name("f")
    assert_equal Encoding::US_ASCII, UnicodeUtils.char_name("f").encoding
    assert_equal nil, UnicodeUtils.char_name("\u{e000}") # private use
    assert_equal "<control>", UnicodeUtils.char_name("\t")
    assert_equal "CJK UNIFIED IDEOGRAPH-4E00", UnicodeUtils.char_name("\u{4e00}")
    assert_equal "CJK UNIFIED IDEOGRAPH-2A6D6", UnicodeUtils.char_name("\u{2a6d6}")
    assert_equal "CJK UNIFIED IDEOGRAPH-2A3D6", UnicodeUtils.char_name("\u{2a3d6}")
    assert_equal "HANGUL SYLLABLE PWILH", UnicodeUtils.char_name("\u{d4db}")
  end

  def test_simple_upcase
    assert_equal "ÜMIT", UnicodeUtils.simple_upcase("ümit")
    assert_equal "WEIß", UnicodeUtils.simple_upcase("weiß")
  end

  def test_simple_downcase
    assert_equal "ümit", UnicodeUtils.simple_downcase("ÜMIT")
    assert_equal "strasse", UnicodeUtils.simple_downcase("STRASSE")
  end

  def test_upcase
    assert_equal "WEISS 123", UnicodeUtils.upcase("Weiß 123")
    assert_equal "WEISS 123", UnicodeUtils.upcase("Weiß 123", :de)
    assert_equal "I", UnicodeUtils.upcase("i")
    assert_equal "I", UnicodeUtils.upcase("i", :de)
    assert_equal "\u{130}", UnicodeUtils.upcase("i", :tr)
    assert_equal "\u{130}", UnicodeUtils.upcase("i", :az)
    assert_equal "ABI\u{3a3}SS\u{3a3}/FFI\u{5ffff}\u{10405}",
      UnicodeUtils.upcase("aBi\u{3c3}\u{df}\u{3c2}/\u{fb03}\u{5ffff}\u{1042d}")
    assert_equal "AB\u{130}\u{3a3}SS\u{3a3}/FFI\u{5ffff}\u{10405}",
      UnicodeUtils.upcase("aBi\u{3c3}\u{df}\u{3c2}/\u{fb03}\u{5ffff}\u{1042d}", :az)
    assert_equal "I\u{307}", UnicodeUtils.upcase("i\u{307}")
    assert_equal "I", UnicodeUtils.upcase("i\u{307}", :lt)
  end

  def test_downcase
    # LATIN CAPITAL LETTER I WITH DOT ABOVE
    assert_equal "\u0069\u0307", UnicodeUtils.downcase("\u0130")
    assert_equal "\u0069\u0307", UnicodeUtils.downcase("\u0130", :de)
    assert_equal "\u0069", UnicodeUtils.downcase("\u0130", :tr)
    assert_equal "\u0069", UnicodeUtils.downcase("\u0130", :az)
    assert_equal "ab\u{131}\u{3c3}\u{df}\u{3c2}/\u{5ffff}\u{1042d}",
      UnicodeUtils.downcase("aBI\u{3a3}\u{df}\u{3a3}/\u{5ffff}\u{10405}", :tr)
    # tests After_I and Not_Before_Dot
    assert_equal "abi", UnicodeUtils.downcase("aBI\u{307}", :tr)
    assert_equal "ia\u{300}", UnicodeUtils.downcase("Ia\u{300}", :lt)
    # this is probably unrealistic, because I don't understand a word Lithuanian
    assert_equal "i\u{307}\u{300}", UnicodeUtils.downcase("I\u{300}", :lt)
  end

  def test_downcase_final_sigma
    assert_equal "abi\u{3c3}\u{df}\u{3c2}/\u{5ffff}\u{1042d}",
      UnicodeUtils.downcase("aBI\u{3a3}\u{df}\u{3a3}/\u{5ffff}\u{10405}")
  end

  def test_titlecase?
    assert_equal true, UnicodeUtils.titlecase_char?("\u{01F2}")
    assert_equal false, UnicodeUtils.titlecase_char?("\u{0041}")
  end

  def test_lowercase_char?
    assert_equal true, UnicodeUtils.lowercase_char?("c")
    assert_equal true, UnicodeUtils.lowercase_char?("ö")
    assert_equal false, UnicodeUtils.lowercase_char?("C")
    assert_equal false, UnicodeUtils.lowercase_char?("2")
  end

  def test_uppercase_char?
    assert_equal true, UnicodeUtils.uppercase_char?("C")
    assert_equal true, UnicodeUtils.uppercase_char?("Ö")
    assert_equal false, UnicodeUtils.uppercase_char?("2")
    assert_equal false, UnicodeUtils.uppercase_char?("c")
  end

  def test_cased_char?
    assert_equal true, UnicodeUtils.cased_char?("a")
    assert_equal true, UnicodeUtils.cased_char?("Ä")
    assert_equal true, UnicodeUtils.cased_char?("ß")
    assert_equal false, UnicodeUtils.cased_char?("2")
  end

  def test_case_ignorable_char?
    assert_equal true, UnicodeUtils.case_ignorable_char?(":")
    assert_equal true, UnicodeUtils.case_ignorable_char?("\u{302}")
    assert_equal true, UnicodeUtils.case_ignorable_char?("\u{20dd}")
    assert_equal true, UnicodeUtils.case_ignorable_char?("\u{600}")
    assert_equal true, UnicodeUtils.case_ignorable_char?("\u{2b0}")
    assert_equal true, UnicodeUtils.case_ignorable_char?("\u{2c2}")
    assert_equal false, UnicodeUtils.case_ignorable_char?("a")
    assert_equal false, UnicodeUtils.case_ignorable_char?("1")
  end

  def test_combining_class
    assert_equal 0, UnicodeUtils.combining_class("a")
    assert_equal 230, UnicodeUtils.combining_class("\u{1b6e}")
  end

  def test_soft_dotted_char?
    assert_equal true, UnicodeUtils.soft_dotted_char?("j")
    assert_equal true, UnicodeUtils.soft_dotted_char?("\u{2c7c}")
    assert_equal false, UnicodeUtils.soft_dotted_char?("a")
  end

  def test_hangul_syllable_decomposition
    assert_equal "\u{1111}\u{1171}\u{11b6}", UnicodeUtils.hangul_syllable_decomposition("\u{d4db}")
  end

  def test_jamo_short_name
    assert_equal "GG", UnicodeUtils.jamo_short_name("\u{1101}")
  end

  def test_canonical_decomposition
    assert_equal "\u{61}\u{301}",
      UnicodeUtils.canonical_decomposition("\u{E1}")
    assert_equal "\u{61}\u{301}\u{63}\u{327}\u{301}",
      UnicodeUtils.canonical_decomposition("\u{e1}\u{63}\u{301}\u{327}")
    assert_equal "\u{fb01}",
      UnicodeUtils.canonical_decomposition("\u{fb01}")
  end

  def test_nfd
    assert_equal "\u{61}\u{301}", UnicodeUtils.nfd("\u{E1}")
  end

  def test_canonical_equivalents?
    assert_equal true, UnicodeUtils.canonical_equivalents?("Äste", "A\u{308}ste")
    assert_equal false, UnicodeUtils.canonical_equivalents?("Äste", "Aste")
  end

  def test_nfc
    assert_equal "Häschen", UnicodeUtils.nfc("Ha\u{308}schen")
  end

  def test_compatibility_decomposition
    # the following two calls have the same results with
    # canonical_decomposition
    assert_equal "\u{61}\u{301}",
      UnicodeUtils.compatibility_decomposition("\u{E1}")
    assert_equal "\u{61}\u{301}\u{63}\u{327}\u{301}",
      UnicodeUtils.compatibility_decomposition("\u{e1}\u{63}\u{301}\u{327}")
    # this case differs from canonical decomposition
    assert_equal "\u{66}\u{69}",
      UnicodeUtils.compatibility_decomposition("\u{fb01}")
  end

  def test_nfkd
    assert_equal "\u{66}\u{69}", UnicodeUtils.nfkd("\u{fb01}")
  end

  def test_nfkc
    assert_equal "\u{66}\u{69}\u{e4}", UnicodeUtils.nfkc("\u{fb01}\u{e4}")
  end

  def test_simple_casefold
    assert_equal "abc123", UnicodeUtils.simple_casefold("ABC123")
    assert UnicodeUtils.simple_casefold("ÜMIT") ==
      UnicodeUtils.simple_casefold("ümit")
    assert UnicodeUtils.simple_casefold("WEISS") !=
      UnicodeUtils.simple_casefold("weiß")
  end

  def test_casefold
    assert_equal "abc123", UnicodeUtils.casefold("ABC123")
    assert UnicodeUtils.casefold("ÜMIT") ==
      UnicodeUtils.casefold("ümit")
    assert UnicodeUtils.casefold("WEISS") ==
      UnicodeUtils.casefold("weiß")
  end

  def test_each_grapheme
    graphemes = []
    UnicodeUtils.each_grapheme("word") { |g| graphemes << g }
    assert_equal ["w", "o", "r", "d"], graphemes
    UnicodeUtils.each_grapheme("") { |g| flunk }
    graphemes = []
    UnicodeUtils.each_grapheme("u\u{308}mit") { |g| graphemes << g }
    # diaeresis
    assert_equal ["u\u{308}", "m", "i", "t"], graphemes
    # hangul syllable
    graphemes = []
    UnicodeUtils.each_grapheme("\u{1111}\u{1171}\u{11b6}\u{d4db}") { |g| graphemes << g }
    assert_equal ["\u{1111}\u{1171}\u{11b6}", "\u{d4db}"], graphemes
    assert_equal ["a", "\r\n", "b"], UnicodeUtils.each_grapheme("a\r\nb").to_a
  end

  def test_each_word
    words = []
    UnicodeUtils.each_word("two words") { |w| words << w }
    assert_equal ["two", " ", "words"], words
    assert_equal ["a", " ", "b"], UnicodeUtils.each_word("a b").to_a
    assert_equal [" ", "b"], UnicodeUtils.each_word(" b").to_a
    assert_equal ["a", " "], UnicodeUtils.each_word("a ").to_a
    assert_equal [" "], UnicodeUtils.each_word(" ").to_a
    assert_equal ["a"], UnicodeUtils.each_word("a").to_a
    assert_equal [], UnicodeUtils.each_word("").to_a
    assert_equal ["Hello", ",", " ", "world", "!"],
      UnicodeUtils.each_word("Hello, world!").to_a
    assert_equal ["o\u{308}12"],
      UnicodeUtils.each_word("o\u{308}12").to_a
    assert_equal ["o\u{308}1"],
      UnicodeUtils.each_word("o\u{308}1").to_a
    assert_equal ["o\u{308}"],
      UnicodeUtils.each_word("o\u{308}").to_a
    assert_equal ["\u{308}", "o"],
      UnicodeUtils.each_word("\u{308}o").to_a
  end

  def test_titlecase
    assert_equal "Hello, World!", UnicodeUtils.titlecase("heLlo, world!")
    assert_equal "Find", UnicodeUtils.titlecase("ﬁnD")
    assert_equal "Ümit Huber Jandl", UnicodeUtils.titlecase("ümit huber jandl")
    assert_equal "İ Can Has 1Kg Cheesburger",
      UnicodeUtils.titlecase("i can has 1kg CHEESBURGER", :tr)
  end

  def test_east_asian_width
    assert_equal :Neutral, UnicodeUtils.east_asian_width("\u{0}")
    assert_equal :Neutral, UnicodeUtils.east_asian_width("\u{10FFFF}")
    assert_equal :Neutral, UnicodeUtils.east_asian_width("\u{C5}")
    # from Wide to Neutral in Unicode 6.2.0
    assert_equal :Neutral, UnicodeUtils.east_asian_width(0x11A5)
    assert_equal :Ambiguous, UnicodeUtils.east_asian_width(0xA1)
    assert_equal :Ambiguous, UnicodeUtils.east_asian_width(0xE000)
    assert_equal :Ambiguous, UnicodeUtils.east_asian_width(0xF8FF)
    assert_equal :Ambiguous, UnicodeUtils.east_asian_width(0xFE05)
    assert_equal :Ambiguous, UnicodeUtils.east_asian_width("ß")
    assert_equal :Halfwidth, UnicodeUtils.east_asian_width(0xFFA5)
    assert_equal :Halfwidth, UnicodeUtils.east_asian_width(0xFFEE)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0xB116)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x1100)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x2E94)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x3400)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x4E05)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x4FCD)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0xFA2E)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x3FFFD)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x4DB6)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x4DBF)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x9FCC)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x9FFF)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0xFA2E)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0xFA2F)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0xFA6E)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0xFA6F)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0xFADA)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0xFAFF)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x2A6D7)
    assert_equal :Wide, UnicodeUtils.east_asian_width(0x2A6FF)
    assert_equal :Fullwidth, UnicodeUtils.east_asian_width(0x3000)
    assert_equal :Fullwidth, UnicodeUtils.east_asian_width(0xFF0D)
    assert_equal :Fullwidth, UnicodeUtils.east_asian_width(0xFFE6)
    assert_equal :Narrow, UnicodeUtils.east_asian_width(0x20)
    assert_equal :Narrow, UnicodeUtils.east_asian_width(0x2C)
    assert_equal :Narrow, UnicodeUtils.east_asian_width(0x7E)
    assert_equal :Narrow, UnicodeUtils.east_asian_width(0xA6)
    assert_equal :Narrow, UnicodeUtils.east_asian_width(0x2986)
  end

  def test_display_width
    assert_equal 0, UnicodeUtils.display_width("")
    assert_equal 18, UnicodeUtils.display_width("別れる時に発する語")
    assert_equal 18, UnicodeUtils.display_width("123456789aBcDeFgHi")
    assert_equal 6, UnicodeUtils.display_width("Straße")
    assert_equal 1, UnicodeUtils.display_width("a\u{308}")
    assert_equal 5, UnicodeUtils.display_width("Now！")
    assert_equal 2, UnicodeUtils.display_width("a̦b") # General Category Mn
    assert_equal 4, UnicodeUtils.display_width("a\u{93b}bc") # General Category Mc
    assert_equal 3, UnicodeUtils.display_width("ab\u{20dd}c") # General Category Me
    assert_equal 4, UnicodeUtils.display_width("ab\u{a8}c") # General Category Sk
    assert_equal 4, UnicodeUtils.display_width("ab\u{2000}c") # General Category Zs
    assert_equal 3, UnicodeUtils.display_width("a b") # Zs
    assert_equal 3, UnicodeUtils.display_width("a\u{1680}b") # Zs
  end

  def test_char_display_width
    assert_equal 2, UnicodeUtils.char_display_width("別")
    assert_equal 0, UnicodeUtils.char_display_width(0x308)
    assert_equal 1, UnicodeUtils.char_display_width("a")
  end

  def test_default_ignorable_char?
    assert_equal true, UnicodeUtils.default_ignorable_char?(0xad)
    assert_equal true, UnicodeUtils.default_ignorable_char?(0x34f)
    assert_equal true, UnicodeUtils.default_ignorable_char?(0x115f)
    assert_equal true, UnicodeUtils.default_ignorable_char?(0x1160)
    assert_equal true, UnicodeUtils.default_ignorable_char?(0x2065)
    assert_equal true, UnicodeUtils.default_ignorable_char?(0x2069)
    assert_equal true, UnicodeUtils.default_ignorable_char?(0xe008a)
    assert_equal true, UnicodeUtils.default_ignorable_char?(0xffa0)
    assert_equal true, UnicodeUtils.default_ignorable_char?(0xe0fff)
    assert_equal false, UnicodeUtils.default_ignorable_char?("a")
    assert_equal false, UnicodeUtils.default_ignorable_char?("語")
    assert_equal false, UnicodeUtils.default_ignorable_char?(" ")
    assert_equal false, UnicodeUtils.default_ignorable_char?("\u{308}")
  end

  def test_gc
    assert_equal :Lu, UnicodeUtils.gc("A")
    assert_equal :Ll, UnicodeUtils.gc("a")
    assert_equal :Lt, UnicodeUtils.gc(0x1cb)
    assert_equal :Lm, UnicodeUtils.gc(0x2b5)
    assert_equal :Lo, UnicodeUtils.gc(0x10923)

    assert_equal :Mn, UnicodeUtils.gc(0x5a0)
    assert_equal :Mc, UnicodeUtils.gc(0x93f)
    assert_equal :Me, UnicodeUtils.gc(0x20dd)

    assert_equal :Nd, UnicodeUtils.gc(0xa901)
    assert_equal :Nl, UnicodeUtils.gc(0x10144)
    assert_equal :No, UnicodeUtils.gc(0x10917)

    assert_equal :Pc, UnicodeUtils.gc(0x5f)
    assert_equal :Pd, UnicodeUtils.gc(0x2011)
    assert_equal :Ps, UnicodeUtils.gc(0x2329)
    assert_equal :Pe, UnicodeUtils.gc(0xfe38)
    assert_equal :Pi, UnicodeUtils.gc(0x201c)
    assert_equal :Pf, UnicodeUtils.gc(0x201d)
    assert_equal :Po, UnicodeUtils.gc(0x2e10)

    assert_equal :Sm, UnicodeUtils.gc(0xff0b)
    assert_equal :Sc, UnicodeUtils.gc(0xa3)
    assert_equal :Sk, UnicodeUtils.gc(0x2c2)
    assert_equal :So, UnicodeUtils.gc(0x60f)

    assert_equal :Zs, UnicodeUtils.gc(0x2001)
    assert_equal :Zl, UnicodeUtils.gc(0x2028)
    assert_equal :Zp, UnicodeUtils.gc(0x2029)

    assert_equal :Cc, UnicodeUtils.gc(0x0)
    assert_equal :Cf, UnicodeUtils.gc(0x70f)
    assert_equal :Cs, UnicodeUtils.gc(0xdb82)
    assert_equal :Co, UnicodeUtils.gc(0xf1020)
    assert_equal :Cn, UnicodeUtils.gc(0x10ffff)
    ### 30 general categories ###

    assert_equal :Lo, UnicodeUtils.gc(0x3400)
    assert_equal :Lo, UnicodeUtils.gc(0x4000)
    assert_equal :Lo, UnicodeUtils.gc(0x4db5)

    assert_equal :Lo, UnicodeUtils.gc(0x4e00)
    assert_equal :Lo, UnicodeUtils.gc(0x9fcb)
    assert_equal :Lo, UnicodeUtils.gc(0x7111)

    assert_equal :Lo, UnicodeUtils.gc(0xac00)
    assert_equal :Lo, UnicodeUtils.gc(0xd7a3)
    assert_equal :Lo, UnicodeUtils.gc(0xb70f)

    assert_equal :Cs, UnicodeUtils.gc(0xd800)
    assert_equal :Cs, UnicodeUtils.gc(0xdb7f)
    assert_equal :Cs, UnicodeUtils.gc(0xda00)

    assert_equal :Cs, UnicodeUtils.gc(0xdb80)
    assert_equal :Cs, UnicodeUtils.gc(0xdbff)
    assert_equal :Cs, UnicodeUtils.gc(0xdb90)

    assert_equal :Cs, UnicodeUtils.gc(0xdc00)
    assert_equal :Cs, UnicodeUtils.gc(0xdfff)
    assert_equal :Cs, UnicodeUtils.gc(0xdc01)

    assert_equal :Co, UnicodeUtils.gc(0xe000)
    assert_equal :Co, UnicodeUtils.gc(0xf8ff)
    assert_equal :Co, UnicodeUtils.gc(0xf8fe)

    assert_equal :Lo, UnicodeUtils.gc(0x20000)
    assert_equal :Lo, UnicodeUtils.gc(0x2a6d6)
    assert_equal :Lo, UnicodeUtils.gc(0x2b000)

    assert_equal :Lo, UnicodeUtils.gc(0x2a700)
    assert_equal :Lo, UnicodeUtils.gc(0x2b734)
    assert_equal :Lo, UnicodeUtils.gc(0x2b800)

    assert_equal :Lo, UnicodeUtils.gc(0x2b740)
    assert_equal :Lo, UnicodeUtils.gc(0x2b81d)
    assert_equal :Lo, UnicodeUtils.gc(0x2b810)

    assert_equal :Co, UnicodeUtils.gc(0xf0000)
    assert_equal :Co, UnicodeUtils.gc(0xffffd)
    assert_equal :Co, UnicodeUtils.gc(0xffafd)

    assert_equal :Co, UnicodeUtils.gc(0x100000)
    assert_equal :Co, UnicodeUtils.gc(0x10fffd)
    assert_equal :Co, UnicodeUtils.gc(0x100ffd)

    assert_equal nil, UnicodeUtils.gc(-1)
    assert_equal nil, UnicodeUtils.gc(0x110000)
  end

  def test_general_category
    assert_equal :Uppercase_Letter, UnicodeUtils.general_category("B")
    assert_equal :Lowercase_Letter, UnicodeUtils.general_category("b")
    assert_equal :Control, UnicodeUtils.general_category(0x0)
    assert_equal nil, UnicodeUtils.general_category(-1)
  end

  def test_char_type
    assert_equal :Letter, UnicodeUtils.char_type("Ä")
    assert_equal :Letter, UnicodeUtils.char_type("ä")
    assert_equal :Other, UnicodeUtils.char_type(0x0)
    assert_equal :Number, UnicodeUtils.char_type("1")
    assert_equal nil, UnicodeUtils.char_type(-1)
  end

  def test_graphic_char?
    assert_equal true, UnicodeUtils.graphic_char?("a")
    assert_equal true, UnicodeUtils.graphic_char?(0x308)
    assert_equal false, UnicodeUtils.graphic_char?("\n")
    assert_equal false, UnicodeUtils.graphic_char?(0x0)
  end

  def test_debug
    io = StringIO.new
    UnicodeUtils.debug("", io: io)
    assert_equal <<-'EOF', io.string
 Char | Ordinal | Sid | General Category | UTF-8
------+---------+-----+------------------+-------
    EOF
    io = StringIO.new
    UnicodeUtils.debug("一 \u{100000}\n", io: io)
    assert_equal <<-'EOF', io.string
 Char | Ordinal | Sid                        | General Category | UTF-8
------+---------+----------------------------+------------------+-------------
 "一" |    4E00 | CJK UNIFIED IDEOGRAPH-4E00 | Other_Letter     | E4 B8 80
 " "  |      20 | SPACE                      | Space_Separator  | 20
 N/A  |  100000 | <private-use-100000>       | Private_Use      | F4 80 80 80
 "\n" |       A | LINE FEED                  | Control          | 0A
    EOF
    io = StringIO.new
    UnicodeUtils.debug(0xd800, io: io)
    # Early Ruby 1.9 versions encoded surrogates in UTF-8,
    # although the Unicode standard does not allow it.
    begin
      0xd800.chr('utf-8')
      assert_equal <<-'EOF', io.string
 Char | Ordinal | Sid              | General Category | UTF-8
------+---------+------------------+------------------+----------
 N/A  |    D800 | <surrogate-D800> | Surrogate        | ED A0 80
      EOF
    rescue RangeError
      assert_equal <<-'EOF', io.string
 Char | Ordinal | Sid              | General Category | UTF-8
------+---------+------------------+------------------+-------
 N/A  |    D800 | <surrogate-D800> | Surrogate        | N/A
      EOF
    end
  end

  def test_code_point_type
    assert_equal :Graphic, UnicodeUtils.code_point_type("A")
    assert_equal :Graphic, UnicodeUtils.code_point_type("a")
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x1cb)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x2b5)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x10923)

    assert_equal :Graphic, UnicodeUtils.code_point_type(0x5a0)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x93f)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x20dd)

    assert_equal :Graphic, UnicodeUtils.code_point_type(0xa901)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x10144)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x10917)

    assert_equal :Graphic, UnicodeUtils.code_point_type(0x5f)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x2011)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x2329)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0xfe38)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x201c)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x201d)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x2e10)

    assert_equal :Graphic, UnicodeUtils.code_point_type(0xff0b)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0xa3)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x2c2)
    assert_equal :Graphic, UnicodeUtils.code_point_type(0x60f)

    assert_equal :Graphic, UnicodeUtils.code_point_type(0x2001)
    assert_equal :Format, UnicodeUtils.code_point_type(0x2028)
    assert_equal :Format, UnicodeUtils.code_point_type(0x2029)

    assert_equal :Control, UnicodeUtils.code_point_type(0x0)
    assert_equal :Format, UnicodeUtils.code_point_type(0x70f)
    assert_equal :Surrogate, UnicodeUtils.code_point_type(0xdb82)
    assert_equal :Private_Use, UnicodeUtils.code_point_type(0xf1020)
    assert_equal :Private_Use, UnicodeUtils.code_point_type(0x10fffd)
    assert_equal :Noncharacter, UnicodeUtils.code_point_type(0x10ffff)
    assert_equal :Noncharacter, UnicodeUtils.code_point_type(0xfffe)
    assert_equal :Noncharacter, UnicodeUtils.code_point_type(0xffff)
    assert_equal :Noncharacter, UnicodeUtils.code_point_type(0xbfffe)
    assert_equal :Noncharacter, UnicodeUtils.code_point_type(0xbffff)
    assert_equal :Reserved, UnicodeUtils.code_point_type(0x380)
    assert_equal :Reserved, UnicodeUtils.code_point_type(0xeeb)
    assert_equal :Reserved, UnicodeUtils.code_point_type(0xfff)
    assert_equal :Reserved, UnicodeUtils.code_point_type(0x7fffd)
    assert_equal :Reserved, UnicodeUtils.code_point_type(0xeffef)
    ### above is at least one assertion for every general category ###

    assert_equal nil, UnicodeUtils.code_point_type(-1)
    assert_equal nil, UnicodeUtils.code_point_type(0x110000)
  end

  def test_name_aliases
    assert_equal [UnicodeUtils::NameAlias.new("NULL", :control),
                  UnicodeUtils::NameAlias.new("NUL", :abbreviation)],
                 UnicodeUtils.name_aliases(0x0)
    assert_equal [UnicodeUtils::NameAlias.new("LATIN CAPITAL LETTER GHA", :correction)],
                 UnicodeUtils.name_aliases(0x1a2)
    assert_equal [UnicodeUtils::NameAlias.new("BYTE ORDER MARK", :alternate),
                  UnicodeUtils::NameAlias.new("BOM", :abbreviation),
                  UnicodeUtils::NameAlias.new("ZWNBSP", :abbreviation)],
                 UnicodeUtils.name_aliases(0xfeff)
    assert_equal [UnicodeUtils::NameAlias.new("PADDING CHARACTER", :figment),
                  UnicodeUtils::NameAlias.new("PAD", :abbreviation)],
                 UnicodeUtils.name_aliases(0x80)
    assert_equal [UnicodeUtils::NameAlias.new("VS256", :abbreviation)],
                 UnicodeUtils.name_aliases(0xe01ef)
    assert_equal [UnicodeUtils::NameAlias.new("LINE FEED", :control),
                  UnicodeUtils::NameAlias.new("NEW LINE", :control),
                  UnicodeUtils::NameAlias.new("END OF LINE", :control),
                  UnicodeUtils::NameAlias.new("LF", :abbreviation),
                  UnicodeUtils::NameAlias.new("NL", :abbreviation),
                  UnicodeUtils::NameAlias.new("EOL", :abbreviation)],
                 UnicodeUtils.name_aliases(0xa)
    assert_equal [UnicodeUtils::NameAlias.new("CHARACTER TABULATION", :control),
                  UnicodeUtils::NameAlias.new("HORIZONTAL TABULATION", :control),
                  UnicodeUtils::NameAlias.new("HT", :abbreviation),
                  UnicodeUtils::NameAlias.new("TAB", :abbreviation)],
                 UnicodeUtils.name_aliases("\t")
    assert_equal [],
                 UnicodeUtils.name_aliases("a")
  end

  def test_sid
    assert_equal nil, UnicodeUtils.sid(-1)
    assert_equal "NULL", UnicodeUtils.sid(0x0)
    assert_equal "LATIN CAPITAL LETTER GHA", UnicodeUtils.sid(0x1a2)
    assert_equal "LINE FEED", UnicodeUtils.sid(0xa)
    assert_equal "PADDING CHARACTER", UnicodeUtils.sid(0x80)
    assert_equal "BYTE ORDER MARK", UnicodeUtils.sid(0xfeff)
    assert_equal "SPACE", UnicodeUtils.sid(0x20)
    assert_equal "<reserved-0380>", UnicodeUtils.sid(0x380)
    assert_equal "<surrogate-D800>", UnicodeUtils.sid(0xd800)
    assert_equal "<private-use-F0000>", UnicodeUtils.sid(0xf0000)
    assert_equal "<private-use-10FFFD>", UnicodeUtils.sid(0x10fffd)
    assert_equal "<noncharacter-10FFFF>", UnicodeUtils.sid(UnicodeUtils::Codepoint::RANGE.end)
    assert_equal nil, UnicodeUtils.sid(UnicodeUtils::Codepoint::RANGE.end + 1)
  end

  def test_white_space_char?
    assert_equal true, UnicodeUtils.white_space_char?(" ")
    assert_equal true, UnicodeUtils.white_space_char?("\n")
    assert_equal true, UnicodeUtils.white_space_char?("\r")
    assert_equal true, UnicodeUtils.white_space_char?("\t")
    assert_equal true, UnicodeUtils.white_space_char?(0xa0)
    assert_equal true, UnicodeUtils.white_space_char?(0x180e)
    assert_equal true, UnicodeUtils.white_space_char?(0x2000)
    assert_equal true, UnicodeUtils.white_space_char?(0x2009)
    assert_equal true, UnicodeUtils.white_space_char?(0x200a)
    assert_equal true, UnicodeUtils.white_space_char?(0x2028)
    assert_equal true, UnicodeUtils.white_space_char?(0x2029)
    assert_equal true, UnicodeUtils.white_space_char?(0x3000)
    assert_equal false, UnicodeUtils.white_space_char?("a")
    assert_equal false, UnicodeUtils.white_space_char?("_")
  end

end
