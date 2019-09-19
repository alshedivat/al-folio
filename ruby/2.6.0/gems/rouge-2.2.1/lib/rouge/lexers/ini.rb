# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class INI < RegexLexer
      title "INI"
      desc 'the INI configuration format'
      tag 'ini'

      # TODO add more here
      filenames '*.ini', '*.INI', '*.gitconfig'
      mimetypes 'text/x-ini'

      def self.analyze_text(text)
        return 0.1 if text =~ /\A\[[\w\-.]+\]\s*[\w\-]+=\w+/
      end

      identifier = /[\w\-.]+/

      state :basic do
        rule /[;#].*?\n/, Comment
        rule /\s+/, Text
        rule /\\\n/, Str::Escape
      end

      state :root do
        mixin :basic

        rule /(#{identifier})(\s*)(=)/ do
          groups Name::Property, Text, Punctuation
          push :value
        end

        rule /\[.*?\]/, Name::Namespace
      end

      state :value do
        rule /\n/, Text, :pop!
        mixin :basic
        rule /"/, Str, :dq
        rule /'.*?'/, Str
        mixin :esc_str
        rule /[^\\\n]+/, Str
      end

      state :dq do
        rule /"/, Str, :pop!
        mixin :esc_str
        rule /[^\\"]+/m, Str
      end

      state :esc_str do
        rule /\\./m, Str::Escape
      end
    end
  end
end
