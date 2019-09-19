# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Coffeescript < RegexLexer
      tag 'coffeescript'
      aliases 'coffee', 'coffee-script'
      filenames '*.coffee', 'Cakefile'
      mimetypes 'text/coffeescript'

      title "CoffeeScript"
      desc 'The Coffeescript programming language (coffeescript.org)'

      def self.analyze_text(text)
        return 1 if text.shebang? 'coffee'
      end

      def self.keywords
        @keywords ||= Set.new %w(
          for in of while break return continue switch when then if else
          throw try catch finally new delete typeof instanceof super
          extends this class by
        )
      end

      def self.constants
        @constants ||= Set.new %w(
          true false yes no on off null NaN Infinity undefined
        )
      end

      def self.builtins
        @builtins ||= Set.new %w(
          Array Boolean Date Error Function Math netscape Number Object
          Packages RegExp String sun decodeURI decodeURIComponent
          encodeURI encodeURIComponent eval isFinite isNaN parseFloat
          parseInt document window
        )
      end

      id = /[$a-zA-Z_][a-zA-Z0-9_]*/

      state :comments_and_whitespace do
        rule /\s+/m, Text
        rule /###\s*\n.*?###/m, Comment::Multiline
        rule /#.*$/, Comment::Single
      end

      state :multiline_regex do
        # this order is important, so that #{ isn't interpreted
        # as a comment
        mixin :has_interpolation
        mixin :comments_and_whitespace

        rule %r(///([gim]+\b|\B)), Str::Regex, :pop!
        rule %r(/), Str::Regex
        rule %r([^/#]+), Str::Regex
      end

      state :slash_starts_regex do
        mixin :comments_and_whitespace
        rule %r(///) do
          token Str::Regex
          goto :multiline_regex
        end

        rule %r(
          /(\\.|[^\[/\\\n]|\[(\\.|[^\]\\\n])*\])+/ # a regex
          ([gim]+\b|\B)
        )x, Str::Regex, :pop!

        rule(//) { pop! }
      end

      state :root do
        rule(%r(^(?=\s|/|<!--))) { push :slash_starts_regex }
        mixin :comments_and_whitespace
        rule %r(
          [+][+]|--|~|&&|\band\b|\bor\b|\bis\b|\bisnt\b|\bnot\b|[?]|:|=|
          [|][|]|\\(?=\n)|(<<|>>>?|==?|!=?|[-<>+*`%&|^/])=?
        )x, Operator, :slash_starts_regex

        rule /[-=]>/, Name::Function

        rule /(@)([ \t]*)(#{id})/ do
          groups Name::Variable::Instance, Text, Name::Attribute
          push :slash_starts_regex
        end

        rule /([.])([ \t]*)(#{id})/ do
          groups Punctuation, Text, Name::Attribute
          push :slash_starts_regex
        end

        rule /#{id}(?=\s*:)/, Name::Attribute, :slash_starts_regex

        rule /#{id}/ do |m|
          if self.class.keywords.include? m[0]
            token Keyword
          elsif self.class.constants.include? m[0]
            token Name::Constant
          elsif self.class.builtins.include? m[0]
            token Name::Builtin
          else
            token Name::Other
          end

          push :slash_starts_regex
        end

        rule /[{(\[;,]/, Punctuation, :slash_starts_regex
        rule /[})\].]/, Punctuation

        rule /\d+[.]\d+([eE]\d+)?[fd]?/, Num::Float
        rule /0x[0-9a-fA-F]+/, Num::Hex
        rule /\d+/, Num::Integer
        rule /"""/, Str, :tdqs
        rule /'''/, Str, :tsqs
        rule /"/, Str, :dqs
        rule /'/, Str, :sqs
      end

      state :strings do
        # all coffeescript strings are multi-line
        rule /[^#\\'"]+/m, Str

        rule /\\./, Str::Escape
        rule /#/, Str
      end

      state :double_strings do
        rule /'/, Str
        mixin :has_interpolation
        mixin :strings
      end

      state :single_strings do
        rule /"/, Str
        mixin :strings
      end

      state :interpolation do
        rule /}/, Str::Interpol, :pop!
        mixin :root
      end

      state :has_interpolation do
        rule /[#][{]/, Str::Interpol, :interpolation
      end

      state :dqs do
        rule /"/, Str, :pop!
        mixin :double_strings
      end

      state :tdqs do
        rule /"""/, Str, :pop!
        rule /"/, Str
        mixin :double_strings
      end

      state :sqs do
        rule /'/, Str, :pop!
        mixin :single_strings
      end

      state :tsqs do
        rule /'''/, Str, :pop!
        rule /'/, Str
        mixin :single_strings
      end
    end
  end
end
