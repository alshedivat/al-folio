# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Dot < RegexLexer
      title "DOT"
      desc "graph description language"

      tag 'dot'
      filenames '*.dot'
      mimetypes 'text/vnd.graphviz'

      start do
        @html = HTML.new(options)
      end

      state :comments_and_whitespace do
        rule /\s+/, Text
        rule %r(#.*?\n), Comment::Single
        rule %r(//.*?\n), Comment::Single
        rule %r(/(\\\n)?[*].*?[*](\\\n)?/)m, Comment::Multiline
      end

      state :html do
        rule /[^<>]+/ do
          delegate @html
        end
        rule /<.+?>/m do
          delegate @html
        end
        rule />/, Punctuation, :pop!
      end

      state :ID do
        rule /([a-zA-Z][a-zA-Z_0-9]*)(\s*)(=)/ do |m|
          token Name, m[1]
          token Text, m[2]
          token Punctuation, m[3]
        end
        rule /[a-zA-Z][a-zA-Z_0-9]*/, Name::Variable
        rule /([0-9]+)?\.[0-9]+/, Num::Float
        rule /[0-9]+/, Num::Integer
        rule /"(\\"|[^"])*"/, Str::Double
        rule /</ do
          token Punctuation
          @html.reset!
          push :html
        end
      end

      state :a_list do
        mixin :comments_and_whitespace
        mixin :ID
        rule /[=;,]/, Punctuation
        rule /\]/, Operator, :pop!
      end

      state :root do
        mixin :comments_and_whitespace
        rule /\b(strict|graph|digraph|subgraph|node|edge)\b/i, Keyword
        rule /[{};:=]/, Punctuation
        rule /-[->]/, Operator
        rule /\[/, Operator, :a_list
        mixin :ID
      end
    end
  end
end
