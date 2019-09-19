module Liquid
  # If is the conditional block
  #
  #   {% if user.admin %}
  #     Admin user!
  #   {% else %}
  #     Not admin user
  #   {% endif %}
  #
  #    There are {% if count < 5 %} less {% else %} more {% endif %} items than you need.
  #
  class If < Block
    Syntax = /(#{QuotedFragment})\s*([=!<>a-z_]+)?\s*(#{QuotedFragment})?/o
    ExpressionsAndOperators = /(?:\b(?:\s?and\s?|\s?or\s?)\b|(?:\s*(?!\b(?:\s?and\s?|\s?or\s?)\b)(?:#{QuotedFragment}|\S+)\s*)+)/o
    BOOLEAN_OPERATORS = %w(and or)

    def initialize(tag_name, markup, options)
      super
      @blocks = []
      push_block('if'.freeze, markup)
    end

    def parse(tokens)
      while parse_body(@blocks.last.attachment, tokens)
      end
    end

    def nodelist
      @blocks.map(&:attachment)
    end

    def unknown_tag(tag, markup, tokens)
      if ['elsif'.freeze, 'else'.freeze].include?(tag)
        push_block(tag, markup)
      else
        super
      end
    end

    def render(context)
      context.stack do
        @blocks.each do |block|
          if block.evaluate(context)
            return block.attachment.render(context)
          end
        end
        ''.freeze
      end
    end

    private

    def push_block(tag, markup)
      block = if tag == 'else'.freeze
        ElseCondition.new
      else
        parse_with_selected_parser(markup)
      end

      @blocks.push(block)
      block.attach(BlockBody.new)
    end

    def lax_parse(markup)
      expressions = markup.scan(ExpressionsAndOperators)
      raise(SyntaxError.new(options[:locale].t("errors.syntax.if".freeze))) unless expressions.pop =~ Syntax

      condition = Condition.new(Expression.parse($1), $2, Expression.parse($3))

      until expressions.empty?
        operator = expressions.pop.to_s.strip

        raise(SyntaxError.new(options[:locale].t("errors.syntax.if".freeze))) unless expressions.pop.to_s =~ Syntax

        new_condition = Condition.new(Expression.parse($1), $2, Expression.parse($3))
        raise(SyntaxError.new(options[:locale].t("errors.syntax.if".freeze))) unless BOOLEAN_OPERATORS.include?(operator)
        new_condition.send(operator, condition)
        condition = new_condition
      end

      condition
    end

    def strict_parse(markup)
      p = Parser.new(markup)
      condition = parse_binary_comparison(p)
      p.consume(:end_of_string)
      condition
    end

    def parse_binary_comparison(p)
      condition = parse_comparison(p)
      if op = (p.id?('and'.freeze) || p.id?('or'.freeze))
        condition.send(op, parse_binary_comparison(p))
      end
      condition
    end

    def parse_comparison(p)
      a = Expression.parse(p.expression)
      if op = p.consume?(:comparison)
        b = Expression.parse(p.expression)
        Condition.new(a, op, b)
      else
        Condition.new(a)
      end
    end
  end

  Template.register_tag('if'.freeze, If)
end
