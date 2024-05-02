Jekyll::Hooks.register :site, :after_init do |site|
  require 'css_parser'
  require 'digest'
  require 'fileutils'
  require 'nokogiri'
  require 'open-uri'
  require 'uri'

  def download_file(url, dest)
    # only try to download the file if url doesn't start with | for security reasons
    if url.start_with?('|')
      return
    end

    # create the directory if it doesn't exist
    dir = File.dirname(dest)
    unless File.directory?(dir)
      FileUtils.mkdir_p(dir)
    end

    # download the file if it doesn't exist
    unless File.file?(dest)
      puts "Downloading #{url} to #{dest}"
      File.open(dest, "wb") do |saved_file|
        URI.open(url, "rb") do |read_file|
          saved_file.write(read_file.read)
        end
      end

      # check if the file was downloaded successfully
      unless File.file?(dest)
        raise "Failed to download #{url} to #{dest}"
      end
    end
  end

  def download_fonts(url, dest)
    # only try to download the file if url doesn't start with | for security reasons
    if url.start_with?('|')
      return
    end

    # only download fonts if the directory doesn't exist or is empty
    unless File.directory?(dest) && !Dir.empty?(dest)
      puts "Downloading fonts from #{url} to #{dest}"
      # get available fonts from the url
      doc = Nokogiri::HTML(URI.open(url, "User-Agent" => "Ruby/#{RUBY_VERSION}"))
      doc.css('a').each do |link|
        # get the file name from the url
        file_name = link['href'].split('/').last.split('?').first

        # verify if the file is a font file
        if file_name.end_with?('.woff', '.woff2', '.ttf', '.otf')
          # download the file and change the url to the local file
          download_file(URI.join(url, link['href']).to_s, File.join(dest, file_name))
        end
      end
    end
  end

  def download_fonts_from_css(config, url, dest)
    # only try to download the file if url doesn't start with | for security reasons
    if url.start_with?('|')
      return
    end

    # get the file name from the url
    file_name = url.split('/').last.split('?').first

    if file_name == 'css'
      file_name = 'google-fonts.css'
    end

    # only download the css file if it doesn't exist
    unless File.file?(File.join(dest, file_name))
      puts "Downloading fonts from #{url} to #{dest}"
      # download the css file with a fake user agent to force downloading woff2 fonts instead of ttf
      # user agent from https://www.whatismybrowser.com/guides/the-latest-user-agent/chrome
      doc = Nokogiri::HTML(URI.open(url, "User-Agent" => "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"))
      css = CssParser::Parser.new
      css.load_string! doc.document.text

      # get the font-face rules
      css.each_rule_set do |rule_set|
        # check if the rule set has a url
        if rule_set['src'].include?('url(')
          # get the font file url
          font_url = rule_set['src'].split('url(').last.split(')').first

          # remove quotes from the url
          if font_url.start_with?('"') || font_url.start_with?("'")
            font_url = font_url[1..-2]
          end

          font_file_name = font_url.split('/').last.split('?').first

          # verify if the file is a font file
          if font_file_name.end_with?('.woff', '.woff2', '.ttf', '.otf')
            # fix the font url if it is not an absolute url
            unless font_url.start_with?('https://')
              font_url = URI.join(url, font_url).to_s
            end

            # download the file
            download_file(font_url, File.join(dest, 'fonts', font_file_name))

            # change the font url to the local file, considering baseurl
            if config['baseurl']
              # add rest of the src attribute if it exists
              if rule_set['src'].split(' ').length > 1
                rule_set['src'] = "url(#{File.join(config['baseurl'], 'assets', 'libs', 'fonts', font_file_name)}) #{rule_set['src'].split(' ').last}"
              else
                rule_set['src'] = "url(#{File.join(config['baseurl'], 'assets', 'libs', 'fonts', font_file_name)})"
              end
            else
              # add rest of the src attribute if it exists
              if rule_set['src'].split(' ').length > 1
                rule_set['src'] = "url(#{File.join('/assets', 'libs', 'fonts', font_file_name)}) #{rule_set['src'].split(' ').last}"
              else
                rule_set['src'] = "url(#{File.join('/assets', 'libs', 'fonts', font_file_name)})"
              end
            end
          end
        end
      end

      # save the modified css file
      File.write(File.join(dest, file_name), css.to_s)
    end

    return file_name
  end

  # replace {{version}} with the version number in all 3rd party libraries urls
  site.config['third_party_libraries'].each do |key, value|
    if key != 'download'
      value['url'].each do |type, url|
        # check if url is a dictionary
        if url.is_a?(Hash)
          url.each do |type2, url2|
            # replace {{version}} with the version number if it exists
            if url2.include?('{{version}}')
              site.config['third_party_libraries'][key]['url'][type][type2] = url2.gsub('{{version}}', site.config['third_party_libraries'][key]['version'])
            end
          end
        else
          # replace {{version}} with the version number if it exists
          if url.include?('{{version}}')
            site.config['third_party_libraries'][key]['url'][type] = url.gsub('{{version}}', site.config['third_party_libraries'][key]['version'])
          end
        end
      end
    end
  end

  # download 3rd party libraries if required
  if site.config['third_party_libraries']['download']
    site.config['third_party_libraries'].each do |key, value|
      if key != 'download'
        value['url'].each do |type, url|
          # check if url is a dictionary
          if url.is_a?(Hash)
            url.each do |type2, url2|
              # get the file name from the url
              file_name = url2.split('/').last.split('?').first
              # download the file and change the url to the local file
              dest = File.join(site.source, 'assets', 'libs', file_name)
              download_file(url2, dest)
              # change the url to the local file, considering baseurl
              if site.config['baseurl']
                site.config['third_party_libraries'][key]['url'][type][type2] = File.join(site.config['baseurl'], 'assets', 'libs', file_name)
              else
                site.config['third_party_libraries'][key]['url'][type][type2] = File.join('/assets', 'libs', file_name)
              end
            end

          else
            if type == 'fonts'
              # get the file name from the url
              file_name = url.split('/').last.split('?').first

              if file_name.end_with?('css')
                # if the file is a css file, download the css file, the fonts from it, and change information on the css file
                file_name = download_fonts_from_css(site.config, url, File.join(site.source, 'assets', 'libs'))
                # change the url to the local file, considering baseurl
                if site.config['baseurl']
                  site.config['third_party_libraries'][key]['url'][type] = File.join(site.config['baseurl'], 'assets', 'libs', file_name)
                else
                  site.config['third_party_libraries'][key]['url'][type] = File.join('/assets', 'libs', file_name)
                end
              else
                # download the font files and change the url to the local file
                download_fonts(url, File.join(site.source, 'assets', 'libs', site.config['third_party_libraries'][key]['local']['fonts']))
              end

            else
              # get the file name from the url
              file_name = url.split('/').last.split('?').first
              # download the file and change the url to the local file
              dest = File.join(site.source, 'assets', 'libs', file_name)
              download_file(url, dest)
              # change the url to the local file, considering baseurl
              if site.config['baseurl']
                site.config['third_party_libraries'][key]['url'][type] = File.join(site.config['baseurl'], 'assets', 'libs', file_name)
              else
                site.config['third_party_libraries'][key]['url'][type] = File.join('/assets', 'libs', file_name)
              end
            end
          end
        end
      end
    end
  end
end
