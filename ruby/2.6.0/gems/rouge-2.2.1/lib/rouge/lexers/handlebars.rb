# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Handlebars < TemplateLexer
      title "Handlebars"
      desc 'the Handlebars and Mustache templating languages'
      tag 'handlebars'
      aliases 'hbs', 'mustache'
      filenames '*.handlebars', '*.hbs', '*.mustache'
      mimetypes 'text/x-handlebars', 'text/x-mustache'

      id = %r([\w$-]+)

      state :root do
        # escaped slashes
        rule(/\\{+/) { delegate parent }

        # block comments
        rule /{{!--/, Comment, :comment
        rule /{{!.*?}}/, Comment

        rule /{{{?/ do
          token Keyword
          push :stache
          push :open_sym
        end

        rule(/(.+?)(?=\\|{{)/m) { delegate parent }

        # if we get here, there's no more mustache tags, so we eat
        # the rest of the doc
        rule(/.+/m) { delegate parent }
      end

      state :comment do
        rule(/{{/) { token Comment; push }
        rule(/}}/) { token Comment; pop! }
        rule(/[^{}]+/m) { token Comment }
        rule(/[{}]/) { token Comment }
      end

      state :stache do
        rule /}}}?/, Keyword, :pop!
        rule /\s+/m, Text
        rule /[=]/, Operator
        rule /[\[\]]/, Punctuation
        rule /[.](?=[}\s])/, Name::Variable
        rule /[.][.]/, Name::Variable
        rule %r([/.]), Punctuation
        rule /"(\\.|.)*?"/, Str::Double
        rule /'(\\.|.)*?'/, Str::Single
        rule /\d+(?=}\s)/, Num
        rule /(true|false)(?=[}\s])/, Keyword::Constant
        rule /else(?=[}\s])/, Keyword
        rule /this(?=[}\s])/, Name::Builtin::Pseudo
        rule /@#{id}/, Name::Attribute
        rule id, Name::Variable
      end

      state :open_sym do
        rule %r([#/]) do
          token Keyword
          goto :block_name
        end

        rule /[>^&]/, Keyword

        rule(//) { pop! }
      end

      state :block_name do
        rule /if(?=[}\s])/, Keyword
        rule id, Name::Namespace, :pop!
        rule(//) { pop! }
      end
    end
  end
end
