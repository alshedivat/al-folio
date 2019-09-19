# frozen_string_literal: true

require "spec_helper"
require "jekyll-last-modified-at"

describe(Jekyll::JekyllSitemap) do
  let(:overrides) do
    {
      "source"      => source_dir,
      "destination" => dest_dir,
      "url"         => "http://example.org",
      "collections" => {
        "my_collection" => { "output" => true },
        "other_things"  => { "output" => false },
      },
    }
  end
  let(:config) do
    Jekyll.configuration(overrides)
  end
  let(:site)     { Jekyll::Site.new(config) }
  let(:contents) { File.read(dest_dir("sitemap.xml")) }
  before(:each) do
    site.process
  end

  context "with jekyll-last-modified-at" do
    it "correctly adds the modified time to the posts" do
      expect(contents).to match  /<loc>http:\/\/example.org\/2015\/01\/18\/jekyll-last-modified-at.html<\/loc>\s+<lastmod>2015-01-19T07:03:38\+00:00<\/lastmod>/
    end

    it "correctly adds the modified time to the pages" do
      expect(contents).to match  /<loc>http:\/\/example.org\/jekyll-last-modified-at\/page.html<\/loc>\s+<lastmod>2015-01-19T07:03:38\+00:00<\/lastmod>/
    end
  end
end
