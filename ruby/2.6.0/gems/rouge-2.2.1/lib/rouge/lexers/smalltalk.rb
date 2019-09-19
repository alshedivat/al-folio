# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Smalltalk < RegexLexer
      title "Smalltalk"
      desc 'The Smalltalk programming language'

      tag 'smalltalk'
      aliases 'st', 'squeak'
      filenames '*.st'
      mimetypes 'text/x-smalltalk'

      ops = %r([-+*/\\~<>=|&!?,@%])

      state :root do
        rule /(<)(\w+:)(.*?)(>)/ do
          groups Punctuation, Keyword, Text, Punctuation
        end

        # mixin :squeak_fileout
        mixin :whitespaces
        mixin :method_definition
        rule /([|])([\w\s]*)([|])/ do
          groups Punctuation, Name::Variable, Punctuation
        end
        mixin :objects
        rule /\^|:=|_/, Operator

        rule /[)}\]]/, Punctuation, :after_object
        rule /[({\[!]/, Punctuation
      end

      state :method_definition do
        rule /([a-z]\w*:)(\s*)(\w+)/i do
          groups Name::Function, Text, Name::Variable
        end

        rule /^(\s*)(\b[a-z]\w*\b)(\s*)$/i do
          groups Text, Name::Function, Text
        end

        rule %r(^(\s*)(#{ops}+)(\s*)(\w+)(\s*)$) do
          groups Text, Name::Function, Text, Name::Variable, Text
        end
      end

      state :block_variables do
        mixin :whitespaces
        rule /(:)(\s*)(\w+)/ do
          groups Operator, Text, Name::Variable
        end

        rule /[|]/, Punctuation, :pop!

        rule(//) { pop! }
      end

      state :literals do
        rule /'(''|.)*?'/m, Str, :after_object
        rule /[$]./, Str::Char, :after_object
        rule /#[(]/, Str::Symbol, :parenth
        rule /(\d+r)?-?\d+(\.\d+)?(e-?\d+)?/,
          Num, :after_object
        rule /#("[^"]*"|#{ops}+|[\w:]+)/,
          Str::Symbol, :after_object
      end

      state :parenth do
        rule /[)]/ do
          token Str::Symbol
          goto :after_object
        end

        mixin :inner_parenth
      end

      state :inner_parenth do
        rule /#[(]/, Str::Symbol, :inner_parenth
        rule /[)]/, Str::Symbol, :pop!
        mixin :whitespaces
        mixin :literals
        rule /(#{ops}|[\w:])+/, Str::Symbol
      end

      state :whitespaces do
        rule /! !$/, Keyword # squeak chunk delimiter
        rule /\s+/m, Text
        rule /".*?"/m, Comment
      end

      state :objects do
        rule /\[/, Punctuation, :block_variables
        rule /(self|super|true|false|nil|thisContext)\b/,
          Name::Builtin::Pseudo, :after_object
        rule /[A-Z]\w*(?!:)\b/, Name::Class, :after_object
        rule /[a-z]\w*(?!:)\b/, Name::Variable, :after_object
        mixin :literals
      end

      state :after_object do
        mixin :whitespaces
        rule /(ifTrue|ifFalse|whileTrue|whileFalse|timesRepeat):/,
          Name::Builtin, :pop!
        rule /new(?!:)\b/, Name::Builtin
        rule /:=|_/, Operator, :pop!
        rule /[a-z]+\w*:/i, Name::Function, :pop!
        rule /[a-z]+\w*/i, Name::Function
        rule /#{ops}+/, Name::Function, :pop!
        rule /[.]/, Punctuation, :pop!
        rule /;/, Punctuation
        rule(//) { pop! }
      end
    end
  end
end
