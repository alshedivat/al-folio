# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class YAML < RegexLexer
      title "YAML"
      desc "Yaml Ain't Markup Language (yaml.org)"
      mimetypes 'text/x-yaml'
      tag 'yaml'
      aliases 'yml'
      filenames '*.yaml', '*.yml'

      def self.analyze_text(text)
        # look for the %YAML directive
        return 1 if text =~ /\A\s*%YAML/m
      end

      SPECIAL_VALUES = Regexp.union(%w(true false null))

      # NB: Tabs are forbidden in YAML, which is why you see things
      # like /[ ]+/.

      # reset the indentation levels
      def reset_indent
        puts "    yaml: reset_indent" if @debug
        @indent_stack = [0]
        @next_indent = 0
        @block_scalar_indent = nil
      end

      def indent
        raise 'empty indent stack!' if @indent_stack.empty?
        @indent_stack.last
      end

      def dedent?(level)
        level < self.indent
      end

      def indent?(level)
        level > self.indent
      end

      # Save a possible indentation level
      def save_indent(match)
        @next_indent = match.size
        puts "    yaml: indent: #{self.indent}/#@next_indent" if @debug
        puts "    yaml: popping indent stack - before: #@indent_stack" if @debug
        if dedent?(@next_indent)
          @indent_stack.pop while dedent?(@next_indent)
          puts "    yaml: popping indent stack - after: #@indent_stack" if @debug
          puts "    yaml: indent: #{self.indent}/#@next_indent" if @debug

          # dedenting to a state not previously indented to is an error
          [match[0...self.indent], match[self.indent..-1]]
        else
          [match, '']
        end
      end

      def continue_indent(match)
        puts "    yaml: continue_indent" if @debug
        @next_indent += match.size
      end

      def set_indent(match, opts={})
        if indent < @next_indent
          puts "    yaml: indenting #{indent}/#{@next_indent}" if @debug
          @indent_stack << @next_indent
        end

        @next_indent += match.size unless opts[:implicit]
      end

      plain_scalar_start = /[^ \t\n\r\f\v?:,\[\]{}#&*!\|>'"%@`]/

      start { reset_indent }

      state :basic do
        rule /#.*$/, Comment::Single
      end

      state :root do
        mixin :basic

        rule /\n+/, Text

        # trailing or pre-comment whitespace
        rule /[ ]+(?=#|$)/, Text

        rule /^%YAML\b/ do
          token Name::Tag
          reset_indent
          push :yaml_directive
        end

        rule /^%TAG\b/ do
          token Name::Tag
          reset_indent
          push :tag_directive
        end

        # doc-start and doc-end indicators
        rule /^(?:---|\.\.\.)(?= |$)/ do
          token Name::Namespace
          reset_indent
          push :block_line
        end

        # indentation spaces
        rule /[ ]*(?!\s|$)/ do |m|
          text, err = save_indent(m[0])
          token Text, text
          token Error, err
          push :block_line; push :indentation
        end
      end

      state :indentation do
        rule(/\s*?\n/) { token Text; pop! 2 }
        # whitespace preceding block collection indicators
        rule /[ ]+(?=[-:?](?:[ ]|$))/ do |m|
          token Text
          continue_indent(m[0])
        end

        # block collection indicators
        rule(/[?:-](?=[ ]|$)/) do |m|
          set_indent m[0]
          token Punctuation::Indicator
        end

        # the beginning of a block line
        rule(/[ ]*/) { |m| token Text; continue_indent(m[0]); pop! }
      end

      # indented line in the block context
      state :block_line do
        # line end
        rule /[ ]*(?=#|$)/, Text, :pop!
        rule /[ ]+/, Text
        # tags, anchors, and aliases
        mixin :descriptors
        # block collections and scalars
        mixin :block_nodes
        # flow collections and quoed scalars
        mixin :flow_nodes

        # a plain scalar
        rule /(?=#{plain_scalar_start}|[?:-][^ \t\n\r\f\v])/ do
          token Name::Variable
          push :plain_scalar_in_block_context
        end
      end

      state :descriptors do
        # a full-form tag
        rule /!<[0-9A-Za-z;\/?:@&=+$,_.!~*'()\[\]%-]+>/, Keyword::Type

        # a tag in the form '!', '!suffix' or '!handle!suffix'
        rule %r(
          (?:![\w-]+)? # handle
          !(?:[\w;/?:@&=+$,.!~*\'()\[\]%-]*) # suffix
        )x, Keyword::Type

        # an anchor
        rule /&[\w-]+/, Name::Label

        # an alias
        rule /\*[\w-]+/, Name::Variable
      end

      state :block_nodes do
        # implicit key
        rule /((?:\w[\w -]*)?)(:)(?=\s|$)/ do |m|
          groups Name::Attribute, Punctuation::Indicator
          set_indent m[0], :implicit => true
        end

        # literal and folded scalars
        rule /[\|>]/ do
          token Punctuation::Indicator
          push :block_scalar_content
          push :block_scalar_header
        end
      end

      state :flow_nodes do
        rule /\[/, Punctuation::Indicator, :flow_sequence
        rule /\{/, Punctuation::Indicator, :flow_mapping
        rule /'/, Str::Single, :single_quoted_scalar
        rule /"/, Str::Double, :double_quoted_scalar
      end

      state :flow_collection do
        rule /\s+/m, Text
        mixin :basic
        rule /[?:,]/, Punctuation::Indicator
        mixin :descriptors
        mixin :flow_nodes

        rule /(?=#{plain_scalar_start})/ do
          push :plain_scalar_in_flow_context
        end
      end

      state :flow_sequence do
        rule /\]/, Punctuation::Indicator, :pop!
        mixin :flow_collection
      end

      state :flow_mapping do
        rule /\}/, Punctuation::Indicator, :pop!
        mixin :flow_collection
      end

      state :block_scalar_content do
        rule /\n+/, Text

        # empty lines never dedent, but they might be part of the scalar.
        rule /^[ ]+$/ do |m|
          text = m[0]
          indent_size = text.size

          indent_mark = @block_scalar_indent || indent_size

          token Text, text[0...indent_mark]
          token Name::Constant, text[indent_mark..-1]
        end

        # TODO: ^ doesn't actually seem to affect the match at all.
        # Find a way to work around this limitation.
        rule /^[ ]*/ do |m|
          token Text

          indent_size = m[0].size

          dedent_level = @block_scalar_indent || self.indent
          @block_scalar_indent ||= indent_size

          if indent_size < dedent_level
            save_indent m[0]
            pop!
            push :indentation
          end
        end

        rule /[^\n\r\f\v]+/, Name::Constant
      end

      state :block_scalar_header do
        # optional indentation indicator and chomping flag, in either order
        rule %r(
          (
            ([1-9])[+-]? | [+-]?([1-9])?
          )(?=[ ]|$)
        )x do |m|
          @block_scalar_indent = nil
          goto :ignored_line
          next if m[0].empty?

          increment = m[1] || m[2]
          if increment
            @block_scalar_indent = indent + increment.to_i
          end

          token Punctuation::Indicator
        end
      end

      state :ignored_line do
        mixin :basic
        rule /[ ]+/, Text
        rule /\n/, Text, :pop!
      end

      state :quoted_scalar_whitespaces do
        # leading and trailing whitespace is ignored
        rule /^[ ]+/, Text
        rule /[ ]+$/, Text

        rule /\n+/m, Text

        rule /[ ]+/, Name::Variable
      end

      state :single_quoted_scalar do
        mixin :quoted_scalar_whitespaces
        rule /\\'/, Str::Escape
        rule /'/, Str, :pop!
        rule /[^\s']+/, Str
      end

      state :double_quoted_scalar do
        rule /"/, Str, :pop!
        mixin :quoted_scalar_whitespaces
        # escapes
        rule /\\[0abt\tn\nvfre "\\N_LP]/, Str::Escape
        rule /\\(?:x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
          Str::Escape
        rule /[^ \t\n\r\f\v"\\]+/, Str
      end

      state :plain_scalar_in_block_context_new_line do
        rule /^[ ]+\n/, Text
        rule /\n+/m, Text
        rule /^(?=---|\.\.\.)/ do
          pop! 3
        end

        # dedent detection
        rule /^[ ]*/ do |m|
          token Text
          pop!

          indent_size = m[0].size

          # dedent = end of scalar
          if indent_size <= self.indent
            pop!
            save_indent(m[0])
            push :indentation
          end
        end
      end

      state :plain_scalar_in_block_context do
        # the : indicator ends a scalar
        rule /[ ]*(?=:[ \n]|:$)/, Text, :pop!
        rule /[ ]*:/, Str
        rule /[ ]+(?=#)/, Text, :pop!
        rule /[ ]+$/, Text
        # check for new documents or dedents at the new line
        rule /\n+/ do
          token Text
          push :plain_scalar_in_block_context_new_line
        end

        rule /[ ]+/, Str
        rule SPECIAL_VALUES, Name::Constant
        # regular non-whitespace characters
        rule /[^\s:]+/, Str
      end

      state :plain_scalar_in_flow_context do
        rule /[ ]*(?=[,:?\[\]{}])/, Text, :pop!
        rule /[ ]+(?=#)/, Text, :pop!
        rule /^[ ]+/, Text
        rule /[ ]+$/, Text
        rule /\n+/, Text
        rule /[ ]+/, Name::Variable
        rule /[^\s,:?\[\]{}]+/, Name::Variable
      end

      state :yaml_directive do
        rule /([ ]+)(\d+\.\d+)/ do
          groups Text, Num
          goto :ignored_line
        end
      end

      state :tag_directive do
        rule %r(
          ([ ]+)(!|![\w-]*!) # prefix
          ([ ]+)(!|!?[\w;/?:@&=+$,.!~*'()\[\]%-]+) # tag handle
        )x do
          groups Text, Keyword::Type, Text, Keyword::Type
          goto :ignored_line
        end
      end
    end
  end
end
