# -*- coding: utf-8 -*- # 

module Rouge
  module Lexers
    class Wollok < RegexLexer
      title 'Wollok'
      desc 'Wollok lang'
      tag 'wollok'
      filenames *%w(*.wlk *.wtest *.wpgm)

      def self.analyze_text(_text)
        0.3
      end

      keywords = %w(new super return if else var const override constructor)

      entity_name = /[a-zA-Z][a-zA-Z0-9]*/
      variable_naming = /_?#{entity_name}/

      entities = []

      state :whitespaces_and_comments do
        rule /\s+/m, Text::Whitespace
        rule /$+/m, Text::Whitespace
        rule %r(//.*$), Comment::Single
        rule %r(/\*(.|\s)*?\*/)m, Comment::Multiline
      end

      state :root do
        mixin :whitespaces_and_comments
        rule /(import)(.+$)/ do
          groups Keyword::Reserved, Text
        end
        rule /(class|object|mixin)/, Keyword::Reserved, :foo
        rule /test|program/, Keyword::Reserved #, :chunk_naming
        rule /(package)(\s+)(#{entity_name})/ do
          groups Keyword::Reserved, Text::Whitespace, Name::Class
        end
        rule /{|}/, Text
        mixin :keywords
        mixin :symbols
        mixin :objects
      end

      state :foo do
        mixin :whitespaces_and_comments
        rule /inherits|mixed|with|and/, Keyword::Reserved
        rule /#{entity_name}(?=\s*{)/ do |m|
          token Name::Class
          entities << m[0]
          pop!
        end
        rule /#{entity_name}/ do |m|
          token Name::Class
          entities << m[0]
        end
      end

      state :keywords do
        def any(expressions)
          /#{expressions.map { |keyword| "#{keyword}\\b" }.join('|')}/
        end

        rule /self\b/, Name::Builtin::Pseudo
        rule any(keywords), Keyword::Reserved
        rule /(method)(\s+)(#{variable_naming})/ do
          groups Keyword::Reserved, Text::Whitespace, Text
        end
      end

      state :objects do
        rule variable_naming do |m|
          variable = m[0]
          if entities.include?(variable) || ('A'..'Z').cover?(variable[0])
            token Name::Class
          else
            token Keyword::Variable
          end
        end
        rule /\.#{entity_name}/, Text
        mixin :literals
      end

      state :literals do
        mixin :whitespaces_and_comments
        rule /[0-9]+\.?[0-9]*/, Literal::Number
        rule /"[^"]*"/m, Literal::String
        rule /\[|\#{/, Punctuation, :lists
      end

      state :lists do
        rule /,/, Punctuation
        rule /]|}/, Punctuation, :pop!
        mixin :objects
      end

      state :symbols do
        rule /\+\+|--|\+=|-=|\*\*|!/, Operator
        rule /\+|-|\*|\/|%/, Operator
        rule /<=|=>|===|==|<|>/, Operator
        rule /and\b|or\b|not\b/, Operator
        rule /\(|\)|=/, Text
        rule /,/, Punctuation
      end
    end
  end
end
