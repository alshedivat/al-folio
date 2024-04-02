Jekyll::Hooks.register :site, :after_init do |site|
  require 'digest'
  require 'fileutils'
  require 'nokogiri'
  require 'open-uri'
  require 'uri'

  def download_file(url, dest)
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

  site.config['third_party_libraries'].each do |key, value|
    if key != 'download'
      value['url'].each do |type, url|
        # check if url is a dictionary
        if url.is_a?(Hash)
          url.each do |type2, url2|
            # replace {{version}} with the version number
            site.config['third_party_libraries'][key]['url'][type][type2] = url2.gsub('{{version}}', site.config['third_party_libraries'][key]['version'])
          end
        else
          # replace {{version}} with the version number
          site.config['third_party_libraries'][key]['url'][type] = url.gsub('{{version}}', site.config['third_party_libraries'][key]['version'])
        end
      end
    end
  end

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
              download_file(url, dest)
              # change the url to the local file, considering baseurl
              if site.config['baseurl']
                site.config['third_party_libraries'][key]['url'][type][type2] = File.join(site.config['baseurl'], 'assets', 'libs', file_name)
              else
                site.config['third_party_libraries'][key]['url'][type][type2] = File.join('/assets', 'libs', file_name)
              end
            end
          else
            if type == 'fonts'
              download_fonts(url, File.join(site.source, 'assets', 'libs', site.config['third_party_libraries'][key]['local']['fonts']))
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
