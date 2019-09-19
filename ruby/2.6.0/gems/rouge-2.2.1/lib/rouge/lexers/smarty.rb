# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Smarty < TemplateLexer
      title "Smarty"
      desc 'Smarty Template Engine'
      tag 'smarty'
      aliases 'smarty'
      filenames '*.tpl', '*.smarty'
      mimetypes 'application/x-smarty', 'text/x-smarty'

      def self.analyze_text(text)
        rv = 0.0
        rv += 0.15 if text =~ /\{if\s+.*?\}.*?\{\/if\}/
        rv += 0.15 if text =~ /\{include\s+file=.*?\}/
        rv += 0.15 if text =~ /\{foreach\s+.*?\}.*?\{\/foreach\}/
        rv += 0.01 if text =~ /\{\$.*?\}/
        return rv
      end



      def self.builtins
        @builtins ||= %w(
          append assign block call capture config_load debug extends
          for foreach foreachelse break continue function if elseif
          else include include_php insert ldelim rdelim literal nocache
          php section sectionelse setfilter strip while
          counter cycle eval fetch html_checkboxes html_image html_options
          html_radios html_select_date html_select_time html_table
          mailto math textformat
          capitalize cat count_characters count_paragraphs
          count_sentences count_words date_format default escape
          from_charset indent lower nl2br regex_replace replace spacify
          string_format strip strip_tags to_charset truncate unescape
          upper wordwrap
        )
      end


      state :root do
        rule(/\{\s+/) { delegate parent }

        # block comments
        rule /\{\*.*?\*\}/m, Comment

        rule /\{\/?(?![\s*])/ do
          token Keyword
          push :smarty
        end


        rule(/.*?(?={[\/a-zA-Z0-9$#*"'])|.*/m) { delegate parent }
        rule(/.+/m) { delegate parent }
      end

      state :comment do
        rule(/{\*/) { token Comment; push }
        rule(/\*}/) { token Comment; pop! }
        rule(/[^{}]+/m) { token Comment }
      end

      state :smarty do
        # allow nested tags
        rule /\{\/?(?![\s*])/ do
          token Keyword
          push :smarty
        end

        rule /}/, Keyword, :pop!
        rule /\s+/m, Text
        rule %r([~!%^&*()+=|\[\]:;,.<>/@?-]), Operator
        rule /#[a-zA-Z_]\w*#/, Name::Variable
        rule /\$[a-zA-Z_]\w*(\.\w+)*/, Name::Variable
        rule /(true|false|null)\b/, Keyword::Constant
	rule /[0-9](\.[0-9]*)?(eE[+-][0-9])?[flFLdD]?|0[xX][0-9a-fA-F]+[Ll]?/, Num
	rule /"(\\.|.)*?"/, Str::Double
        rule /'(\\.|.)*?'/, Str::Single
	rule /([a-zA-Z_]\w*)/ do |m|
	  if self.class.builtins.include? m[0]
	    token Name::Builtin
	  else
	    token Name::Attribute
	  end
	end
      end

    end
  end
end
