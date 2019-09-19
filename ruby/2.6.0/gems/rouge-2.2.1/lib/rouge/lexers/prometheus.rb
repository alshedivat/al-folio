module Rouge
  module Lexers
    class Prometheus < RegexLexer
      desc 'prometheus'
      tag 'prometheus'
      aliases 'prometheus'
      filenames '*.prometheus'

      mimetypes 'text/x-prometheus', 'application/x-prometheus'

      def self.functions
        @functions ||= Set.new %w(
          abs absent ceil changes clamp_max clamp_min count_scalar day_of_month
          day_of_week days_in_month delta deriv drop_common_labels exp floor
          histogram_quantile holt_winters hour idelta increase irate label_replace
          ln log2 log10 month predict_linear rate resets round scalar sort
          sort_desc sqrt time vector year avg_over_time min_over_time
          max_over_time sum_over_time count_over_time quantile_over_time
          stddev_over_time stdvar_over_time
        )
      end

      state :root do
        mixin :strings
        mixin :whitespace

        rule /-?\d+\.\d+/, Num::Float
        rule /-?\d+[smhdwy]?/, Num::Integer

        mixin :operators

        rule /(ignoring|on)(\()/ do
          groups Keyword::Pseudo, Punctuation
          push :label_list
        end
        rule /(group_left|group_right)(\()/ do
          groups Keyword::Type, Punctuation
        end
        rule /(bool|offset)\b/, Keyword
        rule /(without|by)\b/, Keyword, :label_list
        rule /[\w:]+/ do |m|
          if self.class.functions.include?(m[0])
            token Name::Builtin
          else
            token Name
          end
        end

        mixin :metrics
      end

      state :metrics do
        rule /[a-zA-Z0-9_-]+/, Name

        rule /[\(\)\]:.,]/, Punctuation
        rule /\{/, Punctuation, :filters
        rule /\[/, Punctuation
      end

      state :strings do
        rule /"/, Str::Double, :double_string_escaped
        rule /'/, Str::Single, :single_string_escaped
        rule /`.*`/, Str::Backtick
      end

      [
        [:double, Str::Double, '"'],
        [:single, Str::Single, "'"]
      ].each do |name, tok, fin|
        state :"#{name}_string_escaped" do
          rule /\\[\\abfnrtv#{fin}]/, Str::Escape
          rule /[^\\#{fin}]+/m, tok
          rule /#{fin}/, tok, :pop!
        end
      end

      state :filters do
        mixin :inline_whitespace
        rule /,/, Punctuation
        mixin :labels
        mixin :filter_matching_operators
        mixin :strings
        rule /}/, Punctuation, :pop!
      end

      state :label_list do
        rule /\(/, Punctuation
        rule /[a-zA-Z0-9_:-]+/, Name::Attribute
        rule /,/, Punctuation
        mixin :whitespace
        rule /\)/, Punctuation, :pop!
      end

      state :labels do
        rule /[a-zA-Z0-9_:-]+/, Name::Attribute
      end

      state :operators do
        rule %r([+\-\*/%\^]), Operator  # Arithmetic
        rule %r(=|==|!=|<|>|<=|>=), Operator # Comparison
        rule /and|or|unless/, Operator # Logical/Set
        rule /(sum|min|max|avg|stddev|stdvar|count|count_values|bottomk|topk)\b/, Name::Function
      end

      state :filter_matching_operators do
        rule /!(=|~)|=~?/, Operator
      end

      state :inline_whitespace do
        rule /[ \t\r]+/, Text
      end

      state :whitespace do
        mixin :inline_whitespace
        rule /\n\s*/m, Text
        rule /#.*?$/, Comment
      end
    end
  end
end

