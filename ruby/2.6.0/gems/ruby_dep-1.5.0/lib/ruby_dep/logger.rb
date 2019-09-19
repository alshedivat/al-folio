require 'logger'

module RubyDep
  def self.logger
    @logger ||= stderr_logger
  end

  def self.logger=(new_logger)
    @logger = new_logger.nil? ? NullLogger.new : new_logger
  end

  def self.stderr_logger
    ::Logger.new(STDERR).tap do |logger|
      logger.formatter = proc { |_,_,_,msg| "#{msg}\n" }
    end
  end

  # Shamelessly stolen from https://github.com/karafka/null-logger
  class NullLogger
    LOG_LEVELS = %w(unknown fatal error warn info debug).freeze

    def respond_to_missing?(method_name, include_private = false)
      LOG_LEVELS.include?(method_name.to_s) || super
    end

    def method_missing(method_name, *args, &block)
      LOG_LEVELS.include?(method_name.to_s) ? nil : super
    end
  end

  # TODO: not used, but kept for the sake of SemVer
  # TODO: remove in next major version
  class Logger
    def initialize(device, prefix)
      @device = device
      @prefix = prefix
      ::RubyDep.logger.warn("The RubyDep::Logger class is deprecated")
    end

    def warning(msg)
      @device.puts @prefix + msg
    end

    def notice(msg)
      @device.puts @prefix + msg
    end
  end
end
