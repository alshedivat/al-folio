# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    module TypescriptCommon
      def self.keywords
        @keywords ||= super + Set.new(%w(
          is namespace static private protected public
          implements readonly
        ))
      end

      def self.declarations
        @declarations ||= super + Set.new(%w(
          type abstract
        ))
      end

      def self.reserved
        @reserved ||= super + Set.new(%w(
          string any void number namespace module
          declare default interface keyof
        ))
      end

      def self.builtins
        @builtins ||= super + %w(
          Pick Partial Readonly Record
        )
      end
    end
  end
end
