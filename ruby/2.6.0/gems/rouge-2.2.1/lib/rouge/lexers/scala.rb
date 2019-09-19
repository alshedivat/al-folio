# -*- coding: utf-8 #

module Rouge
  module Lexers
    class Scala < RegexLexer
      title "Scala"
      desc "The Scala programming language (scala-lang.org)"
      tag 'scala'
      aliases 'scala'
      filenames '*.scala', '*.sbt'

      mimetypes 'text/x-scala', 'application/x-scala'

      # As documented in the ENBF section of the scala specification
      # http://www.scala-lang.org/docu/files/ScalaReference.pdf
      whitespace = /\p{Space}/
      letter = /[\p{L}$_]/
      upper = /[\p{Lu}$_]/
      digits = /[0-9]/
      parens = /[(){}\[\]]/
      delims = %r([‘’".;,])

      # negative lookahead to filter out other classes
      op = %r(
        (?!#{whitespace}|#{letter}|#{digits}|#{parens}|#{delims})
        [\u0020-\u007F\p{Sm}\p{So}]
      )x

      idrest = %r(#{letter}(?:#{letter}|#{digits})*(?:(?<=_)#{op}+)?)x

      keywords = %w(
        abstract case catch def do else extends final finally for forSome
        if implicit lazy match new override private protected requires return
        sealed super this throw try val var while with yield
      )

      state :root do
        rule /(class|trait|object)(\s+)/ do
          groups Keyword, Text
          push :class
        end
        rule /'#{idrest}[^']/, Str::Symbol
        rule /[^\S\n]+/, Text

        rule %r(//.*?\n), Comment::Single
        rule %r(/\*), Comment::Multiline, :comment

        rule /@#{idrest}/, Name::Decorator
        rule %r(
          (#{keywords.join("|")})\b|
          (<[%:-]|=>|>:|[#=@_\u21D2\u2190])(\b|(?=\s)|$)
        )x, Keyword
        rule /:(?!#{op})/, Keyword, :type
        rule /#{upper}#{idrest}\b/, Name::Class
        rule /(true|false|null)\b/, Keyword::Constant
        rule /(import|package)(\s+)/ do
          groups Keyword, Text
          push :import
        end

        rule /(type)(\s+)/ do
          groups Keyword, Text
          push :type
        end

        rule /""".*?"""(?!")/m, Str
        rule /"(\\\\|\\"|[^"])*"/, Str
        rule /'\\.'|'[^\\]'|'\\u[0-9a-fA-F]{4}'/, Str::Char

        rule idrest, Name
        rule /`[^`]+`/, Name

        rule /\[/, Operator, :typeparam
        rule /[\(\)\{\};,.#]/, Operator
        rule /#{op}+/, Operator

        rule /([0-9][0-9]*\.[0-9]*|\.[0-9]+)([eE][+-]?[0-9]+)?[fFdD]?/, Num::Float
        rule /([0-9][0-9]*[fFdD])/, Num::Float
        rule /0x[0-9a-fA-F]+/, Num::Hex
        rule /[0-9]+L?/, Num::Integer
        rule /\n/, Text
      end

      state :class do
        rule /(#{idrest}|#{op}+|`[^`]+`)(\s*)(\[)/ do
          groups Name::Class, Text, Operator
          push :typeparam
        end

        rule /\s+/, Text
        rule /{/, Operator, :pop!
        rule /\(/, Operator, :pop!
        rule %r(//.*?\n), Comment::Single, :pop!
        rule %r(#{idrest}|#{op}+|`[^`]+`), Name::Class, :pop!
      end

      state :type do
        rule /\s+/, Text
        rule /<[%:]|>:|[#_\u21D2]|forSome|type/, Keyword
        rule /([,\);}]|=>|=)(\s*)/ do
          groups Operator, Text
          pop!
        end
        rule /[\(\{]/, Operator, :type

        typechunk = /(?:#{idrest}|#{op}+\`[^`]+`)/
        rule /(#{typechunk}(?:\.#{typechunk})*)(\s*)(\[)/ do
          groups Keyword::Type, Text, Operator
          pop!
          push :typeparam
        end

        rule /(#{typechunk}(?:\.#{typechunk})*)(\s*)$/ do
          groups Keyword::Type, Text
          pop!
        end

        rule %r(//.*?\n), Comment::Single, :pop!
        rule /\.|#{idrest}|#{op}+|`[^`]+`/, Keyword::Type
      end

      state :typeparam do
        rule /[\s,]+/, Text
        rule /<[%:]|=>|>:|[#_\u21D2]|forSome|type/, Keyword
        rule /([\]\)\}])/, Operator, :pop!
        rule /[\(\[\{]/, Operator, :typeparam
        rule /\.|#{idrest}|#{op}+|`[^`]+`/, Keyword::Type
      end

      state :comment do
        rule %r([^/\*]+), Comment::Multiline
        rule %r(/\*), Comment::Multiline, :comment
        rule %r(\*/), Comment::Multiline, :pop!
        rule %r([*/]), Comment::Multiline
      end

      state :import do
        rule %r((#{idrest}|\.)+), Name::Namespace, :pop!
      end
    end
  end
end
