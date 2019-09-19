# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Docker < RegexLexer
      title "Docker"
      desc "Dockerfile syntax"
      tag 'docker'
      aliases 'dockerfile'
      filenames 'Dockerfile', '*.docker'
      mimetypes 'text/x-dockerfile-config'

      KEYWORDS = %w(
        FROM MAINTAINER CMD LABEL EXPOSE ENV ADD COPY ENTRYPOINT VOLUME USER WORKDIR ARG STOPSIGNAL HEALTHCHECK SHELL
      ).join('|')

      start { @shell = Shell.new(@options) }

      state :root do
        rule /\s+/, Text

        rule /^(ONBUILD)(\s+)(#{KEYWORDS})(.*)/io do |m|
          groups Keyword, Text::Whitespace, Keyword, Str
        end

        rule /^(#{KEYWORDS})\b(.*)/io do |m|
          groups Keyword, Str
        end

        rule /#.*?$/, Comment

        rule /^(ONBUILD\s+)?RUN(\s+)/i do
          token Keyword
          push :run
          @shell.reset!
        end

        rule /\w+/, Text
        rule /[^\w]+/, Text
        rule /./, Text
      end

      state :run do
        rule /\n/, Text, :pop!
        rule /\\./m, Str::Escape
        rule(/(\\.|[^\n\\])+/) { delegate @shell }
      end
    end
  end
end
