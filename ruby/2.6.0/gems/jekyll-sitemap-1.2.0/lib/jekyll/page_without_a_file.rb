# frozen_string_literal: true

module Jekyll
  class PageWithoutAFile < Page
    def read_yaml(*)
      @data ||= {}
    end
  end
end
