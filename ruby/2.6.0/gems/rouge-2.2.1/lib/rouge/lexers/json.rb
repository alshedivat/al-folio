# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class JSON < RegexLexer
      title 'JSON'
      desc "JavaScript Object Notation (json.org)"
      tag 'json'
      filenames '*.json'
      mimetypes 'application/json', 'application/vnd.api+json',
                'application/hal+json'

      state :root do
        rule /\s+/m, Text::Whitespace
        rule /"/, Str::Double, :string
        rule /(?:true|false|null)\b/, Keyword::Constant
        rule /[{},:\[\]]/, Punctuation
        rule /-?(?:0|[1-9]\d*)\.\d+(?:e[+-]?\d+)?/i, Num::Float
        rule /-?(?:0|[1-9]\d*)(?:e[+-]?\d+)?/i, Num::Integer
      end

      state :string do
        rule /[^\\"]+/, Str::Double
        rule /\\./, Str::Escape
        rule /"/, Str::Double, :pop!
      end
    end
  end
end
