# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class GraphQL < RegexLexer
      desc 'GraphQL'
      tag 'graphql'
      filenames '*.graphql', '*.gql'
      mimetypes 'application/graphql'

      name = /[_A-Za-z][_0-9A-Za-z]*/

      state :root do
        rule /\b(?:query|mutation|subscription)\b/, Keyword, :query_definition
        rule /\{/ do
          token Punctuation
          push :query_definition
          push :selection_set
        end

        rule /\bfragment\b/, Keyword, :fragment_definition

        rule /\b(?:type|interface|enum)\b/, Keyword, :type_definition
        rule /\b(?:input|schema)\b/, Keyword, :type_definition

        rule /\bunion\b/, Keyword, :union_definition

        mixin :basic
      end

      state :basic do
        rule /\s+/m, Text::Whitespace
        rule /#.*$/, Comment

        rule /[!,]/, Punctuation
      end

      state :has_directives do
        rule /(@#{name})(\s*)(\()/ do
          groups Keyword, Text::Whitespace, Punctuation
          push :arguments
        end
        rule /@#{name}\b/, Keyword
      end

      state :fragment_definition do
        rule /\bon\b/, Keyword

        mixin :query_definition
      end

      state :query_definition do
        mixin :has_directives

        rule /\b#{name}\b/, Name
        rule /\(/, Punctuation, :variable_definitions
        rule /\{/, Punctuation, :selection_set

        mixin :basic
      end

      state :type_definition do
        rule /\bimplements\b/, Keyword
        rule /\b#{name}\b/, Name
        rule /\(/, Punctuation, :variable_definitions
        rule /\{/, Punctuation, :type_definition_set

        mixin :basic
      end

      state :union_definition do
        rule /\b#{name}\b/, Name
        rule /\=/, Punctuation, :union_definition_variant

        mixin :basic
      end

      state :union_definition_variant do
        rule /\b#{name}\b/ do
          token Name
          pop!
          push :union_definition_pipe
        end

        mixin :basic
      end

      state :union_definition_pipe do
        rule /\|/ do
          token Punctuation
          pop!
          push :union_definition_variant
        end

        rule /(?!\||\s+|#[^\n]*)/ do
          pop! 2
        end

        mixin :basic
      end

      state :type_definition_set do
        rule /\}/ do
          token Punctuation
          pop! 2
        end

        rule /\b(#{name})(\s*)(\()/ do
          groups Name, Text::Whitespace, Punctuation
          push :variable_definitions
        end
        rule /\b#{name}\b/, Name

        rule /:/, Punctuation, :type_names

        mixin :basic
      end

      state :arguments do
        rule /\)/ do
          token Punctuation
          pop!
        end

        rule /\b#{name}\b/, Name
        rule /:/, Punctuation, :value

        mixin :basic
      end

      state :variable_definitions do
        rule /\)/ do
          token Punctuation
          pop!
        end

        rule /\$#{name}\b/, Name::Variable
        rule /\b#{name}\b/, Name
        rule /:/, Punctuation, :type_names
        rule /\=/, Punctuation, :value

        mixin :basic
      end

      state :type_names do
        rule /\b(?:Int|Float|String|Boolean|ID)\b/, Name::Builtin, :pop!
        rule /\b#{name}\b/, Name, :pop!

        rule /\[/, Punctuation, :type_name_list

        mixin :basic
      end

      state :type_name_list do
        rule /\b(?:Int|Float|String|Boolean|ID)\b/, Name::Builtin
        rule /\b#{name}\b/, Name

        rule /\]/ do
          token Punctuation
          pop! 2
        end

        mixin :basic
      end

      state :selection_set do
        mixin :has_directives

        rule /\}/ do
          token Punctuation
          pop!
          pop! if state?(:query_definition) || state?(:fragment_definition)
        end

        rule /\b(#{name})(\s*)(\()/ do
          groups Name, Text::Whitespace, Punctuation
          push :arguments
        end

        rule /\b(#{name})(\s*)(:)/ do
          groups Name, Text::Whitespace, Punctuation
        end

        rule /\b#{name}\b/, Name

        rule /(\.\.\.)(\s+)(on)\b/ do
          groups Punctuation, Text::Whitespace, Keyword
        end
        rule /\.\.\./, Punctuation

        rule /\{/, Punctuation, :selection_set

        mixin :basic
      end

      state :list do
        rule /\]/ do
          token Punctuation
          pop!
          pop! if state?(:value)
        end

        mixin :value
      end

      state :object do
        rule /\}/ do
          token Punctuation
          pop!
          pop! if state?(:value)
        end

        rule /\b(#{name})(\s*)(:)/ do
          groups Name, Text::Whitespace, Punctuation
          push :value
        end

        mixin :basic
      end

      state :value do
        pop_unless_list = ->(t) {
          ->(m) {
            token t
            pop! unless state?(:list)
          }
        }

        rule /\$#{name}\b/, &pop_unless_list[Name::Variable]
        rule /\b(?:true|false|null)\b/, &pop_unless_list[Keyword::Constant]
        rule /[+-]?[0-9]+\.[0-9]+(?:[eE][+-]?[0-9]+)?/, &pop_unless_list[Num::Float]
        rule /[+-]?[1-9][0-9]*(?:[eE][+-]?[0-9]+)?/, &pop_unless_list[Num::Integer]
        rule /"(\\[\\"]|[^"])*"/, &pop_unless_list[Str::Double]
        rule /\b#{name}\b/, &pop_unless_list[Name]

        rule /\{/, Punctuation, :object
        rule /\[/, Punctuation, :list

        mixin :basic
      end
    end
  end
end
