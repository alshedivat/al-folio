require 'listen/adapter/base'
require 'listen/adapter/bsd'
require 'listen/adapter/darwin'
require 'listen/adapter/linux'
require 'listen/adapter/polling'
require 'listen/adapter/windows'

module Listen
  module Adapter
    OPTIMIZED_ADAPTERS = [Darwin, Linux, BSD, Windows].freeze
    POLLING_FALLBACK_MESSAGE = 'Listen will be polling for changes.'\
      'Learn more at https://github.com/guard/listen#listen-adapters.'.freeze

    class << self
      def select(options = {})
        _log :debug, 'Adapter: considering polling ...'
        return Polling if options[:force_polling]
        _log :debug, 'Adapter: considering optimized backend...'
        return _usable_adapter_class if _usable_adapter_class
        _log :debug, 'Adapter: falling back to polling...'
        _warn_polling_fallback(options)
        Polling
      rescue
        _log :warn, format('Adapter: failed: %s:%s', $ERROR_POSITION.inspect,
                           $ERROR_POSITION * "\n")
        raise
      end

      private

      def _usable_adapter_class
        OPTIMIZED_ADAPTERS.detect(&:usable?)
      end

      def _warn_polling_fallback(options)
        msg = options.fetch(:polling_fallback_message, POLLING_FALLBACK_MESSAGE)
        Kernel.warn "[Listen warning]:\n  #{msg}" if msg
      end

      def _log(type, message)
        Listen::Logger.send(type, message)
      end
    end
  end
end
