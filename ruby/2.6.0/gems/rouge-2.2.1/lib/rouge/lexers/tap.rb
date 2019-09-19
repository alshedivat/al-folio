module Rouge
  module Lexers
    class Tap < RegexLexer
      title 'TAP'
      desc 'Test Anything Protocol'
      tag 'tap'
      aliases 'tap'
      filenames '*.tap'

      mimetypes 'text/x-tap', 'application/x-tap'

      def self.analyze_text(text)
        return 0
      end

      state :root do
        # A TAP version may be specified.
        rule /^TAP version \d+\n/, Name::Namespace

        # Specify a plan with a plan line.
        rule /^1\.\.\d+/, Keyword::Declaration, :plan

        # A test failure
        rule /^(not ok)([^\S\n]*)(\d*)/ do
          groups Generic::Error, Text, Literal::Number::Integer
          push :test
        end

        # A test success
        rule /^(ok)([^\S\n]*)(\d*)/ do
          groups Keyword::Reserved, Text, Literal::Number::Integer
          push :test
        end

        # Diagnostics start with a hash.
        rule /^#.*\n/, Comment

        # TAP's version of an abort statement.
        rule /^Bail out!.*\n/, Generic::Error

        # # TAP ignores any unrecognized lines.
        rule /^.*\n/, Text
      end

      state :plan do
        # Consume whitespace (but not newline).
        rule /[^\S\n]+/, Text

        # A plan may have a directive with it.
        rule /#/, Comment, :directive

        # Or it could just end.
        rule /\n/, Comment, :pop!

        # Anything else is wrong.
        rule /.*\n/, Generic::Error, :pop!
      end

      state :test do
        # Consume whitespace (but not newline).
        rule /[^\S\n]+/, Text

        # A test may have a directive with it.
        rule /#/, Comment, :directive

        rule /\S+/, Text

        rule /\n/, Text, :pop!
      end

      state :directive do
        # Consume whitespace (but not newline).
        rule /[^\S\n]+/, Comment

        # Extract todo items.
        rule /(?i)\bTODO\b/, Comment::Preproc

        # Extract skip items.
        rule /(?i)\bSKIP\S*/, Comment::Preproc

        rule /\S+/, Comment

        rule /\n/ do
          token Comment
          pop! 2
        end
      end
    end
  end
end

