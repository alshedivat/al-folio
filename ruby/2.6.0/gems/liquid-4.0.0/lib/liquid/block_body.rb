module Liquid
  class BlockBody
    FullToken = /\A#{TagStart}#{WhitespaceControl}?\s*(\w+)\s*(.*?)#{WhitespaceControl}?#{TagEnd}\z/om
    ContentOfVariable = /\A#{VariableStart}#{WhitespaceControl}?(.*?)#{WhitespaceControl}?#{VariableEnd}\z/om
    TAGSTART = "{%".freeze
    VARSTART = "{{".freeze

    attr_reader :nodelist

    def initialize
      @nodelist = []
      @blank = true
    end

    def parse(tokenizer, parse_context)
      parse_context.line_number = tokenizer.line_number
      while token = tokenizer.shift
        unless token.empty?
          case
          when token.start_with?(TAGSTART)
            whitespace_handler(token, parse_context)
            if token =~ FullToken
              tag_name = $1
              markup = $2
              # fetch the tag from registered blocks
              if tag = registered_tags[tag_name]
                new_tag = tag.parse(tag_name, markup, tokenizer, parse_context)
                @blank &&= new_tag.blank?
                @nodelist << new_tag
              else
                # end parsing if we reach an unknown tag and let the caller decide
                # determine how to proceed
                return yield tag_name, markup
              end
            else
              raise_missing_tag_terminator(token, parse_context)
            end
          when token.start_with?(VARSTART)
            whitespace_handler(token, parse_context)
            @nodelist << create_variable(token, parse_context)
            @blank = false
          else
            if parse_context.trim_whitespace
              token.lstrip!
            end
            parse_context.trim_whitespace = false
            @nodelist << token
            @blank &&= !!(token =~ /\A\s*\z/)
          end
        end
        parse_context.line_number = tokenizer.line_number
      end

      yield nil, nil
    end

    def whitespace_handler(token, parse_context)
      if token[2] == WhitespaceControl
        previous_token = @nodelist.last
        if previous_token.is_a? String
          previous_token.rstrip!
        end
      end
      parse_context.trim_whitespace = (token[-3] == WhitespaceControl)
    end

    def blank?
      @blank
    end

    def render(context)
      output = []
      context.resource_limits.render_score += @nodelist.length

      @nodelist.each do |token|
        # Break out if we have any unhanded interrupts.
        break if context.interrupt?

        begin
          # If we get an Interrupt that means the block must stop processing. An
          # Interrupt is any command that stops block execution such as {% break %}
          # or {% continue %}
          if token.is_a?(Continue) || token.is_a?(Break)
            context.push_interrupt(token.interrupt)
            break
          end

          node_output = render_node(token, context)

          unless token.is_a?(Block) && token.blank?
            output << node_output
          end
        rescue MemoryError => e
          raise e
        rescue UndefinedVariable, UndefinedDropMethod, UndefinedFilter => e
          context.handle_error(e, token.line_number, token.raw)
          output << nil
        rescue ::StandardError => e
          output << context.handle_error(e, token.line_number, token.raw)
        end
      end

      output.join
    end

    private

    def render_node(node, context)
      node_output = (node.respond_to?(:render) ? node.render(context) : node)
      node_output = node_output.is_a?(Array) ? node_output.join : node_output.to_s

      context.resource_limits.render_length += node_output.length
      if context.resource_limits.reached?
        raise MemoryError.new("Memory limits exceeded".freeze)
      end
      node_output
    end

    def create_variable(token, parse_context)
      token.scan(ContentOfVariable) do |content|
        markup = content.first
        return Variable.new(markup, parse_context)
      end
      raise_missing_variable_terminator(token, parse_context)
    end

    def raise_missing_tag_terminator(token, parse_context)
      raise SyntaxError.new(parse_context.locale.t("errors.syntax.tag_termination".freeze, token: token, tag_end: TagEnd.inspect))
    end

    def raise_missing_variable_terminator(token, parse_context)
      raise SyntaxError.new(parse_context.locale.t("errors.syntax.variable_termination".freeze, token: token, tag_end: VariableEnd.inspect))
    end

    def registered_tags
      Template.tags
    end
  end
end
