# -*- coding: utf-8 -*- #

module Rouge
  module Formatters
    class HTMLLinewise < Formatter
      def initialize(formatter, opts={})
        @formatter = formatter
        @class_format = opts.fetch(:class, 'line-%i')
      end

      def stream(tokens, &b)
        token_lines(tokens) do |line|
          yield "<div class=#{next_line_class}>"
          line.each do |tok, val|
            yield @formatter.span(tok, val)
          end
          yield '</div>'
        end
      end

      def next_line_class
        @lineno ||= 0
        sprintf(@class_format, @lineno += 1).inspect
      end
    end
  end
end
