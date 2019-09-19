# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class LiterateHaskell < RegexLexer
      title "Literate Haskell"
      desc 'Literate haskell'
      tag 'literate_haskell'
      aliases 'lithaskell', 'lhaskell', 'lhs'
      filenames '*.lhs'
      mimetypes 'text/x-literate-haskell'

      def haskell
        @haskell ||= Haskell.new(options)
      end

      start { haskell.reset! }

      # TODO: support TeX versions as well.
      state :root do
        rule /\s*?\n(?=>)/, Text, :code
        rule /.*?\n/, Text
        rule /.+\z/, Text
      end

      state :code do
        rule /(>)( .*?(\n|\z))/ do |m|
          token Name::Label, m[1]
          delegate haskell, m[2]
        end

        rule /\s*\n(?=\s*[^>])/, Text, :pop!
      end
    end
  end
end
