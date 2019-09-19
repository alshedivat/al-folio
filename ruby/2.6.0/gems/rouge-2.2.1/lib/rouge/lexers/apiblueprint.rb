module Rouge
  module Lexers
    load_lexer 'markdown.rb'

    class APIBlueprint < Markdown
      title 'API Blueprint'
      desc 'Markdown based API description language.'

      tag 'apiblueprint'
      aliases 'apiblueprint', 'apib'
      filenames '*.apib'
      mimetypes 'text/vnd.apiblueprint'

      def self.analyze_text(text)
        return 1 if text.start_with?('FORMAT: 1A\n')
      end

      prepend :root do
        # Metadata
        rule(/(\S+)(:\s*)(.*)$/) do
          groups Name::Variable, Punctuation, Literal::String
        end

        # Resource Group
        rule(/^(#+)(\s*Group\s+)(.*)$/) do
          groups Punctuation, Keyword, Generic::Heading
        end

        # Resource \ Action
        rule(/^(#+)(.*)(\[.*\])$/) do
          groups Punctuation, Generic::Heading, Literal::String
        end

        # Relation
        rule(/^([\+\-\*])(\s*Relation:)(\s*.*)$/) do
          groups Punctuation, Keyword, Literal::String
        end

        # MSON
        rule(/^(\s+[\+\-\*]\s*)(Attributes|Parameters)(.*)$/) do
          groups Punctuation, Keyword, Literal::String
        end

        # Request/Response
        rule(/^([\+\-\*]\s*)(Request|Response)(\s+\d\d\d)?(.*)$/) do
          groups Punctuation, Keyword, Literal::Number, Literal::String
        end
      end
    end
  end
end
