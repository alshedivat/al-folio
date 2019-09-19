# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class D < RegexLexer
      tag 'd'
      aliases 'dlang'
      filenames '*.d', '*.di'
      mimetypes 'application/x-dsrc', 'text/x-dsrc'

      title "D"
      desc 'The D programming language(dlang.org)'

      keywords = %w(
        abstract alias align asm assert auto body
        break case cast catch class const continue
        debug default delegate delete deprecated do else
        enum export extern finally final foreach_reverse
        foreach for function goto if immutable import
        interface invariant inout in is lazy mixin
        module new nothrow out override package pragma
        private protected public pure ref return scope
        shared static struct super switch synchronized
        template this throw try typedef typeid typeof
        union unittest version volatile while with
        __gshared __traits __vector __parameters
      )

      keywords_type = %w(
        bool byte cdouble cent cfloat char creal
        dchar double float idouble ifloat int ireal
        long real short ubyte ucent uint ulong
        ushort void wchar
      )

      keywords_pseudo = %w(
        __FILE__ __MODULE__ __LINE__ __FUNCTION__ __PRETTY_FUNCTION__
         __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__
        __VERSION__
      )

      state :whitespace do
        rule /\n/m, Text
        rule /\s+/m, Text
      end

      state :root do
        mixin :whitespace
        # Comments
        rule %r(//(.*?)\n), Comment::Single
        rule %r(/(\\\n)?[*](.|\n)*?[*](\\\n)?/), Comment::Multiline
        rule %r(/\+), Comment::Multiline, :nested_comment
        # Keywords
        rule /(#{keywords.join('|')})\b/, Keyword
        rule /(#{keywords_type.join('|')})\b/, Keyword::Type
        rule /(false|true|null)\b/, Keyword::Constant
        rule /(#{keywords_pseudo.join('|')})\b/, Keyword::Pseudo
        rule /macro\b/, Keyword::Reserved
        rule /(string|wstring|dstring|size_t|ptrdiff_t)\b/, Name::Builtin
        # Literals
        # HexFloat
        rule /0[xX]([0-9a-fA-F_]*\.[0-9a-fA-F_]+|[0-9a-fA-F_]+)[pP][+\-]?[0-9_]+[fFL]?[i]?/, Num::Float
        # DecimalFloat
        rule /[0-9_]+(\.[0-9_]+[eE][+\-]?[0-9_]+|\.[0-9_]*|[eE][+\-]?[0-9_]+)[fFL]?[i]?/, Num::Float
        rule /\.(0|[1-9][0-9_]*)([eE][+\-]?[0-9_]+)?[fFL]?[i]?/, Num::Float
        # IntegerLiteral
        # Binary
        rule /0[Bb][01_]+/, Num::Bin
        # Octal
        # TODO: 0[0-7] isn't supported use octal![0-7] instead
        rule /0[0-7_]+/, Num::Oct
        # Hexadecimal
        rule /0[xX][0-9a-fA-F_]+/, Num::Hex
        # Decimal
        rule /(0|[1-9][0-9_]*)([LUu]|Lu|LU|uL|UL)?/, Num::Integer
        # CharacterLiteral
        rule /'(\\['"?\\abfnrtv]|\\x[0-9a-fA-F]{2}|\\[0-7]{1,3}|\\u[0-9a-fA-F]{4}|\\U[0-9a-fA-F]{8}|\\&\w+;|.)'/, Str::Char
        # StringLiteral
        # WysiwygString
        rule /r"[^"]*"[cwd]?/, Str
        # Alternate WysiwygString
        rule /`[^`]*`[cwd]?/, Str
        # DoubleQuotedString
        rule /"(\\\\|\\"|[^"])*"[cwd]?/, Str
        # EscapeSequence
        rule /\\(['\"?\\abfnrtv]|x[0-9a-fA-F]{2}|[0-7]{1,3}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8}|&\w+;)/, Str
        # HexString
        rule /x"[0-9a-fA-F_\s]*"[cwd]?/, Str
        # DelimitedString
        rule /q"\[/, Str, :delimited_bracket
        rule /q"\(/, Str, :delimited_parenthesis
        rule /q"</, Str, :delimited_angle
        rule /q"\{/, Str, :delimited_curly
        rule /q"([a-zA-Z_]\w*)\n.*?\n\1"/, Str
        rule /q"(.).*?\1"/, Str
        # TokenString
        rule /q\{/, Str, :token_string
        # Attributes
        rule /@([a-zA-Z_]\w*)?/, Name::Decorator
        # Tokens
        rule %r`(~=|\^=|%=|\*=|==|!>=|!<=|!<>=|!<>|!<|!>|!=|>>>=|>>>|>>=|>>|>=|<>=|<>|<<=|<<|<=|\+\+|\+=|--|-=|\|\||\|=|&&|&=|\.\.\.|\.\.|/=)|[/.&|\-+<>!()\[\]{}?,;:$=*%^~]`, Punctuation
        # Identifier
        rule /[a-zA-Z_]\w*/, Name
        # Line
        rule /#line\s.*\n/, Comment::Special
      end

      state :nested_comment do
        rule %r([^+/]+), Comment::Multiline
        rule %r(/\+), Comment::Multiline, :push
        rule %r(\+/), Comment::Multiline, :pop!
        rule %r([+/]), Comment::Multiline
      end

      state :token_string do
        rule /\{/, Punctuation, :token_string_nest
        rule /\}/, Str, :pop!
        mixin :root
      end

      state :token_string_nest do
        rule /\{/, Punctuation, :push
        rule /\}/, Punctuation, :pop!
        mixin :root
      end

      state :delimited_bracket do
        rule /[^\[\]]+/, Str
        rule /\[/, Str, :delimited_inside_bracket
        rule /\]"/, Str, :pop!
      end

      state :delimited_inside_bracket do
        rule /[^\[\]]+/, Str
        rule /\[/, Str, :push
        rule /\]/, Str, :pop!
      end

      state :delimited_parenthesis do
        rule /[^()]+/, Str
        rule /\(/, Str, :delimited_inside_parenthesis
        rule /\)"/, Str, :pop!
      end

      state :delimited_inside_parenthesis do
        rule /[^()]+/, Str
        rule /\(/, Str, :push
        rule /\)/, Str, :pop!
      end

      state :delimited_angle do
        rule /[^<>]+/, Str
        rule /</, Str, :delimited_inside_angle
        rule />"/, Str, :pop!
      end

      state :delimited_inside_angle do
        rule /[^<>]+/, Str
        rule /</, Str, :push
        rule />/, Str, :pop!
      end

      state :delimited_curly do
        rule /[^{}]+/, Str
        rule /\{/, Str, :delimited_inside_curly
        rule /\}"/, Str, :pop!
      end

      state :delimited_inside_curly do
        rule /[^{}]+/, Str
        rule /\{/, Str, :push
        rule /\}/, Str, :pop!
      end
    end
  end
end
