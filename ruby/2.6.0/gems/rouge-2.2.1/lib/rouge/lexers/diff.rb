module Rouge
  module Lexers
    class Diff < RegexLexer
      title 'diff'
      desc 'Lexes unified diffs or patches'

      tag 'diff'
      aliases 'patch', 'udiff'
      filenames '*.diff', '*.patch'
      mimetypes 'text/x-diff', 'text/x-patch'

      def self.analyze_text(text)
        return 1   if text.start_with?('Index: ')
        return 1   if text.start_with?('diff ')
        return 0.9 if text.start_with?('--- ')
      end

      state :root do
        rule(/^ .*$\n?/, Text)
        rule(/^---$\n?/, Text)
        rule(/^\+.*$\n?/, Generic::Inserted)
        rule(/^-+.*$\n?/, Generic::Deleted)
        rule(/^!.*$\n?/, Generic::Strong)
        rule(/^@.*$\n?/, Generic::Subheading)
        rule(/^([Ii]ndex|diff).*$\n?/, Generic::Heading)
        rule(/^=.*$\n?/, Generic::Heading)
        rule(/.*$\n?/, Text)
      end
    end
  end
end
