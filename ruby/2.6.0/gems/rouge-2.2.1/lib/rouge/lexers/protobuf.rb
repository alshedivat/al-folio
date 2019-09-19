# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Protobuf < RegexLexer
      title 'Protobuf'
      desc 'Google\'s language-neutral, platform-neutral, extensible mechanism for serializing structured data'
      tag 'protobuf'
      aliases 'proto'
      filenames '*.proto'
      mimetypes 'text/x-proto'

      kw = /\b(ctype|default|extensions|import|max|oneof|option|optional|packed|repeated|required|returns|rpc|to)\b/
      datatype = /\b(bool|bytes|double|fixed32|fixed64|float|int32|int64|sfixed32|sfixed64|sint32|sint64|string|uint32|uint64)\b/

      state :root do
        rule /[\s]+/, Text
        rule /[,;{}\[\]()]/, Punctuation
        rule /\/(\\\n)?\/(\n|(.|\n)*?[^\\]\n)/, Comment::Single
        rule /\/(\\\n)?\*(.|\n)*?\*(\\\n)?\//, Comment::Multiline
        rule kw, Keyword
        rule datatype, Keyword::Type
        rule /true|false/, Keyword::Constant
        rule /(package)(\s+)/ do
          groups Keyword::Namespace, Text
          push :package
        end

        rule /(message|extend)(\s+)/ do
          groups Keyword::Declaration, Text
          push :message
        end

        rule /(enum|group|service)(\s+)/ do
          groups Keyword::Declaration, Text
          push :type
        end

        rule /".*?"/, Str
        rule /'.*?'/, Str
        rule /(\d+\.\d*|\.\d+|\d+)[eE][+-]?\d+[LlUu]*/, Num::Float
        rule /(\d+\.\d*|\.\d+|\d+[fF])[fF]?/, Num::Float
        rule /(\-?(inf|nan))\b/, Num::Float
        rule /0x[0-9a-fA-F]+[LlUu]*/, Num::Hex
        rule /0[0-7]+[LlUu]*/, Num::Oct
        rule /\d+[LlUu]*/, Num::Integer
        rule /[+-=]/, Operator
        rule /([a-zA-Z_][\w.]*)([ \t]*)(=)/ do
          groups Name::Attribute, Text, Operator
        end
        rule /[a-zA-Z_][\w.]*/, Name
      end

      state :package do
        rule /[a-zA-Z_]\w*/, Name::Namespace, :pop!
        rule(//) { pop! }
      end

      state :message do
        rule /[a-zA-Z_]\w*/, Name::Class, :pop!
        rule(//) { pop! }
      end

      state :type do
        rule /[a-zA-Z_]\w*/, Name, :pop!
        rule(//) { pop! }
      end
    end
  end
end
