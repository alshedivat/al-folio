# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class IO < RegexLexer
      tag 'io'
      title "Io"
      desc 'The IO programming language (http://iolanguage.com)'
      mimetypes 'text/x-iosrc'
      filenames '*.io'

      def self.analyze_text(text)
        return 1 if text.shebang? 'io'
      end

      def self.constants
        @constants ||= Set.new %w(nil false true)
      end

      def self.builtins
        @builtins ||= Set.new %w(
          args call clone do doFile doString else elseif for if list
          method return super then
        )
      end

      state :root do
        rule /\s+/m, Text
        rule %r(//.*?\n), Comment::Single
        rule %r(#.*?\n), Comment::Single
        rule %r(/(\\\n)?[*].*?[*](\\\n)?/)m, Comment::Multiline
        rule %r(/[+]), Comment::Multiline, :nested_comment

        rule /"(\\\\|\\"|[^"])*"/, Str

        rule %r(:?:=), Keyword
        rule /[()]/, Punctuation

        rule %r([-=;,*+><!/|^.%&\[\]{}]), Operator

        rule /[A-Z]\w*/, Name::Class

        rule /[a-z_]\w*/ do |m|
          name = m[0]

          if self.class.constants.include? name
            token Keyword::Constant
          elsif self.class.builtins.include? name
            token Name::Builtin
          else
            token Name
          end
        end

        rule %r((\d+[.]?\d*|\d*[.]\d+)(e[+-]?[0-9]+)?)i, Num::Float
        rule /\d+/, Num::Integer

        rule /@@?/, Keyword
      end

      state :nested_comment do
        rule %r([^/+]+)m, Comment::Multiline
        rule %r(/[+]), Comment::Multiline, :nested_comment
        rule %r([+]/), Comment::Multiline, :pop!
      end
    end
  end
end
