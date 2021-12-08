# Replaces multiple newlines and whitespace 
# between them with one newline
# Source: https://github.com/aucor/jekyll-plugins
# Modified by jmrplens
module Jekyll
    module StripHTML
    def strip(content)
      if strip_enabled?
        content.gsub(/\n(\s*\n)+/,"\n") # This get conflict with code snippets like {% highlight ... }
      else
        content
      end
    end

    private

    def strip_enabled?
        config = @context.registers[:site].config
        true?(config['strip'])
    end

    def true?(obj)
        obj.to_s.downcase == 'true'
    end

  end
end

Liquid::Template.register_filter(Jekyll::StripHTML)