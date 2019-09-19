module Rouge
  module Lexers
    load_lexer 'html.rb'

    class Vue < HTML
      desc 'Vue.js single-file components'
      tag 'vue'
      aliases 'vuejs'
      filenames '*.vue'

      mimetypes 'text/x-vue', 'application/x-vue'

      def initialize(*)
        super
        @js = Javascript.new(options)
      end

      def self.analyze_text(text)
        return 0
      end

      def lookup_lang(lang)
        case lang
        when 'html' then HTML
        when 'css' then CSS
        when 'javascript' then Javascript
        when 'sass' then Sass
        when 'scss' then Scss
        when 'coffee' then CoffeeScript
          # TODO: add more when the lexers are done
        else
          PlainText
        end
      end

      start { @js.reset! }

      prepend :root do
        rule /(<)(\s*)(template)/ do
          groups Name::Tag, Text, Keyword
          @lang = HTML
          push :template
          push :lang_tag
        end

        rule /(<)(\s*)(style)/ do
          groups Name::Tag, Text, Keyword
          @lang = CSS
          push :style
          push :lang_tag
        end

        rule /(<)(\s*)(script)/ do
          groups Name::Tag, Text, Keyword
          @lang = Javascript
          push :script
          push :lang_tag
        end
      end

      state :style do
        rule /(<\s*\/\s*)(style)(\s*>)/ do
          groups Name::Tag, Keyword, Name::Tag
          pop!
        end

        mixin :style_content
        mixin :embed
      end

      state :script do
        rule /(<\s*\/\s*)(script)(\s*>)/ do
          groups Name::Tag, Keyword, Name::Tag
          pop!
        end

        mixin :script_content
        mixin :embed
      end

      state :lang_tag do
        rule /(lang\s*=)(\s*)("(?:\\.|[^\\])*?"|'(\\.|[^\\])*?'|[^\s>]+)/ do |m|
          groups Name::Attribute, Text, Str
          @lang = lookup_lang(m[2])
        end

        mixin :tag
      end

      state :template do
        rule %r((<\s*/\s*)(template)(\s*>)) do
          groups Name::Tag, Keyword, Name::Tag
          pop!
        end

        rule /{{/ do
          token Str::Interpol
          push :template_interpol
          @js.reset!
        end

        mixin :embed
      end

      state :template_interpol do
        rule /}}/, Str::Interpol, :pop!
        rule /}/, Error
        mixin :template_interpol_inner
      end

      state :template_interpol_inner do
        rule(/{/) { delegate @js; push }
        rule(/}/) { delegate @js; pop! }
        rule(/[^{}]+/) { delegate @js }
      end

      state :embed do
        rule(/[^{<]+/) { delegate @lang }
        rule(/[<{][^<{]*/) { delegate @lang }
      end
    end
  end
end

