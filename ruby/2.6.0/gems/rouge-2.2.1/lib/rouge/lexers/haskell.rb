# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Haskell < RegexLexer
      title "Haskell"
      desc "The Haskell programming language (haskell.org)"

      tag 'haskell'
      aliases 'hs'
      filenames '*.hs'
      mimetypes 'text/x-haskell'

      def self.analyze_text(text)
        return 1 if text.shebang?('runhaskell')
      end

      reserved = %w(
        _ case class data default deriving do else if in
        infix[lr]? instance let newtype of then type where
      )

      ascii = %w(
        NUL SOH [SE]TX EOT ENQ ACK BEL BS HT LF VT FF CR S[OI] DLE
        DC[1-4] NAK SYN ETB CAN EM SUB ESC [FGRU]S SP DEL
      )

      state :basic do
        rule /\s+/m, Text
        rule /{-#/, Comment::Preproc, :comment_preproc
        rule /{-/, Comment::Multiline, :comment
        rule /^--\s+\|.*?$/, Comment::Doc
        # this is complicated in order to support custom symbols
        # like -->
        rule /--(?![!#\$\%&*+.\/<=>?@\^\|_~]).*?$/, Comment::Single
      end

      # nested commenting
      state :comment do
        rule /-}/, Comment::Multiline, :pop!
        rule /{-/, Comment::Multiline, :comment
        rule /[^-{}]+/, Comment::Multiline
        rule /[-{}]/, Comment::Multiline
      end

      state :comment_preproc do
        rule /-}/, Comment::Preproc, :pop!
        rule /{-/, Comment::Preproc, :comment
        rule /[^-{}]+/, Comment::Preproc
        rule /[-{}]/, Comment::Preproc
      end

      state :root do
        mixin :basic

        rule /\bimport\b/, Keyword::Reserved, :import
        rule /\bmodule\b/, Keyword::Reserved, :module
        rule /\berror\b/, Name::Exception
        rule /\b(?:#{reserved.join('|')})\b/, Keyword::Reserved
        # not sure why, but ^ doesn't work here
        # rule /^[_a-z][\w']*/, Name::Function
        rule /[_a-z][\w']*/, Name
        rule /[A-Z][\w']*/, Keyword::Type

        # lambda operator
        rule %r(\\(?![:!#\$\%&*+.\\/<=>?@^\|~-]+)), Name::Function
        # special operators
        rule %r((<-|::|->|=>|=)(?![:!#\$\%&*+.\\/<=>?@^\|~-]+)), Operator
        # constructor/type operators
        rule %r(:[:!#\$\%&*+.\\/<=>?@^\|~-]*), Operator
        # other operators
        rule %r([:!#\$\%&*+.\\/<=>?@^\|~-]+), Operator

        rule /\d+e[+-]?\d+/i, Num::Float
        rule /\d+\.\d+(e[+-]?\d+)?/i, Num::Float
        rule /0o[0-7]+/i, Num::Oct
        rule /0x[\da-f]+/i, Num::Hex
        rule /\d+/, Num::Integer

        rule /'/, Str::Char, :character
        rule /"/, Str, :string

        rule /\[\s*\]/, Keyword::Type
        rule /\(\s*\)/, Name::Builtin
        rule /[\[\](),;`{}]/, Punctuation
      end

      state :import do
        rule /\s+/, Text
        rule /"/, Str, :string
        rule /\bqualified\b/, Keyword
        # import X as Y
        rule /([A-Z][\w.]*)(\s+)(as)(\s+)([A-Z][a-zA-Z0-9_.]*)/ do
          groups(
            Name::Namespace, # X
            Text, Keyword, # as
            Text, Name # Y
          )
          pop!
        end

        # import X hiding (functions)
        rule /([A-Z][\w.]*)(\s+)(hiding)(\s+)(\()/ do
          groups(
            Name::Namespace, # X
            Text, Keyword, # hiding
            Text, Punctuation # (
          )
          goto :funclist
        end

        # import X (functions)
        rule /([A-Z][\w.]*)(\s+)(\()/ do
          groups(
            Name::Namespace, # X
            Text,
            Punctuation # (
          )
          goto :funclist
        end

        rule /[\w.]+/, Name::Namespace, :pop!
      end

      state :module do
        rule /\s+/, Text
        # module Foo (functions)
        rule /([A-Z][\w.]*)(\s+)(\()/ do
          groups Name::Namespace, Text, Punctuation
          push :funclist
        end

        rule /\bwhere\b/, Keyword::Reserved, :pop!

        rule /[A-Z][a-zA-Z0-9_.]*/, Name::Namespace, :pop!
      end

      state :funclist do
        mixin :basic
        rule /[A-Z]\w*/, Keyword::Type
        rule /(_[\w\']+|[a-z][\w\']*)/, Name::Function
        rule /,/, Punctuation
        rule /[:!#\$\%&*+.\\\/<=>?@^\|~-]+/, Operator
        rule /\(/, Punctuation, :funclist
        rule /\)/, Punctuation, :pop!
      end

      state :character do
        rule /\\/ do
          token Str::Escape
          push :character_end
          push :escape
        end

        rule /./ do
          token Str::Char
          goto :character_end
        end
      end

      state :character_end do
        rule /'/, Str::Char, :pop!
        rule /./, Error, :pop!
      end

      state :string do
        rule /"/, Str, :pop!
        rule /\\/, Str::Escape, :escape
        rule /[^\\"]+/, Str
      end

      state :escape do
        rule /[abfnrtv"'&\\]/, Str::Escape, :pop!
        rule /\^[\]\[A-Z@\^_]/, Str::Escape, :pop!
        rule /#{ascii.join('|')}/, Str::Escape, :pop!
        rule /o[0-7]+/i, Str::Escape, :pop!
        rule /x[\da-f]/i, Str::Escape, :pop!
        rule /\d+/, Str::Escape, :pop!
        rule /\s+\\/, Str::Escape, :pop!
      end
    end
  end
end
