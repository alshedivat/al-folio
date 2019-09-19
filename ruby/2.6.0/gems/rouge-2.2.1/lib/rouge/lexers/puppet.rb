# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Puppet < RegexLexer
      title "Puppet"
      desc 'The Puppet configuration management language (puppetlabs.org)'
      tag 'puppet'
      aliases 'pp'
      filenames '*.pp'

      def self.analyze_text(text)
        return 1 if text.shebang? 'puppet-apply'
        return 1 if text.shebang? 'puppet'
      end

      def self.keywords
        @keywords ||= Set.new %w(
          and case class default define else elsif if in import inherits
          node unless
        )
      end

      def self.constants
        @constants ||= Set.new %w(
          false true undef
        )
      end

      def self.metaparameters
        @metaparameters ||= Set.new %w(
          before require notify subscribe
        )
      end

      id = /[a-z]\w*/
      cap_id = /[A-Z]\w*/
      qualname = /(::)?(#{id}::)*\w+/

      state :whitespace do
        rule /\s+/m, Text
        rule /#.*?\n/, Comment
      end

      state :root do
        mixin :whitespace

        rule /[$]#{qualname}/, Name::Variable
        rule /(#{id})(?=\s*[=+]>)/m do |m|
          if self.class.metaparameters.include? m[0]
            token Keyword::Pseudo
          else
            token Name::Property
          end
        end

        rule /(#{qualname})(?=\s*[(])/m, Name::Function
        rule cap_id, Name::Class

        rule /[+=|~-]>|<[|~-]/, Punctuation
        rule /[:}();\[\]]/, Punctuation

        # HACK for case statements and selectors
        rule /{/, Punctuation, :regex_allowed
        rule /,/, Punctuation, :regex_allowed

        rule /(in|and|or)\b/, Operator::Word
        rule /[=!<>]=/, Operator
        rule /[=!]~/, Operator, :regex_allowed
        rule %r([<>!+*/-]), Operator

        rule /(class|include)(\s*)(#{qualname})/ do
          groups Keyword, Text, Name::Class
        end

        rule /node\b/, Keyword, :regex_allowed

        rule /'(\\[\\']|[^'])*'/m, Str::Single
        rule /"/, Str::Double, :dquotes

        rule /\d+([.]\d+)?(e[+-]\d+)?/, Num

        # a valid regex.  TODO: regexes are only allowed
        # in certain places in puppet.
        rule qualname do |m|
          if self.class.keywords.include? m[0]
            token Keyword
          elsif self.class.constants.include? m[0]
            token Keyword::Constant
          else
            token Name
          end
        end
      end

      state :regex_allowed do
        mixin :whitespace
        rule %r(/), Str::Regex, :regex

        rule(//) { pop! }
      end

      state :regex do
        rule %r(/), Str::Regex, :pop!
        rule /\\./, Str::Escape
        rule /[(){}]/, Str::Interpol
        rule /\[/, Str::Interpol, :regex_class
        rule /./, Str::Regex
      end

      state :regex_class do
        rule /\]/, Str::Interpol, :pop!
        rule /(?<!\[)-(?=\])/, Str::Regex
        rule /-/, Str::Interpol
        rule /\\./, Str::Escape
        rule /[^\\\]-]+/, Str::Regex
      end

      state :dquotes do
        rule /"/, Str::Double, :pop!
        rule /[^$\\"]+/m, Str::Double
        rule /\\./m, Str::Escape
        rule /[$]#{qualname}/, Name::Variable
        rule /[$][{]#{qualname}[}]/, Name::Variable
      end
    end
  end
end
