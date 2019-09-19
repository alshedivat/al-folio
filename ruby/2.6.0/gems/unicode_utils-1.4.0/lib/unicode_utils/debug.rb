# -*- encoding: utf-8 -*-

require "unicode_utils/display_width"
require "unicode_utils/graphic_char_q"
require "unicode_utils/char_display_width"
require "unicode_utils/sid"
require "unicode_utils/general_category"

module UnicodeUtils

  # Print a table with detailed information about each code point in
  # +str+. +opts+ can have the following keys:
  #
  # +:io+:: An IO compatible object. Receives the output.
  #         Defaults to <tt>$stdout</tt>.
  #
  # +str+ may also be an Integer, in which case it is interpreted as a
  # single code point that must be in UnicodeUtils::Codepoint::RANGE.
  # 
  # Examples:
  #
  #   $ ruby -r unicode_utils/u -e 'U.debug "良い一日"'
  #    Char | Ordinal | Sid                        | General Category | UTF-8
  #   ------+---------+----------------------------+------------------+----------
  #    "良" |    826F | CJK UNIFIED IDEOGRAPH-826F | Other_Letter     | E8 89 AF
  #    "い" |    3044 | HIRAGANA LETTER I          | Other_Letter     | E3 81 84
  #    "一" |    4E00 | CJK UNIFIED IDEOGRAPH-4E00 | Other_Letter     | E4 B8 80
  #    "日" |    65E5 | CJK UNIFIED IDEOGRAPH-65E5 | Other_Letter     | E6 97 A5
  #
  #   $ ruby -r unicode_utils/u -e 'U.debug 0xd800'
  #    Char | Ordinal | Sid              | General Category | UTF-8
  #   ------+---------+------------------+------------------+-------
  #    N/A  |    D800 | <surrogate-D800> | Surrogate        | N/A
  #
  # The output is purely informal and may change even in minor
  # releases.
  def debug(str, opts = {})
    io = opts[:io] || $stdout
    table = [Impl::DEBUG_COLUMNS.keys]
    if str.kind_of?(Integer)
      table << Impl::DEBUG_COLUMNS.values.map { |f| f.call(str) }
    else
      str.each_codepoint { |cp|
        table << Impl::DEBUG_COLUMNS.values.map { |f| f.call(cp) }
      }
    end
    Impl.print_table(table, io)
    nil
  end
  module_function :debug

  module Impl # :nodoc:all

    DEBUG_COLUMNS = {
      "Char" => -> cp {
        case cp
        when 0x07 then '"\a"'
        when 0x08 then '"\b"'
        when 0x09 then '"\t"'
        when 0x0A then '"\n"'
        when 0x0D then '"\r"'
        else
          if UnicodeUtils.graphic_char?(cp) &&
                UnicodeUtils.char_display_width(cp) > 0
            '"' + cp.chr(Encoding::UTF_8) + '"'
          else
            "N/A"
          end
        end
      },
      "Ordinal" => -> cp {
        cp.to_s(16).upcase.rjust(7)
      },
      "Sid" => -> cp {
        UnicodeUtils.sid(cp)
      },
      "General Category" => -> cp {
        UnicodeUtils.general_category(cp).to_s
      },
      "UTF-8" => -> cp {
        begin
          cp.chr(Encoding::UTF_8).bytes.map { |b| sprintf("%02X", b) }.join(" ")
        rescue RangeError # surrogate code points are not valid in utf-8
          "N/A"
        end
      }
    }

    def self.column_widths(table)
      Array.new.tap { |column_widths|
        table.each_with_index { |row|
          row.each_with_index { |txt, col_i|
            dw = UnicodeUtils.display_width(txt)
            cw = column_widths[col_i]
            column_widths[col_i] = dw if cw.nil? || cw < dw
          }
        }
      }
    end

    def self.print_row(row, column_widths, io)
      row.each_with_index { |txt, col_i|
        io.print(" ")
        io.print(txt)
        if col_i != row.length - 1
          dw = UnicodeUtils.display_width(txt)
          d = column_widths[col_i] - dw
          io.print(" " * (d + 1))
          io.print("|")
        end
      }
      io.puts
    end

    def self.print_separator_row(column_widths, io)
      column_widths.each_with_index { |cw, col_i|
        io.print("-" * (cw + 2))
        if col_i != column_widths.length - 1
          io.print("+")
        end
      }
      io.puts
    end

    def self.print_table(table, io)
      cws = column_widths(table)
      print_row(table[0], cws, io)
      print_separator_row(cws, io)
      table[1..-1].each { |row|
        print_row(row, cws, io)
      }
      io.flush
    end

  end

end
