module Jekyll
  module EmailProtect
    module EmailProtectionFilter

      # Percent-encode alphanumeric characters of an email address
      def encode_email(input)
        input.to_s.chars.inject(String.new) do |result, char|
          if char =~ /\p{Alnum}/
            char.bytes.inject(result) do |result, byte|
              result << '%%%02X' % byte
            end
          else
            result << char
          end
        end
      end

      # HTML-encode characters of an email address
      def html_encode_email(input)
        input.to_s.chars.inject(String.new) do |result, char|
          char.bytes.inject(result) do |result, byte|
            result << '&#' + byte.to_s + ';'
          end
        end
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::EmailProtect::EmailProtectionFilter)
