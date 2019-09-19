# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    load_lexer 'javascript.rb'
    load_lexer 'typescript/common.rb'

    class Typescript < Javascript
      include TypescriptCommon

      title "TypeScript"
      desc "TypeScript, a superset of JavaScript"

      tag 'typescript'
      aliases 'ts'

      filenames '*.ts', '*.d.ts'

      mimetypes 'text/typescript'
    end
  end
end
