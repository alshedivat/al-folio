# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class SML < RegexLexer
      title "SML"
      desc 'Standard ML'
      tag 'sml'
      aliases 'ml'
      filenames '*.sml', '*.sig', '*.fun'

      mimetypes 'text/x-standardml', 'application/x-standardml'

      def self.keywords
        @keywords ||= Set.new %w(
          abstype and andalso as case datatype do else end exception
          fn fun handle if in infix infixr let local nonfix of op open
          orelse raise rec then type val with withtype while
          eqtype functor include sharing sig signature struct structure
          where
        )
      end

      def self.symbolic_reserved
        @symbolic_reserved ||= Set.new %w(: | = => -> # :>)
      end

      id = /[\w']+/i
      symbol = %r([!%&$#/:<=>?@\\~`^|*+-]+)

      def self.analyze_text(text)
        return 0
      end

      state :whitespace do
        rule /\s+/m, Text
        rule /[(][*]/, Comment, :comment
      end

      state :delimiters do
        rule /[(\[{]/, Punctuation, :main
        rule /[)\]}]/, Punctuation, :pop!

        rule /\b(let|if|local)\b(?!')/ do
          token Keyword::Reserved
          push; push
        end

        rule /\b(struct|sig|while)\b(?!')/ do
          token Keyword::Reserved
          push
        end

        rule /\b(do|else|end|in|then)\b(?!')/, Keyword::Reserved, :pop!
      end

      def token_for_id_with_dot(id)
        if self.class.keywords.include? id
          Error
        else
          Name::Namespace
        end
      end

      def token_for_final_id(id)
        if self.class.keywords.include? id or self.class.symbolic_reserved.include? id
          Error
        else
          Name
        end
      end

      def token_for_id(id)
        if self.class.keywords.include? id
          Keyword::Reserved
        elsif self.class.symbolic_reserved.include? id
          Punctuation
        else
          Name
        end
      end

      state :core do
        rule /[()\[\]{},;_]|[.][.][.]/, Punctuation
        rule /#"/, Str::Char, :char
        rule /"/, Str::Double, :string
        rule /~?0x[0-9a-fA-F]+/, Num::Hex
        rule /0wx[0-9a-fA-F]+/, Num::Hex
        rule /0w\d+/, Num::Integer
        rule /~?\d+([.]\d+)?[eE]~?\d+/, Num::Float
        rule /~?\d+[.]\d+/, Num::Float
        rule /~?\d+/, Num::Integer

        rule /#\s*[1-9][0-9]*/, Name::Label
        rule /#\s*#{id}/, Name::Label
        rule /#\s+#{symbol}/, Name::Label

        rule /\b(datatype|abstype)\b(?!')/, Keyword::Reserved, :dname
        rule(/(?=\bexception\b(?!'))/) { push :ename }
        rule /\b(functor|include|open|signature|structure)\b(?!')/,
          Keyword::Reserved, :sname
        rule /\b(type|eqtype)\b(?!')/, Keyword::Reserved, :tname

        rule /'#{id}/, Name::Decorator
        rule /(#{id})([.])/ do |m|
          groups(token_for_id_with_dot(m[1]), Punctuation)
          push :dotted
        end

        rule id do |m|
          token token_for_id(m[0])
        end

        rule symbol do |m|
          token token_for_id(m[0])
        end
      end

      state :dotted do
        rule /(#{id})([.])/ do |m|
          groups(token_for_id_with_dot(m[1]), Punctuation)
        end

        rule id do |m|
          token token_for_id(m[0])
          pop!
        end

        rule symbol do |m|
          token token_for_id(m[0])
          pop!
        end
      end

      state :root do
        rule /#!.*?\n/, Comment::Preproc
        rule(//) { push :main }
      end

      state :main do
        mixin :whitespace

        rule /\b(val|and)\b(?!')/, Keyword::Reserved, :vname
        rule /\b(fun)\b(?!')/ do
          token Keyword::Reserved
          goto :main_fun
          push :fname
        end

        mixin :delimiters
        mixin :core
      end

      state :main_fun do
        mixin :whitespace
        rule /\b(fun|and)\b(?!')/, Keyword::Reserved, :fname
        rule /\bval\b(?!')/ do
          token Keyword::Reserved
          goto :main
          push :vname
        end

        rule /[|]/, Punctuation, :fname
        rule /\b(case|handle)\b(?!')/ do
          token Keyword::Reserved
          goto :main
        end

        mixin :delimiters
        mixin :core
      end

      state :has_escapes do
        rule /\\[\\"abtnvfr]/, Str::Escape
        rule /\\\^[\x40-\x5e]/, Str::Escape
        rule /\\[0-9]{3}/, Str::Escape
        rule /\\u\h{4}/, Str::Escape
        rule /\\\s+\\/, Str::Interpol
      end

      state :string do
        rule /[^"\\]+/, Str::Double
        rule /"/, Str::Double, :pop!
        mixin :has_escapes
      end

      state :char do
        rule /[^"\\]+/, Str::Char
        rule /"/, Str::Char, :pop!
        mixin :has_escapes
      end

      state :breakout do
        rule /(?=\b(#{SML.keywords.to_a.join('|')})\b(?!'))/ do
          pop!
        end
      end

      state :sname do
        mixin :whitespace
        mixin :breakout
        rule id, Name::Namespace
        rule(//) { pop! }
      end

      state :has_annotations do
        rule /'[\w']*/, Name::Decorator
        rule /[(]/, Punctuation, :tyvarseq
      end

      state :fname do
        mixin :whitespace
        mixin :has_annotations

        rule id, Name::Function, :pop!
        rule symbol, Name::Function, :pop!
      end

      state :vname do
        mixin :whitespace
        mixin :has_annotations

        rule /(#{id})(\s*)(=(?!#{symbol}))/m do
          groups Name::Variable, Text, Punctuation
          pop!
        end

        rule /(#{symbol})(\s*)(=(?!#{symbol}))/m do
          groups Name::Variable, Text, Punctuation
        end

        rule id, Name::Variable, :pop!
        rule symbol, Name::Variable, :pop!

        rule(//) { pop! }
      end

      state :tname do
        mixin :whitespace
        mixin :breakout
        mixin :has_annotations

        rule /'[\w']*/, Name::Decorator
        rule /[(]/, Punctuation, :tyvarseq

        rule %r(=(?!#{symbol})) do
          token Punctuation
          goto :typbind
        end

        rule id, Keyword::Type
        rule symbol, Keyword::Type
      end

      state :typbind do
        mixin :whitespace

        rule /\b(and)\b(?!')/ do
          token Keyword::Reserved
          goto :tname
        end

        mixin :breakout
        mixin :core
      end

      state :dname do
        mixin :whitespace
        mixin :breakout
        mixin :has_annotations

        rule /(=)(\s*)(datatype)\b/ do
          groups Punctuation, Text, Keyword::Reserved
          pop!
        end

        rule %r(=(?!#{symbol})) do
          token Punctuation
          goto :datbind
          push :datcon
        end

        rule id, Keyword::Type
        rule symbol, Keyword::Type
      end

      state :datbind do
        mixin :whitespace
        rule /\b(and)\b(?!')/ do
          token Keyword::Reserved; goto :dname
        end
        rule /\b(withtype)\b(?!')/ do
          token Keyword::Reserved; goto :tname
        end
        rule /\bof\b(?!')/, Keyword::Reserved
        rule /([|])(\s*)(#{id})/ do
          groups(Punctuation, Text, Name::Class)
        end

        rule /([|])(\s+)(#{symbol})/ do
          groups(Punctuation, Text, Name::Class)
        end

        mixin :breakout
        mixin :core
      end

      state :ename do
        mixin :whitespace
        rule /(exception|and)(\s+)(#{id})/ do
          groups Keyword::Reserved, Text, Name::Class
        end

        rule /(exception|and)(\s*)(#{symbol})/ do
          groups Keyword::Reserved, Text, Name::Class
        end

        rule /\b(of)\b(?!')/, Keyword::Reserved
        mixin :breakout
        mixin :core
      end

      state :datcon do
        mixin :whitespace
        rule id, Name::Class, :pop!
        rule symbol, Name::Class, :pop!
      end

      state :tyvarseq do
        mixin :whitespace
        rule /'[\w']*/, Name::Decorator
        rule id, Name
        rule /,/, Punctuation
        rule /[)]/, Punctuation, :pop!
        rule symbol, Name
      end

      state :comment do
        rule /[^(*)]+/, Comment::Multiline
        rule /[(][*]/ do
          token Comment::Multiline; push
        end
        rule /[*][)]/, Comment::Multiline, :pop!
        rule /[(*)]/, Comment::Multiline
      end
    end
  end
end
