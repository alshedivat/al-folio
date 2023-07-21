#  source: https://andreacarriero.com/2018/05/21/encrypted-and-password-protected-pages-on-jekyll

require 'base64'
require 'digest'
require 'openssl'
require 'fileutils'

module Jekyll
    class ProtectedPage < Page
        def aes256_encrypt(password, cleardata)
            digest = Digest::SHA256.new
            digest.update(password)
            key = digest.digest
          
            cipher = OpenSSL::Cipher::AES256.new(:CBC)
            cipher.encrypt
            cipher.key = key
            cipher.iv = iv = cipher.random_iv
          
            encrypted = cipher.update(cleardata) + cipher.final
            encoded_msg = Base64.encode64(encrypted).gsub(/\n/, '')
            encoded_iv = Base64.encode64(iv).gsub(/\n/, '')
          
            hmac = Base64.encode64(OpenSSL::HMAC.digest('sha256', key, encoded_msg)).strip
            "#{encoded_iv}|#{hmac}|#{encoded_msg}"
        end

        def initialize(site, base, dir, to_protect)
            @site = site
            @base = base
            @dir = dir
            @name = 'index.html'

            markdown_content = to_protect.content
            markdown_converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
            html_content = markdown_converter.convert(markdown_content)

            self.process(@name)
            self.read_yaml(File.join(base, '_layouts'), 'protected.html')
            self.data['title'] = to_protect.data['title']

            content_digest = Digest::SHA1.new
            content_digest.update(to_protect.data.to_s + to_protect.content)
            content_hash = content_digest.hexdigest

            protected_cache_path = File.join(Dir.pwd, '_protected-cache')
            page_cache_path = File.join(protected_cache_path, to_protect.basename_without_ext)
            hash_path = File.join(page_cache_path, 'hash')
            payload_path = File.join(page_cache_path, 'payload')

            regenerate = false

            if File.exist?(hash_path) && File.exist?(payload_path)
                cached_hash = File.read(hash_path).strip
                cached_payload = File.read(payload_path).strip

                if cached_hash == content_hash
                    self.data['protected_content'] = cached_payload
                else
                    regenerate = true
                end
            end

            if !Dir.exist?(protected_cache_path)
                Dir.mkdir(protected_cache_path)
            end

            if !Dir.exist?(page_cache_path)
                Dir.mkdir(page_cache_path)
            end
            
            if !File.exist?(hash_path) || regenerate
                hash_file = File.new(hash_path, "w")
                hash_file.puts(content_hash)
                hash_file.close
            end

            if !File.exist?(payload_path) || regenerate
                encrypted_content = self.aes256_encrypt(to_protect.data['password'], html_content)
                payload_file = File.new(payload_path, "w")
                payload_file.puts(encrypted_content)
                payload_file.close
                self.data['protected_content'] = encrypted_content
            end

        end
    end

    class ProtectedPageGenerator < Generator
        def generate(site)
            dir = 'protected'

            protected_pages_names = []

            site.collections['protected'].docs.each do |plain_page|
                protected_page_path = File.join(dir, plain_page.basename_without_ext)

                protected_page = ProtectedPage.new(site, site.source, protected_page_path, plain_page)
                site.pages << protected_page

                protected_pages_names << plain_page.basename_without_ext
            end

            protected_cache_path = File.join(Dir.pwd, '_protected-cache')
            Dir.foreach(protected_cache_path) do |cached_page|
                next if cached_page == '.' or cached_page == '..'
                if !(protected_pages_names.include? cached_page)
                    FileUtils.rm_rf(File.join(protected_cache_path, cached_page))
                end
            end
        end
    end
end
