# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Vala < RegexLexer
      tag 'vala'
      filenames '*.vala'
      mimetypes 'text/x-vala'

      title "Vala"
      desc 'A programming language similar to csharp.'

      id = /@?[_a-z]\w*/i

      keywords = %w(
        abstract as async base break case catch const construct continue
        default delegate delete do dynamic else ensures enum errordomain
        extern false finally for foreach get global if in inline interface
        internal is lock new null out override owned private protected
        public ref requires return set signal sizeof static switch this
        throw throws true try typeof unowned var value virtual void weak
        while yield
      )

      keywords_type = %w(
        bool char double float int int8 int16 int32 int64 long short size_t 
        ssize_t string unichar uint uint8 uint16 uint32 uint64 ulong ushort
      )

      state :whitespace do
        rule /\s+/m, Text
        rule %r(//.*?$), Comment::Single
        rule %r(/[*].*?[*]/)m, Comment::Multiline
      end

      state :root do
        mixin :whitespace

        rule /^\s*\[.*?\]/, Name::Attribute

        rule /(<\[)\s*(#{id}:)?/, Keyword
        rule /\]>/, Keyword

        rule /[~!%^&*()+=|\[\]{}:;,.<>\/?-]/, Punctuation
        rule /@"(\\.|.)*?"/, Str
        rule /"(\\.|.)*?["\n]/, Str
        rule /'(\\.|.)'/, Str::Char
        rule /0x[0-9a-f]+[lu]?/i, Num
        rule %r(
          [0-9]
          ([.][0-9]*)? # decimal
          (e[+-][0-9]+)? # exponent
          [fldu]? # type
        )ix, Num
        rule /\b(#{keywords.join('|')})\b/, Keyword
        rule /\b(#{keywords_type.join('|')})\b/, Keyword::Type
        rule /class|struct/, Keyword, :class
        rule /namespace|using/, Keyword, :namespace
        rule /#{id}(?=\s*[(])/, Name::Function
        rule id, Name

        rule /#.*/, Comment::Preproc
      end

      state :class do
        mixin :whitespace
        rule id, Name::Class, :pop!
      end

      state :namespace do
        mixin :whitespace
        rule /(?=[(])/, Text, :pop!
        rule /(#{id}|[.])+/, Name::Namespace, :pop!
      end
    end
  end
end
