# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Groovy < RegexLexer
      title "Groovy"
      desc 'The Groovy programming language (http://www.groovy-lang.org/)'
      tag 'groovy'
      filenames '*.groovy', 'Jenkinsfile'
      mimetypes 'text/x-groovy'

      ws = %r((?:\s|//.*?\n|/[*].*?[*]/)+)

      def self.analyze_text(text)
        return 1 if text.shebang?(/groovy/)
      end

      def self.keywords
        @keywords ||= Set.new %w(
          assert break case catch continue default do else finally for
          if goto instanceof new return switch this throw try while in as
        )
      end

      def self.declarations
        @declarations ||= Set.new %w(
          abstract const enum extends final implements native private
          protected public static strictfp super synchronized throws
          transient volatile
        )
      end

      def self.types
        @types ||= Set.new %w(
          def boolean byte char double float int long short void
        )
      end

      def self.constants
        @constants ||= Set.new %w(true false null)
      end

      state :root do
        rule %r(^
          (\s*(?:\w[\w\d.\[\]]*\s+)+?) # return arguments
          (\w[\w\d]*) # method name
          (\s*) (\() # signature start
        )x do |m|
          delegate self.clone, m[1]
          token Name::Function, m[2]
          token Text, m[3]
          token Operator, m[4]
        end

        # whitespace
        rule /[^\S\n]+/, Text
        rule %r(//.*?$), Comment::Single
        rule %r(/[*].*?[*]/)m, Comment::Multiline
        rule /@\w[\w\d.]*/, Name::Decorator
        rule /(class|interface|trait)\b/,  Keyword::Declaration, :class
        rule /package\b/, Keyword::Namespace, :import
        rule /import\b/, Keyword::Namespace, :import

        # TODO: highlight backslash escapes
        rule /""".*?"""/m, Str::Double
        rule /'''.*?'''/m, Str::Single

        rule /"(\\.|\\\n|.)*?"/, Str::Double
        rule /'(\\.|\\\n|.)*?'/, Str::Single
        rule %r(\$/(\$.|.)*?/\$)m, Str
        rule %r(/(\\.|\\\n|.)*?/), Str
        rule /'\\.'|'[^\\]'|'\\u[0-9a-f]{4}'/, Str::Char
        rule /(\.)([a-zA-Z_][a-zA-Z0-9_]*)/ do
          groups Operator, Name::Attribute
        end

        rule /[a-zA-Z_][a-zA-Z0-9_]*:/, Name::Label
        rule /[a-zA-Z_\$][a-zA-Z0-9_]*/ do |m|
          if self.class.keywords.include? m[0]
            token Keyword
          elsif self.class.declarations.include? m[0]
            token Keyword::Declaration
          elsif self.class.types.include? m[0]
            token Keyword::Type
          elsif self.class.constants.include? m[0]
            token Keyword::Constant
          else
            token Name
          end
        end

        rule %r([~^*!%&\[\](){}<>\|+=:;,./?-]), Operator

        # numbers
        rule /\d+\.\d+([eE]\d+)?[fd]?/, Num::Float
        rule /0x[0-9a-f]+/, Num::Hex
        rule /[0-9]+L?/, Num::Integer
        rule /\n/, Text
      end

      state :class do
        rule /\s+/, Text
        rule /\w[\w\d]*/, Name::Class, :pop!
      end

      state :import do
        rule /\s+/, Text
        rule /[\w\d.]+[*]?/, Name::Namespace, :pop!
      end
    end
  end
end
