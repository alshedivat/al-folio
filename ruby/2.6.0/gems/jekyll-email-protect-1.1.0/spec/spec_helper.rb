TEST_DIR = File.dirname(__FILE__)

require 'jekyll'
require File.expand_path("../lib/jekyll-email-protect.rb", TEST_DIR)

RSpec.configure do |config|
  config.run_all_when_everything_filtered = true
  config.filter_run :focus
  config.order = 'random'

  def render_liquid(content, variables)
    template = Liquid::Template.parse(content)
    template.render(variables)
  end
end
