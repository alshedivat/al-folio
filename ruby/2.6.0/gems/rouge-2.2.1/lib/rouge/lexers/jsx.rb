module Rouge
  module Lexers
    load_lexer 'javascript.rb'

    class JSX < Javascript
      title 'JSX'
      desc 'React JSX (https://facebook.github.io/react/)'
      tag 'jsx'
      aliases 'jsx', 'react'
      filenames '*.jsx'

      mimetypes 'text/x-jsx', 'application/x-jsx'

      id = Javascript.id_regex

      def start_embed!
        @embed ||= JSX.new(options)
        @embed.reset!
        @embed.push(:expr_start)
        push :jsx_embed_root
      end

      def tag_token(name)
        name[0] =~ /\p{Lower}/ ? Name::Tag : Name::Class
      end

      start { @html = HTML.new(options) }

      state :jsx_tags do
        rule /</, Punctuation, :jsx_element
      end

      state :jsx_internal do
        rule %r(</) do
          token Punctuation
          goto :jsx_end_tag
        end

        rule /{/ do
          token Str::Interpol
          start_embed!
        end

        rule /[^<>{]+/ do
          delegate @html
        end

        mixin :jsx_tags
      end

      prepend :expr_start do
        mixin :jsx_tags
      end

      state :jsx_tag do
        mixin :comments_and_whitespace
        rule /#{id}/ do |m|
          token tag_token(m[0])
        end

        rule /[.]/, Punctuation
      end

      state :jsx_end_tag do
        mixin :jsx_tag
        rule />/, Punctuation, :pop!
      end

      state :jsx_element do
        rule /#{id}=/, Name::Attribute, :jsx_attribute
        mixin :jsx_tag
        rule />/ do token Punctuation; goto :jsx_internal end
        rule %r(/>), Punctuation, :pop!
      end

      state :jsx_attribute do
        rule /"(\\[\\"]|[^"])*"/, Str::Double, :pop!
        rule /'(\\[\\']|[^'])*'/, Str::Single, :pop!
        rule /{/ do
          token Str::Interpol
          pop!
          start_embed!
        end
      end

      state :jsx_embed_root do
        rule /[.][.][.]/, Punctuation
        rule /}/, Str::Interpol, :pop!
        mixin :jsx_embed
      end

      state :jsx_embed do
        rule /{/ do delegate @embed; push :jsx_embed end
        rule /}/ do delegate @embed; pop! end
        rule /[^{}]+/ do
          delegate @embed
        end
      end
    end
  end
end

