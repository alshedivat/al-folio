# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Make < RegexLexer
      title "Make"
      desc "Makefile syntax"
      tag 'make'
      aliases 'makefile', 'mf', 'gnumake', 'bsdmake'
      filenames '*.make', 'Makefile', 'makefile', 'Makefile.*', 'GNUmakefile'
      mimetypes 'text/x-makefile'

      def self.analyze_text(text)
        return 0.6 if text =~ /^\.PHONY:/
      end

      bsd_special = %w(
        include undef error warning if else elif endif for endfor
      )

      gnu_special = %w(
        ifeq ifneq ifdef ifndef else endif include -include define endef :
      )

      line = /(?:\\.|\\\n|[^\\\n])*/m

      def initialize(opts={})
        super
        @shell = Shell.new(opts)
      end

      start { @shell.reset! }

      state :root do
        rule /\s+/, Text

        rule /#.*?\n/, Comment

        rule /(export)(\s+)(?=[a-zA-Z0-9_\${}\t -]+\n)/ do
          groups Keyword, Text
          push :export
        end

        rule /export\s+/, Keyword

        # assignment
        rule /([a-zA-Z0-9_${}.-]+)(\s*)([!?:+]?=)/m do |m|
          token Name::Variable, m[1]
          token Text, m[2]
          token Operator, m[3]
          push :shell_line
        end

        rule /"(\\\\|\\.|[^"\\])*"/, Str::Double
        rule /'(\\\\|\\.|[^'\\])*'/, Str::Single
        rule /([^\n:]+)(:+)([ \t]*)/ do
          groups Name::Label, Operator, Text
          push :block_header
        end
      end

      state :export do
        rule /[\w\${}-]/, Name::Variable
        rule /\n/, Text, :pop!
        rule /\s+/, Text
      end

      state :block_header do
        rule /[^,\\\n#]+/, Name::Function
        rule /,/, Punctuation
        rule /#.*?/, Comment
        rule /\\\n/, Text
        rule /\\./, Text
        rule /\n/ do
          token Text
          goto :block_body
        end
      end

      state :block_body do
        rule /(\t[\t ]*)([@-]?)/ do |m|
          groups Text, Punctuation
          push :shell_line
        end

        rule(//) { @shell.reset!; pop! }
      end

      state :shell do
        # macro interpolation
        rule /\$\(\s*[a-z_]\w*\s*\)/i, Name::Variable
        # $(shell ...)
        rule /(\$\()(\s*)(shell)(\s+)/m do
          groups Name::Function, Text, Name::Builtin, Text
          push :shell_expr
        end

        rule(/\\./m) { delegate @shell }
        stop = /\$\(|\(|\)|\\|$/
        rule(/.+?(?=#{stop})/m) { delegate @shell }
        rule(stop) { delegate @shell }
      end

      state :shell_expr do
        rule(/\(/) { delegate @shell; push }
        rule /\)/, Name::Variable, :pop!
        mixin :shell
      end

      state :shell_line do
        rule /\n/, Text, :pop!
        mixin :shell
      end
    end
  end
end
