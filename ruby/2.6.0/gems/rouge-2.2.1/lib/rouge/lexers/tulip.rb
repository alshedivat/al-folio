module Rouge
  module Lexers
    class Tulip < RegexLexer
      desc 'the tulip programming language (twitter.com/tuliplang)'
      tag 'tulip'
      aliases 'tulip'

      filenames '*.tlp'

      mimetypes 'text/x-tulip', 'application/x-tulip'

      def self.analyze_text(text)
        return 1 if text.shebang? 'tulip'
        return 0
      end

      id = /[a-z][\w-]*/i
      upper_id = /[A-Z][\w-]*/

      state :comments_and_whitespace do
        rule /\s+/, Text
        rule /#.*?$/, Comment
      end

      state :root do
        mixin :comments_and_whitespace

        rule /@#{id}/, Keyword


        rule /(\\#{id})([{])/ do
          groups Name::Function, Str
          push :nested_string
        end

        rule /([+]#{id})([{])/ do
          groups Name::Decorator, Str
          push :nested_string
        end

        rule /\\#{id}/, Name::Function
        rule /[+]#{id}/, Name::Decorator

        rule /"[{]/, Str, :dqi
        rule /"/, Str, :dq

        rule /'{/, Str, :nested_string
        rule /'#{id}/, Str

        rule /[.]#{id}/, Name::Tag
        rule /[$]#{id}?/, Name::Variable
        rule /-#{id}:?/, Name::Label
        rule /%#{id}/, Name::Function
        rule /`#{id}/, Operator::Word

        rule /[?~%._>,!\[\]:{}()=;\/-]/, Punctuation

        rule /[0-9]+([.][0-9]+)?/, Num

        rule /#{id}/, Name

        rule /</, Comment::Preproc, :angle_brackets
      end

      state :dq do
        rule /[^\\"]+/, Str
        rule /"/, Str, :pop!
        rule /\\./, Str::Escape
      end

      state :dqi do
        rule /[$][(]/, Str::Interpol, :interp_root
        rule /[{]/, Str, :dqi
        rule /[}]/, Str, :pop!
        rule /[^{}$]+/, Str
        rule /./, Str
      end

      state :interp_root do
        rule /[)]/, Str::Interpol, :pop!
        mixin :interp
      end

      state :interp do
        rule /[(]/, Punctuation, :interp
        rule /[)]/, Punctuation, :pop!
        mixin :root
      end

      state :nested_string do
        rule /\\./, Str::Escape
        rule(/{/) { token Str; push :nested_string }
        rule(/}/) { token Str; pop! }
        rule(/[^{}\\]+/) { token Str }
      end

      state :angle_brackets do
        mixin :comments_and_whitespace
        rule />/, Comment::Preproc, :pop!
        rule /[*:]/, Punctuation
        rule /#{upper_id}/, Keyword::Type
        rule /#{id}/, Name::Variable
      end
    end
  end
end

