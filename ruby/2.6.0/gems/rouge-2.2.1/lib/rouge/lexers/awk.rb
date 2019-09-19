# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Awk < RegexLexer
      title "Awk"
      desc "pattern-directed scanning and processing language"

      tag 'awk'
      filenames '*.awk'
      mimetypes 'application/x-awk'

      def self.analyze_text(text)
        return 1 if text.shebang?('awk')
      end

      id = /[$a-zA-Z_][a-zA-Z0-9_]*/

      def self.keywords
        @keywords ||= Set.new %w(
          if else while for do break continue return next nextfile delete
          exit print printf getline
        )
      end

      def self.declarations
        @declarations ||= Set.new %w(function)
      end

      def self.reserved
        @reserved ||= Set.new %w(BEGIN END)
      end

      def self.constants
        @constants ||= Set.new %w(
          CONVFMT FS NF NR FNR FILENAME RS OFS ORS OFMT SUBSEP ARGC ARGV
          ENVIRON
        )
      end

      def self.builtins
        @builtins ||= %w(
          exp log sqrt sin cos atan2 length rand srand int substr index match
          split sub gsub sprintf system tolower toupper
        )
      end

      state :comments_and_whitespace do
        rule /\s+/, Text
        rule %r(#.*?$), Comment::Single
      end

      state :expr_start do
        mixin :comments_and_whitespace
        rule %r(/) do
          token Str::Regex
          goto :regex
        end
        rule //, Text, :pop!
      end

      state :regex do
        rule %r(/) do
          token Str::Regex
          goto :regex_end
        end

        rule %r([^/]\n), Error, :pop!

        rule /\n/, Error, :pop!
        rule /\[\^/, Str::Escape, :regex_group
        rule /\[/, Str::Escape, :regex_group
        rule /\\./, Str::Escape
        rule %r{[(][?][:=<!]}, Str::Escape
        rule /[{][\d,]+[}]/, Str::Escape
        rule /[()?]/, Str::Escape
        rule /./, Str::Regex
      end

      state :regex_end do
        rule(//) { pop! }
      end

      state :regex_group do
        # specially highlight / in a group to indicate that it doesn't
        # close the regex
        rule /\//, Str::Escape

        rule %r([^/]\n) do
          token Error
          pop! 2
        end

        rule /\]/, Str::Escape, :pop!
        rule /\\./, Str::Escape
        rule /./, Str::Regex
      end

      state :bad_regex do
        rule /[^\n]+/, Error, :pop!
      end

      state :root do
        mixin :comments_and_whitespace
        rule %r((?<=\n)(?=\s|/)), Text, :expr_start
        rule %r([-<>+*/%\^!=]=?|in\b|\+\+|--|\|), Operator, :expr_start
        rule %r(&&|\|\||~!?), Operator, :expr_start
        rule /[(\[,]/, Punctuation, :expr_start
        rule /;/, Punctuation, :statement
        rule /[)\].]/, Punctuation

        rule /[?]/ do
          token Punctuation
          push :ternary
          push :expr_start
        end

        rule /[{}]/, Punctuation, :statement

        rule id do |m|
          if self.class.keywords.include? m[0]
            token Keyword
            push :expr_start
          elsif self.class.declarations.include? m[0]
            token Keyword::Declaration
            push :expr_start
          elsif self.class.reserved.include? m[0]
            token Keyword::Reserved
          elsif self.class.constants.include? m[0]
            token Keyword::Constant
          elsif self.class.builtins.include? m[0]
            token Name::Builtin
          elsif m[0] =~ /^\$/
            token Name::Variable
          else
            token Name::Other
          end
        end

        rule /[0-9]+\.[0-9]+/, Num::Float
        rule /[0-9]+/, Num::Integer
        rule /"(\\[\\"]|[^"])*"/, Str::Double
        rule /:/, Punctuation
      end

      state :statement do
        rule /[{}]/, Punctuation
        mixin :expr_start
      end

      state :ternary do
        rule /:/ do
          token Punctuation
          goto :expr_start
        end

        mixin :root
      end
    end
  end
end
