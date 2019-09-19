# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Pony < RegexLexer
      tag 'pony'
      filenames '*.pony'

      keywords = Set.new %w(
        actor addressof and as
        be break
        class compiler_intrinsic consume continue
        do
        else elseif embed end error
        for fun
        if ifdef in interface is isnt
        lambda let
        match
        new not
        object
        primitive
        recover repeat return
        struct
        then this trait try type
        until use
        var
        where while with
      )

      capabilities = Set.new %w(
        box iso ref tag trn val
      )

      types = Set.new %w(
        Number Signed Unsigned Float
        I8 I16 I32 I64 I128 U8 U32 U64 U128 F32 F64
        EventID Align IntFormat NumberPrefix FloatFormat
        Type
      )

      state :whitespace do
        rule /[\s\t\r\n]+/m, Text
      end

      state :root do
        mixin :whitespace
        rule /"""/, Str::Doc, :docstring
        rule %r{//(.*?)\n}, Comment::Single
        rule %r{/(\\\n)?[*](.|\n)*?[*](\\\n)?/}, Comment::Multiline
        rule /"/, Str, :string
        rule %r([~!%^&*+=\|?:<>/-]), Operator
        rule /(true|false|NULL)\b/, Name::Constant
        rule %r{(?:[A-Z_][a-zA-Z0-9_]*)}, Name::Class
        rule /[()\[\],.';]/, Punctuation

        # Numbers
        rule /0[xX]([0-9a-fA-F_]*\.[0-9a-fA-F_]+|[0-9a-fA-F_]+)[pP][+\-]?[0-9_]+[fFL]?[i]?/, Num::Float
        rule /[0-9_]+(\.[0-9_]+[eE][+\-]?[0-9_]+|\.[0-9_]*|[eE][+\-]?[0-9_]+)[fFL]?[i]?/, Num::Float
        rule /\.(0|[1-9][0-9_]*)([eE][+\-]?[0-9_]+)?[fFL]?[i]?/, Num::Float
        rule /0[xX][0-9a-fA-F_]+/, Num::Hex
        rule /(0|[1-9][0-9_]*)([LUu]|Lu|LU|uL|UL)?/, Num::Integer

        rule /[a-z_][a-z0-9_]*/io do |m|
          match = m[0]

          if capabilities.include?(match)
            token Keyword::Declaration
          elsif keywords.include?(match)
            token Keyword::Reserved
          elsif types.include?(match)
            token Keyword::Type
          else
            token Name
          end
        end
      end

      state :string do
        rule /"/, Str, :pop!
        rule /\\([\\abfnrtv"']|x[a-fA-F0-9]{2,4}|[0-7]{1,3})/, Str::Escape
        rule /[^\\"\n]+/, Str
        rule /\\\n/, Str
        rule /\\/, Str # stray backslash
      end

      state :docstring do
        rule /"""/, Str::Doc, :pop!
        rule /\n/, Str::Doc
        rule /./, Str::Doc
      end
    end
  end
end
