module Liquid
  class BlockBody
    def render_node_with_profiling(node, context)
      Profiler.profile_node_render(node) do
        render_node_without_profiling(node, context)
      end
    end

    alias_method :render_node_without_profiling, :render_node
    alias_method :render_node, :render_node_with_profiling
  end

  class Include < Tag
    def render_with_profiling(context)
      Profiler.profile_children(context.evaluate(@template_name_expr).to_s) do
        render_without_profiling(context)
      end
    end

    alias_method :render_without_profiling, :render
    alias_method :render, :render_with_profiling
  end
end
