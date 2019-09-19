module Jekyll
  class StaticFile
    # Convert this static file to a Page
    def to_page
      page = Jekyll::Page.new(@site, @base, @dir, @name)
      page.data["permalink"] = File.dirname(url) + "/"
      page
    end
  end
end
