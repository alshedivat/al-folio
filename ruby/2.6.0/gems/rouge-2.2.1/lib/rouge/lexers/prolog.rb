# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Prolog < RegexLexer
      title "Prolog"
      desc "The Prolog programming language (http://en.wikipedia.org/wiki/Prolog)"
      tag 'prolog'
      aliases 'prolog'
      filenames '*.pro', '*.P', '*.prolog', '*.pl'
      mimetypes 'text/x-prolog'

      def self.analyze_text(text)
        return 0.1 if text =~ /\A\w+(\(\w+\,\s*\w+\))*\./
        return 0.1 if text.include? ':-'
      end

      state :basic do
        rule /\s+/, Text
        rule /^#.*/, Comment::Single
        rule /\/\*/, Comment::Multiline, :nested_comment

        rule /[\[\](){}|.,;!]/, Punctuation
        rule /:-|-->/, Punctuation

        rule /"[^"]*"/, Str::Double

        rule /\d+\.\d+/, Num::Float
        rule /\d+/, Num
      end

      state :atoms do
        rule /[[:lower:]]([_[:word:][:digit:]])*/, Str::Symbol
        rule /'[^']*'/, Str::Symbol
      end

      state :operators do
        rule /(<|>|=<|>=|==|=:=|=|\/|\/\/|\*|\+|-)(?=\s|[a-zA-Z0-9\[])/,
          Operator
        rule /is/, Operator
        rule /(mod|div|not)/, Operator
        rule /[#&*+-.\/:<=>?@^~]+/, Operator
      end

      state :variables do
        rule /[A-Z]+\w*/, Name::Variable
        rule /_[[:word:]]*/, Name::Variable
      end

      state :root do
        mixin :basic
        mixin :atoms
        mixin :variables
        mixin :operators
      end

      state :nested_comment do
        rule /\/\*/, Comment::Multiline, :push
        rule /\s*\*[^*\/]+/, Comment::Multiline
        rule /\*\//, Comment::Multiline, :pop!
      end
    end
  end
end
