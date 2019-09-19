module Liquid
  class Expression
    class MethodLiteral
      attr_reader :method_name, :to_s

      def initialize(method_name, to_s)
        @method_name = method_name
        @to_s = to_s
      end

      def to_liquid
        to_s
      end
    end

    LITERALS = {
      nil => nil, 'nil'.freeze => nil, 'null'.freeze => nil, ''.freeze => nil,
      'true'.freeze  => true,
      'false'.freeze => false,
      'blank'.freeze => MethodLiteral.new(:blank?, '').freeze,
      'empty'.freeze => MethodLiteral.new(:empty?, '').freeze
    }

    def self.parse(markup)
      if LITERALS.key?(markup)
        LITERALS[markup]
      else
        case markup
        when /\A'(.*)'\z/m # Single quoted strings
          $1
        when /\A"(.*)"\z/m # Double quoted strings
          $1
        when /\A(-?\d+)\z/ # Integer and floats
          $1.to_i
        when /\A\((\S+)\.\.(\S+)\)\z/ # Ranges
          RangeLookup.parse($1, $2)
        when /\A(-?\d[\d\.]+)\z/ # Floats
          $1.to_f
        else
          VariableLookup.parse(markup)
        end
      end
    end
  end
end
