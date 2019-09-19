# -*- coding: utf-8 -*- #

module Rouge
  # A Formatter takes a token stream and formats it for human viewing.
  class Formatter
    # @private
    REGISTRY = {}

    # Specify or get the unique tag for this formatter.  This is used
    # for specifying a formatter in `rougify`.
    def self.tag(tag=nil)
      return @tag unless tag
      REGISTRY[tag] = self

      @tag = tag
    end

    # Find a formatter class given a unique tag.
    def self.find(tag)
      REGISTRY[tag]
    end

    # Format a token stream.  Delegates to {#format}.
    def self.format(tokens, *a, &b)
      new(*a).format(tokens, &b)
    end

    def initialize(opts={})
      # pass
    end

    # Format a token stream.
    def format(tokens, &b)
      return stream(tokens, &b) if block_given?

      out = ''
      stream(tokens) { |piece| out << piece }

      out
    end

    # @deprecated Use {#format} instead.
    def render(tokens)
      warn 'Formatter#render is deprecated, use #format instead.'
      format(tokens)
    end

    # @abstract
    # yield strings that, when concatenated, form the formatted output
    def stream(tokens, &b)
      raise 'abstract'
    end

  protected
    def token_lines(tokens, &b)
      return enum_for(:token_lines, tokens) unless block_given?

      out = []
      tokens.each do |tok, val|
        val.scan /\n|[^\n]+/ do |s|
          if s == "\n"
            yield out
            out = []
          else
            out << [tok, s]
          end
        end
      end

      # for inputs not ending in a newline
      yield out if out.any?
    end

  end
end
