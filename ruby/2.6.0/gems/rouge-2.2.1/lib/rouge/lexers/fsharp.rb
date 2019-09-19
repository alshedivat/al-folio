# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class FSharp < RegexLexer
      title "FSharp"
      desc 'F# (fsharp.net)'
      tag 'fsharp'
      filenames '*.fs', '*.fsx'
      mimetypes 'application/fsharp-script', 'text/x-fsharp', 'text/x-fsi'

      def self.keywords
        @keywords ||= Set.new %w(
          abstract and as assert base begin class default delegate do
          done downcast downto elif else end exception extern false
          finally for fun function global if in inherit inline interface
          internal lazy let let! match member module mutable namespace
          new not null of open or override private public rec return
          return! select static struct then to true try type upcast
          use use! val void when while with yield yield! sig atomic 
          break checked component const constraint constructor 
          continue eager event external fixed functor include method 
          mixin object parallel process protected pure sealed tailcall 
          trait virtual volatile
        )
      end

      def self.keyopts
        @keyopts ||= Set.new %w(
          != # & && ( ) * \+ , - -. -> . .. : :: := :> ; ;; < <- =
          > >] >} ? ?? [ [< [> [| ] _ ` { {< | |] } ~ |> <| <>
        )
      end

      def self.word_operators
        @word_operators ||= Set.new %w(and asr land lor lsl lxor mod or)
      end

      def self.primitives
        @primitives ||= Set.new %w(unit int float bool string char list array)
      end

      operator = %r([\[\];,{}_()!$%&*+./:<=>?@^|~#-]+)
      id = /[a-z][\w']*/i
      upper_id = /[A-Z][\w']*/

      state :root do
        rule /\s+/m, Text
        rule /false|true|[(][)]|\[\]/, Name::Builtin::Pseudo
        rule /#{upper_id}(?=\s*[.])/, Name::Namespace, :dotted
        rule upper_id, Name::Class
        rule /[(][*](?![)])/, Comment, :comment
        rule %r(//.*?$), Comment::Single
        rule id do |m|
          match = m[0]
          if self.class.keywords.include? match
            token Keyword
          elsif self.class.word_operators.include? match
            token Operator::Word
          elsif self.class.primitives.include? match
            token Keyword::Type
          else
            token Name
          end
        end

        rule operator do |m|
          match = m[0]
          if self.class.keyopts.include? match
            token Punctuation
          else
            token Operator
          end
        end

        rule /-?\d[\d_]*(.[\d_]*)?(e[+-]?\d[\d_]*)/i, Num::Float
        rule /0x\h[\h_]*/i, Num::Hex
        rule /0o[0-7][0-7_]*/i, Num::Oct
        rule /0b[01][01_]*/i, Num::Bin
        rule /\d[\d_]*/, Num::Integer

        rule /'(?:(\\[\\"'ntbr ])|(\\[0-9]{3})|(\\x\h{2}))'/, Str::Char
        rule /'[.]'/, Str::Char
        rule /'/, Keyword
        rule /"/, Str::Double, :string
        rule /[~?]#{id}/, Name::Variable
      end

      state :comment do
        rule /[^(*)]+/, Comment
        rule(/[(][*]/) { token Comment; push }
        rule /[*][)]/, Comment, :pop!
        rule /[(*)]/, Comment
      end

      state :string do
        rule /[^\\"]+/, Str::Double
        mixin :escape_sequence
        rule /\\\n/, Str::Double
        rule /"/, Str::Double, :pop!
      end

      state :escape_sequence do
        rule /\\[\\"'ntbr]/, Str::Escape
        rule /\\\d{3}/, Str::Escape
        rule /\\x\h{2}/, Str::Escape
      end

      state :dotted do
        rule /\s+/m, Text
        rule /[.]/, Punctuation
        rule /#{upper_id}(?=\s*[.])/, Name::Namespace
        rule upper_id, Name::Class, :pop!
        rule id, Name, :pop!
      end
    end
  end
end
