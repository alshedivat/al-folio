# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Python < RegexLexer
      title "Python"
      desc "The Python programming language (python.org)"
      tag 'python'
      aliases 'py'
      filenames '*.py', '*.pyw', '*.sc', 'SConstruct', 'SConscript', '*.tac'
      mimetypes 'text/x-python', 'application/x-python'

      def self.analyze_text(text)
        return 1 if text.shebang?(/pythonw?(3|2(\.\d)?)?/)
      end

      def self.keywords
        @keywords ||= %w(
          assert break continue del elif else except exec
          finally for global if lambda pass print raise
          return try while yield as with from import yield
        )
      end

      def self.builtins
        @builtins ||= %w(
          __import__ abs all any apply basestring bin bool buffer
          bytearray bytes callable chr classmethod cmp coerce compile
          complex delattr dict dir divmod enumerate eval execfile exit
          file filter float frozenset getattr globals hasattr hash hex id
          input int intern isinstance issubclass iter len list locals
          long map max min next object oct open ord pow property range
          raw_input reduce reload repr reversed round set setattr slice
          sorted staticmethod str sum super tuple type unichr unicode
          vars xrange zip
        )
      end

      def self.builtins_pseudo
        @builtins_pseudo ||= %w(self None Ellipsis NotImplemented False True)
      end

      def self.exceptions
        @exceptions ||= %w(
          ArithmeticError AssertionError AttributeError
          BaseException DeprecationWarning EOFError EnvironmentError
          Exception FloatingPointError FutureWarning GeneratorExit IOError
          ImportError ImportWarning IndentationError IndexError KeyError
          KeyboardInterrupt LookupError MemoryError NameError
          NotImplemented NotImplementedError OSError OverflowError
          OverflowWarning PendingDeprecationWarning ReferenceError
          RuntimeError RuntimeWarning StandardError StopIteration
          SyntaxError SyntaxWarning SystemError SystemExit TabError
          TypeError UnboundLocalError UnicodeDecodeError
          UnicodeEncodeError UnicodeError UnicodeTranslateError
          UnicodeWarning UserWarning ValueError VMSError Warning
          WindowsError ZeroDivisionError
        )
      end

      identifier =        /[a-z_][a-z0-9_]*/i
      dotted_identifier = /[a-z_.][a-z0-9_.]*/i
      state :root do
        rule /\n+/m, Text
        rule /^(:)(\s*)([ru]{,2}""".*?""")/mi do
          groups Punctuation, Text, Str::Doc
        end

        rule /[^\S\n]+/, Text
        rule /#.*$/, Comment
        rule /[\[\]{}:(),;]/, Punctuation
        rule /\\\n/, Text
        rule /\\/, Text

        rule /(in|is|and|or|not)\b/, Operator::Word
        rule /!=|==|<<|>>|[-~+\/*%=<>&^|.]/, Operator

        rule /(from)((?:\\\s|\s)+)(#{dotted_identifier})((?:\\\s|\s)+)(import)/ do
          groups Keyword::Namespace,
                 Text,
                 Name::Namespace,
                 Text,
                 Keyword::Namespace
        end

        rule /(import)(\s+)(#{dotted_identifier})/ do
          groups Keyword::Namespace, Text, Name::Namespace
        end

        rule /(def)((?:\s|\\\s)+)/ do
          groups Keyword, Text
          push :funcname
        end

        rule /(class)((?:\s|\\\s)+)/ do
          groups Keyword, Text
          push :classname
        end

        # TODO: not in python 3
        rule /`.*?`/, Str::Backtick
        rule /(?:r|ur|ru)"""/i, Str, :raw_tdqs
        rule /(?:r|ur|ru)'''/i, Str, :raw_tsqs
        rule /(?:r|ur|ru)"/i,   Str, :raw_dqs
        rule /(?:r|ur|ru)'/i,   Str, :raw_sqs
        rule /u?"""/i,          Str, :tdqs
        rule /u?'''/i,          Str, :tsqs
        rule /u?"/i,            Str, :dqs
        rule /u?'/i,            Str, :sqs

        rule /@#{dotted_identifier}/i, Name::Decorator

        # using negative lookbehind so we don't match property names
        rule /(?<!\.)#{identifier}/ do |m|
          if self.class.keywords.include? m[0]
            token Keyword
          elsif self.class.exceptions.include? m[0]
            token Name::Builtin
          elsif self.class.builtins.include? m[0]
            token Name::Builtin
          elsif self.class.builtins_pseudo.include? m[0]
            token Name::Builtin::Pseudo
          else
            token Name
          end
        end

        rule identifier, Name

        rule /(\d+\.\d*|\d*\.\d+)(e[+-]?[0-9]+)?/i, Num::Float
        rule /\d+e[+-]?[0-9]+/i, Num::Float
        rule /0[0-7]+/, Num::Oct
        rule /0x[a-f0-9]+/i, Num::Hex
        rule /\d+L/, Num::Integer::Long
        rule /\d+/, Num::Integer
      end

      state :funcname do
        rule identifier, Name::Function, :pop!
      end

      state :classname do
        rule identifier, Name::Class, :pop!
      end

      state :raise do
        rule /from\b/, Keyword
        rule /raise\b/, Keyword
        rule /yield\b/, Keyword
        rule /\n/, Text, :pop!
        rule /;/, Punctuation, :pop!
        mixin :root
      end

      state :yield do
        mixin :raise
      end

      state :strings do
        rule /%(\([a-z0-9_]+\))?[-#0 +]*([0-9]+|[*])?(\.([0-9]+|[*]))?/i, Str::Interpol
      end

      state :strings_double do
        rule /[^\\"%\n]+/, Str
        mixin :strings
      end

      state :strings_single do
        rule /[^\\'%\n]+/, Str
        mixin :strings
      end

      state :nl do
        rule /\n/, Str
      end

      state :escape do
        rule %r(\\
          ( [\\abfnrtv"']
          | \n
          | N{[a-zA-z][a-zA-Z ]+[a-zA-Z]}
          | u[a-fA-F0-9]{4}
          | U[a-fA-F0-9]{8}
          | x[a-fA-F0-9]{2}
          | [0-7]{1,3}
          )
        )x, Str::Escape
      end

      state :raw_escape do
        rule /\\./, Str
      end

      state :dqs do
        rule /"/, Str, :pop!
        mixin :escape
        mixin :strings_double
      end

      state :sqs do
        rule /'/, Str, :pop!
        mixin :escape
        mixin :strings_single
      end

      state :tdqs do
        rule /"""/, Str, :pop!
        rule /"/, Str
        mixin :escape
        mixin :strings_double
        mixin :nl
      end

      state :tsqs do
        rule /'''/, Str, :pop!
        rule /'/, Str
        mixin :escape
        mixin :strings_single
        mixin :nl
      end

      %w(tdqs tsqs dqs sqs).each do |qtype|
        state :"raw_#{qtype}" do
          mixin :raw_escape
          mixin :"#{qtype}"
        end
      end

    end
  end
end
