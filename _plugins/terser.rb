# based on https://github.com/RobertoJBeltran/jekyll-terser
# it should be changed to use `jekyll-terser` gem after https://github.com/RobertoJBeltran/jekyll-terser/pull/1 is merged
require 'terser'

module Jekyll
  module Terser
    class JSFile < Jekyll::StaticFile
      @@mtimes = {}

      # Initialize a new JSFile.
      #   +site+ is the Site
      #   +base+ is the String path to the <source>
      #   +dir+ is the String path between <source> and the file
      #   +name+ is the String filename of the file
      #   +terser+ is the Terser instance
      def initialize(site, base, dir, name, terser = nil)
        super(site, base, dir, name)
        @site = site
        @base = base
        @dir = dir
        @name = name
        if terser.nil?
          if site.config["terser"].nil?
            options = {}
          else
            options = site.config["terser"]
          end
          @terser = ::Terser.new(options.transform_keys(&:to_sym))

        else
          @terser = terser
        end
      end

      # Obtain destination path.
      #   +dest+ is the String path to the destination dir
      #
      # Returns destination file path.
      def destination(dest)
        File.join(dest, @dir, @name)
      end

      # Process the .js file
      #   +dest+ is the String path to the destination dir
      #
      # Returns false if the file was not modified since last time (no-op).
      def write(dest)
        dest_path = destination(dest)

        return false if File.exist? dest_path and !modified?
        @@mtimes[path] = mtime

        FileUtils.mkdir_p(File.dirname(dest_path))
        begin
          content = File.read(path)
          content = @terser.compile(content)
          File.open(dest_path, 'w') do |f|
            f.write(content)
          end
        rescue => e
          STDERR.puts "Terser Exception: #{e.message}"
        end

        true
      end
    end

    class TerserGenerator < Jekyll::Generator
      safe true

      # Initialize options from site config.
      def initialize(config = {})
        # check if options is not empty
        if config["terser"].nil?
          @options = {}
        else
          @options = config["terser"]
        end

        @terser = ::Terser.new(@options.transform_keys(&:to_sym))
      end

      # Jekyll will have already added the *.js files as Jekyll::StaticFile
      # objects to the static_files array.  Here we replace those with a
      # JSFile object.
      def generate(site)
        site.static_files.clone.each do |sf|
          # do not process already minified files
          if sf.kind_of?(Jekyll::StaticFile) && sf.path =~ /\.js$/ && !sf.path.end_with?(".min.js")
            puts "Terser: Minifying #{sf.path}"
            site.static_files.delete(sf)
            name = File.basename(sf.path)
            destination = File.dirname(sf.path).sub(site.source, '')

            js_file = JSFile.new(site, site.source, destination, name, @terser)
            site.static_files << js_file
          end
        end
      end
    end
  end
end
