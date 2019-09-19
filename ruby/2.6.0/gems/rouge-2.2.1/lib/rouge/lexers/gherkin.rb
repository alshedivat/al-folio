# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Gherkin < RegexLexer
      tag 'gherkin'
      aliases 'cucumber', 'behat'

      title "Gherkin"
      desc 'A business-readable spec DSL ( github.com/cucumber/cucumber/wiki/Gherkin )'

      filenames '*.feature'
      mimetypes 'text/x-gherkin'

      def self.analyze_text(text)
        return 1 if text.shebang? 'cucumber'
      end

      # self-modifying method that loads the keywords file
      def self.keywords
        load Pathname.new(__FILE__).dirname.join('gherkin/keywords.rb')
        keywords
      end

      def self.step_regex
        # in Gherkin's config, keywords that end in < don't
        # need word boundaries at the ends - all others do.
        @step_regex ||= Regexp.new(
          keywords[:step].map do |w|
            if w.end_with? '<'
              Regexp.escape(w.chop)
            else
              "#{Regexp.escape(w)}\\b"
            end
          end.join('|')
        )
      end

      rest_of_line = /.*?(?=[#\n])/

      state :basic do
        rule %r(#.*$), Comment
        rule /[ \r\t]+/, Text
      end

      state :root do
        mixin :basic
        rule %r(\n), Text
        rule %r(""".*?""")m, Str
        rule %r(@[^\s@]+), Name::Tag
        mixin :has_table
        mixin :has_examples
      end

      state :has_scenarios do
        rule %r((.*?)(:)) do |m|
          reset_stack

          keyword = m[1]
          keyword_tok = if self.class.keywords[:element].include? keyword
            push :description; Keyword::Namespace
          elsif self.class.keywords[:feature].include? keyword
            push :feature_description; Keyword::Declaration
          elsif self.class.keywords[:examples].include? keyword
            push :example_description; Name::Namespace
          else
            Error
          end

          groups keyword_tok, Punctuation
        end
      end

      state :has_examples do
        mixin :has_scenarios
        rule Gherkin.step_regex, Name::Function do
          token Name::Function
          reset_stack; push :step
        end
      end

      state :has_table do
        rule(/(?=[|])/) { push :table_header }
      end

      state :table_header do
        rule /[^|\s]+/, Name::Variable
        rule /\n/ do
          token Text
          goto :table
        end
        mixin :table
      end

      state :table do
        mixin :basic
        rule /\n/, Text, :table_bol
        rule /[|]/, Punctuation
        rule /[^|\s]+/, Name
      end

      state :table_bol do
        rule(/(?=\s*[^\s|])/) { reset_stack }
        rule(//) { pop! }
      end

      state :description do
        mixin :basic
        mixin :has_examples
        rule /\n/, Text
        rule rest_of_line, Text
      end

      state :feature_description do
        mixin :basic
        mixin :has_scenarios
        rule /\n/, Text
        rule rest_of_line, Text
      end

      state :example_description do
        mixin :basic
        mixin :has_table
        rule /\n/, Text
        rule rest_of_line, Text
      end

      state :step do
        mixin :basic
        rule /<.*?>/, Name::Variable
        rule /".*?"/, Str
        rule /\S+/, Text
        rule rest_of_line, Text, :pop!
      end
    end
  end
end
