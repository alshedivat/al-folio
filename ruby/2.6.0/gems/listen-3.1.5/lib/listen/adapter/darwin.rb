require 'thread'
require 'listen/internals/thread_pool'

module Listen
  module Adapter
    # Adapter implementation for Mac OS X `FSEvents`.
    #
    class Darwin < Base
      OS_REGEXP = /darwin(?<major_version>1\d+)/i

      # The default delay between checking for changes.
      DEFAULTS = { latency: 0.1 }.freeze

      INCOMPATIBLE_GEM_VERSION = <<-EOS.gsub(/^ {8}/, '')
        rb-fsevent > 0.9.4 no longer supports OS X 10.6 through 10.8.

        Please add the following to your Gemfile to avoid polling for changes:
          require 'rbconfig'
          if RbConfig::CONFIG['target_os'] =~ /darwin(1[0-3])/i
            gem 'rb-fsevent', '<= 0.9.4'
          end
      EOS

      def self.usable?
        require 'rb-fsevent'
        version = RbConfig::CONFIG['target_os'][OS_REGEXP, :major_version]
        return false unless version
        return true if version.to_i >= 13 # darwin13 is OS X 10.9

        fsevent_version = Gem::Version.new(FSEvent::VERSION)
        return true if fsevent_version <= Gem::Version.new('0.9.4')
        Kernel.warn INCOMPATIBLE_GEM_VERSION
        false
      end

      private

      # NOTE: each directory gets a DIFFERENT callback!
      def _configure(dir, &callback)
        opts = { latency: options.latency }

        @workers ||= ::Queue.new
        @workers << FSEvent.new.tap do |worker|
          _log :debug, "fsevent: watching: #{dir.to_s.inspect}"
          worker.watch(dir.to_s, opts, &callback)
        end
      end

      def _run
        first = @workers.pop

        # NOTE: _run is called within a thread, so run every other
        # worker in it's own thread
        _run_workers_in_background(_to_array(@workers))
        _run_worker(first)
      end

      def _process_event(dir, event)
        _log :debug, "fsevent: processing event: #{event.inspect}"
        event.each do |path|
          new_path = Pathname.new(path.sub(%r{\/$}, ''))
          _log :debug, "fsevent: #{new_path}"
          # TODO: does this preserve symlinks?
          rel_path = new_path.relative_path_from(dir).to_s
          _queue_change(:dir, dir, rel_path, recursive: true)
        end
      end

      def _run_worker(worker)
        _log :debug, "fsevent: running worker: #{worker.inspect}"
        worker.run
      rescue
        format_string = 'fsevent: running worker failed: %s:%s called from: %s'
        _log_exception format_string, caller
      end

      def _run_workers_in_background(workers)
        workers.each do |worker|
          # NOTE: while passing local variables to the block below is not
          # thread safe, using 'worker' from the enumerator above is ok
          Listen::Internals::ThreadPool.add { _run_worker(worker) }
        end
      end

      def _to_array(queue)
        workers = []
        workers << queue.pop until queue.empty?
        workers
      end
    end
  end
end
