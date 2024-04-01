Jekyll::Hooks.register :site, :after_init do |site|
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
end
