# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Markdown < RegexLexer
      title "Markdown"
      desc "Markdown, a light-weight markup language for authors"

      tag 'markdown'
      aliases 'md', 'mkd'
      filenames '*.markdown', '*.md', '*.mkd'
      mimetypes 'text/x-markdown'

      def html
        @html ||= HTML.new(options)
      end

      start { html.reset! }

      edot = /\\.|[^\\\n]/

      state :root do
        # YAML frontmatter
        rule(/\A(---\s*\n.*?\n?)^(---\s*$\n?)/m) { delegate YAML }

        rule /\\./, Str::Escape

        rule /^[\S ]+\n(?:---*)\n/, Generic::Heading
        rule /^[\S ]+\n(?:===*)\n/, Generic::Subheading

        rule /^#(?=[^#]).*?$/, Generic::Heading
        rule /^##*.*?$/, Generic::Subheading

        rule /(\n[ \t]*)(```|~~~)(.*?)(\n.*?\n)(\2)/m do |m|
          sublexer = Lexer.find_fancy(m[3].strip, m[4], @options)
          sublexer ||= PlainText.new(@options.merge(:token => Str::Backtick))
          sublexer.reset!

          token Text, m[1]
          token Punctuation, m[2]
          token Name::Label, m[3]
          delegate sublexer, m[4]
          token Punctuation, m[5]
        end

        rule /\n\n((    |\t).*?\n|\n)+/, Str::Backtick

        rule /(`+)(?:#{edot}|\n)+?\1/, Str::Backtick

        # various uses of * are in order of precedence

        # line breaks
        rule /^(\s*[*]){3,}\s*$/, Punctuation
        rule /^(\s*[-]){3,}\s*$/, Punctuation

        # bulleted lists
        rule /^\s*[*+-](?=\s)/, Punctuation

        # numbered lists
        rule /^\s*\d+\./, Punctuation

        # blockquotes
        rule /^\s*>.*?$/, Generic::Traceback

        # link references
        # [foo]: bar "baz"
        rule %r(^
          (\s*) # leading whitespace
          (\[) (#{edot}+?) (\]) # the reference
          (\s*) (:) # colon
        )x do
          groups Text, Punctuation, Str::Symbol, Punctuation, Text, Punctuation

          push :title
          push :url
        end

        # links and images
        rule /(!?\[)(#{edot}+?)(\])/ do
          groups Punctuation, Name::Variable, Punctuation
          push :link
        end

        rule /[*][*]#{edot}*?[*][*]/, Generic::Strong
        rule /__#{edot}*?__/, Generic::Strong

        rule /[*]#{edot}*?[*]/, Generic::Emph
        rule /_#{edot}*?_/, Generic::Emph

        # Automatic links
        rule /<.*?@.+[.].+>/, Name::Variable
        rule %r[<(https?|mailto|ftp)://#{edot}*?>], Name::Variable


        rule /[^\\`\[*\n&<]+/, Text

        # inline html
        rule(/&\S*;/) { delegate html }
        rule(/<#{edot}*?>/) { delegate html }
        rule /[&<]/, Text

        rule /\n/, Text
      end

      state :link do
        rule /(\[)(#{edot}*?)(\])/ do
          groups Punctuation, Str::Symbol, Punctuation
          pop!
        end

        rule /[(]/ do
          token Punctuation
          push :inline_title
          push :inline_url
        end

        rule /[ \t]+/, Text

        rule(//) { pop! }
      end

      state :url do
        rule /[ \t]+/, Text

        # the url
        rule /(<)(#{edot}*?)(>)/ do
          groups Name::Tag, Str::Other, Name::Tag
          pop!
        end

        rule /\S+/, Str::Other, :pop!
      end

      state :title do
        rule /"#{edot}*?"/, Name::Namespace
        rule /'#{edot}*?'/, Name::Namespace
        rule /[(]#{edot}*?[)]/, Name::Namespace
        rule /\s*(?=["'()])/, Text
        rule(//) { pop! }
      end

      state :inline_title do
        rule /[)]/, Punctuation, :pop!
        mixin :title
      end

      state :inline_url do
        rule /[^<\s)]+/, Str::Other, :pop!
        rule /\s+/m, Text
        mixin :url
      end
    end
  end
end
