# -*- coding: utf-8 -*-
#
#--
# Copyright (C) 2017 Christian Cornelssen <ccorn@1tein.de>
#
# This file is part of kramdown which is licensed under the MIT.
#++

module Kramdown::Converter::MathEngine

  # Consider this a lightweight alternative to MathjaxNode. Uses KaTeX and ExecJS (via ::SsKaTeX)
  # instead of MathJax and Node.js. Javascript execution context initialization is done only once.
  # As a result, the performance is reasonable.
  module SsKaTeX

    # Indicate whether SsKaTeX may be available.
    #
    # This test is incomplete; it cannot test the existence of _katex_js_ nor the availability of a
    # specific _js_run_ because those depend on configuration not given here. This test mainly
    # indicates whether static dependencies such as the +sskatex+ and +execjs+ gems are available.
    AVAILABLE = begin
      require 'sskatex'
      # No test for any JS engine availability here; specifics are config-dependent anyway
      true
    rescue LoadError
      false
    end

    if AVAILABLE

      # Class-level cache for ::SsKaTeX converter state, queried by configuration. Note: KTXC
      # contents may become stale if the contents of used JS files change while the configuration
      # remains unchanged.
      KTXC = ::Kramdown::Utils::LRUCache.new(10)

      # A logger that routes messages to the debug channel only. No need to create this dynamically.
      DEBUG_LOGGER = lambda { |level, &expr| warn(expr.call) }

      class << self
        private

        # Given a Kramdown::Converter::Base object _converter_, retrieves the logging options and
        # builds an object usable for ::SsKaTeX#logger. The result is either +nil+ (no logging) or a
        # +Proc+ object which, when given a _level_ (either +:verbose+ or +:debug+) and a block,
        # decides whether logging is enabled, and if so, evaluates the given block for the message
        # and routes that message to the appropriate channels. With <tt>level == :verbose+</tt>,
        # messages are passed to _converter_.warning if the _converter_'s +:verbose+ option is set.
        # All messages are passed to +warn+ if the _converter_'s +:debug+ option is set.
        #
        # Note that the returned logger may contain references to the given _converter_ and is not
        # affected by subsequent changes in the _converter_'s logging options.
        def logger(converter)
          config = converter.options[:math_engine_opts]
          debug = config[:debug]
          if config[:verbose]
            # Need a closure
            lambda do |level, &expr|
              verbose = (level == :verbose)
              msg = expr.call if debug || verbose
              warn(msg) if debug
              converter.warning(msg) if verbose
            end
          elsif debug
            DEBUG_LOGGER
          end
        end

        # Given a Kramdown::Converter::Base object _converter_, return a ::SsKaTeX converter _sktx_
        # that has been configured with _converter_'s +math_engine_opts+, but not for logging. Cache
        # _sktx_ for reuse, without references to _converter_.
        def katex_conv(converter)
          config = converter.options[:math_engine_opts]
            # Could .reject { |key, _| [:verbose, :debug].include?(key.to_sym) }
            # because the JS engine setup can be reused for different logging settings.
            # But then the +math_engine_opts+ dict would be essentially dup'ed every time,
            # and late activation of logging would miss the initialization if the engine is reused.
          KTXC[config] ||= ::SsKaTeX.new(config)
        end

        public

        # The function used by kramdown for rendering TeX math to HTML
        def call(converter, el, opts)
          display_mode = el.options[:category]
          ans = katex_conv(converter).call(el.value, display_mode == :block, &logger(converter))
          attr = el.attr.dup
          attr.delete('xmlns')
          attr.delete('display')
          ans.insert(ans =~ /[[:space:]>]/, converter.html_attributes(attr))
          ans = ' ' * opts[:indent] << ans << "\n" if display_mode == :block
          ans
        end

      end
    end
  end
end
