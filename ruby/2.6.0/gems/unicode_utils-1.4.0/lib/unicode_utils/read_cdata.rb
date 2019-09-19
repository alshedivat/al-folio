# -*- encoding: utf-8 -*-

module UnicodeUtils

  # Absolute path to the directory from which UnicodeUtils loads its
  # compiled Unicode data files at runtime.
  CDATA_DIR = File.absolute_path(File.join(File.dirname(__FILE__), "..", "..", "cdata"))

  module Impl # :nodoc:

    EAST_ASIAN_WIDTH_SYMBOL_MAP = {
      1 => :Ambiguous,
      2 => :Halfwidth,
      3 => :Wide,
      4 => :Fullwidth,
      5 => :Narrow
    }.freeze

    NAME_ALIAS_TYPE_TO_SYMBOL_MAP = {
      1 => :correction,
      2 => :control,
      3 => :alternate,
      4 => :figment,
      5 => :abbreviation
    }.freeze

    def self.open_cdata_file(filename, &block)
      File.open(File.join(CDATA_DIR, filename), "r:US-ASCII:-", &block)
    end

    def self.read_code_point_set(filename)
      Hash.new.tap { |set|
        open_cdata_file(filename) do |input|
          buffer = "x" * 6
          buffer.force_encoding(Encoding::US_ASCII)
          while input.read(6, buffer)
            set[buffer.to_i(16)] = true
          end
        end
      }
    end

    def self.read_code_point_map(filename)
      Hash.new.tap { |map|
        open_cdata_file(filename) do |input|
          buffer = "x" * 6
          buffer.force_encoding(Encoding::US_ASCII)
          while input.read(6, buffer)
            map[buffer.to_i(16)] = input.read(6, buffer).to_i(16)
          end
        end
      }
    end

    def self.read_multivalued_map(filename)
      Hash.new.tap { |map|
        open_cdata_file(filename) do |input|
          buffer = "x" * 6
          buffer.force_encoding(Encoding::US_ASCII)
          while input.read(6, buffer)
            cp = buffer.to_i(16)
            mapping = []
            while input.read(6, buffer).getbyte(0) != 120
              mapping << buffer.to_i(16)
            end
            map[cp] = mapping
          end
        end
      }
    end

    def self.read_names(filename)
      Hash.new.tap { |map|
        open_cdata_file(filename) do |input|
          buffer = "x" * 6
          buffer.force_encoding(Encoding::US_ASCII)
          while input.read(6, buffer)
            map[buffer.to_i(16)] = input.gets.tap { |x| x.chomp! }
          end
        end
      }
    end

    def self.read_conditional_casings(filename)
      Hash.new.tap { |cp_map|
        open_cdata_file(filename) do |input|
          input.each_line { |line|
            line.chomp!
            record = line.split(";")
            cp = record[0].to_i(16)
            mapping = record[1].split(",").map { |c| c.to_i(16) }
            language_id = record[2].empty? ? nil : record[2].to_sym
            context = record[3] && record[3].gsub('_', '')
            casing = Impl.const_get("#{context}ConditionalCasing").new(mapping)
            (cp_map[cp] ||= {})[language_id] = casing
          }
        end
      }
    end

    def self.read_combining_class_map
      Hash.new.tap { |map|
        open_cdata_file("combining_class_map") do |input|
          buffer = "x" * 6
          buffer.force_encoding(Encoding::US_ASCII)
          cc_buffer = "x" * 2
          cc_buffer.force_encoding(Encoding::US_ASCII)
          while input.read(6, buffer)
            map[buffer.to_i(16)] = input.read(2, cc_buffer).to_i(16)
          end
        end
      }
    end

    # Read a map whose keys are code points (6 hexgdigits, converted to
    # integer) and whose values are single hexdigits (converted to
    # integer).
    def self.read_hexdigit_map(filename)
      Hash.new.tap { |map|
        open_cdata_file(filename) do |input|
          buffer = "x" * 6
          buffer.force_encoding(Encoding::US_ASCII)
          val_buffer = "x"
          val_buffer.force_encoding(Encoding::US_ASCII)
          while input.read(6, buffer)
            map[buffer.to_i(16)] = input.read(1, val_buffer).to_i(16)
          end
        end
      }
    end

    # Returns a list (array) of pairs (two element Arrays) of Range
    # (code points) and associated integer value.
    def self.read_range_to_hexdigit_list(filename)
      Array.new.tap { |list|
        open_cdata_file(filename) do |input|
          cp_buffer = "x" * 6
          cp_buffer.force_encoding(Encoding::US_ASCII)
          val_buffer = "x"
          val_buffer.force_encoding(Encoding::US_ASCII)
          while input.read(6, cp_buffer)
            list << [
              Range.new(cp_buffer.to_i(16), input.read(6, cp_buffer).to_i(16)),
              input.read(1, val_buffer).to_i(16)
            ]
          end
        end
      }
    end

    def self.read_east_asian_width_per_cp(filename)
      # like read_hexdigit_map, but with translation to symbol values
      Hash.new(:Neutral).tap { |map|
        open_cdata_file(filename) do |input|
          buffer = "x" * 6
          buffer.force_encoding(Encoding::US_ASCII)
          val_buffer = "x"
          val_buffer.force_encoding(Encoding::US_ASCII)
          while input.read(6, buffer)
            map[buffer.to_i(16)] =
              EAST_ASIAN_WIDTH_SYMBOL_MAP[input.read(1, val_buffer).to_i(16)]
          end
        end
      }
    end

    def self.read_east_asian_width_ranges(filename)
      read_range_to_hexdigit_list(filename).tap { |list|
        list.each { |pair|
          pair[1] = EAST_ASIAN_WIDTH_SYMBOL_MAP[pair[1]]
        }
      }
    end

    def self.read_general_category_per_cp(filename)
      Hash.new.tap { |map|
        open_cdata_file(filename) do |input|
          cp_buffer = "x" * 6
          cp_buffer.force_encoding(Encoding::US_ASCII)
          cat_buffer = "x" * 2
          cat_buffer.force_encoding(Encoding::US_ASCII)
          while input.read(6, cp_buffer)
            map[cp_buffer.to_i(16)] = input.read(2, cat_buffer).to_sym
          end
        end
      }
    end

    def self.read_general_category_ranges(filename)
      Array.new.tap { |list|
        open_cdata_file(filename) do |input|
          cp_buffer = "x" * 6
          cp_buffer.force_encoding(Encoding::US_ASCII)
          cat_buffer = "x" * 2
          cat_buffer.force_encoding(Encoding::US_ASCII)
          while input.read(6, cp_buffer)
            list << [
              Range.new(cp_buffer.to_i(16), input.read(6, cp_buffer).to_i(16)),
              input.read(2, cat_buffer).to_sym
            ]
          end
        end
      }
    end

    def self.read_symbol_map(filename)
      Hash.new.tap { |map|
        open_cdata_file(filename) do |input|
          input.each_line { |line|
            parts = line.split(";")
            parts[0].strip!
            parts[1].strip!
            map[parts[0].to_sym] = parts[1].to_sym
          }
        end
      }
    end

    def self.read_name_aliases(filename)
      Hash.new.tap { |map|
        open_cdata_file(filename) do |input|
          cp_buffer = "x" * 6
          cp_buffer.force_encoding(Encoding::US_ASCII)
          ac_buffer = "x" * 1
          ac_buffer.force_encoding(Encoding::US_ASCII)
          at_buffer = "x" * 1
          at_buffer.force_encoding(Encoding::US_ASCII)
          al_buffer = "x" * 2
          al_buffer.force_encoding(Encoding::US_ASCII)
          while input.read(6, cp_buffer)
            aliases = Array.new(input.read(1, ac_buffer).to_i(16))
            0.upto(aliases.length - 1) { |i|
              type = NAME_ALIAS_TYPE_TO_SYMBOL_MAP[input.read(1, at_buffer).to_i(16)]
              name = input.read(input.read(2, al_buffer).to_i(16))
              aliases[i] = NameAlias.new(name.freeze, type)
            }
            map[cp_buffer.to_i(16)] = aliases.freeze
          end
        end
      }
    end

  end

end
