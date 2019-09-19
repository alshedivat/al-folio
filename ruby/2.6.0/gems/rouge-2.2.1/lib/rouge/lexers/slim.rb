# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    # A lexer for the Slim tempalte language
    # @see http://slim-lang.org
    class Slim < RegexLexer
      include Indentation

      title "Slim"
      desc 'The Slim template language'

      tag 'slim'

      filenames '*.slim'

      # Ruby identifier characters
      ruby_chars = /[\w\!\?\@\$]/

      # Since you are allowed to wrap lines with a backslash, include \\\n in characters
      dot = /(\\\n|.)/

      def ruby
        @ruby ||= Ruby.new(options)
      end

      def html
        @html ||= HTML.new(options)
      end

      def filters
        @filters ||= {
          'ruby' => ruby,
          'erb' => ERB.new(options),
          'javascript' => Javascript.new(options),
          'css' => CSS.new(options),
          'coffee' => Coffeescript.new(options),
          'markdown' => Markdown.new(options),
          'scss' => Scss.new(options),
          'sass' => Sass.new(options)
        }
      end

      start { ruby.reset!; html.reset! }

      state :root do
        rule /\s*\n/, Text
        rule(/\s*/) { |m| token Text; indentation(m[0]) }
      end

      state :content do
        mixin :css

        rule /\/#{dot}*/, Comment, :indented_block

        rule /(doctype)(\s+)(.*)/ do
          groups Name::Namespace, Text::Whitespace, Text
          pop!
        end

        # filters, shamelessly ripped from HAML
        rule /(\w*):\s*\n/ do |m|
          token Name::Decorator
          pop!
          starts_block :filter_block

          filter_name = m[1].strip

          @filter_lexer = self.filters[filter_name]
          @filter_lexer.reset! unless @filter_lexer.nil?

          puts "    slim: filter #{filter_name.inspect} #{@filter_lexer.inspect}" if @debug
        end

        # Text
        rule %r([\|'](?=\s)) do
          token Punctuation
          pop!
          starts_block :plain_block
          goto :plain_block
        end

        rule /-|==|=/, Punctuation, :ruby_line

        # Dynamic tags
        rule /(\*)(#{ruby_chars}+\(.*?\))/ do |m|
          token Punctuation, m[1]
          delegate ruby, m[2]
          push :tag
        end

        rule /(\*)(#{ruby_chars}+)/ do |m|
          token Punctuation, m[1]
          delegate ruby, m[2]
          push :tag
        end

        #rule /<\w+(?=.*>)/, Keyword::Constant, :tag # Maybe do this, look ahead and stuff
        rule %r((</?[\w\s\=\'\"]+?/?>)) do |m| # Dirty html
          delegate html, m[1]
          pop!
        end

        # Ordinary slim tags
        rule /\w+/, Name::Tag, :tag

      end

      state :tag do
        mixin :css
        mixin :indented_block
        mixin :interpolation

        # Whitespace control
        rule /[<>]/, Punctuation

        # Trim whitespace
        rule /\s+?/, Text::Whitespace

        # Splats, these two might be mergable?
        rule /(\*)(#{ruby_chars}+)/ do |m|
          token Punctuation, m[1]
          delegate ruby, m[2]
        end

        rule /(\*)(\{#{dot}+?\})/ do |m|
          token Punctuation, m[1]
          delegate ruby, m[2]
        end

        # Attributes
        rule /([\w\-]+)(\s*)(\=)/ do |m|
          token Name::Attribute, m[1]
          token Text::Whitespace, m[2]
          token Punctuation, m[3]
          push :html_attr
        end

        # Ruby value
        rule /(\=)(#{dot}+)/ do |m|
          token Punctuation, m[1]
          #token Keyword::Constant, m[2]
          delegate ruby, m[2]
        end

        # HTML Entities
        rule(/&\S*?;/, Name::Entity)

        rule /#{dot}+?/, Text

        rule /\s*\n/, Text::Whitespace, :pop!
      end

      state :css do
        rule(/\.[\w-]*/) { token Name::Class; goto :tag }
        rule(/#[a-zA-Z][\w:-]*/) { token Name::Function; goto :tag }
      end

      state :html_attr do
        # Strings, double/single quoted
        rule(/\s*(['"])#{dot}*?\1/, Literal::String, :pop!)

        # Ruby stuff
        rule(/(#{ruby_chars}+\(.*?\))/) { |m| delegate ruby, m[1]; pop! }
        rule(/(#{ruby_chars}+)/) { |m| delegate ruby, m[1]; pop! }

        rule /\s+/, Text::Whitespace
      end

      state :ruby_line do
        # Need at top
        mixin :indented_block

        rule(/,\s*\n/) { delegate ruby }
        rule /[ ]\|[ \t]*\n/, Str::Escape
        rule(/.*?(?=(,$| \|)?[ \t]*$)/) { delegate ruby }
      end

      state :filter_block do
        rule /([^#\n]|#[^{\n]|(\\\\)*\\#\{)+/ do
          if @filter_lexer
            delegate @filter_lexer
          else
            token Name::Decorator
          end
        end

        mixin :interpolation
        mixin :indented_block
      end

      state :plain_block do
        mixin :interpolation

        rule %r((</?[\w\s\=\'\"]+?/?>)) do |m| # Dirty html
          delegate html, m[1]
        end

        # HTML Entities
        rule(/&\S*?;/, Name::Entity)

        #rule /([^#\n]|#[^{\n]|(\\\\)*\\#\{)+/ do
        rule /#{dot}+?/, Text

        mixin :indented_block
      end

      state :interpolation do
        rule /#[{]/, Str::Interpol, :ruby_interp
      end

      state :ruby_interp do
        rule /[}]/, Str::Interpol, :pop!
        mixin :ruby_interp_inner
      end

      state :ruby_interp_inner do
        rule(/[{]/) { delegate ruby; push :ruby_interp_inner }
        rule(/[}]/) { delegate ruby; pop! }
        rule(/[^{}]+/) { delegate ruby }
      end

      state :indented_block do
        rule(/(?<!\\)\n/) { token Text; reset_stack }
      end
    end
  end
end
