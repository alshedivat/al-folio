# frozen_string_literal: true

require "spec_helper"

describe(JekyllFeed) do
  let(:overrides) { {} }
  let(:config) do
    Jekyll.configuration(Jekyll::Utils.deep_merge_hashes({
      "full_rebuild" => true,
      "source"       => source_dir,
      "destination"  => dest_dir,
      "show_drafts"  => true,
      "url"          => "http://example.org",
      "name"         => "My awesome site",
      "author"       => {
        "name" => "Dr. Jekyll",
      },
      "collections"  => {
        "my_collection" => { "output" => true },
        "other_things"  => { "output" => false },
      },
    }, overrides))
  end
  let(:site)     { Jekyll::Site.new(config) }
  let(:contents) { File.read(dest_dir("feed.xml")) }
  let(:context)  { make_context(:site => site) }
  let(:feed_meta) { Liquid::Template.parse("{% feed_meta %}").render!(context, {}) }
  before(:each) do
    site.process
  end

  it "has no layout" do
    expect(contents).not_to match(%r!\ATHIS IS MY LAYOUT!)
  end

  it "creates a feed.xml file" do
    expect(Pathname.new(dest_dir("feed.xml"))).to exist
  end

  it "doesn't have multiple new lines or trailing whitespace" do
    expect(contents).to_not match %r!\s+\n!
    expect(contents).to_not match %r!\n{2,}!
  end

  it "puts all the posts in the feed.xml file" do
    expect(contents).to match /http:\/\/example\.org\/updates\/2014\/03\/04\/march-the-fourth\.html/
    expect(contents).to match /http:\/\/example\.org\/news\/2014\/03\/02\/march-the-second\.html/
    expect(contents).to match /http:\/\/example\.org\/news\/2013\/12\/12\/dec-the-second\.html/
    expect(contents).to match "http://example.org/2015/08/08/stuck-in-the-middle.html"
    expect(contents).to_not match /http:\/\/example\.org\/2016\/02\/09\/a-draft\.html/
  end

  it "does not include assets or any static files that aren't .html" do
    expect(contents).not_to match /http:\/\/example\.org\/images\/hubot\.png/
    expect(contents).not_to match /http:\/\/example\.org\/feeds\/atom\.xml/
  end

  it "preserves linebreaks in preformatted text in posts" do
    expect(contents).to match %r!Line 1\nLine 2\nLine 3!
  end

  it "supports post author name as an object" do
    expect(contents).to match /<author>\s*<name>Ben<\/name>\s*<email>ben@example.com<\/email>\s*<uri>http:\/\/ben.balter.com<\/uri>\s*<\/author>/
  end

  it "supports post author name as a string" do
    expect(contents).to match /<author>\s*<name>Pat<\/name>\s*<\/author>/
  end

  it "does not output author tag no author is provided" do
    expect(contents).not_to match /<author>\s*<name><\/name>\s*<\/author>/
  end

  it "does use author reference with data from _data/authors.yml" do
    expect(contents).to match /<author>\s*<name>Garth<\/name>\s*<email>example@mail.com<\/email>\s*<uri>http:\/\/garthdb.com<\/uri>\s*<\/author>/
  end

  it "converts markdown posts to HTML" do
    expect(contents).to match /&lt;p&gt;March the second!&lt;\/p&gt;/
  end

  it "uses last_modified_at where available" do
    expect(contents).to match /<updated>2015-05-12T13:27:59\+00:00<\/updated>/
  end

  it "replaces newlines in posts to spaces" do
    expect(contents).to match %r!<title type="html">The plugin will properly strip newlines.</title>!
  end

  it "renders Liquid inside posts" do
    expect(contents).to match %r!Liquid is rendered\.!
    expect(contents).not_to match %r!Liquid is not rendered\.!
  end

  it "includes the item image" do
    expect(contents).to include('<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="http://example.org/image.png" />')
    expect(contents).to include('<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="https://cdn.example.org/absolute.png?h=188&amp;w=250" />')
    expect(contents).to include('<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="http://example.org/object-image.png" />')
  end

  context "parsing" do
    let(:feed) { RSS::Parser.parse(contents) }

    it "outputs an RSS feed" do
      expect(feed.feed_type).to eql("atom")
      expect(feed.feed_version).to eql("1.0")
      expect(feed.encoding).to eql("UTF-8")
      expect(feed.lang).to be_nil
      expect(feed.valid?).to eql(true)
    end

    it "outputs the link" do
      expect(feed.link.href).to eql("http://example.org/feed.xml")
    end

    it "outputs the generator" do
      expect(feed.generator.content).to eql("Jekyll")
      expect(feed.generator.version).to eql(Jekyll::VERSION)
    end

    it "includes the items" do
      expect(feed.items.count).to eql(10)
    end

    it "includes item contents" do
      post = feed.items.last
      expect(post.title.content).to eql("Dec The Second")
      expect(post.link.href).to eql("http://example.org/news/2013/12/12/dec-the-second.html")
      expect(post.published.content).to eql(Time.parse("2013-12-12"))
    end

    it "includes the item's excerpt" do
      post = feed.items.last
      expect(post.summary.content).to eql("Foo")
    end

    it "doesn't include the item's excerpt if blank" do
      post = feed.items.first
      expect(post.summary).to be_nil
    end

    context "with site.lang set" do
      lang = "en_US"
      let(:overrides) { { "lang" => lang } }
      it "outputs a valid feed" do
        expect(feed.feed_type).to eql("atom")
        expect(feed.feed_version).to eql("1.0")
        expect(feed.encoding).to eql("UTF-8")
        expect(feed.valid?).to eql(true)
      end

      it "outputs the correct language" do
        expect(feed.lang).to eql(lang)
      end

      it "sets the language of entries" do
        post = feed.items.first
        expect(post.lang).to eql(lang)
      end

      it "renders the feed meta" do
        expected = %r!<link href="http://example.org/" rel="alternate" type="text/html" hreflang="#{lang}" />!
        expect(contents).to match(expected)
      end
    end

    context "with site.title set" do
      let(:site_title) { "My Site Title" }
      let(:overrides) { { "title" => site_title } }

      it "uses site.title for the title" do
        expect(feed.title.content).to eql(site_title)
      end
    end

    context "with site.name set" do
      let(:site_name) { "My Site Name" }
      let(:overrides) { { "name" => site_name } }

      it "uses site.name for the title" do
        expect(feed.title.content).to eql(site_name)
      end
    end

    context "with site.name and site.title set" do
      let(:site_title) { "My Site Title" }
      let(:site_name) { "My Site Name" }
      let(:overrides) { { "title" => site_title, "name" => site_name } }

      it "uses site.title for the title, dropping site.name" do
        expect(feed.title.content).to eql(site_title)
      end
    end
  end

  context "smartify" do
    let(:site_title) { "Pat's Site" }
    let(:overrides) { { "title" => site_title } }
    let(:feed) { RSS::Parser.parse(contents) }

    it "processes site title with SmartyPants" do
      expect(feed.title.content).to eql("Pat’s Site")
    end
  end

  context "validation" do
    it "validates" do
      # See https://validator.w3.org/docs/api.html
      url = "https://validator.w3.org/feed/check.cgi?output=soap12"
      response = Typhoeus.post(url, :body => { :rawdata => contents }, :accept_encoding => "gzip")
      pending "Something went wrong with the W3 validator" unless response.success?
      result = Nokogiri::XML(response.body)
      result.remove_namespaces!

      result.css("warning").each do |warning|
        # Quiet a warning that results from us passing the feed as a string
        next if warning.css("text").text =~ %r!Self reference doesn't match document location!

        # Quiet expected warning that results from blank summary test case
        next if warning.css("text").text =~ %r!(content|summary) should not be blank!

        # Quiet expected warning about multiple posts with same updated time
        next if warning.css("text").text =~ %r!Two entries with the same value for atom:updated!

        warn "Validation warning: #{warning.css("text").text} on line #{warning.css("line").text} column #{warning.css("column").text}"
      end

      errors = result.css("error").map do |error|
        "Validation error: #{error.css("text").text} on line #{error.css("line").text} column #{error.css("column").text}"
      end

      expect(result.css("validity").text).to eql("true"), errors.join("\n")
    end
  end

  context "with a baseurl" do
    let(:overrides) do
      { "baseurl" => "/bass" }
    end

    it "correctly adds the baseurl to the posts" do
      expect(contents).to match /http:\/\/example\.org\/bass\/updates\/2014\/03\/04\/march-the-fourth\.html/
      expect(contents).to match /http:\/\/example\.org\/bass\/news\/2014\/03\/02\/march-the-second\.html/
      expect(contents).to match /http:\/\/example\.org\/bass\/news\/2013\/12\/12\/dec-the-second\.html/
    end

    it "renders the feed meta" do
      expected = 'href="http://example.org/bass/feed.xml"'
      expect(feed_meta).to include(expected)
    end
  end

  context "feed meta" do
    it "renders the feed meta" do
      expected = '<link type="application/atom+xml" rel="alternate" href="http://example.org/feed.xml" title="My awesome site" />'
      expect(feed_meta).to eql(expected)
    end

    context "with a blank site name" do
      let(:config) do
        Jekyll.configuration({
          "source"      => source_dir,
          "destination" => dest_dir,
          "url"         => "http://example.org",
        })
      end

      it "does not output blank title" do
        expect(feed_meta).not_to include("title=")
      end
    end
  end

  context "changing the feed path" do
    let(:overrides) do
      {
        "feed" => {
          "path" => "atom.xml",
        },
      }
    end

    it "should write to atom.xml" do
      expect(Pathname.new(dest_dir("atom.xml"))).to exist
    end

    it "renders the feed meta with custom feed path" do
      expected = 'href="http://example.org/atom.xml"'
      expect(feed_meta).to include(expected)
    end
  end

  context "changing the file path via collection meta" do
    let(:overrides) do
      {
        "feed" => {
          "collections" => {
            "posts" => {
              "path" => "atom.xml"
            }
          }
        },
      }
    end

    it "should write to atom.xml" do
      expect(Pathname.new(dest_dir("atom.xml"))).to exist
    end

    it "renders the feed meta with custom feed path" do
      expected = 'href="http://example.org/atom.xml"'
      expect(feed_meta).to include(expected)
    end
  end

  context "feed stylesheet" do
    it "includes the stylesheet" do
      expect(contents).to include('<?xml-stylesheet type="text/xml" href="http://example.org/feed.xslt.xml"?>')
    end
  end

  context "with site.lang set" do
    let(:overrides) { { "lang" => "en-US" } }

    it "should set the language" do
      expect(contents).to match %r!type="text/html" hreflang="en-US" />!
    end
  end

  context "with post.lang set" do
    it "should set the language for that entry" do
      expect(contents).to match %r!<entry xml:lang="en">!
      expect(contents).to match %r!<entry>!
    end
  end

  context "categories" do
    context "with top-level post categories" do
      let(:overrides) {
        {
          "feed" => { "categories" => ["news"] }
        }
      }
      let(:news_feed) { File.read(dest_dir("feed/news.xml")) }

      it "outputs the primary feed" do
        expect(contents).to match /http:\/\/example\.org\/updates\/2014\/03\/04\/march-the-fourth\.html/
        expect(contents).to match /http:\/\/example\.org\/news\/2014\/03\/02\/march-the-second\.html/
        expect(contents).to match /http:\/\/example\.org\/news\/2013\/12\/12\/dec-the-second\.html/
        expect(contents).to match "http://example.org/2015/08/08/stuck-in-the-middle.html"
        expect(contents).to_not match /http:\/\/example\.org\/2016\/02\/09\/a-draft\.html/
      end

      it "outputs the category feed" do
        expect(news_feed).to match "<title type=\"html\">My awesome site | News</title>"
        expect(news_feed).to match /http:\/\/example\.org\/news\/2014\/03\/02\/march-the-second\.html/
        expect(news_feed).to match /http:\/\/example\.org\/news\/2013\/12\/12\/dec-the-second\.html/
        expect(news_feed).to_not match /http:\/\/example\.org\/updates\/2014\/03\/04\/march-the-fourth\.html/
        expect(news_feed).to_not match "http://example.org/2015/08/08/stuck-in-the-middle.html"
      end
    end

    context "with collection-level post categories" do
      let(:overrides) {
        {
          "feed" => {
            "collections" => {
              "posts" => {
                "categories" => ["news"]
              }
            }
          }
        }
      }
      let(:news_feed) { File.read(dest_dir("feed/news.xml")) }

      it "outputs the primary feed" do
        expect(contents).to match /http:\/\/example\.org\/updates\/2014\/03\/04\/march-the-fourth\.html/
        expect(contents).to match /http:\/\/example\.org\/news\/2014\/03\/02\/march-the-second\.html/
        expect(contents).to match /http:\/\/example\.org\/news\/2013\/12\/12\/dec-the-second\.html/
        expect(contents).to match "http://example.org/2015/08/08/stuck-in-the-middle.html"
        expect(contents).to_not match /http:\/\/example\.org\/2016\/02\/09\/a-draft\.html/
      end

      it "outputs the category feed" do
        expect(news_feed).to match "<title type=\"html\">My awesome site | News</title>"
        expect(news_feed).to match /http:\/\/example\.org\/news\/2014\/03\/02\/march-the-second\.html/
        expect(news_feed).to match /http:\/\/example\.org\/news\/2013\/12\/12\/dec-the-second\.html/
        expect(news_feed).to_not match /http:\/\/example\.org\/updates\/2014\/03\/04\/march-the-fourth\.html/
        expect(news_feed).to_not match "http://example.org/2015/08/08/stuck-in-the-middle.html"
      end
    end
  end

  context "collections" do
    let(:collection_feed) { File.read(dest_dir("feed/collection.xml")) }

    context "when initialized as an array" do
      let(:overrides) {
        {
          "collections" => {
            "collection" => {
              "output" => true
            }
          },
          "feed" => { "collections" => ["collection"] }
        }
      }


      it "outputs the collection feed" do
        expect(collection_feed).to match "<title type=\"html\">My awesome site | Collection</title>"
        expect(collection_feed).to match "http://example.org/collection/2018-01-01-collection-doc.html"
        expect(collection_feed).to match "http://example.org/collection/2018-01-02-collection-category-doc.html"
        expect(collection_feed).to_not match /http:\/\/example\.org\/updates\/2014\/03\/04\/march-the-fourth\.html/
        expect(collection_feed).to_not match "http://example.org/2015/08/08/stuck-in-the-middle.html"
      end
    end

    context "with categories" do
      let(:overrides) {
        {
          "collections" => {
            "collection" => {
              "output" => true
            }
          },
          "feed" => {
            "collections" => {
              "collection" => {
                "categories" => ["news"]
              }
            }
          }
        }
      }
      let(:news_feed) { File.read(dest_dir("feed/collection/news.xml")) }

      it "outputs the collection category feed" do
        expect(news_feed).to match "<title type=\"html\">My awesome site | Collection | News</title>"
        expect(news_feed).to match "http://example.org/collection/2018-01-02-collection-category-doc.html"
        expect(news_feed).to_not match "http://example.org/collection/2018-01-01-collection-doc.html"
        expect(news_feed).to_not match /http:\/\/example\.org\/updates\/2014\/03\/04\/march-the-fourth\.html/
        expect(news_feed).to_not match "http://example.org/2015/08/08/stuck-in-the-middle.html"
      end
    end

    context "with a custom path" do
      let(:overrides) {
        {
          "collections" => {
            "collection" => {
              "output" => true
            }
          },
          "feed" => {
            "collections" => {
              "collection" => {
                "categories" => ["news"],
                "path" => "custom.xml"
              }
            }
          }
        }
      }

      it "should write to the custom path" do
        expect(Pathname.new(dest_dir("custom.xml"))).to exist
        expect(Pathname.new(dest_dir("feed/collection.xml"))).to_not exist
        expect(Pathname.new(dest_dir("feed/collection/news.xml"))).to exist
      end
    end
  end
end
