# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class ERB < TemplateLexer
      title "ERB"
      desc "Embedded ruby template files"

      tag 'erb'
      aliases 'eruby', 'rhtml'

      filenames '*.erb', '*.erubis', '*.rhtml', '*.eruby'

      def self.analyze_text(text)
        return 0.4 if text =~ /<%.*%>/
      end

      def initialize(opts={})
        @ruby_lexer = Ruby.new(opts)

        super(opts)
      end

      start do
        parent.reset!
        @ruby_lexer.reset!
      end

      open  = /<%%|<%=|<%#|<%-|<%/
      close = /%%>|-%>|%>/

      state :root do
        rule /<%#/, Comment, :comment

        rule open, Comment::Preproc, :ruby

        rule /.+?(?=#{open})|.+/m do
          delegate parent
        end
      end

      state :comment do
        rule close, Comment, :pop!
        rule /.+(?=#{close})|.+/m, Comment
      end

      state :ruby do
        rule close, Comment::Preproc, :pop!

        rule /.+?(?=#{close})|.+/m do
          delegate @ruby_lexer
        end
      end
    end
  end
end
