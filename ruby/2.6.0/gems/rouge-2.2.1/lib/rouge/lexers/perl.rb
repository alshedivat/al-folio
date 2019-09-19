# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Perl < RegexLexer
      title "Perl"
      desc "The Perl scripting language (perl.org)"

      tag 'perl'
      aliases 'pl'

      filenames '*.pl', '*.pm'
      mimetypes 'text/x-perl', 'application/x-perl'

      def self.analyze_text(text)
        return 1 if text.shebang? 'perl'
        return 0.4 if text.include? 'my $'
      end

      keywords = %w(
        case continue do else elsif for foreach if last my next our
        redo reset then unless until while use print new BEGIN CHECK
        INIT END return
      )

      builtins = %w(
        abs accept alarm atan2 bind binmode bless caller chdir chmod
        chomp chop chown chr chroot close closedir connect continue cos
        crypt dbmclose dbmopen defined delete die dump each endgrent
        endhostent endnetent endprotoent endpwent endservent eof eval
        exec exists exit exp fcntl fileno flock fork format formline getc
        getgrent getgrgid getgrnam gethostbyaddr gethostbyname gethostent
        getlogin getnetbyaddr getnetbyname getnetent getpeername
        getpgrp getppid getpriority getprotobyname getprotobynumber
        getprotoent getpwent getpwnam getpwuid getservbyname getservbyport
        getservent getsockname getsockopt glob gmtime goto grep hex
        import index int ioctl join keys kill last lc lcfirst length
        link listen local localtime log lstat map mkdir msgctl msgget
        msgrcv msgsnd my next no oct open opendir ord our pack package
        pipe pop pos printf prototype push quotemeta rand read readdir
        readline readlink readpipe recv redo ref rename require reverse
        rewinddir rindex rmdir scalar seek seekdir select semctl semget
        semop send setgrent sethostent setnetent setpgrp setpriority
        setprotoent setpwent setservent setsockopt shift shmctl shmget
        shmread shmwrite shutdown sin sleep socket socketpair sort splice
        split sprintf sqrt srand stat study substr symlink syscall sysopen
        sysread sysseek system syswrite tell telldir tie tied time times
        tr truncate uc ucfirst umask undef unlink unpack unshift untie
        utime values vec wait waitpid wantarray warn write
      )

      re_tok = Str::Regex

      state :balanced_regex do
        rule %r(/(\\[\\/]|[^/])*/[egimosx]*)m, re_tok, :pop!
        rule %r(!(\\[\\!]|[^!])*![egimosx]*)m, re_tok, :pop!
        rule %r(\\(\\\\|[^\\])*\\[egimosx]*)m, re_tok, :pop!
        rule %r({(\\[\\}]|[^}])*}[egimosx]*), re_tok, :pop!
        rule %r(<(\\[\\>]|[^>])*>[egimosx]*), re_tok, :pop!
        rule %r(\[(\\[\\\]]|[^\]])*\][egimosx]*), re_tok, :pop!
        rule %r[\((\\[\\\)]|[^\)])*\)[egimosx]*], re_tok, :pop!
        rule %r(@(\\[\\@]|[^@])*@[egimosx]*), re_tok, :pop!
        rule %r(%(\\[\\%]|[^%])*%[egimosx]*), re_tok, :pop!
        rule %r(\$(\\[\\\$]|[^\$])*\$[egimosx]*), re_tok, :pop!
      end

      state :root do
        rule /#.*?$/, Comment::Single
        rule /^=[a-zA-Z0-9]+\s+.*?\n=cut/m, Comment::Multiline
        rule /(?:#{keywords.join('|')})\b/, Keyword

        rule /(format)(\s+)([a-zA-Z0-9_]+)(\s*)(=)(\s*\n)/ do
          groups Keyword, Text, Name, Text, Punctuation, Text

          push :format
        end

        rule /(?:eq|lt|gt|le|ge|ne|not|and|or|cmp)\b/, Operator::Word

        # common delimiters
        rule %r(s/(\\\\|\\/|[^/])*/(\\\\|\\/|[^/])*/[egimosx]*), re_tok
        rule %r(s!(\\\\|\\!|[^!])*!(\\\\|\\!|[^!])*![egimosx]*), re_tok
        rule %r(s\\(\\\\|[^\\])*\\(\\\\|[^\\])*\\[egimosx]*), re_tok
        rule %r(s@(\\\\|\\@|[^@])*@(\\\\|\\@|[^@])*@[egimosx]*), re_tok
        rule %r(s%(\\\\|\\%|[^%])*%(\\\\|\\%|[^%])*%[egimosx]*), re_tok

        # balanced delimiters
        rule %r(s{(\\\\|\\}|[^}])*}\s*), re_tok, :balanced_regex
        rule %r(s<(\\\\|\\>|[^>])*>\s*), re_tok, :balanced_regex
        rule %r(s\[(\\\\|\\\]|[^\]])*\]\s*), re_tok, :balanced_regex
        rule %r[s\((\\\\|\\\)|[^\)])*\)\s*], re_tok, :balanced_regex

        rule %r(m?/(\\\\|\\/|[^/\n])*/[gcimosx]*), re_tok
        rule %r(m(?=[/!\\{<\[\(@%\$])), re_tok, :balanced_regex
        rule %r(((?<==~)|(?<=\())\s*/(\\\\|\\/|[^/])*/[gcimosx]*),
          re_tok, :balanced_regex

        rule /\s+/, Text
        rule /(?:#{builtins.join('|')})\b/, Name::Builtin
        rule /((__(DATA|DIE|WARN)__)|(STD(IN|OUT|ERR)))\b/,
          Name::Builtin::Pseudo

        rule /<<([\'"]?)([a-zA-Z_][a-zA-Z0-9_]*)\1;?\n.*?\n\2\n/m, Str

        rule /__END__\b/, Comment::Preproc, :end_part
        rule /\$\^[ADEFHILMOPSTWX]/, Name::Variable::Global
        rule /\$[\\"'\[\]&`+*.,;=%~?@$!<>(^\|\/-](?!\w)/, Name::Variable::Global
        rule /[$@%#]+/, Name::Variable, :varname

        rule /0_?[0-7]+(_[0-7]+)*/, Num::Oct
        rule /0x[0-9A-Fa-f]+(_[0-9A-Fa-f]+)*/, Num::Hex
        rule /0b[01]+(_[01]+)*/, Num::Bin
        rule /(\d*(_\d*)*\.\d+(_\d*)*|\d+(_\d*)*\.\d+(_\d*)*)(e[+-]?\d+)?/i,
          Num::Float
        rule /\d+(_\d*)*e[+-]?\d+(_\d*)*/i, Num::Float
        rule /\d+(_\d+)*/, Num::Integer

        rule /'(\\\\|\\'|[^'])*'/, Str
        rule /"(\\\\|\\"|[^"])*"/, Str
        rule /`(\\\\|\\`|[^`])*`/, Str::Backtick
        rule /<([^\s>]+)>/, re_tok
        rule /(q|qq|qw|qr|qx)\{/, Str::Other, :cb_string
        rule /(q|qq|qw|qr|qx)\(/, Str::Other, :rb_string
        rule /(q|qq|qw|qr|qx)\[/, Str::Other, :sb_string
        rule /(q|qq|qw|qr|qx)</, Str::Other, :lt_string
        rule /(q|qq|qw|qr|qx)([^a-zA-Z0-9])(.|\n)*?\2/, Str::Other

        rule /package\s+/, Keyword, :modulename
        rule /sub\s+/, Keyword, :funcname
        rule /\[\]|\*\*|::|<<|>>|>=|<=|<=>|={3}|!=|=~|!~|&&?|\|\||\.{1,3}/,
          Operator
        rule /[-+\/*%=<>&^\|!\\~]=?/, Operator
        rule /[()\[\]:;,<>\/?{}]/, Punctuation
        rule(/(?=\w)/) { push :name }
      end

      state :format do
        rule /\.\n/, Str::Interpol, :pop!
        rule /.*?\n/, Str::Interpol
      end

      state :name_common do
        rule /\w+::/, Name::Namespace
        rule /[\w:]+/, Name::Variable, :pop!
      end

      state :varname do
        rule /\s+/, Text
        rule /\{/, Punctuation, :pop! # hash syntax
        rule /\)|,/, Punctuation, :pop! # arg specifier
        mixin :name_common
      end

      state :name do
        mixin :name_common
        rule /[A-Z_]+(?=[^a-zA-Z0-9_])/, Name::Constant, :pop!
        rule(/(?=\W)/) { pop! }
      end

      state :modulename do
        rule /[a-z_]\w*/i, Name::Namespace, :pop!
      end

      state :funcname do
        rule /[a-zA-Z_]\w*[!?]?/, Name::Function
        rule /\s+/, Text

        # argument declaration
        rule /(\([$@%]*\))(\s*)/ do
          groups Punctuation, Text
        end

        rule /.*?{/, Punctuation, :pop!
        rule /;/, Punctuation, :pop!
      end

      [[:cb, '\{', '\}'],
       [:rb, '\(', '\)'],
       [:sb, '\[', '\]'],
       [:lt, '<',  '>']].each do |name, open, close|
        tok = Str::Other
        state :"#{name}_string" do
          rule /\\[#{open}#{close}\\]/, tok
          rule /\\/, tok
          rule(/#{open}/) { token tok; push }
          rule /#{close}/, tok, :pop!
          rule /[^#{open}#{close}\\]+/, tok
        end
      end

      state :end_part do
        # eat the rest of the stream
        rule /.+/m, Comment::Preproc, :pop!
      end
    end
  end
end
