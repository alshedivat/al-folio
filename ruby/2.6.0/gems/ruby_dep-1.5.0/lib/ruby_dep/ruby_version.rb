
module RubyDep
  class RubyVersion
    attr_reader :status # NOTE: monkey-patched by acceptance tests
    attr_reader :version
    attr_reader :engine

    def initialize(ruby_version, engine)
      @engine = engine
      @version = Gem::Version.new(ruby_version)
      @status = detect_status
    end

    def recognized?
      info.any?
    end

    def recommended(status)
      current = Gem::Version.new(@version)
      info.select do |key, value|
        value == status && Gem::Version.new(key) > current
      end.keys.reverse
    end

    private

    VERSION_INFO = {
      'ruby' => {
        '2.3.1' => :unknown,
        '2.3.0' => :buggy,
        '2.2.5' => :unknown,
        '2.2.4' => :buggy,
        '2.2.0' => :insecure,
        '2.1.9' => :buggy,
        '2.0.0' => :insecure
      },

      'jruby' => {
        '2.3.0' => :unknown, # jruby-9.1.2.0, jruby-9.1.0.0
        '2.2.3' => :buggy, # jruby-9.0.5.0
        '2.2.0' => :insecure
      }
    }.freeze

    def info
      @info ||= VERSION_INFO[@engine] || {}
    end

    def detect_status
      return :untracked unless recognized?

      info.each do |ruby, status|
        return status if @version >= Gem::Version.new(ruby)
      end
      :insecure
    end
  end
end
