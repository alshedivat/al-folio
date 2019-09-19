# -*- coding: utf-8 -*- #

# stdlib
require 'strscan'
require 'cgi'
require 'set'

module Rouge
  # @abstract
  # A lexer transforms text into a stream of `[token, chunk]` pairs.
  class Lexer
    include Token::Tokens

    @option_docs = {}

    class << self
      # Lexes `stream` with the given options.  The lex is delegated to a
      # new instance.
      #
      # @see #lex
      def lex(stream, opts={}, &b)
        new(opts).lex(stream, &b)
      end

      # Given a string, return the correct lexer class.
      def find(name)
        registry[name.to_s]
      end

      # Find a lexer, with fancy shiny features.
      #
      # * The string you pass can include CGI-style options
      #
      #     Lexer.find_fancy('erb?parent=tex')
      #
      # * You can pass the special name 'guess' so we guess for you,
      #   and you can pass a second argument of the code to guess by
      #
      #     Lexer.find_fancy('guess', "#!/bin/bash\necho Hello, world")
      #
      # This is used in the Redcarpet plugin as well as Rouge's own
      # markdown lexer for highlighting internal code blocks.
      #
      def find_fancy(str, code=nil, additional_options={})
        if str && !str.include?('?') && str != 'guess'
          lexer_class = find(str)
          return lexer_class && lexer_class.new(additional_options)
        end

        name, opts = str ? str.split('?', 2) : [nil, '']

        # parse the options hash from a cgi-style string
        opts = CGI.parse(opts || '').map do |k, vals|
          val = case vals.size
          when 0 then true
          when 1 then vals[0]
          else vals
          end

          [ k.to_s, val ]
        end

        opts = additional_options.merge(Hash[opts])

        lexer_class = case name
        when 'guess', nil
          self.guess(:source => code, :mimetype => opts['mimetype'])
        when String
          self.find(name)
        end

        lexer_class && lexer_class.new(opts)
      end

      # Specify or get this lexer's title. Meant to be human-readable.
      def title(t=nil)
        if t.nil?
          t = tag.capitalize
        end
        @title ||= t
      end

      # Specify or get this lexer's description.
      def desc(arg=:absent)
        if arg == :absent
          @desc
        else
          @desc = arg
        end
      end

      def option_docs
        @option_docs ||= InheritableHash.new(superclass.option_docs)
      end

      def option(name, desc)
        option_docs[name.to_s] = desc
      end

      # Specify or get the path name containing a small demo for
      # this lexer (can be overriden by {demo}).
      def demo_file(arg=:absent)
        return @demo_file = Pathname.new(arg) unless arg == :absent

        @demo_file = Pathname.new(__FILE__).dirname.join('demos', tag)
      end

      # Specify or get a small demo string for this lexer
      def demo(arg=:absent)
        return @demo = arg unless arg == :absent

        @demo = File.read(demo_file, encoding: 'utf-8')
      end

      # @return a list of all lexers.
      def all
        registry.values.uniq
      end

      # Guess which lexer to use based on a hash of info.
      #
      # This accepts the same arguments as Lexer.guess, but will never throw
      # an error.  It will return a (possibly empty) list of potential lexers
      # to use.
      def guesses(info={})
        mimetype, filename, source = info.values_at(:mimetype, :filename, :source)
        custom_globs = info[:custom_globs]

        guessers = (info[:guessers] || []).dup

        guessers << Guessers::Mimetype.new(mimetype) if mimetype
        guessers << Guessers::GlobMapping.by_pairs(custom_globs, filename) if custom_globs && filename
        guessers << Guessers::Filename.new(filename) if filename
        guessers << Guessers::Modeline.new(source) if source
        guessers << Guessers::Source.new(source) if source

        Guesser.guess(guessers, Lexer.all)
      end

      # Guess which lexer to use based on a hash of info.
      #
      # @option info :mimetype
      #   A mimetype to guess by
      # @option info :filename
      #   A filename to guess by
      # @option info :source
      #   The source itself, which, if guessing by mimetype or filename
      #   fails, will be searched for shebangs, <!DOCTYPE ...> tags, and
      #   other hints.
      #
      # @see Lexer.analyze_text
      # @see Lexer.guesses
      def guess(info={})
        lexers = guesses(info)

        return Lexers::PlainText if lexers.empty?
        return lexers[0] if lexers.size == 1

        raise Guesser::Ambiguous.new(lexers)
      end

      def guess_by_mimetype(mt)
        guess :mimetype => mt
      end

      def guess_by_filename(fname)
        guess :filename => fname
      end

      def guess_by_source(source)
        guess :source => source
      end

      def enable_debug!
        @debug_enabled = true
      end

      def disable_debug!
        @debug_enabled = false
      end

      def debug_enabled?
        !!@debug_enabled
      end

    protected
      # @private
      def register(name, lexer)
        registry[name.to_s] = lexer
      end

    public
      # Used to specify or get the canonical name of this lexer class.
      #
      # @example
      #   class MyLexer < Lexer
      #     tag 'foo'
      #   end
      #
      #   MyLexer.tag # => 'foo'
      #
      #   Lexer.find('foo') # => MyLexer
      def tag(t=nil)
        return @tag if t.nil?

        @tag = t.to_s
        Lexer.register(@tag, self)
      end

      # Used to specify alternate names this lexer class may be found by.
      #
      # @example
      #   class Erb < Lexer
      #     tag 'erb'
      #     aliases 'eruby', 'rhtml'
      #   end
      #
      #   Lexer.find('eruby') # => Erb
      def aliases(*args)
        args.map!(&:to_s)
        args.each { |arg| Lexer.register(arg, self) }
        (@aliases ||= []).concat(args)
      end

      # Specify a list of filename globs associated with this lexer.
      #
      # @example
      #   class Ruby < Lexer
      #     filenames '*.rb', '*.ruby', 'Gemfile', 'Rakefile'
      #   end
      def filenames(*fnames)
        (@filenames ||= []).concat(fnames)
      end

      # Specify a list of mimetypes associated with this lexer.
      #
      # @example
      #   class Html < Lexer
      #     mimetypes 'text/html', 'application/xhtml+xml'
      #   end
      def mimetypes(*mts)
        (@mimetypes ||= []).concat(mts)
      end

      # @private
      def assert_utf8!(str)
        return if %w(US-ASCII UTF-8 ASCII-8BIT).include? str.encoding.name
        raise EncodingError.new(
          "Bad encoding: #{str.encoding.names.join(',')}. " +
          "Please convert your string to UTF-8."
        )
      end

    private
      def registry
        @registry ||= {}
      end
    end

    # -*- instance methods -*- #

    attr_reader :options
    # Create a new lexer with the given options.  Individual lexers may
    # specify extra options.  The only current globally accepted option
    # is `:debug`.
    #
    # @option opts :debug
    #   Prints debug information to stdout.  The particular info depends
    #   on the lexer in question.  In regex lexers, this will log the
    #   state stack at the beginning of each step, along with each regex
    #   tried and each stream consumed.  Try it, it's pretty useful.
    def initialize(opts={})
      @options = {}
      opts.each { |k, v| @options[k.to_s] = v }

      @debug = Lexer.debug_enabled? && bool_option(:debug)
    end

    def as_bool(val)
      case val
      when nil, false, 0, '0', 'off'
        false
      when Array
        val.empty? ? true : as_bool(val.last)
      else
        true
      end
    end

    def as_string(val)
      return as_string(val.last) if val.is_a?(Array)

      val ? val.to_s : nil
    end

    def as_list(val)
      case val
      when Array
        val.flat_map { |v| as_list(v) }
      when String
        val.split(',')
      else
        []
      end
    end

    def as_lexer(val)
      return as_lexer(val.last) if val.is_a?(Array)
      return val.new(@options) if val.is_a?(Class) && val < Lexer

      case val
      when Lexer
        val
      when String
        lexer_class = Lexer.find(val)
        lexer_class && lexer_class.new(@options)
      end
    end

    def as_token(val)
      return as_token(val.last) if val.is_a?(Array)
      case val
      when Token
        val
      else
        Token[val]
      end
    end

    def bool_option(name, &default)
      if @options.key?(name.to_s)
        as_bool(@options[name.to_s])
      else
        default ? default.call : false
      end
    end

    def string_option(name, &default)
      as_string(@options.delete(name.to_s, &default))
    end

    def lexer_option(name, &default)
      as_lexer(@options.delete(name.to_s, &default))
    end

    def list_option(name, &default)
      as_list(@options.delete(name.to_s, &default))
    end

    def token_option(name, &default)
      as_token(@options.delete(name.to_s, &default))
    end

    def hash_option(name, defaults, &val_cast)
      name = name.to_s
      out = defaults.dup

      base = @options.delete(name.to_s)
      base = {} unless base.is_a?(Hash)
      base.each { |k, v| out[k.to_s] = val_cast ? val_cast.call(v) : v }

      @options.keys.each do |key|
        next unless key =~ /(\w+)\[(\w+)\]/ and $1 == name
        value = @options.delete(key)

        out[$2] = val_cast ? val_cast.call(value) : value
      end

      out
    end

    # @abstract
    #
    # Called after each lex is finished.  The default implementation
    # is a noop.
    def reset!
    end

    # Given a string, yield [token, chunk] pairs.  If no block is given,
    # an enumerator is returned.
    #
    # @option opts :continue
    #   Continue the lex from the previous state (i.e. don't call #reset!)
    def lex(string, opts={}, &b)
      return enum_for(:lex, string, opts) unless block_given?

      Lexer.assert_utf8!(string)

      reset! unless opts[:continue]

      # consolidate consecutive tokens of the same type
      last_token = nil
      last_val = nil
      stream_tokens(string) do |tok, val|
        next if val.empty?

        if tok == last_token
          last_val << val
          next
        end

        b.call(last_token, last_val) if last_token
        last_token = tok
        last_val = val
      end

      b.call(last_token, last_val) if last_token
    end

    # delegated to {Lexer.tag}
    def tag
      self.class.tag
    end

    # @abstract
    #
    # Yield `[token, chunk]` pairs, given a prepared input stream.  This
    # must be implemented.
    #
    # @param [StringScanner] stream
    #   the stream
    def stream_tokens(stream, &b)
      raise 'abstract'
    end

    # @abstract
    #
    # Return a number between 0 and 1 indicating the likelihood that
    # the text given should be lexed with this lexer.  The default
    # implementation returns 0.  Values under 0.5 will only be used
    # to disambiguate filename or mimetype matches.
    #
    # @param [TextAnalyzer] text
    #   the text to be analyzed, with a couple of handy methods on it,
    #   like {TextAnalyzer#shebang?} and {TextAnalyzer#doctype?}
    def self.analyze_text(text)
      0
    end
  end

  module Lexers
    @_loaded_lexers = {}

    def self.load_lexer(relpath)
      return if @_loaded_lexers.key?(relpath)
      @_loaded_lexers[relpath] = true

      root = Pathname.new(__FILE__).dirname.join('lexers')
      load root.join(relpath)
    end
  end
end
