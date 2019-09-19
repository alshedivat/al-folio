# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class CSharp < RegexLexer
      tag 'csharp'
      aliases 'c#', 'cs'
      filenames '*.cs'
      mimetypes 'text/x-csharp'

      title "C#"
      desc 'a multi-paradigm language targeting .NET'

      # TODO: support more of unicode
      id = /@?[_a-z]\w*/i

      #Reserved Identifiers
      #Contextual Keywords
      #LINQ Query Expressions
      keywords = %w(
        abstract as base break case catch checked const continue
        default delegate do else enum event explicit extern false
        finally fixed for foreach goto if implicit in interface
        internal is lock new null operator out override params private
        protected public readonly ref return sealed sizeof stackalloc
        static switch this throw true try typeof unchecked unsafe
        virtual void volatile while
        add alias async await get global partial remove set value where
        yield nameof
        ascending by descending equals from group in into join let on
        orderby select
      )

      keywords_type = %w(
        bool byte char decimal double dynamic float int long object
        sbyte short string uint ulong ushort var
      )

      cpp_keywords = %w(
        if endif else elif define undef line error warning region
        endregion pragma
      )

      state :whitespace do
        rule /\s+/m, Text
        rule %r(//.*?$), Comment::Single
        rule %r(/[*].*?[*]/)m, Comment::Multiline
      end

      state :nest do
        rule /{/, Punctuation, :nest
        rule /}/, Punctuation, :pop!
        mixin :root
      end

      state :splice_string do
        rule /\\./, Str
        rule /{/, Punctuation, :nest
        rule /"|\n/, Str, :pop!
        rule /./, Str
      end

      state :splice_literal do
        rule /""/, Str
        rule /{/, Punctuation, :nest
        rule /"/, Str, :pop!
        rule /./, Str
      end

      state :root do
        mixin :whitespace

        rule /^\s*\[.*?\]/, Name::Attribute
        rule /[$]\s*"/, Str, :splice_string
        rule /[$]@\s*"/, Str, :splice_literal

        rule /(<\[)\s*(#{id}:)?/, Keyword
        rule /\]>/, Keyword

        rule /[~!%^&*()+=|\[\]{}:;,.<>\/?-]/, Punctuation
        rule /@"(""|[^"])*"/m, Str
        rule /"(\\.|.)*?["\n]/, Str
        rule /'(\\.|.)'/, Str::Char
        rule /0x[0-9a-f]+[lu]?/i, Num
        rule %r(
          [0-9]
          ([.][0-9]*)? # decimal
          (e[+-][0-9]+)? # exponent
          [fldu]? # type
        )ix, Num
        rule /\b(?:class|struct|interface)\b/, Keyword, :class
        rule /\b(?:namespace|using)\b/, Keyword, :namespace
        rule /^#[ \t]*(#{cpp_keywords.join('|')})\b.*?\n/,
          Comment::Preproc
        rule /\b(#{keywords.join('|')})\b/, Keyword
        rule /\b(#{keywords_type.join('|')})\b/, Keyword::Type
        rule /#{id}(?=\s*[(])/, Name::Function
        rule id, Name
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
