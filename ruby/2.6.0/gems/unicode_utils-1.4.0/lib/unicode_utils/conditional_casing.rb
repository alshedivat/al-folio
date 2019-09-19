# -*- encoding: utf-8 -*-

require "unicode_utils/cased_char_q"
require "unicode_utils/case_ignorable_char_q"
require "unicode_utils/soft_dotted_char_q"
require "unicode_utils/combining_class"
require "unicode_utils/read_cdata"

module UnicodeUtils

  module Impl # :nodoc:all

    LANGS_WITH_RULES = {:tr => true, :lt => true, :az => true}

    class ConditionalCasing

      attr_reader :mapping

      def initialize(mapping)
        @mapping = mapping
      end

      def context_match?(str, pos)
        true
      end

    end

    class BeforeDotConditionalCasing < ConditionalCasing

      def context_match?(str, pos)
        (pos + 1).upto(str.length - 1) { |i|
          c = str[i]
          return true if c.ord == 0x0307
          cc = UnicodeUtils.combining_class(c)
          return false if cc == 0 || cc == 230
        }
        false # "combining dot above" not found
      end

    end

    class NotBeforeDotConditionalCasing < BeforeDotConditionalCasing

      def context_match?(str, pos)
        !super
      end

    end

    class MoreAboveConditionalCasing < ConditionalCasing

      def context_match?(str, pos)
        (pos + 1).upto(str.length - 1) { |i|
          c = str[i]
          cc = UnicodeUtils.combining_class(c)
          return true if cc == 230
          return false if cc == 0
        }
        false
      end

    end

    class AfterIConditionalCasing < ConditionalCasing

      def context_match?(str, pos)
        (pos - 1).downto(0) { |i|
          c = str[i]
          return true if c.ord == 0x49 # uppercase I
          cc = UnicodeUtils.combining_class(c)
          return false if cc == 0 || cc == 230
        }
        false # uppercase I not found
      end

    end

    class AfterSoftDottedConditionalCasing < ConditionalCasing

      def context_match?(str, pos)
        (pos - 1).downto(0) { |i|
          c = str[i]
          return true if UnicodeUtils.soft_dotted_char?(c)
          cc = UnicodeUtils.combining_class(c)
          return false if cc == 0 || cc == 230
        }
        false
      end

    end

    class FinalSigmaConditionalCasing < ConditionalCasing

      def context_match?(str, pos)
        before_match?(str, pos) && !after_match?(str, pos)
      end

      private

      def before_match?(str, pos)
        (pos - 1).downto(0) { |i|
          c = str[i]
          return true if UnicodeUtils.cased_char?(c)
          return false unless UnicodeUtils.case_ignorable_char?(c)
        }
        false # no cased char
      end

      def after_match?(str, pos)
        (pos + 1).upto(str.length - 1) { |i|
          c = str[i]
          return true if UnicodeUtils.cased_char?(c)
          return false unless UnicodeUtils.case_ignorable_char?(c)
        }
        false
      end

    end

    CONDITIONAL_UPCASE_MAP =
      read_conditional_casings("cond_uc_map")

    CONDITIONAL_DOWNCASE_MAP =
      read_conditional_casings("cond_lc_map")

    CONDITIONAL_TITLECASE_MAP =
      read_conditional_casings("cond_tc_map")

    def self.conditional_upcase_mapping(cp, str, pos, language_id)
      lang_map = CONDITIONAL_UPCASE_MAP[cp]
      if lang_map
        casing = lang_map[language_id] || lang_map[nil]
        if casing && casing.context_match?(str, pos)
          casing.mapping
        end
      end
    end

    def self.conditional_downcase_mapping(cp, str, pos, language_id)
      lang_map = CONDITIONAL_DOWNCASE_MAP[cp]
      if lang_map
        casing = lang_map[language_id] || lang_map[nil]
        if casing && casing.context_match?(str, pos)
          casing.mapping
        end
      end
    end

    def self.conditional_titlecase_mapping(cp, str, pos, language_id)
      lang_map = CONDITIONAL_TITLECASE_MAP[cp]
      if lang_map
        casing = lang_map[language_id] || lang_map[nil]
        if casing && casing.context_match?(str, pos)
          casing.mapping
        end
      end
    end

  end

end
