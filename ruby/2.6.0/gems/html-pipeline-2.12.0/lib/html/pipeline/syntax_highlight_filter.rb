# frozen_string_literal: true

HTML::Pipeline.require_dependency('rouge', 'SyntaxHighlightFilter')

module HTML
  class Pipeline
    # HTML Filter that syntax highlights code blocks wrapped
    # in <pre lang="...">.
    class SyntaxHighlightFilter < Filter
      def initialize(*args)
        super(*args)
        @formatter = Rouge::Formatters::HTML.new
      end

      def call
        doc.search('pre').each do |node|
          default = context[:highlight] && context[:highlight].to_s
          next unless lang = node['lang'] || default
          next unless lexer = lexer_for(lang)
          text = node.inner_text

          html = highlight_with_timeout_handling(text, lang)
          next if html.nil?

          node.inner_html = html
          klass = node['class']
          scope = context[:scope] || "highlight-#{lang}"
          klass = [klass, scope].compact.join ' '

          node['class'] = klass
        end
        doc
      end

      def highlight_with_timeout_handling(text, lang)
        Rouge.highlight(text, lang, @formatter)
      rescue Timeout::Error => _
        nil
      end

      def lexer_for(lang)
        Rouge::Lexer.find(lang)
      end
    end
  end
end
