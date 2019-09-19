# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Rust < RegexLexer
      title "Rust"
      desc 'The Rust programming language (rust-lang.org)'
      tag 'rust'
      aliases 'rs'
      filenames '*.rs'
      mimetypes 'text/x-rust'

      def self.analyze_text(text)
        return 1 if text.shebang? 'rustc'
      end

      def self.keywords
        @keywords ||= %w(
          as assert break const copy do drop else enum extern fail false
          fn for if impl let log loop match mod move mut priv pub pure
          ref return self static struct true trait type unsafe use while
          box
        )
      end

      def self.builtins
        @builtins ||= Set.new %w(
          Add BitAnd BitOr BitXor bool c_char c_double c_float char
          c_int clock_t c_long c_longlong Cons Const Copy c_schar c_short
          c_uchar c_uint c_ulong c_ulonglong c_ushort c_void dev_t DIR
          dirent Div Either Eq Err f32 f64 Failure FILE float fpos_t
          i16 i32 i64 i8 isize Index ino_t int intptr_t Left mode_t Modulo Mul
          Neg Nil None Num off_t Ok Option Ord Owned pid_t Ptr ptrdiff_t
          Right Send Shl Shr size_t Some ssize_t str Sub Success time_t
          u16 u32 u64 u8 usize uint uintptr_t
          Box Vec String Gc Rc Arc
        )
      end

      def macro_closed?
        @macro_delims.values.all?(&:zero?)
      end

      start {
        @macro_delims = { ']' => 0, ')' => 0, '}' => 0 }
      }

      delim_map = { '[' => ']', '(' => ')', '{' => '}' }

      id = /[a-z_]\w*/i
      hex = /[0-9a-f]/i
      escapes = %r(
        \\ ([nrt'\\] | x#{hex}{2} | u#{hex}{4} | U#{hex}{8})
      )x
      size = /8|16|32|64/

      state :start_line do
        mixin :whitespace
        rule /\s+/, Text
        rule /#\[/ do
          token Name::Decorator; push :attribute
        end
        rule(//) { pop! }
        rule /#\s[^\n]*/, Comment::Preproc
      end

      state :attribute do
        mixin :whitespace
        mixin :has_literals
        rule /[(,)=]/, Name::Decorator
        rule /\]/, Name::Decorator, :pop!
        rule id, Name::Decorator
      end

      state :whitespace do
        rule /\s+/, Text
        rule %r(//[^\n]*), Comment
        rule %r(/[*].*?[*]/)m, Comment::Multiline
      end

      state :root do
        rule /\n/, Text, :start_line
        mixin :whitespace
        rule /\b(?:#{Rust.keywords.join('|')})\b/, Keyword
        mixin :has_literals

        rule %r([=-]>), Keyword
        rule %r(<->), Keyword
        rule /[()\[\]{}|,:;]/, Punctuation
        rule /[*!@~&+%^<>=-\?]|\.{2,3}/, Operator

        rule /([.]\s*)?#{id}(?=\s*[(])/m, Name::Function
        rule /[.]\s*#{id}/, Name::Property
        rule /(#{id})(::)/m do
          groups Name::Namespace, Punctuation
        end

        # macros
        rule /\bmacro_rules!/, Name::Decorator, :macro_rules
        rule /#{id}!/, Name::Decorator, :macro

        rule /'#{id}/, Name::Variable
        rule /#{id}/ do |m|
          name = m[0]
          if self.class.builtins.include? name
            token Name::Builtin
          else
            token Name
          end
        end
      end

      state :macro do
        mixin :has_literals

        rule /[\[{(]/ do |m|
          @macro_delims[delim_map[m[0]]] += 1
          puts "    macro_delims: #{@macro_delims.inspect}" if @debug
          token Punctuation
        end

        rule /[\]})]/ do |m|
          @macro_delims[m[0]] -= 1
          puts "    macro_delims: #{@macro_delims.inspect}" if @debug
          pop! if macro_closed?
          token Punctuation
        end

        # same as the rule in root, but don't push another macro state
        rule /#{id}!/, Name::Decorator
        mixin :root

        # No syntax errors in macros
        rule /./, Text
      end

      state :macro_rules do
        rule /[$]#{id}(:#{id})?/, Name::Variable
        rule /[$]/, Name::Variable

        mixin :macro
      end

      state :has_literals do
        # constants
        rule /\b(?:true|false|nil)\b/, Keyword::Constant
        # characters
        rule %r(
          ' (?: #{escapes} | [^\\] ) '
        )x, Str::Char

        rule /"/, Str, :string

        # numbers
        dot = /[.][0-9_]+/
        exp = /e[-+]?[0-9_]+/
        flt = /f32|f64/

        rule %r(
          [0-9]+
          (#{dot}  #{exp}? #{flt}?
          |#{dot}? #{exp}  #{flt}?
          |#{dot}? #{exp}? #{flt}
          )
        )x, Num::Float

        rule %r(
          ( 0b[10_]+
          | 0x[0-9a-fA-F-]+
          | [0-9]+
          ) (u#{size}?|i#{size})?
        )x, Num::Integer

      end

      state :string do
        rule /"/, Str, :pop!
        rule escapes, Str::Escape
        rule /%%/, Str::Interpol
        rule %r(
          %
          ( [0-9]+ [$] )?  # Parameter
          [0#+-]*          # Flag
          ( [0-9]+ [$]? )? # Width
          ( [.] [0-9]+ )?  # Precision
          [bcdfiostuxX?]   # Type
        )x, Str::Interpol
        rule /[^%"\\]+/m, Str
      end
    end
  end
end
