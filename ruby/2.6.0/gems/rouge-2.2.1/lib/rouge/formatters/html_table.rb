# -*- coding: utf-8 -*- #

module Rouge
  module Formatters
    class HTMLTable < Formatter
      tag 'html_table'

      def initialize(inner, opts={})
        @inner = inner
        @start_line = opts.fetch(:start_line, 1)
        @line_format = opts.fetch(:line_format, '%i')
        @table_class = opts.fetch(:table_class, 'rouge-table')
        @gutter_class = opts.fetch(:gutter_class, 'rouge-gutter')
        @code_class = opts.fetch(:code_class, 'rouge-code')
      end

      def style(scope)
        yield "#{scope} .rouge-table { border-spacing: 0 }"
        yield "#{scope} .rouge-gutter { text-align: right }"
      end

      def stream(tokens, &b)
        num_lines = 0
        last_val = ''
        formatted = ''

        tokens.each do |tok, val|
          last_val = val
          num_lines += val.scan(/\n/).size
          formatted << @inner.span(tok, val)
        end

        # add an extra line for non-newline-terminated strings
        if last_val[-1] != "\n"
          num_lines += 1
          @inner.span(Token::Tokens::Text::Whitespace, "\n") { |str| formatted << str }
        end

        # generate a string of newline-separated line numbers for the gutter>
        formatted_line_numbers = (@start_line..num_lines+@start_line-1).map do |i|
          sprintf("#{@line_format}", i) << "\n"
        end.join('')

        numbers = %(<pre class="lineno">#{formatted_line_numbers}</pre>)

        yield %(<table class="#@table_class"><tbody><tr>)

        # the "gl" class applies the style for Generic.Lineno
        yield %(<td class="#@gutter_class gl">)
        yield numbers
        yield '</td>'

        yield %(<td class="#@code_class"><pre>)
        yield formatted
        yield '</pre></td>'

        yield "</tr></tbody></table>"
      end
    end
  end
end
