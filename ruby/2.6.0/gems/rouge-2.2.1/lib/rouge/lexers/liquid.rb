# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Liquid < RegexLexer
      title "Liquid"
      desc 'Liquid is a templating engine for Ruby (liquidmarkup.org)'
      tag 'liquid'
      filenames '*.liquid'

      state :root do
        rule /[^\{]+/, Text

        rule /(\{%)(\s*)/ do
          groups Punctuation, Text::Whitespace
          push :tag_or_block
        end

        rule /(\{\{)(\s*)/ do
          groups Punctuation, Text::Whitespace
          push :output
        end

        rule /\{/, Text
      end

      state :tag_or_block do
        # builtin logic blocks
        rule /(if|unless|elsif|case)(?=\s+)/, Keyword::Reserved, :condition

        rule /(when)(\s+)/ do
          groups Keyword::Reserved, Text::Whitespace
          push :when
        end

        rule /(else)(\s*)(%\})/ do
          groups Keyword::Reserved, Text::Whitespace, Punctuation
          pop!
        end

        # other builtin blocks
        rule /(capture)(\s+)([^\s%]+)(\s*)(%\})/ do
          groups Name::Tag, Text::Whitespace, Name::Attribute, Text::Whitespace, Punctuation
          pop!
        end

        rule /(comment)(\s*)(%\})/ do
          groups Name::Tag, Text::Whitespace, Punctuation
          push :comment
        end

        rule /(raw)(\s*)(%\})/ do
          groups Name::Tag, Text::Whitespace, Punctuation
          push :raw
        end

        rule /assign/, Name::Tag, :assign
        rule /include/, Name::Tag, :include

        # end of block
        rule /(end(case|unless|if))(\s*)(%\})/ do
          groups Keyword::Reserved, nil, Text::Whitespace, Punctuation
          pop!
        end

        rule /(end([^\s%]+))(\s*)(%\})/ do
          groups Name::Tag, nil, Text::Whitespace, Punctuation
          pop!
        end

        # builtin tags
        rule /(cycle)(\s+)(([^\s:]*)(:))?(\s*)/ do |m|
          token Name::Tag, m[1]
          token Text::Whitespace, m[2]

          if m[4] =~ /'[^']*'/
            token Str::Single, m[4]
          elsif m[4] =~ /"[^"]*"/
            token Str::Double, m[4]
          else
            token Name::Attribute, m[4]
          end

          token Punctuation, m[5]
          token Text::Whitespace, m[6]

          push :variable_tag_markup
        end

        # other tags or blocks
        rule /([^\s%]+)(\s*)/ do
          groups Name::Tag, Text::Whitespace
          push :tag_markup
        end
      end

      state :output do
        mixin :whitespace
        mixin :generic

        rule /\}\}/, Punctuation, :pop!
        rule /\|/, Punctuation, :filters
      end

      state :filters do
        mixin :whitespace

        rule(/\}\}/) { token Punctuation; reset_stack }

        rule /([^\s\|:]+)(:?)(\s*)/ do
          groups Name::Function, Punctuation, Text::Whitespace
          push :filter_markup
        end
      end

      state :filter_markup do
        rule /\|/, Punctuation, :pop!

        mixin :end_of_tag
        mixin :end_of_block
        mixin :default_param_markup
      end

      state :condition do
        mixin :end_of_block
        mixin :whitespace

        rule /([=!><]=?)/, Operator

        rule /\b((!)|(not\b))/ do
          groups nil, Operator, Operator::Word
        end

        rule /(contains)/, Operator::Word

        mixin :generic
        mixin :whitespace
      end

      state :when do
        mixin :end_of_block
        mixin :whitespace
        mixin :generic
      end

      state :operator do
        rule /(\s*)((=|!|>|<)=?)(\s*)/ do
          groups Text::Whitespace, Operator, nil, Text::Whitespace
          pop!
        end

        rule /(\s*)(\bcontains\b)(\s*)/ do
          groups Text::Whitespace, Operator::Word, Text::Whitespace
          pop!
        end
      end

      state :end_of_tag do
        rule(/\}\}/) { token Punctuation; reset_stack }
      end

      state :end_of_block do
        rule(/%\}/) { token Punctuation; reset_stack }
      end

      # states for unknown markup
      state :param_markup do
        mixin :whitespace
        mixin :string

        rule /([^\s=:]+)(\s*)(=|:)/ do
          groups Name::Attribute, Text::Whitespace, Operator
        end

        rule /(\{\{)(\s*)([^\s\}])(\s*)(\}\})/ do
          groups Punctuation, Text::Whitespace, nil, Text::Whitespace, Punctuation
        end

        mixin :number
        mixin :keyword

        rule /,/, Punctuation
      end

      state :default_param_markup do
        mixin :param_markup
        rule /./, Text
      end

      state :variable_param_markup do
        mixin :param_markup
        mixin :variable
        rule /./, Text
      end

      state :tag_markup do
        mixin :end_of_block
        mixin :default_param_markup
      end

      state :variable_tag_markup do
        mixin :end_of_block
        mixin :variable_param_markup
      end

      # states for different values types
      state :keyword do
        rule /\b(false|true)\b/, Keyword::Constant
      end

      state :variable do
        rule /\.(?=\w)/, Punctuation
        rule /[a-zA-Z_]\w*\??/, Name::Variable
      end

      state :string do
        rule /'[^']*'/, Str::Single
        rule /"[^"]*"/, Str::Double
      end

      state :number do
        rule /\d+\.\d+/, Num::Float
        rule /\d+/, Num::Integer
      end

      state :array_index do
        rule /\[/, Punctuation
        rule /\]/, Punctuation
      end

      state :generic do
        mixin :array_index
        mixin :keyword
        mixin :string
        mixin :variable
        mixin :number
      end

      state :whitespace do
        rule /[ \t]+/, Text::Whitespace
      end

      state :comment do
        rule /(\{%)(\s*)(endcomment)(\s*)(%\})/ do
          groups Punctuation, Text::Whitespace, Name::Tag, Text::Whitespace, Punctuation
          reset_stack
        end

        rule /./, Comment
      end

      state :raw do
        rule /[^\{]+/, Text

        rule /(\{%)(\s*)(endraw)(\s*)(%\})/ do
          groups Punctuation, Text::Whitespace, Name::Tag, Text::Whitespace, Punctuation
          reset_stack
        end

        rule /\{/, Text
      end

      state :assign do
        mixin :whitespace
        mixin :end_of_block

        rule /(\s*)(=)(\s*)/ do
          groups Text::Whitespace, Operator, Text::Whitespace
        end

        rule /\|/, Punctuation, :filters

        mixin :generic
      end

      state :include do
        mixin :whitespace

        rule /([^\.]+)(\.)(html|liquid)/ do
          groups Name::Attribute, Punctuation, Name::Attribute
        end

        mixin :variable_tag_markup
      end
    end
  end
end
