# frozen_string_literal: true

module JekyllFeed
  class MetaTag < Liquid::Tag
    # Use Jekyll's native relative_url filter
    include Jekyll::Filters::URLFilters

    def render(context)
      @context = context
      attrs    = attributes.map { |k, v| %(#{k}="#{v}") }.join(" ")
      "<link #{attrs} />"
    end

    private

    def config
      @config ||= @context.registers[:site].config
    end

    def attributes
      {
        :type  => "application/atom+xml",
        :rel   => "alternate",
        :href  => absolute_url(path),
        :title => title,
      }.keep_if { |_, v| v }
    end

    def path
      config.dig("feed", "path") || "feed.xml"
    end

    def title
      config["title"] || config["name"]
    end
  end
end
