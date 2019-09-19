# -*- coding: utf-8 -*- #

module Rouge
  module Lexers

    class Cfscript < RegexLexer
      title "CFScript"
      desc 'CFScript, the CFML scripting language'
      tag 'cfscript'
      aliases 'cfc'
      filenames '*.cfc'

      def self.keywords
        @keywords ||= %w(
          if else var xml default break switch do try catch throw in continue for return while required
        )
      end

      def self.declarations
        @declarations ||= %w(
          component property function remote public package private
        )
      end

      def self.types
        @types ||= %w(
          any array binary boolean component date guid numeric query string struct uuid void xml
        )
      end

      constants = %w(application session client cookie super this variables arguments cgi)


      operators = %w(\+\+ -- && \|\| <= >= < > == != mod eq lt gt lte gte not is and or xor eqv imp equal contains \? )
      dotted_id = /[$a-zA-Z_][a-zA-Z0-9_.]*/

      state :root do
        mixin :comments_and_whitespace
        rule /(?:#{operators.join('|')}|does not contain|greater than(?: or equal to)?|less than(?: or equal to)?)\b/i, Operator, :expr_start
        rule %r([-<>+*%&|\^/!=]=?), Operator, :expr_start

        rule /[(\[,]/, Punctuation, :expr_start
        rule /;/, Punctuation, :statement
        rule /[)\].]/, Punctuation

        rule /[?]/ do
          token Punctuation
          push :ternary
          push :expr_start
        end

        rule /[{}]/, Punctuation, :statement

        rule /(?:#{constants.join('|')})\b/, Name::Constant
        rule /(?:true|false|null)\b/, Keyword::Constant
        rule /import\b/, Keyword::Namespace, :import
        rule /(#{dotted_id})(\s*)(:)(\s*)/ do
          groups Name, Text, Punctuation, Text
          push :expr_start
        end

        rule /([A-Za-z_$][\w.]*)(\s*)(\()/ do |m|
          if self.class.keywords.include? m[1]
            token Keyword, m[1]
            token Text, m[2]
            token Punctuation, m[3]
          else
            token Name::Function, m[1]
            token Text, m[2]
            token Punctuation, m[3]
          end
        end

        rule dotted_id do |m|
          if self.class.declarations.include? m[0]
            token Keyword::Declaration
            push :expr_start
          elsif self.class.keywords.include? m[0]
            token Keyword
            push :expr_start
          elsif self.class.types.include? m[0]
            token Keyword::Type
            push :expr_start
          else
            token Name::Other
          end
        end

        rule /[0-9][0-9]*\.[0-9]+([eE][0-9]+)?[fd]?/, Num::Float
        rule /0x[0-9a-fA-F]+/, Num::Hex
        rule /[0-9]+/, Num::Integer
        rule /"(\\\\|\\"|[^"])*"/, Str::Double
        rule /'(\\\\|\\'|[^'])*'/, Str::Single

      end

      # same as java, broken out
      state :comments_and_whitespace do
        rule /\s+/, Text
        rule %r(//.*?$), Comment::Single
        rule %r(/\*.*?\*/)m, Comment::Multiline
      end

      state :expr_start do
        mixin :comments_and_whitespace

        rule /[{]/, Punctuation, :object

        rule //, Text, :pop!
      end

      state :statement do

        rule /[{}]/, Punctuation

        mixin :expr_start
      end

      # object literals
      state :object do
        mixin :comments_and_whitespace
        rule /[}]/ do
          token Punctuation
          push :expr_start
        end

        rule /(#{dotted_id})(\s*)(:)/ do
          groups Name::Other, Text, Punctuation
          push :expr_start
        end

        rule /:/, Punctuation
        mixin :root
      end

      # ternary expressions, where <dotted_id>: is not a label!
      state :ternary do
        rule /:/ do
          token Punctuation
          goto :expr_start
        end

        mixin :root
      end

      state :import do
        rule /\s+/m, Text
        rule /[a-z0-9_.]+\*?/i, Name::Namespace, :pop!
      end

    end
  end
end
