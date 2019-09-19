module Liquid
  # Container for liquid nodes which conveniently wraps decision making logic
  #
  # Example:
  #
  #   c = Condition.new(1, '==', 1)
  #   c.evaluate #=> true
  #
  class Condition #:nodoc:
    @@operators = {
      '=='.freeze => ->(cond, left, right) {  cond.send(:equal_variables, left, right) },
      '!='.freeze => ->(cond, left, right) { !cond.send(:equal_variables, left, right) },
      '<>'.freeze => ->(cond, left, right) { !cond.send(:equal_variables, left, right) },
      '<'.freeze  => :<,
      '>'.freeze  => :>,
      '>='.freeze => :>=,
      '<='.freeze => :<=,
      'contains'.freeze => lambda do |cond, left, right|
        if left && right && left.respond_to?(:include?)
          right = right.to_s if left.is_a?(String)
          left.include?(right)
        else
          false
        end
      end
    }

    def self.operators
      @@operators
    end

    attr_reader :attachment
    attr_accessor :left, :operator, :right

    def initialize(left = nil, operator = nil, right = nil)
      @left = left
      @operator = operator
      @right = right
      @child_relation  = nil
      @child_condition = nil
    end

    def evaluate(context = Context.new)
      result = interpret_condition(left, right, operator, context)

      case @child_relation
      when :or
        result || @child_condition.evaluate(context)
      when :and
        result && @child_condition.evaluate(context)
      else
        result
      end
    end

    def or(condition)
      @child_relation = :or
      @child_condition = condition
    end

    def and(condition)
      @child_relation = :and
      @child_condition = condition
    end

    def attach(attachment)
      @attachment = attachment
    end

    def else?
      false
    end

    def inspect
      "#<Condition #{[@left, @operator, @right].compact.join(' '.freeze)}>"
    end

    private

    def equal_variables(left, right)
      if left.is_a?(Liquid::Expression::MethodLiteral)
        if right.respond_to?(left.method_name)
          return right.send(left.method_name)
        else
          return nil
        end
      end

      if right.is_a?(Liquid::Expression::MethodLiteral)
        if left.respond_to?(right.method_name)
          return left.send(right.method_name)
        else
          return nil
        end
      end

      left == right
    end

    def interpret_condition(left, right, op, context)
      # If the operator is empty this means that the decision statement is just
      # a single variable. We can just poll this variable from the context and
      # return this as the result.
      return context.evaluate(left) if op.nil?

      left = context.evaluate(left)
      right = context.evaluate(right)

      operation = self.class.operators[op] || raise(Liquid::ArgumentError.new("Unknown operator #{op}"))

      if operation.respond_to?(:call)
        operation.call(self, left, right)
      elsif left.respond_to?(operation) && right.respond_to?(operation)
        begin
          left.send(operation, right)
        rescue ::ArgumentError => e
          raise Liquid::ArgumentError.new(e.message)
        end
      end
    end
  end

  class ElseCondition < Condition
    def else?
      true
    end

    def evaluate(_context)
      true
    end
  end
end
