# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Julia < RegexLexer
      title "Julia"
      desc "The Julia programming language"
      tag 'julia'
      aliases 'jl'
      filenames '*.jl'
      mimetypes 'text/x-julia', 'application/x-julia'

      def self.analyze_text(text)
        1 if text.shebang? 'julia'
      end

      BUILTINS            = /\b(?:
                              applicable      | assert    | convert
                            | dlopen          | dlsym     | edit
                            | eps             | error     | exit
                            | finalizer       | hash      | im
                            | Inf             | invoke    | is
                            | isa             | isequal   | load
                            | method_exists   | Nan       | new
                            | ntuple          | pi        | promote
                            | promote_type    | realmax   | realmin
                            | sizeof          | subtype   | system
                            | throw           | tuple     | typemax
                            | typemin         | typeof    | uid
                            | whos
                            )\b/x

      KEYWORDS            = /\b(?:
                              function | return | module | import | export
                            | if       | else   | elseif | end    | for
                            | in       | while  | try    | catch  | super
                            | const
                            )\b/x

      TYPES               = /\b(?:
                              Int         | UInt           | Int8
                            | UInt8       | Int16          | UInt16
                            | Int32       | UInt32         | Int64
                            | UInt64      | Int128         | UInt128
                            | Float16     | Float32        | Float64
                            | Bool        | Inf            | Inf16
                            | Inf32       | NaN            | NaN16
                            | NaN32       | BigInt         | BigFloat
                            | Char        | ASCIIString    | UTF8String
                            | UTF16String | UTF32String    | AbstractString
                            | WString     | String         | Regex
                            | RegexMatch  | Complex64      | Complex128
                            | Any         | Nothing        | None
                            )\b/x

      OPERATORS           = / \+      | =        | -     | \*   | \/
                              | \\    | &        | \|    | \$   | ~
                              | \^    | %        | !     | >>>  | >>
                              | <<    | &&       | \|\|  | \+=  | -=
                              | \*=   | \/=      | \\=   | ÷=   | %=
                              | \^=   | &=       | \|=   | \$=  | >>>=
                              | >>=   | <<=      | ==    | !=   | ≠
                              | <=    | ≤        | >=    | ≥    | \.
                              | ::    | <:       | ->    | \?   | \.\*
                              | \.\^  | \.\\     | \.\/  | \\   | <
                              | >
                            /x

      PUNCTUATION         = / [ \[ \] { } : \( \) , ; @ ] /x


      state :root do
        rule /\n/, Text
        rule /[^\S\n]+/, Text
        rule /#=/, Comment::Multiline, :blockcomment
        rule /#.*$/, Comment
        rule OPERATORS, Operator
        rule /\\\n/, Text
        rule /\\/, Text


        # functions
        rule /(function)((?:\s|\\\s)+)/ do
          groups Keyword, Name::Function
          push :funcname
        end

        # types
        rule /(type|typealias|abstract)((?:\s|\\\s)+)/ do
          groups Keyword, Name::Class
          push :typename
        end
        rule TYPES, Keyword::Type

        # keywords
        rule /(local|global|const)\b/, Keyword::Declaration
        rule KEYWORDS, Keyword

        rule BUILTINS, Name::Builtin

        # backticks
        rule /`.*?`/, Literal::String::Backtick

        # chars
        rule /'(\\.|\\[0-7]{1,3}|\\x[a-fA-F0-9]{1,3}|\\u[a-fA-F0-9]{1,4}|\\U[a-fA-F0-9]{1,6}|[^\\\'\n])'/, Literal::String::Char

        # try to match trailing transpose
        rule /(?<=[.\w)\]])\'+/, Operator

        # strings
        rule /(?:[IL])"/, Literal::String, :string
        rule /[E]?"/, Literal::String, :string

        # names
        rule /@[\w.]+/, Name::Decorator
        rule /(?:[a-zA-Z_\u00A1-\uffff]|[\u1000-\u10ff])(?:[a-zA-Z_0-9\u00A1-\uffff]|[\u1000-\u10ff])*!*/, Name

        rule PUNCTUATION, Other

        # numbers
        rule /(\d+(_\d+)+\.\d*|\d*\.\d+(_\d+)+)([eEf][+-]?[0-9]+)?/, Literal::Number::Float
        rule /(\d+\.\d*|\d*\.\d+)([eEf][+-]?[0-9]+)?/, Literal::Number::Float
        rule /\d+(_\d+)+[eEf][+-]?[0-9]+/, Literal::Number::Float
        rule /\d+[eEf][+-]?[0-9]+/, Literal::Number::Float
        rule /0b[01]+(_[01]+)+/, Literal::Number::Bin
        rule /0b[01]+/, Literal::Number::Bin
        rule /0o[0-7]+(_[0-7]+)+/, Literal::Number::Oct
        rule /0o[0-7]+/, Literal::Number::Oct
        rule /0x[a-fA-F0-9]+(_[a-fA-F0-9]+)+/, Literal::Number::Hex
        rule /0x[a-fA-F0-9]+/, Literal::Number::Hex
        rule /\d+(_\d+)+/, Literal::Number::Integer
        rule /\d+/, Literal::Number::Integer
      end


      state :funcname do
        rule /[a-zA-Z_]\w*/, Name::Function, :pop!
        rule /\([^\s\w{]{1,2}\)/, Operator, :pop!
        rule /[^\s\w{]{1,2}/, Operator, :pop!
      end

      state :typename do
        rule /[a-zA-Z_]\w*/, Name::Class, :pop!
      end

      state :stringescape do
        rule /\\([\\abfnrtv"\']|\n|N\{.*?\}|u[a-fA-F0-9]{4}|U[a-fA-F0-9]{8}|x[a-fA-F0-9]{2}|[0-7]{1,3})/,
          Literal::String::Escape
      end

      state :blockcomment do
        rule /[^=#]/, Comment::Multiline
        rule /#=/, Comment::Multiline, :blockcomment
        rule /\=#/, Comment::Multiline, :pop!
        rule /[=#]/, Comment::Multiline
      end

      state :string do
        mixin :stringescape

        rule /"/, Literal::String, :pop!
        rule /\\\\|\\"|\\\n/, Literal::String::Escape  # included here for raw strings
        rule /\$(\(\w+\))?[-#0 +]*([0-9]+|[*])?(\.([0-9]+|[*]))?/, Literal::String::Interpol
        rule /[^\\"$]+/, Literal::String
        # quotes, dollar signs, and backslashes must be parsed one at a time
        rule /["\\]/, Literal::String
        # unhandled string formatting sign
        rule /\$/, Literal::String
      end
    end
  end
end
