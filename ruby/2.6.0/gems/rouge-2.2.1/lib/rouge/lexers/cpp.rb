# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    load_lexer 'c.rb'

    class Cpp < C
      title "C++"
      desc "The C++ programming language"

      tag 'cpp'
      aliases 'c++'
      # the many varied filenames of c++ source files...
      filenames '*.cpp', '*.hpp',
                '*.c++', '*.h++',
                '*.cc',  '*.hh',
                '*.cxx', '*.hxx',
                '*.pde', '*.ino',
                '*.tpp'
      mimetypes 'text/x-c++hdr', 'text/x-c++src'

      def self.keywords
        @keywords ||= super + Set.new(%w(
          asm auto catch const_cast delete dynamic_cast explicit export
          friend mutable namespace new operator private protected public
          reinterpret_cast restrict size_of static_cast template this throw
          throws typeid typename using virtual final override

          alignas alignof constexpr decltype noexcept static_assert
          thread_local try
        ))
      end

      def self.keywords_type
        @keywords_type ||= super + Set.new(%w(
          bool
        ))
      end

      def self.reserved
        @reserved ||= super + Set.new(%w(
          __virtual_inheritance __uuidof __super __single_inheritance
          __multiple_inheritance __interface __event
        ))
      end

      id = /[a-zA-Z_][a-zA-Z0-9_]*/

      prepend :root do
        # Offload C++ extensions, http://offload.codeplay.com/
        rule /(?:__offload|__blockingoffload|__outer)\b/, Keyword::Pseudo
      end

      # digits with optional inner quotes
      # see www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3781.pdf
      dq = /\d('?\d)*/

      prepend :statements do
        rule /class\b/, Keyword, :classname
        rule %r((#{dq}[.]#{dq}?|[.]#{dq})(e[+-]?#{dq}[lu]*)?)i, Num::Float
        rule %r(#{dq}e[+-]?#{dq}[lu]*)i, Num::Float
        rule /0x\h('?\h)*[lu]*/i, Num::Hex
        rule /0[0-7]('?[0-7])*[lu]*/i, Num::Oct
        rule /#{dq}[lu]*/i, Num::Integer
        rule /\bnullptr\b/, Name::Builtin
        rule /(?:u8|u|U|L)?R"([a-zA-Z0-9_{}\[\]#<>%:;.?*\+\-\/\^&|~!=,"']{,16})\(.*?\)\1"/m, Str
      end

      state :classname do
        rule id, Name::Class, :pop!

        # template specification
        rule /\s*(?=>)/m, Text, :pop!
        mixin :whitespace
      end
    end
  end
end
