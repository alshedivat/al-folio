# _plugins/bibtex_to_cv_sync.rb
require 'json'
require 'bibtex'

module Jekyll
  class BibTeXToCVSync < Generator
    safe false # To write to files
    priority :low # Run after other generators

    def generate(site)
      # Skip if auto_sync_publications is not enabled in _config.yml
      unless site.config.key?('auto_sync_publications') && site.config['auto_sync_publications']
        Jekyll.logger.info "BibTeX to CV Sync:", "Disabled in _config.yml - skipping"
        return
      end
      
      Jekyll.logger.info "BibTeX to CV Sync:", "Starting synchronization..."
      
      # Define file paths
      source_dir = site.source
      bib_path = File.join(source_dir, '_bibliography', 'papers.bib')
      resume_path = File.join(source_dir, 'assets', 'json', 'resume.json')
      
      # Check if required files exist
      unless File.exist?(bib_path)
        Jekyll.logger.warn "BibTeX to CV Sync:", "BibTeX file not found at: #{bib_path}"
        return
      end
      
      unless File.exist?(resume_path)
        Jekyll.logger.warn "BibTeX to CV Sync:", "Resume file not found at: #{resume_path}"
        return
      end
      
      # Load BibTeX file - /_bibliography/papers.bib
      begin
        # Read the file content directly to avoid sharing objects with Jekyll Scholar
        bib_content = File.read(bib_path)
        bibliography = BibTeX.parse(bib_content)
        Jekyll.logger.info "BibTeX to CV Sync:", "Loaded #{bibliography.length} publications from BibTeX"
      rescue => e
        Jekyll.logger.error "BibTeX to CV Sync:", "Failed to parse BibTeX file: #{e.message}"
        return
      end
      
      # Load resume.json
      begin
        resume = JSON.parse(File.read(resume_path))
        Jekyll.logger.info "BibTeX to CV Sync:", "Loaded resume.json file"
      rescue => e
        Jekyll.logger.error "BibTeX to CV Sync:", "Failed to parse resume.json: #{e.message}"
        return
      end
      
      # Create publications array
      publications = []
      bibliography.each do |entry|
        next unless entry.is_a?(BibTeX::Entry) && entry.key      
        
        # Extract title
        title = if entry.has_field?(:title)
          # Clean title without modifying original entry
          title_text = entry[:title].to_s.gsub(/[{}]/, '')
        else
          "Untitled"
        end
        
        # Extract release date
        release_date = if entry.has_field?(:year)
          year = entry[:year].to_s.strip
          
          if year.match?(/\d{4}/)
            if entry.has_field?(:month)
              month = entry[:month].to_s.strip
              month_num = case month.downcase
                          when /jan|january|01|1/   then "01"
                          when /feb|february|02|2/  then "02"
                          when /mar|march|03|3/     then "03"
                          when /apr|april|04|4/     then "04"
                          when /may|05|5/           then "05"
                          when /jun|june|06|6/      then "06"
                          when /jul|july|07|7/      then "07"
                          when /aug|august|08|8/    then "08"
                          when /sep|september|09|9/ then "09"
                          when /oct|october|10/     then "10"
                          when /nov|november|11/    then "11"
                          when /dec|december|12/    then "12"
                          else nil
                          end
              
              if month_num
                "#{year}-#{month_num}"
              else
                year
              end
            else
              year
            end
          else
            "Working paper"
          end
        else
          "Working paper"
        end
        
        # Extract authors
        authors = if entry.has_field?(:author)
          author_text = entry[:author].to_s
          author_list = author_text.split(/\s+and\s+/)
          author_list.map! do |author|
            parts = author.split(',')
            if parts.size > 1
              # Format is "LastName, FirstName"
              "#{parts[1].strip} #{parts[0].strip}"
            else
              # Format is "FirstName LastName"
              author
            end
          end
          author_list.join(", ")
        else
          ""
        end
        
        # Extract summary - only use note or generate based on type
        summary = if entry.has_field?(:note) && !entry[:note].to_s.empty?
          # Use note if available
          entry[:note].to_s
        elsif entry.type.to_s == 'mastersthesis'
          "Master Thesis"
        elsif entry.type.to_s == 'phdthesis'
          "PhD Dissertation"
        elsif entry.type.to_s == 'unpublished'
          "Working Paper" + (entry.has_field?(:school) ? " at #{entry[:school]}" : "")
        elsif entry.has_field?(:booktitle)
          "Conference Paper, " + entry[:booktitle].to_s
        elsif entry.has_field?(:journal)
          "Published in #{entry[:journal]}"
        else
          "" # Leave empty if no suitable content
        end
        
        # Extract URL
        url = if entry.has_field?(:url)
          entry[:url].to_s
        elsif entry.has_field?(:google_scholar_id)
          "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=_PHCgeIAAAAJ&citation_for_view=_PHCgeIAAAAJ:#{entry[:google_scholar_id]}"
        elsif entry.has_field?(:doi)
          "https://doi.org/#{entry[:doi]}"
        elsif entry.has_field?(:arxiv)
          "https://arxiv.org/abs/#{entry[:arxiv]}"
        else
          ""
        end
        
        # Create publication entry
        pub = {
          "name" => title,
          "releaseDate" => release_date,
          "authors" => authors,
          "summary" => summary,
          "url" => url
        }
        
        publications << pub
      end
      
      # Sort publications by date (newest first)
      publications.sort_by! do |pub| 
        date = pub["releaseDate"] || ""
        date == "Working paper" ? "0000" : date
      end.reverse!
      
      # Create backup of resume.json if configured
      if site.config.key?('auto_sync_backup') && site.config['auto_sync_backup']
        backup_path = resume_path + '.bak'
        File.write(backup_path, File.read(resume_path))
        Jekyll.logger.info "BibTeX to CV Sync:", "Created backup at: #{backup_path}"
      end
      
      # Update resume.json with new publications
      old_count = resume["publications"].size rescue 0
      resume["publications"] = publications
      
      # Write updated resume.json back to file
      begin
        File.write(resume_path, JSON.pretty_generate(resume))
        Jekyll.logger.info "BibTeX to CV Sync:", "Updated resume.json with #{publications.size} publications (was: #{old_count})"
      rescue => e
        Jekyll.logger.error "BibTeX to CV Sync:", "Failed to write updated resume.json: #{e.message}"
      end
    end
  end
end