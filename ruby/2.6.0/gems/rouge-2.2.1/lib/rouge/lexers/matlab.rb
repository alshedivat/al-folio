# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Matlab < RegexLexer
      title "MATLAB"
      desc "Matlab"
      tag 'matlab'
      aliases 'm'
      filenames '*.m'
      mimetypes 'text/x-matlab', 'application/x-matlab'

      def self.analyze_text(text)
        return 0.4 if text =~ /^\s*% / # % comments are a dead giveaway
      end

      def self.keywords
        @keywords = Set.new %w(
          break case catch classdef continue else elseif end for function
          global if otherwise parfor persistent return spmd switch try while
        )
      end

      def self.builtins
        load Pathname.new(__FILE__).dirname.join('matlab/builtins.rb')
        self.builtins
      end

      state :root do
        rule /\s+/m, Text # Whitespace
        rule %r([{]%.*?%[}])m, Comment::Multiline
        rule /%.*$/, Comment::Single
        rule /([.][.][.])(.*?)$/ do
          groups(Keyword, Comment)
        end

        rule /^(!)(.*?)(?=%|$)/ do |m|
          token Keyword, m[1]
          delegate Shell, m[2]
        end


        rule /[a-zA-Z][_a-zA-Z0-9]*/m do |m|
          match = m[0]
          if self.class.keywords.include? match
            token Keyword
          elsif self.class.builtins.include? match
            token Name::Builtin
          else
            token Name
          end
        end

        rule %r{[(){};:,\/\\\]\[]}, Punctuation

        rule /~=|==|<<|>>|[-~+\/*%=<>&^|.@]/, Operator


        rule /(\d+\.\d*|\d*\.\d+)(e[+-]?[0-9]+)?/i, Num::Float
        rule /\d+e[+-]?[0-9]+/i, Num::Float
        rule /\d+L/, Num::Integer::Long
        rule /\d+/, Num::Integer

        rule /'(?=(.*'))/, Str::Single, :string
        rule /'/, Operator
      end

      state :string do
        rule /[^']+/, Str::Single
        rule /''/, Str::Escape
        rule /'/, Str::Single, :pop!
      end
    end
  end
end
