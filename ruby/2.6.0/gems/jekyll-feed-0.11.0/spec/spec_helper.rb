# frozen_string_literal: true

require "jekyll"
require "typhoeus"
require "nokogiri"
require "rss"
require File.expand_path("../lib/jekyll-feed", __dir__)

Jekyll.logger.log_level = :error

RSpec.configure do |config|
  config.run_all_when_everything_filtered = true
  config.filter_run :focus
  config.order = "random"

  SOURCE_DIR = File.expand_path("fixtures", __dir__)
  DEST_DIR   = File.expand_path("dest",     __dir__)

  def source_dir(*files)
    File.join(SOURCE_DIR, *files)
  end

  def dest_dir(*files)
    File.join(DEST_DIR, *files)
  end

  def make_context(registers = {})
    Liquid::Context.new({}, {}, { :site => site }.merge(registers))
  end
end
