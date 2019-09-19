# frozen_string_literal: true

HTML::Pipeline.require_dependency('commonmarker', 'MarkdownFilter')

module HTML
  class Pipeline
    # HTML Filter that converts Markdown text into HTML and converts into a
    # DocumentFragment. This is different from most filters in that it can take a
    # non-HTML as input. It must be used as the first filter in a pipeline.
    #
    # Context options:
    #   :gfm      => false    Disable GFM line-end processing
    #   :commonmarker_extensions => [ :table, :strikethrough,
    #      :tagfilter, :autolink ] Common marker extensions to include
    #
    # This filter does not write any additional information to the context hash.
    class MarkdownFilter < TextFilter
      def initialize(text, context = nil, result = nil)
        super text, context, result
        @text = @text.delete "\r"
      end

      # Convert Markdown to HTML using the best available implementation
      # and convert into a DocumentFragment.
      def call
        options = [:GITHUB_PRE_LANG]
        options << :HARDBREAKS if context[:gfm] != false
        options << :UNSAFE if context[:unsafe]
        extensions = context.fetch(
          :commonmarker_extensions,
          %i[table strikethrough tagfilter autolink]
        )
        html = CommonMarker.render_html(@text, options, extensions)
        html.rstrip!
        html
      end
    end
  end
end
