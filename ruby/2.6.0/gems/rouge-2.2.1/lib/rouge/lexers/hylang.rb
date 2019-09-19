# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class HyLang < RegexLexer
      title "HyLang"
      desc "The HyLang programming language (hylang.org)"

      tag 'hylang'
      aliases 'hy'

      filenames '*.hy'

      mimetypes 'text/x-hy', 'application/x-hy'

      def self.keywords
        @keywords ||= Set.new %w(
          False None True and as assert break class continue def
          del elif else except finally for from global if import
          in is lambda nonlocal not or pass raise return try
        )
      end

      def self.builtins
        @builtins ||= Set.new %w(
          != % %= & &= * ** **= *= *map
          + += , - -= -> ->> . / //
          //= /= < << <<= <= = > >= >>
          >>= @ @= ^ ^= accumulate apply as-> assoc butlast
          calling-module-name car cdr chain coll? combinations comp complement compress cond
          cons cons? constantly count cut cycle dec defclass defmacro defmacro!
          defmacro/g! defmain defn defreader dict-comp disassemble dispatch-reader-macro distinct do doto
          drop drop-last drop-while empty? eval eval-and-compile eval-when-compile even? every? filter
          first flatten float? fn for* fraction genexpr gensym get group-by
          identity if* if-not if-python2 inc input instance? integer integer-char? integer?
          interleave interpose islice iterable? iterate iterator? juxt keyword keyword? last
          let lif lif-not list* list-comp macro-error macroexpand macroexpand-1 map merge-with
          multicombinations name neg? none? not-in not? nth numeric? odd? partition
          permutations pos? product quasiquote quote range read read-str reduce remove
          repeat repeatedly require rest second set-comp setv some string string?
          symbol? take take-nth take-while tee unless unquote unquote-splicing when with*
          with-decorator with-gensyms xor yield-from zero? zip zip-longest | |= ~
        )
      end

      identifier = %r([\w!$%*+,<=>?/.-]+)
      keyword = %r([\w!\#$%*+,<=>?/.-]+)

      def name_token(name)
        return Keyword if self.class.keywords.include?(name)
        return Name::Builtin if self.class.builtins.include?(name)
        nil
      end

      state :root do
        rule /;.*?$/, Comment::Single
        rule /\s+/m, Text::Whitespace

        rule /-?\d+\.\d+/, Num::Float
        rule /-?\d+/, Num::Integer
        rule /0x-?[0-9a-fA-F]+/, Num::Hex

        rule /"(\\.|[^"])*"/, Str
        rule /'#{keyword}/, Str::Symbol
        rule /::?#{keyword}/, Name::Constant
        rule /\\(.|[a-z]+)/i, Str::Char


        rule /~@|[`\'#^~&@]/, Operator

        rule /(\()(\s*)(#{identifier})/m do |m|
          token Punctuation, m[1]
          token Text::Whitespace, m[2]
          token(name_token(m[3]) || Name::Function, m[3])
        end

        rule identifier do |m|
          token name_token(m[0]) || Name
        end

        # vectors
        rule /[\[\]]/, Punctuation

        # maps
        rule /[{}]/, Punctuation

        # parentheses
        rule /[()]/, Punctuation
      end
    end
  end
end

