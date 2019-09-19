# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class PHP < TemplateLexer
      title "PHP"
      desc "The PHP scripting language (php.net)"
      tag 'php'
      aliases 'php', 'php3', 'php4', 'php5'
      filenames '*.php', '*.php[345t]','*.phtml',
                # Support Drupal file extensions, see:
                # https://github.com/gitlabhq/gitlabhq/issues/8900
                '*.module', '*.inc', '*.profile', '*.install', '*.test'
      mimetypes 'text/x-php'

      option :start_inline, 'Whether to start with inline php or require <?php ... ?>. (default: best guess)'
      option :funcnamehighlighting, 'Whether to highlight builtin functions (default: true)'
      option :disabledmodules, 'Disable certain modules from being highlighted as builtins (default: empty)'

      def initialize(*)
        super

        # if truthy, the lexer starts highlighting with php code
        # (no <?php required)
        @start_inline = bool_option(:start_inline) { :guess }
        @funcnamehighlighting = bool_option(:funcnamehighlighting) { true }
        @disabledmodules = list_option(:disabledmodules)
      end

      def self.builtins
        load Pathname.new(__FILE__).dirname.join('php/builtins.rb')
        self.builtins
      end

      def builtins
        return [] unless @funcnamehighlighting

        @builtins ||= Set.new.tap do |builtins|
          self.class.builtins.each do |mod, fns|
            next if @disabledmodules.include? mod
            builtins.merge(fns)
          end
        end
      end

      # source: http://php.net/manual/en/language.variables.basics.php
      # the given regex is invalid utf8, so... we're using the unicode
      # "Letter" property instead.
      id = /[\p{L}_][\p{L}\p{N}_]*/
      nsid = /#{id}(?:\\#{id})*/

      start do
        case @start_inline
        when true
          push :template
          push :php
        when false
          push :template
        when :guess
          # pass
        end
      end

      def self.keywords
        @keywords ||= Set.new %w(
          and E_PARSE old_function E_ERROR or as E_WARNING parent eval
          PHP_OS break exit case extends PHP_VERSION cfunction FALSE
          print for require continue foreach require_once declare return
          default static do switch die stdClass echo else TRUE elseif
          var empty if xor enddeclare include virtual endfor include_once
          while endforeach global __FILE__ endif list __LINE__ endswitch
          new __sleep endwhile not array __wakeup E_ALL NULL final
          php_user_filter interface implements public private protected
          abstract clone try catch throw this use namespace yield
        )
      end

      def self.analyze_text(text)
        return 1 if text.shebang?('php')
        return 0.3 if /<\?(?!xml)/ =~ text
        0
      end

      state :root do
        # some extremely rough heuristics to decide whether to start inline or not
        rule(/\s*(?=<)/m) { delegate parent; push :template }
        rule(/[^$]+(?=<\?(php|=))/) { delegate parent; push :template }

        rule(//) { push :template; push :php }
      end

      state :template do
        rule /<\?(php|=)?/, Comment::Preproc, :php
        rule(/.*?(?=<\?)|.*/m) { delegate parent }
      end

      state :php do
        rule /\?>/, Comment::Preproc, :pop!
        # heredocs
        rule /<<<('?)(#{id})\1\n.*?\n\2;?\n/im, Str::Heredoc
        rule /\s+/, Text
        rule /#.*?\n/, Comment::Single
        rule %r(//.*?\n), Comment::Single
        # empty comment, otherwise seen as the start of a docstring
        rule %r(/\*\*/), Comment::Multiline
        rule %r(/\*\*.*?\*/)m, Str::Doc
        rule %r(/\*.*?\*/)m, Comment::Multiline
        rule /(->|::)(\s*)(#{id})/ do
          groups Operator, Text, Name::Attribute
        end

        rule /[~!%^&*+=\|:.<>\/?@-]+/, Operator
        rule /[\[\]{}();,]/, Punctuation
        rule /class\b/, Keyword, :classname
        # anonymous functions
        rule /(function)(\s*)(?=\()/ do
          groups Keyword, Text
        end

        # named functions
        rule /(function)(\s+)(&?)(\s*)/ do
          groups Keyword, Text, Operator, Text
          push :funcname
        end

        rule /(const)(\s+)(#{id})/i do
          groups Keyword, Text, Name::Constant
        end

        rule /(true|false|null)\b/, Keyword::Constant
        rule /\$\{\$+#{id}\}/i, Name::Variable
        rule /\$+#{id}/i, Name::Variable

        # may be intercepted for builtin highlighting
        rule /\\?#{nsid}/i do |m|
          name = m[0]

          if self.class.keywords.include? name
            token Keyword
          elsif self.builtins.include? name
            token Name::Builtin
          else
            token Name::Other
          end
        end

        rule /(\d+\.\d*|\d*\.\d+)(e[+-]?\d+)?/i, Num::Float
        rule /\d+e[+-]?\d+/i, Num::Float
        rule /0[0-7]+/, Num::Oct
        rule /0x[a-f0-9]+/i, Num::Hex
        rule /\d+/, Num::Integer
        rule /'([^'\\]*(?:\\.[^'\\]*)*)'/, Str::Single
        rule /`([^`\\]*(?:\\.[^`\\]*)*)`/, Str::Backtick
        rule /"/, Str::Double, :string
      end

      state :classname do
        rule /\s+/, Text
        rule /#{nsid}/, Name::Class, :pop!
      end

      state :funcname do
        rule /#{id}/, Name::Function, :pop!
      end

      state :string do
        rule /"/, Str::Double, :pop!
        rule /[^\\{$"]+/, Str::Double
        rule /\\([nrt\"$\\]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2})/,
          Str::Escape
        rule /\$#{id}(\[\S+\]|->#{id})?/, Name::Variable

        rule /\{\$\{/, Str::Interpol, :interp_double
        rule /\{(?=\$)/, Str::Interpol, :interp_single
        rule /(\{)(\S+)(\})/ do
          groups Str::Interpol, Name::Variable, Str::Interpol
        end

        rule /[${\\]+/, Str::Double
      end

      state :interp_double do
        rule /\}\}/, Str::Interpol, :pop!
        mixin :php
      end

      state :interp_single do
        rule /\}/, Str::Interpol, :pop!
        mixin :php
      end
    end
  end
end
