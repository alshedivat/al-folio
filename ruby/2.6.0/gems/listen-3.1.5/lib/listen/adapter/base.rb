require 'listen/options'
require 'listen/record'
require 'listen/change'

module Listen
  module Adapter
    class Base
      attr_reader :options

      # TODO: only used by tests
      DEFAULTS = {}.freeze

      attr_reader :config

      def initialize(config)
        @started = false
        @config = config

        @configured = nil

        fail 'No directories to watch!' if config.directories.empty?

        defaults = self.class.const_get('DEFAULTS')
        @options = Listen::Options.new(config.adapter_options, defaults)
      rescue
        _log_exception 'adapter config failed: %s:%s called from: %s', caller
        raise
      end

      # TODO: it's a separate method as a temporary workaround for tests
      def configure
        if @configured
          _log(:warn, 'Adapter already configured!')
          return
        end

        @configured = true

        @callbacks ||= {}
        config.directories.each do |dir|
          callback = @callbacks[dir] || lambda do |event|
            _process_event(dir, event)
          end
          @callbacks[dir] = callback
          _configure(dir, &callback)
        end

        @snapshots ||= {}
        # TODO: separate config per directory (some day maybe)
        change_config = Change::Config.new(config.queue, config.silencer)
        config.directories.each do |dir|
          record = Record.new(dir)
          snapshot = Change.new(change_config, record)
          @snapshots[dir] = snapshot
        end
      end

      def started?
        @started
      end

      def start
        configure

        if started?
          _log(:warn, 'Adapter already started!')
          return
        end

        @started = true

        calling_stack = caller.dup
        Listen::Internals::ThreadPool.add do
          begin
            @snapshots.values.each do |snapshot|
              _timed('Record.build()') { snapshot.record.build }
            end
            _run
          rescue
            msg = 'run() in thread failed: %s:\n'\
              ' %s\n\ncalled from:\n %s'
            _log_exception(msg, calling_stack)
            raise # for unit tests mostly
          end
        end
      end

      def stop
        _stop
      end

      def self.usable?
        const_get('OS_REGEXP') =~ RbConfig::CONFIG['target_os']
      end

      private

      def _stop
      end

      def _timed(title)
        start = Time.now.to_f
        yield
        diff = Time.now.to_f - start
        Listen::Logger.info format('%s: %.05f seconds', title, diff)
      rescue
        Listen::Logger.warn "#{title} crashed: #{$ERROR_INFO.inspect}"
        raise
      end

      # TODO: allow backend adapters to pass specific invalidation objects
      # e.g. Darwin -> DirRescan, INotify -> MoveScan, etc.
      def _queue_change(type, dir, rel_path, options)
        @snapshots[dir].invalidate(type, rel_path, options)
      end

      def _log(*args, &block)
        self.class.send(:_log, *args, &block)
      end

      def _log_exception(msg, caller_stack)
        formatted = format(
          msg,
          $ERROR_INFO,
          $ERROR_POSITION * "\n",
          caller_stack * "\n"
        )

        _log(:error, formatted)
      end

      class << self
        private

        def _log(*args, &block)
          Listen::Logger.send(*args, &block)
        end
      end
    end
  end
end
