# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    # shared states with SCSS
    class SassCommon < RegexLexer
      id = /[\w-]+/

      state :content_common do
        rule /@for\b/, Keyword, :for
        rule /@(debug|warn|if|each|while|else|return|media)/, Keyword, :value

        rule /(@mixin)(\s+)(#{id})/ do
          groups Keyword, Text, Name::Function
          push :value
        end

        rule /(@function)(\s+)(#{id})/ do
          groups Keyword, Text, Name::Function
          push :value
        end

        rule /@extend\b/, Keyword, :selector

        rule /(@include)(\s+)(#{id})/ do
          groups Keyword, Text, Name::Decorator
          push :value
        end

        rule /@#{id}/, Keyword, :selector

        # $variable: assignment
        rule /([$]#{id})([ \t]*)(:)/ do
          groups Name::Variable, Text, Punctuation
          push :value
        end
      end

      state :value do
        mixin :end_section
        rule /[ \t]+/, Text
        rule /[$]#{id}/, Name::Variable
        rule /url[(]/, Str::Other, :string_url
        rule /#{id}(?=\s*[(])/, Name::Function
        rule /%#{id}/, Name::Decorator

        # named literals
        rule /(true|false)\b/, Name::Builtin::Pseudo
        rule /(and|or|not)\b/, Operator::Word

        # colors and numbers
        rule /#[a-z0-9]{1,6}/i, Num::Hex
        rule /-?\d+(%|[a-z]+)?/, Num
        rule /-?\d*\.\d+(%|[a-z]+)?/, Num::Integer

        mixin :has_strings
        mixin :has_interp

        rule /[~^*!&%<>\|+=@:,.\/?-]+/, Operator
        rule /[\[\]()]+/, Punctuation
        rule %r(/[*]), Comment::Multiline, :inline_comment
        rule %r(//[^\n]*), Comment::Single

        # identifiers
        rule(id) do |m|
          if CSS.builtins.include? m[0]
            token Name::Builtin
          elsif CSS.constants.include? m[0]
            token Name::Constant
          else
            token Name
          end
        end
      end

      state :has_interp do
        rule /[#][{]/, Str::Interpol, :interpolation
      end

      state :has_strings do
        rule /"/, Str::Double, :dq
        rule /'/, Str::Single, :sq
      end

      state :interpolation do
        rule /}/, Str::Interpol, :pop!
        mixin :value
      end

      state :selector do
        mixin :end_section

        mixin :has_strings
        mixin :has_interp
        rule /[ \t]+/, Text
        rule /:/, Name::Decorator, :pseudo_class
        rule /[.]/, Name::Class, :class
        rule /#/, Name::Namespace, :id
        rule /%/, Name::Variable, :placeholder
        rule id, Name::Tag
        rule /&/, Keyword
        rule /[~^*!&\[\]()<>\|+=@:;,.\/?-]/, Operator
      end

      state :dq do
        rule /"/, Str::Double, :pop!
        mixin :has_interp
        rule /(\\.|#(?![{])|[^\n"#])+/, Str::Double
      end

      state :sq do
        rule /'/, Str::Single, :pop!
        mixin :has_interp
        rule /(\\.|#(?![{])|[^\n'#])+/, Str::Single
      end

      state :string_url do
        rule /[)]/, Str::Other, :pop!
        rule /(\\.|#(?![{])|[^\n)#])+/, Str::Other
        mixin :has_interp
      end

      state :selector_piece do
        mixin :has_interp
        rule(//) { pop! }
      end

      state :pseudo_class do
        rule id, Name::Decorator
        mixin :selector_piece
      end

      state :class do
        rule id, Name::Class
        mixin :selector_piece
      end

      state :id do
        rule id, Name::Namespace
        mixin :selector_piece
      end

      state :placeholder do
        rule id, Name::Variable
        mixin :selector_piece
      end

      state :for do
        rule /(from|to|through)/, Operator::Word
        mixin :value
      end

      state :attr_common do
        mixin :has_interp
        rule id do |m|
          if CSS.attributes.include? m[0]
            token Name::Label
          else
            token Name::Attribute
          end
        end
      end

      state :attribute do
        mixin :attr_common

        rule /([ \t]*)(:)/ do
          groups Text, Punctuation
          push :value
        end
      end

      state :inline_comment do
        rule /(\\#|#(?=[^\n{])|\*(?=[^\n\/])|[^\n#*])+/, Comment::Multiline
        mixin :has_interp
        rule %r([*]/), Comment::Multiline, :pop!
      end
    end
  end
end
