# Source: https://www.ffbit.com/blog/2021/03/17/html-minification-in-jekyll.html
require 'htmlcompressor'

module Jekyll
    module MinifyFilter
        def minify(content)
            if minify_enabled?
                compressor = HtmlCompressor::Compressor.new
                compressor.compress content
            else
                content
            end
        end

        private

        def minify_enabled?
            config = @context.registers[:site].config
            true?(config['minify'])
        end

        def true?(obj)
            obj.to_s.downcase == 'true'
        end
    end
end

Liquid::Template.register_filter(Jekyll::MinifyFilter)
