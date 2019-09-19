# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    load_lexer 'jsx.rb'
    load_lexer 'typescript/common.rb'

    class TSX < JSX
      include TypescriptCommon

      title 'TypeScript'
      desc 'tsx'

      tag 'tsx'
      filenames '*.tsx'
    end
  end
end

