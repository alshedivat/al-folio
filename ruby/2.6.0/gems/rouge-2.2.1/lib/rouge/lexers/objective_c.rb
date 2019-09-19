# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    load_lexer 'c.rb'

    class ObjectiveC < C
      tag 'objective_c'
      title "Objective-C"
      desc 'an extension of C commonly used to write Apple software'
      aliases 'objc'
      filenames '*.m', '*.h'

      mimetypes 'text/x-objective_c', 'application/x-objective_c'

      def self.at_keywords
        @at_keywords ||= %w(
          selector private protected public encode synchronized try
          throw catch finally end property synthesize dynamic optional
          interface implementation import
        )
      end

      def self.at_builtins
        @at_builtins ||= %w(true false YES NO)
      end

      def self.builtins
        @builtins ||= %w(YES NO nil)
      end

      def self.analyze_text(text)
        return 1 if text =~ /@(end|implementation|protocol|property)\b/

        id = /[a-z$_][a-z0-9$_]*/i
        return 0.4 if text =~ %r(
          \[ \s* #{id} \s+
          (?:
            #{id} \s* \]
            | #{id}? :
          )
        )x
        return 0.4 if text.include? '@"'
      end

      id = /[a-z$_][a-z0-9$_]*/i

      prepend :statements do
        rule /@"/, Str, :string
        rule /@'(\\[0-7]{1,3}|\\x[a-fA-F0-9]{1,2}|\\.|[^\\'\n]')/,
          Str::Char
        rule /@(\d+[.]\d*|[.]\d+|\d+)e[+-]?\d+l?/i,
          Num::Float
        rule /@(\d+[.]\d*|[.]\d+|\d+f)f?/i, Num::Float
        rule /@0x\h+[lL]?/, Num::Hex
        rule /@0[0-7]+l?/i, Num::Oct
        rule /@\d+l?/, Num::Integer
        rule /\bin\b/, Keyword

        rule /@(?:interface|implementation)\b/ do
          token Keyword
          goto :classname
        end

        rule /@(?:class|protocol)\b/ do
          token Keyword
          goto :forward_classname
        end

        rule /@([[:alnum:]]+)/ do |m|
          if self.class.at_keywords.include? m[1]
            token Keyword
          elsif self.class.at_builtins.include? m[1]
            token Name::Builtin
          else
            token Error
          end
        end

        rule /[?]/, Punctuation, :ternary
        rule /\[/,  Punctuation, :message
        rule /@\[/, Punctuation, :array_literal
        rule /@\{/, Punctuation, :dictionary_literal
      end

      state :ternary do
        rule /:/, Punctuation, :pop!
        mixin :statements
      end

      state :message_shared do
        rule /\]/, Punctuation, :pop!
        rule /\{/, Punctuation, :pop!
        rule /;/, Error

        mixin :statement
      end

      state :message do
        rule /(#{id})(\s*)(:)/ do
          groups(Name::Function, Text, Punctuation)
          goto :message_with_args
        end

        rule /(#{id})(\s*)(\])/ do
          groups(Name::Function, Text, Punctuation)
          pop!
        end

        mixin :message_shared
      end

      state :message_with_args do
        rule /\{/, Punctuation, :function
        rule /(#{id})(\s*)(:)/ do
          groups(Name::Function, Text, Punctuation)
          pop!
        end

        mixin :message_shared
      end

      state :array_literal do
        rule /]/, Punctuation, :pop!
        rule /,/, Punctuation
        mixin :statements
      end

      state :dictionary_literal do
        rule /}/, Punctuation, :pop!
        rule /,/, Punctuation
        mixin :statements
      end

      state :classname do
        mixin :whitespace

        rule /(#{id})(\s*)(:)(\s*)(#{id})/ do
          groups(Name::Class, Text,
                 Punctuation, Text,
                 Name::Class)
          pop!
        end

        rule /(#{id})(\s*)([(])(\s*)(#{id})(\s*)([)])/ do
          groups(Name::Class, Text,
                 Punctuation, Text,
                 Name::Label, Text,
                 Punctuation)
          pop!
        end

        rule id, Name::Class, :pop!
      end

      state :forward_classname do
        mixin :whitespace

        rule /(#{id})(\s*)(,)(\s*)/ do
          groups(Name::Class, Text, Punctuation, Text)
          push
        end

        rule /(#{id})(\s*)(;?)/ do
          groups(Name::Class, Text, Punctuation)
          pop!
        end
      end

      prepend :root do
        rule %r(
          ([-+])(\s*)
          ([(].*?[)])?(\s*)
          (?=#{id}:?)
        )ix do |m|
          token Keyword, m[1]; token Text, m[2]
          recurse m[3]; token Text, m[4]
          push :method_definition
        end
      end

      state :method_definition do
        rule /,/, Punctuation
        rule /[.][.][.]/, Punctuation
        rule /([(].*?[)])(#{id})/ do |m|
          recurse m[1]; token Name::Variable, m[2]
        end

        rule /(#{id})(\s*)(:)/m do
          groups(Name::Function, Text, Punctuation)
        end

        rule /;/, Punctuation, :pop!

        rule /{/ do
          token Punctuation
          goto :function
        end

        mixin :inline_whitespace
        rule %r(//.*?\n), Comment::Single
        rule /\s+/m, Text

        rule(//) { pop! }
      end
    end
  end
end
