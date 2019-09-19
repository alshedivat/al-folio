# -*- coding: utf-8 -*- #

# stdlib
require 'pathname'

# The containing module for Rouge
module Rouge
  class << self
    def reload!
      Object.send :remove_const, :Rouge
      load __FILE__
    end

    # Highlight some text with a given lexer and formatter.
    #
    # @example
    #   Rouge.highlight('@foo = 1', 'ruby', 'html')
    #   Rouge.highlight('var foo = 1;', 'js', 'terminal256')
    #
    #   # streaming - chunks become available as they are lexed
    #   Rouge.highlight(large_string, 'ruby', 'html') do |chunk|
    #     $stdout.print chunk
    #   end
    def highlight(text, lexer, formatter, &b)
      lexer = Lexer.find(lexer) unless lexer.respond_to? :lex
      raise "unknown lexer #{lexer}" unless lexer

      formatter = Formatter.find(formatter) unless formatter.respond_to? :format
      raise "unknown formatter #{formatter}" unless formatter

      formatter.format(lexer.lex(text), &b)
    end
  end
end

load_dir = Pathname.new(__FILE__).dirname
load load_dir.join('rouge/version.rb')

load load_dir.join('rouge/util.rb')

load load_dir.join('rouge/text_analyzer.rb')
load load_dir.join('rouge/token.rb')

load load_dir.join('rouge/guesser.rb')
load load_dir.join('rouge/guessers/glob_mapping.rb')
load load_dir.join('rouge/guessers/modeline.rb')
load load_dir.join('rouge/guessers/filename.rb')
load load_dir.join('rouge/guessers/mimetype.rb')
load load_dir.join('rouge/guessers/source.rb')

load load_dir.join('rouge/lexer.rb')
load load_dir.join('rouge/regex_lexer.rb')
load load_dir.join('rouge/template_lexer.rb')

lexers_dir = load_dir.join('rouge/lexers')
Dir.glob(lexers_dir.join('*.rb')).each do |f|
  Rouge::Lexers.load_lexer(Pathname.new(f).relative_path_from(lexers_dir).to_s)
end

load load_dir.join('rouge/formatter.rb')
load load_dir.join('rouge/formatters/html.rb')
load load_dir.join('rouge/formatters/html_table.rb')
load load_dir.join('rouge/formatters/html_pygments.rb')
load load_dir.join('rouge/formatters/html_legacy.rb')
load load_dir.join('rouge/formatters/html_linewise.rb')
load load_dir.join('rouge/formatters/html_inline.rb')
load load_dir.join('rouge/formatters/terminal256.rb')
load load_dir.join('rouge/formatters/null.rb')

load load_dir.join('rouge/theme.rb')
load load_dir.join('rouge/themes/thankful_eyes.rb')
load load_dir.join('rouge/themes/colorful.rb')
load load_dir.join('rouge/themes/base16.rb')
load load_dir.join('rouge/themes/github.rb')
load load_dir.join('rouge/themes/igor_pro.rb')
load load_dir.join('rouge/themes/monokai.rb')
load load_dir.join('rouge/themes/molokai.rb')
load load_dir.join('rouge/themes/monokai_sublime.rb')
load load_dir.join('rouge/themes/gruvbox.rb')
load load_dir.join('rouge/themes/tulip.rb')
