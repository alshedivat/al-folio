module RubyDep
  class Travis
    class RubyVersion
      REGEXP = /^
      (?:
       (?<engine>ruby|jruby)
      -)?
        (?<version>\d+\.\d+\.\d+(?:\.\d+)?)
      (?:-p\d+)?
      (?:-clang)?
      $/x

      class Error < RuntimeError
        class Unrecognized < Error
          def initialize(invalid_version_string)
            @invalid_version_string = invalid_version_string
          end

          def message
            "Unrecognized Ruby version: #{@invalid_version_string.inspect}"
          end

          class JRubyVersion < Unrecognized
            def message
              "Unrecognized JRuby version: #{@invalid_version_string.inspect}"
            end
          end
        end
      end

      def initialize(travis_version_string)
        ruby_version_string = version_for(travis_version_string)
        @version = Gem::Version.new(ruby_version_string)
      end

      def segments
        @version.segments
      end

      private

      def version_for(travis_version_string)
        match = REGEXP.match(travis_version_string)
        raise Error::Unrecognized, travis_version_string unless match
        return match[:version] unless match[:engine]
        return jruby_version(match[:version]) if match[:engine] == 'jruby'
        match[:version] # if match[:engine] == 'ruby'
      end

      def jruby_version(version)
        return '2.3.0' if version == '9.1.2.0'
        return '2.3.0' if version == '9.1.0.0'
        return '2.2.3' if version == '9.0.5.0'
        return '2.2.2' if version == '9.0.4.0'
        raise Error::Unrecognized::JRubyVersion, version
      end
    end
  end
end
