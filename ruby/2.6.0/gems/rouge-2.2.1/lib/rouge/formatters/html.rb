# -*- coding: utf-8 -*- #

module Rouge
  module Formatters
    # Transforms a token stream into HTML output.
    class HTML < Formatter
      tag 'html'

      # @yield the html output.
      def stream(tokens, &b)
        tokens.each { |tok, val| yield span(tok, val) }
      end

      def span(tok, val)
        safe_span(tok, val.gsub(/[&<>]/, TABLE_FOR_ESCAPE_HTML))
      end

      def safe_span(tok, safe_val)
        if tok == Token::Tokens::Text
          safe_val
        else
          shortname = tok.shortname \
            or raise "unknown token: #{tok.inspect} for #{safe_val.inspect}"

          "<span class=\"#{shortname}\">#{safe_val}</span>"
        end
      end


      TABLE_FOR_ESCAPE_HTML = {
        '&' => '&amp;',
        '<' => '&lt;',
        '>' => '&gt;',
      }
    end
  end
end
