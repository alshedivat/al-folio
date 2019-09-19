require 'ruby_dep/logger'
require 'ruby_dep/ruby_version'

module RubyDep
  PROJECT_URL = 'http://github.com/e2/ruby_dep'.freeze

  class Warning
    DISABLING_ENVIRONMENT_VAR = 'RUBY_DEP_GEM_SILENCE_WARNINGS'.freeze
    PREFIX = 'RubyDep: WARNING: '.freeze

    WARNING = {
      insecure: 'Your Ruby has security vulnerabilities!'.freeze,
      buggy: 'Your Ruby is outdated/buggy.'.freeze,
      untracked: 'Your Ruby may not be supported.'.freeze
    }.freeze

    NOTICE_RECOMMENDATION = 'Your Ruby is: %s (%s).'\
      ' Recommendation: upgrade to %s.'.freeze

    NOTICE_BUGGY_ALTERNATIVE = '(Or, at least to %s)'.freeze

    NOTICE_HOW_TO_DISABLE = '(To disable warnings, see:'\
      "#{PROJECT_URL}/wiki/Disabling-warnings )".freeze

    NOTICE_OPEN_ISSUE = 'If you need this version supported,'\
      " please open an issue at #{PROJECT_URL}".freeze

    def initialize
      @version = RubyVersion.new(RUBY_VERSION, RUBY_ENGINE)
    end

    def show_warnings
      return if silenced?
      return warn_ruby(WARNING[status]) if WARNING.key?(status)
      return if status == :unknown
      raise "Unknown problem type: #{problem.inspect}"
    end

    def silence!
      ENV[DISABLING_ENVIRONMENT_VAR] = '1'
    end

    private

    def silenced?
      value = ENV[DISABLING_ENVIRONMENT_VAR]
      (value || '0') !~ /^0|false|no|n$/
    end

    def status
      @version.status
    end

    def warn_ruby(msg)
      RubyDep.logger.tap do |logger|
        logger.warn(PREFIX + msg)
        logger.info(PREFIX + recommendation)
        logger.info(PREFIX + NOTICE_HOW_TO_DISABLE)
      end
    end

    def recommendation
      return unrecognized_msg unless @version.recognized?
      return recommendation_msg unless status == :insecure
      [recommendation_msg, safer_alternatives_msg].join(' ')
    end

    def unrecognized_msg
      format(
        "Your Ruby is: %s '%s' (unrecognized). %s",
        @version.version,
        @version.engine,
        NOTICE_OPEN_ISSUE
      )
    end

    def recommended_versions
      @version.recommended(:unknown)
    end

    def buggy_alternatives
      @version.recommended(:buggy)
    end

    def recommendation_msg
      format(
        NOTICE_RECOMMENDATION,
        @version.version,
        status,
        recommended_versions.join(' or ')
      )
    end

    def safer_alternatives_msg
      format(NOTICE_BUGGY_ALTERNATIVE, buggy_alternatives.join(' or '))
    end
  end
end
