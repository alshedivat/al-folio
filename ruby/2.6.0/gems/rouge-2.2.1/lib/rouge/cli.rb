# -*- coding: utf-8 -*- #

# not required by the main lib.
# to use this module, require 'rouge/cli'.

module Rouge
  class FileReader
    attr_reader :input
    def initialize(input)
      @input = input
    end

    def file
      case input
      when '-'
        IO.new($stdin.fileno, 'r:utf-8')
      when String
        File.new(input, 'r:utf-8')
      when ->(i){ i.respond_to? :read }
        input
      end
    end

    def read
      @read ||= begin
        file.read
      rescue => e
        $stderr.puts "unable to open #{input}: #{e.message}"
        exit 1
      ensure
        file.close
      end
    end
  end

  class CLI
    def self.doc
      return enum_for(:doc) unless block_given?

      yield %|usage: rougify [command] [args...]|
      yield %||
      yield %|where <command> is one of:|
      yield %|	highlight	#{Highlight.desc}|
      yield %|	help		#{Help.desc}|
      yield %|	style		#{Style.desc}|
      yield %|	list		#{List.desc}|
      yield %|	version		#{Version.desc}|
      yield %||
      yield %|See `rougify help <command>` for more info.|
    end

    class Error < StandardError
      attr_reader :message, :status
      def initialize(message, status=1)
        @message = message
        @status = status
      end
    end

    def self.parse(argv=ARGV)
      argv = normalize_syntax(argv)

      mode = argv.shift

      klass = class_from_arg(mode)
      return klass.parse(argv) if klass

      case mode
      when '-h', '--help', 'help', '-help', nil
        Help.parse(argv)
      else
        argv.unshift(mode) if mode
        Highlight.parse(argv)
      end
    end

    def initialize(options={})
    end

    def self.error!(msg, status=1)
      raise Error.new(msg, status)
    end

    def error!(*a)
      self.class.error!(*a)
    end

    def self.class_from_arg(arg)
      case arg
      when 'version', '--version', '-v'
        Version
      when 'help'
        Help
      when 'highlight', 'hi'
        Highlight
      when 'style'
        Style
      when 'list'
        List
      end
    end

    class Version < CLI
      def self.desc
        "print the rouge version number"
      end

      def self.parse(*); new; end

      def run
        puts Rouge.version
      end
    end

    class Help < CLI
      def self.desc
        "print help info"
      end

      def self.doc
        return enum_for(:doc) unless block_given?

        yield %|usage: rougify help <command>|
        yield %||
        yield %|print help info for <command>.|
      end

      def self.parse(argv)
        opts = { :mode => CLI }
        until argv.empty?
          arg = argv.shift
          klass = class_from_arg(arg)
          if klass
            opts[:mode] = klass
            next
          end
        end
        new(opts)
      end

      def initialize(opts={})
        @mode = opts[:mode]
      end

      def run
        @mode.doc.each(&method(:puts))
      end
    end

    class Highlight < CLI
      def self.desc
        "highlight code"
      end

      def self.doc
        return enum_for(:doc) unless block_given?

        yield %[usage: rougify highlight <filename> [options...]]
        yield %[       rougify highlight [options...]]
        yield %[]
        yield %[--input-file|-i <filename>  specify a file to read, or - to use stdin]
        yield %[]
        yield %[--lexer|-l <lexer>          specify the lexer to use.]
        yield %[                            If not provided, rougify will try to guess]
        yield %[                            based on --mimetype, the filename, and the]
        yield %[                            file contents.]
        yield %[]
        yield %[--formatter|-f <opts>       specify the output formatter to use.]
        yield %[                            If not provided, rougify will default to]
        yield %[                            terminal256.]
        yield %[]
        yield %[--theme|-t <theme>          specify the theme to use for highlighting]
        yield %[                            the file. (only applies to some formatters)]
        yield %[]
        yield %[--mimetype|-m <mimetype>    specify a mimetype for lexer guessing]
        yield %[]
        yield %[--lexer-opts|-L <opts>      specify lexer options in CGI format]
        yield %[                            (opt1=val1&opt2=val2)]
        yield %[]
        yield %[--formatter-opts|-F <opts>  specify formatter options in CGI format]
        yield %[                            (opt1=val1&opt2=val2)]
        yield %[]
        yield %[--require|-r <filename>     require a filename or library before]
        yield %[                            highlighting]
      end

      def self.parse(argv)
        opts = {
          :formatter => 'terminal256',
          :theme => 'thankful_eyes',
          :css_class => 'codehilite',
          :input_file => '-',
          :lexer_opts => {},
          :formatter_opts => {},
          :requires => [],
        }

        until argv.empty?
          arg = argv.shift
          case arg
          when '-r', '--require'
            opts[:requires] << argv.shift
          when '--input-file', '-i'
            opts[:input_file] = argv.shift
          when '--mimetype', '-m'
            opts[:mimetype] = argv.shift
          when '--lexer', '-l'
            opts[:lexer] = argv.shift
          when '--formatter-preset', '-f'
            opts[:formatter] = argv.shift
          when '--theme', '-t'
            opts[:theme] = argv.shift
          when '--css-class', '-c'
            opts[:css_class] = argv.shift
          when '--lexer-opts', '-L'
            opts[:lexer_opts] = parse_cgi(argv.shift)
          when /^--/
            error! "unknown option #{arg.inspect}"
          else
            opts[:input_file] = arg
          end
        end

        new(opts)
      end

      def input_stream
        @input_stream ||= FileReader.new(@input_file)
      end

      def input
        @input ||= input_stream.read
      end

      def lexer_class
        @lexer_class ||= Lexer.guess(
          :filename => @input_file,
          :mimetype => @mimetype,
          :source => input_stream,
        )
      end

      def lexer
        @lexer ||= lexer_class.new(@lexer_opts)
      end

      attr_reader :input_file, :lexer_name, :mimetype, :formatter

      def initialize(opts={})
        Rouge::Lexer.enable_debug!

        opts[:requires].each do |r|
          require r
        end

        @input_file = opts[:input_file]

        if opts[:lexer]
          @lexer_class = Lexer.find(opts[:lexer]) \
            or error! "unknown lexer #{opts[:lexer].inspect}"
        else
          @lexer_name = opts[:lexer]
          @mimetype = opts[:mimetype]
        end

        @lexer_opts = opts[:lexer_opts]

        theme = Theme.find(opts[:theme]).new or error! "unknown theme #{opts[:theme]}"

        @formatter = case opts[:formatter]
        when 'terminal256' then Formatters::Terminal256.new(theme)
        when 'html' then Formatters::HTML.new
        when 'html-pygments' then Formatters::HTMLPygments.new(Formatters::HTML.new, opts[:css_class])
        when 'html-inline' then Formatters::HTMLInline.new(theme)
        when 'html-table' then Formatters::HTMLTable.new(Formatters::HTML.new)
        when 'null', 'raw', 'tokens' then Formatters::Null.new
        else
          error! "unknown formatter preset #{opts[:formatter]}"
        end
      end

      def run
        formatter.format(lexer.lex(input), &method(:print))
      end

    private_class_method
      def self.parse_cgi(str)
        pairs = CGI.parse(str).map { |k, v| [k.to_sym, v.first] }
        Hash[pairs]
      end
    end

    class Style < CLI
      def self.desc
        "print CSS styles"
      end

      def self.doc
        return enum_for(:doc) unless block_given?

        yield %|usage: rougify style [<theme-name>] [<options>]|
        yield %||
        yield %|Print CSS styles for the given theme.  Extra options are|
        yield %|passed to the theme.  Theme defaults to thankful_eyes.|
        yield %||
        yield %|options:|
        yield %|  --scope	(default: .highlight) a css selector to scope by|
        yield %||
        yield %|available themes:|
        yield %|  #{Theme.registry.keys.sort.join(', ')}|
      end

      def self.parse(argv)
        opts = { :theme_name => 'thankful_eyes' }

        until argv.empty?
          arg = argv.shift
          case arg
          when /--(\w+)/
            opts[$1.tr('-', '_').to_sym] = argv.shift
          else
            opts[:theme_name] = arg
          end
        end

        new(opts)
      end

      def initialize(opts)
        theme_name = opts.delete(:theme_name)
        theme_class = Theme.find(theme_name) \
          or error! "unknown theme: #{theme_name}"

        @theme = theme_class.new(opts)
      end

      def run
        @theme.render(&method(:puts))
      end
    end

    class List < CLI
      def self.desc
        "list available lexers"
      end

      def self.doc
        return enum_for(:doc) unless block_given?

        yield %|usage: rouge list|
        yield %||
        yield %|print a list of all available lexers with their descriptions.|
      end

      def self.parse(argv)
        new
      end

      def run
        puts "== Available Lexers =="

        Lexer.all.sort_by(&:tag).each do |lexer|
          desc = "#{lexer.desc}"
          if lexer.aliases.any?
            desc << " [aliases: #{lexer.aliases.join(',')}]"
          end
          puts "%s: %s" % [lexer.tag, desc]

          lexer.option_docs.keys.sort.each do |option|
            puts "  ?#{option}= #{lexer.option_docs[option]}"
          end

          puts
        end
      end
    end

  private_class_method
    def self.normalize_syntax(argv)
      out = []
      argv.each do |arg|
        case arg
        when /^(--\w+)=(.*)$/
          out << $1 << $2
        when /^(-\w)(.+)$/
          out << $1 << $2
        else
          out << arg
        end
      end

      out
    end
  end
end
