# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class MXML < RegexLexer
      title "MXML"
      desc "MXML"
      tag 'mxml'
      filenames '*.mxml'
      mimetypes 'application/xv+xml'

      state :root do
        rule /[^<&]+/, Text
        rule /&\S*?;/, Name::Entity

        rule /<!\[CDATA\[/m do
          token Comment::Preproc
          push :actionscript_content
        end

        rule /<!--/, Comment, :comment
        rule /<\?.*?\?>/, Comment::Preproc
        rule /<![^>]*>/, Comment::Preproc

        rule %r(<\s*[\w:.-]+)m, Name::Tag, :tag # opening tags
        rule %r(<\s*/\s*[\w:.-]+\s*>)m, Name::Tag # closing tags
      end

      state :comment do
        rule /[^-]+/m, Comment
        rule /-->/, Comment, :pop!
        rule /-/, Comment
      end

      state :tag do
        rule /\s+/m, Text
        rule /[\w.:-]+\s*=/m, Name::Attribute, :attribute
        rule %r(/?\s*>), Name::Tag, :root
      end

      state :attribute do
        rule /\s+/m, Text
        rule /(")({|@{)/m do
          groups Str, Punctuation
          push :actionscript_attribute
        end
        rule /".*?"|'.*?'|[^\s>]+/, Str, :tag
      end

      state :actionscript_content do
        rule /\]\]\>/m, Comment::Preproc, :pop!
        rule /.*?(?=\]\]\>)/m do
          delegate Actionscript
        end
      end

      state :actionscript_attribute do
        rule /(})(")/m do
          groups Punctuation, Str
          push :tag
        end
        rule /.*?(?=}")/m do
          delegate Actionscript
        end
      end
    end
  end
end
