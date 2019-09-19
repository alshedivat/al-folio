# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Dart < RegexLexer
      title "Dart"
      desc "The Dart programming language (dartlang.com)"

      tag 'dart'
      filenames '*.dart'
      mimetypes 'text/x-dart'

      keywords = %w(
        as assert break case catch continue default do else finally for
        if in is new rethrow return super switch this throw try while with
      )

      declarations = %w(
        abstract dynamic const external extends factory final get implements
        native operator set static typedef var
      )

      types = %w(bool double Dynamic enum int num Object Set String void)

      imports = %w(import export library part\s*of part source)

      id = /[a-zA-Z_]\w*/

      state :root do
        rule %r(^
          (\s*(?:[a-zA-Z_][a-zA-Z\d_.\[\]]*\s+)+?) # return arguments
          ([a-zA-Z_][\w]*)                          # method name
          (\s*)(\()                                 # signature start
        )mx do |m|
          # TODO: do this better, this shouldn't need a delegation
          delegate Dart, m[1]
          token Name::Function, m[2]
          token Text, m[3]
          token Punctuation, m[4]
        end

        rule /\s+/, Text
        rule %r(//.*?$), Comment::Single
        rule %r(/\*.*?\*/)m, Comment::Multiline
        rule /"/, Str, :dqs
        rule /'/, Str, :sqs
        rule /r"[^"]*"/, Str::Other
        rule /r'[^']*'/, Str::Other
        rule /##{id}*/i, Str::Symbol
        rule /@#{id}/, Name::Decorator
        rule /(?:#{keywords.join('|')})\b/, Keyword
        rule /(?:#{declarations.join('|')})\b/, Keyword::Declaration
        rule /(?:#{types.join('|')})\b/, Keyword::Type
        rule /(?:true|false|null)\b/, Keyword::Constant
        rule /(?:class|interface)\b/, Keyword::Declaration, :class
        rule /(?:#{imports.join('|')})\b/, Keyword::Namespace, :import
        rule /(\.)(#{id})/ do
          groups Operator, Name::Attribute
        end

        rule /#{id}:/, Name::Label
        rule /\$?#{id}/, Name
        rule /[~^*!%&\[\](){}<>\|+=:;,.\/?-]/, Operator
        rule /\d*\.\d+([eE]\-?\d+)?/, Num::Float
        rule /0x[\da-fA-F]+/, Num::Hex
        rule /\d+L?/, Num::Integer
        rule /\n/, Text
      end

      state :class do
        rule /\s+/m, Text
        rule id, Name::Class, :pop!
      end

      state :dqs do
        rule /"/, Str, :pop!
        rule /[^\\\$"]+/, Str
        mixin :string
      end

      state :sqs do
        rule /'/, Str, :pop!
        rule /[^\\\$']+/, Str
        mixin :string
      end

      state :import do
        rule /;/, Operator, :pop!
        rule /(?:show|hide)\b/, Keyword::Declaration
        mixin :root
      end

      state :string do
        mixin :interpolation
        rule /\\[nrt\"\'\\]/, Str::Escape
      end

      state :interpolation do
        rule /\$#{id}/, Str::Interpol
        rule /\$\{[^\}]+\}/, Str::Interpol
      end
    end
  end
end
