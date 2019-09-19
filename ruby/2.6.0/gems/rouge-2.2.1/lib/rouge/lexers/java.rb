# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Java < RegexLexer
      title "Java"
      desc "The Java programming language (java.com)"

      tag 'java'
      filenames '*.java'
      mimetypes 'text/x-java'

      keywords = %w(
        assert break case catch continue default do else finally for
        if goto instanceof new return switch this throw try while
      )

      declarations = %w(
        abstract const enum extends final implements native private protected
        public static strictfp super synchronized throws transient volatile
      )

      types = %w(boolean byte char double float int long short void)

      id = /[a-zA-Z_][a-zA-Z0-9_]*/

      state :root do
        rule /[^\S\n]+/, Text
        rule %r(//.*?$), Comment::Single
        rule %r(/\*.*?\*/)m, Comment::Multiline
        # keywords: go before method names to avoid lexing "throw new XYZ"
        # as a method signature
        rule /(?:#{keywords.join('|')})\b/, Keyword

        rule %r(
          (\s*(?:[a-zA-Z_][a-zA-Z0-9_.\[\]<>]*\s+)+?) # return arguments
          ([a-zA-Z_][a-zA-Z0-9_]*)                  # method name
          (\s*)(\()                                 # signature start
        )mx do |m|
          # TODO: do this better, this shouldn't need a delegation
          delegate Java, m[1]
          token Name::Function, m[2]
          token Text, m[3]
          token Operator, m[4]
        end

        rule /@#{id}/, Name::Decorator
        rule /(?:#{declarations.join('|')})\b/, Keyword::Declaration
        rule /(?:#{types.join('|')})\b/, Keyword::Type
        rule /package\b/, Keyword::Namespace
        rule /(?:true|false|null)\b/, Keyword::Constant
        rule /(?:class|interface)\b/, Keyword::Declaration, :class
        rule /import\b/, Keyword::Namespace, :import
        rule /"(\\\\|\\"|[^"])*"/, Str
        rule /'(?:\\.|[^\\]|\\u[0-9a-f]{4})'/, Str::Char
        rule /(\.)(#{id})/ do
          groups Operator, Name::Attribute
        end

        rule /#{id}:/, Name::Label
        rule /\$?#{id}/, Name
        rule /[~^*!%&\[\](){}<>\|+=:;,.\/?-]/, Operator

        digit = /[0-9]_+[0-9]|[0-9]/
        bin_digit = /[01]_+[01]|[01]/
        oct_digit = /[0-7]_+[0-7]|[0-7]/
        hex_digit = /[0-9a-f]_+[0-9a-f]|[0-9a-f]/i
        rule /#{digit}+\.#{digit}+([eE]#{digit}+)?[fd]?/, Num::Float
        rule /0b#{bin_digit}+/i, Num::Bin
        rule /0x#{hex_digit}+/i, Num::Hex
        rule /0#{oct_digit}+/, Num::Oct
        rule /#{digit}+L?/, Num::Integer
        rule /\n/, Text
      end

      state :class do
        rule /\s+/m, Text
        rule id, Name::Class, :pop!
      end

      state :import do
        rule /\s+/m, Text
        rule /[a-z0-9_.]+\*?/i, Name::Namespace, :pop!
      end
    end
  end
end
