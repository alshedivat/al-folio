# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    load_lexer 'javascript.rb'

    class Qml < Javascript
      title "QML"
      desc 'QML, a UI markup language'
      tag 'qml'
      aliases 'qml'
      filenames '*.qml'

      mimetypes 'application/x-qml', 'text/x-qml'

      id_with_dots = /[$a-zA-Z_][a-zA-Z0-9_.]*/

      prepend :root do
        rule /(#{id_with_dots})(\s*)({)/ do
          groups Keyword::Type, Text, Punctuation
          push :type_block
        end
        rule /(#{id_with_dots})(\s+)(on)(\s+)(#{id_with_dots})(\s*)({)/ do
          groups Keyword::Type, Text, Keyword, Text, Name::Label, Text, Punctuation
          push :type_block
        end

        rule /[{]/, Punctuation, :push
      end

      state :type_block do
        rule /(id)(\s*)(:)(\s*)(#{id_with_dots})/ do
          groups Name::Label, Text, Punctuation, Text, Keyword::Declaration
        end

        rule /(#{id_with_dots})(\s*)(:)/ do
          groups Name::Label, Text, Punctuation
          push :expr_start
        end

        rule /(signal)(\s+)(#{id_with_dots})/ do
          groups Keyword::Declaration, Text, Name::Label
          push :signal
        end

        rule /(property)(\s+)(#{id_with_dots})(\s+)(#{id_with_dots})(\s*)(:?)/ do
          groups Keyword::Declaration, Text, Keyword::Type, Text, Name::Label, Text, Punctuation
          push :expr_start
        end

        rule /[}]/, Punctuation, :pop!
        mixin :root
      end

      state :signal do
        mixin :comments_and_whitespace
        rule /\(/ do
          token Punctuation
          goto :signal_args
        end
        rule //, Text, :pop!
      end

      state :signal_args do
        mixin :comments_and_whitespace
        rule /(#{id_with_dots})(\s+)(#{id_with_dots})(\s*)(,?)/ do
          groups Keyword::Type, Text, Name, Text, Punctuation
        end
        rule /\)/ , Punctuation, :pop!
      end
    end
  end
end
