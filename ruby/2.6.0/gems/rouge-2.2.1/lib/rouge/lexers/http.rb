# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class HTTP < RegexLexer
      tag 'http'
      title "HTTP"
      desc 'http requests and responses'

      def self.http_methods
        @http_methods ||= %w(GET POST PUT DELETE HEAD OPTIONS TRACE PATCH)
      end

      def content_lexer
        return Lexers::PlainText unless @content_type

        @content_lexer ||= Lexer.guess_by_mimetype(@content_type)
      rescue Lexer::AmbiguousGuess
        @content_lexer = Lexers::PlainText
      end

      start { @content_type = 'text/plain' }

      state :root do
        # request
        rule %r(
          (#{HTTP.http_methods.join('|')})([ ]+) # method
          ([^ ]+)([ ]+)                     # path
          (HTTPS?)(/)(1[.][01])(\r?\n|$)  # http version
        )ox do
          groups(
            Name::Function, Text,
            Name::Namespace, Text,
            Keyword, Operator, Num, Text
          )

          push :headers
        end

        # response
        rule %r(
          (HTTPS?)(/)(1[.][01])([ ]+) # http version
          (\d{3})([ ]+)               # status
          ([^\r\n]+)(\r?\n|$)       # status message
        )x do
          groups(
            Keyword, Operator, Num, Text,
            Num, Text,
            Name::Exception, Text
          )
          push :headers
        end
      end

      state :headers do
        rule /([^\s:]+)( *)(:)( *)([^\r\n]+)(\r?\n|$)/ do |m|
          key = m[1]
          value = m[5]
          if key.strip.casecmp('content-type').zero?
            @content_type = value.split(';')[0].downcase
          end

          groups Name::Attribute, Text, Punctuation, Text, Str, Text
        end

        rule /([^\r\n]+)(\r?\n|$)/ do
          groups Str, Text
        end

        rule /\r?\n/, Text, :content
      end

      state :content do
        rule /.+/m do |m|
          delegate(content_lexer)
        end
      end
    end
  end
end
