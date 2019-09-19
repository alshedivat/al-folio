# -*- coding: utf-8 -*- #

# this file is not require'd from the root.  To use this plugin, run:
#
#    require 'rouge/plugins/redcarpet'

module Rouge
  module Plugins
    module Redcarpet
      def block_code(code, language)
        lexer = Lexer.find_fancy(language, code) || Lexers::PlainText

        # XXX HACK: Redcarpet strips hard tabs out of code blocks,
        # so we assume you're not using leading spaces that aren't tabs,
        # and just replace them here.
        if lexer.tag == 'make'
          code.gsub! /^    /, "\t"
        end

        formatter = rouge_formatter(lexer)
        formatter.format(lexer.lex(code))
      end

      # override this method for custom formatting behavior
      def rouge_formatter(lexer)
        Formatters::HTMLLegacy.new(:css_class => "highlight #{lexer.tag}")
      end
    end
  end
end
