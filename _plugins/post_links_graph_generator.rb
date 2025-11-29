# frozen_string_literal: true
require "json"
require "fileutils"
require "digest"

class UnifiedGraphGenerator < Jekyll::Generator
  safe true
  priority :low

  def generate(site)
    mode   = ("meta").to_s
    fields = site.config["graph_field"] # Safely handle fields
    fields = [fields] unless fields.is_a?(Array)
    fields.map!(&:to_s) 

    posts = site_posts(site)
    return if posts.empty?

    Jekyll.logger.info "UnifiedGraphGenerator:", "Parsing post content for [[wikilinks]]."
    replace_wiki_links(site, posts + site.pages)

    nodes = []
    edges = []

    # Create and include meta-fields nodes/edges (Runs ONLY if enable_graph_plugin is set to true; otherwise exits)
    if site.config["enable_graph_plugin"] == true
      meta_nodes, meta_edges = generate_meta_graph_data(site, posts, fields)
      nodes.concat(meta_nodes)
      edges.concat(meta_edges)
    else 
      Jekyll.logger.info "UnifiedGraphGenerator:", "Skipping graph data generation."
      write_json(site, "_includes", "posts_graph.json", { nodes: nodes, edges: edges })
      return
    end

    # Create and include wiki-links in the graph
    if site.config["graph_include_wiki_links"] == true
      wiki_nodes, wiki_edges = generate_wiki_graph_data(site, posts)
      nodes.concat(wiki_nodes)
      edges.concat(wiki_edges)
      Jekyll.logger.info "UnifiedGraphGenerator:", "Successfully included wiki-links in graph data."
    else
      Jekyll.logger.info "UnifiedGraphGenerator:", "Skipping wiki-link parsing as 'graph_include_wiki_links' is not true."
    end

    # Remove duplicate nodes/edges
    nodes.uniq! { |n| n[:id] }
    edges.uniq! { |e| [e[:source], e[:target]] }

    write_json(site, "_includes", "posts_graph.json", { nodes: nodes, edges: edges })

  rescue => e
    Jekyll.logger.error "UnifiedGraphGenerator:", "Exception: #{e.class}: #{e.message}"
    Jekyll.logger.error e.backtrace.join("\n")
  end

  private

  # -------------------------------
  # Fetch all posts for the site
  # -------------------------------
  def site_posts(site)
    if site.collections && site.collections["posts"] && site.collections["posts"].respond_to?(:docs)
      site.collections["posts"].docs
    elsif site.respond_to?(:posts) && site.posts.respond_to?(:docs)
      site.posts.docs
    else
      []
    end
  end

  # -------------------------------
  # Replace [[wikilinks]] in content
  # -------------------------------
  def replace_wiki_links(site, docs)
    link_extension = site.config["use_html_extension"] ? ".html" : ""

    docs.each do |current_doc|
      next unless current_doc.respond_to?(:content) && current_doc.content.is_a?(String)

      docs.each do |target_doc|
        next unless target_doc.respond_to?(:basename)

        basename = target_doc.basename.to_s
        ext      = File.extname(basename)
        stem     = File.basename(basename, ext)

        pattern = Regexp.escape(stem).gsub('\\_', '[ _]').gsub('\\-', '[ -]')
        title_from_data = target_doc.data["title"] ? Regexp.escape(target_doc.data["title"].to_s) : nil

        new_href   = normalize_url(site, target_doc.url, link_extension)
        anchor_tag = "<a class='internal-link' href='#{new_href}'>\\1</a>"

        current_doc.content = current_doc.content.gsub(/\[\[#{pattern}\|(.+?)(?=\])\]\]/i, anchor_tag)

        if title_from_data
          current_doc.content = current_doc.content.gsub(/\[\[#{title_from_data}\|(.+?)(?=\])\]\]/i, anchor_tag)
          current_doc.content = current_doc.content.gsub(/\[\[(#{title_from_data})\]\]/i, anchor_tag)
        end

        current_doc.content = current_doc.content.gsub(/\[\[(#{pattern})\]\]/i, anchor_tag)
      end

      current_doc.content = current_doc.content.gsub(/\[\[([^\]]+)\]\]/i, <<~HTML.delete("\n"))
        <span title='There is no note that matches this link.' class='invalid-link'>
          <span class='invalid-link-brackets'>[[</span>
          \\1
          <span class='invalid-link-brackets'>]]</span>
        </span>
      HTML
    end
  end

  # -------------------------------
  # Generate meta-field nodes/edges
  # -------------------------------
  def generate_meta_graph_data(site, posts, fields)
    nodes = []
    edges = []
    field_values = {}

    posts.each do |post|
      combined_values = fields.flat_map { |field| Array(post.data[field]) || [] }.uniq
      combined_values.each { |v| (field_values[v] ||= []) << post }
    end

    field_values.each do |val, linked_posts|
      field_node_id = Digest::MD5.hexdigest("field:#{val}")
      nodes << { id: field_node_id, label: val, type: "meta_field" }

      linked_posts.each do |p|
        edges << { source: field_node_id, target: node_id(p) }
      end
    end

    posts.each do |post|
      nodes << { id: node_id(post), label: post.data["title"], type: "post", path: normalize_url(site, post.url) }
    end

    [nodes, edges]
  end

  # -------------------------------
  # Generate wiki-link nodes/edges
  # -------------------------------
  def generate_wiki_graph_data(site, posts)
    nodes = []
    edges = []

    posts.each do |current_note|
      backlinks = posts.select { |e| e.url != current_note.url && e.content.include?(current_note.url) }

      nodes << { 
        id: node_id(current_note),
        path: normalize_url(site, current_note.url),
        label: current_note.data["title"],
        type: "post"
      }

      backlinks.each do |n|
        edges << { source: node_id(n), target: node_id(current_note), type: "wiki" }
      end
    end

    [nodes, edges]
  end
  
  # -------------------------------
  # Normalize URLs: prepend baseurl correctly
  # -------------------------------
  def normalize_url(site, url, extension = "")
    baseurl = site.baseurl.to_s.chomp("/")
    url = "/" + url unless url.start_with?("/")
    "#{baseurl}#{url}#{extension}"
  end

  # -------------------------------
  # Node ID generator
  # -------------------------------
  def node_id(doc)
    Digest::MD5.hexdigest((doc.data["title"] || doc.basename.to_s).to_s)
  end

  # -------------------------------
  # Write JSON file
  # -------------------------------
  def write_json(site, relative_dir, filename, payload)
    dir = File.join(site.source, relative_dir)
    FileUtils.mkdir_p(dir) unless Dir.exist?(dir)
    path = File.join(dir, filename)
    File.write(path, JSON.pretty_generate(payload))
    Jekyll.logger.info "UnifiedGraphGenerator:", "Wrote #{path}"
  end
end