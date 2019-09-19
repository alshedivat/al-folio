# -*- coding: utf-8 -*- #

require 'yaml'

module Rouge
  module Lexers
    class Lasso < TemplateLexer
      title "Lasso"
      desc "The Lasso programming language (lassosoft.com)"
      tag 'lasso'
      aliases 'lassoscript'
      filenames '*.lasso', '*.lasso[89]'
      mimetypes 'text/x-lasso', 'text/html+lasso', 'application/x-httpd-lasso'

      option :start_inline, 'Whether to start inline instead of requiring <?lasso or ['

      def self.analyze_text(text)
        rv = 0.0
        rv += 1 if text.shebang?('lasso9')
        rv += 0.4 if text =~ /<\?(lasso(script)?|=)|no_square_brackets|noprocess/i
        rv += 0.2 if text =~ /define(_tag|_type|\s)/i
        return rv
      end

      def initialize(*)
        super

        @start_inline = bool_option(:start_inline)
      end

      def start_inline?
        @start_inline
      end

      start do
        push :lasso if start_inline?
      end

      class << self
        attr_reader :keywords
      end

      # Load Lasso keywords from separate YML file
      @keywords = ::YAML.load_file(Pathname.new(__FILE__).dirname.join('lasso/keywords.yml')).tap do |h|
        h.each do |k,v|
          h[k] = Set.new v
        end
      end

      id = /[a-z_][\w.]*/i

      state :root do
        rule /^#![ \S]+lasso9\b/, Comment::Preproc, :lasso
        rule(/(?=\[|<)/) { push :delimiters }
        rule /\s+/, Text::Whitespace
        rule(//) { push :delimiters; push :lassofile }
      end

      state :delimiters do
        rule /\[no_square_brackets\]/, Comment::Preproc, :nosquarebrackets
        rule /\[noprocess\]/, Comment::Preproc, :noprocess
        rule /\[/, Comment::Preproc, :squarebrackets
        rule /<\?(lasso(script)?|=)/i, Comment::Preproc, :anglebrackets
        rule(/([^\[<]|<!--.*?-->|<(script|style).*?\2>|<(?!\?(lasso(script)?|=)))+/im) { delegate parent }
      end

      state :nosquarebrackets do
        rule /\[noprocess\]/, Comment::Preproc, :noprocess
        rule /<\?(lasso(script)?|=)/i, Comment::Preproc, :anglebrackets
        rule(/([^\[<]|<!--.*?-->|<(script|style).*?\2>|<(?!\?(lasso(script)?|=))|\[(?!noprocess))+/im) { delegate parent }
      end

      state :noprocess do
        rule %r(\[/noprocess\]), Comment::Preproc, :pop!
        rule(%r(([^\[]|\[(?!/noprocess))+)i) { delegate parent }
      end

      state :squarebrackets do
        rule /\]/, Comment::Preproc, :pop!
        mixin :lasso
      end

      state :anglebrackets do
        rule /\?>/, Comment::Preproc, :pop!
        mixin :lasso
      end

      state :lassofile do
        rule /\]|\?>/, Comment::Preproc, :pop!
        mixin :lasso
      end

      state :whitespacecomments do
        rule /\s+/, Text
        rule %r(//.*?\n), Comment::Single
        rule %r(/\*\*!.*?\*/)m, Comment::Doc
        rule %r(/\*.*?\*/)m, Comment::Multiline
      end

      state :lasso do
        mixin :whitespacecomments

        # literals
        rule /\d*\.\d+(e[+-]?\d+)?/i, Num::Float
        rule /0x[\da-f]+/i, Num::Hex
        rule /\d+/, Num::Integer
        rule /(infinity|NaN)\b/i, Num
        rule /'[^'\\]*(\\.[^'\\]*)*'/m, Str::Single
        rule /"[^"\\]*(\\.[^"\\]*)*"/m, Str::Double
        rule /`[^`]*`/m, Str::Backtick

        # names
        rule /\$#{id}/, Name::Variable
        rule /#(#{id}|\d+\b)/, Name::Variable::Instance
        rule /(\.\s*)('#{id}')/ do
          groups Name::Builtin::Pseudo, Name::Variable::Class
        end
        rule /(self)(\s*->\s*)('#{id}')/i do
          groups Name::Builtin::Pseudo, Operator, Name::Variable::Class
        end
        rule /(\.\.?\s*)(#{id}(=(?!=))?)/ do
          groups Name::Builtin::Pseudo, Name::Other
        end
        rule /(->\\?\s*|&\s*)(#{id}(=(?!=))?)/ do
          groups Operator, Name::Other
        end
        rule /(?<!->)(self|inherited|currentcapture|givenblock)\b/i, Name::Builtin::Pseudo
        rule /-(?!infinity)#{id}/i, Name::Attribute
        rule /::\s*#{id}/, Name::Label
        rule /error_((code|msg)_\w+|adderror|columnrestriction|databaseconnectionunavailable|databasetimeout|deleteerror|fieldrestriction|filenotfound|invaliddatabase|invalidpassword|invalidusername|modulenotfound|noerror|nopermission|outofmemory|reqcolumnmissing|reqfieldmissing|requiredcolumnmissing|requiredfieldmissing|updateerror)/i, Name::Exception

        # definitions
        rule /(define)(\s+)(#{id})(\s*=>\s*)(type|trait|thread)\b/i do
          groups Keyword::Declaration, Text, Name::Class, Operator, Keyword
        end
        rule %r((define)(\s+)(#{id})(\s*->\s*)(#{id}=?|[-+*/%]))i do
          groups Keyword::Declaration, Text, Name::Class, Operator, Name::Function
          push :signature
        end
        rule /(define)(\s+)(#{id})/i do
          groups Keyword::Declaration, Text, Name::Function
          push :signature
        end
        rule %r((public|protected|private|provide)(\s+)((#{id}=?|[-+*/%])(?=\s*\()))i do
          groups Keyword, Text, Name::Function
          push :signature
        end
        rule /(public|protected|private|provide)(\s+)(#{id})/i do
          groups Keyword, Text, Name::Function
        end

        # keywords
        rule /(true|false|none|minimal|full|all|void)\b/i, Keyword::Constant
        rule /(local|var|variable|global|data(?=\s))\b/i, Keyword::Declaration
        rule /(array|date|decimal|duration|integer|map|pair|string|tag|xml|null|boolean|bytes|keyword|list|locale|queue|set|stack|staticarray)\b/i, Keyword::Type
        rule /(#{id})(\s+)(in)\b/i do
          groups Name, Text, Keyword
        end
        rule /(let|into)(\s+)(#{id})/i do
          groups Keyword, Text, Name
        end

        # other
        rule /,/, Punctuation, :commamember
        rule /(and|or|not)\b/i, Operator::Word
        rule /(#{id})(\s*::\s*#{id})?(\s*=(?!=|>))/ do
          groups Name, Name::Label, Operator
        end

        rule %r((/?)([\w.]+)) do |m|
          name = m[2].downcase

          if m[1] != ''
            token Punctuation, m[1]
          end

          if name == 'namespace_using'
            token Keyword::Namespace, m[2]
          elsif self.class.keywords[:keywords].include? name
            token Keyword, m[2]
          elsif self.class.keywords[:types_traits].include? name
            token Name::Builtin, m[2]
          else
            token Name::Other, m[2]
          end
        end

        rule /(=)(n?bw|n?ew|n?cn|lte?|gte?|n?eq|n?rx|ft)\b/i do
          groups Operator, Operator::Word
        end
        rule %r(:=|[-+*/%=<>&|!?\\]+), Operator
        rule /[{}():;,@^]/, Punctuation
      end

      state :signature do
        rule /\=>/, Operator, :pop!
        rule /\)/, Punctuation, :pop!
        rule /[(,]/, Punctuation, :parameter
        mixin :lasso
      end

      state :parameter do
        rule /\)/, Punctuation, :pop!
        rule /-?#{id}/, Name::Attribute, :pop!
        rule /\.\.\./, Name::Builtin::Pseudo
        mixin :lasso
      end

      state :commamember do
        rule %r((#{id}=?|[-+*/%])(?=\s*(\(([^()]*\([^()]*\))*[^\)]*\)\s*)?(::[\w.\s]+)?=>)), Name::Function, :signature
        mixin :whitespacecomments
        rule //, Text, :pop!
      end

    end
  end
end
