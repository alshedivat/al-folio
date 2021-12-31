require 'htmlbeautifier'

module Jekyll
    module StripHTML
    def beautify(content)
      if beautify_enabled?
        content = HtmlBeautifier.beautify(content)
      else
        content
      end
    end

    private

    def beautify_enabled?
        config = @context.registers[:site].config
        true?(config['beautify'])
    end

    def true?(obj)
        obj.to_s.downcase == 'true'
    end

  end
end

Liquid::Template.register_filter(Jekyll::StripHTML)
