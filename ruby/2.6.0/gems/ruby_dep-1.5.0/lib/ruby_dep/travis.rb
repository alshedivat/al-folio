require 'yaml'

require 'ruby_dep/travis/ruby_version'

module RubyDep
  class Travis
    def version_constraint(filename = '.travis.yml')
      yaml = YAML.load(IO.read(filename))
      versions = supported_versions(yaml)

      selected = versions_for_latest_major(versions)
      lowest = lowest_supported(selected)

      ["~> #{lowest[0..1].join('.')}", ">= #{lowest.join('.')}"]
    rescue RubyVersion::Error => ex
      abort("RubyDep Error: #{ex.message}")
    end

    private

    def versions_for_latest_major(versions)
      by_major = versions.map do |x|
        RubyVersion.new(x).segments[0..2]
      end.group_by(&:first)

      last_supported_major = by_major.keys.sort.last
      by_major[last_supported_major]
    end

    def lowest_supported(versions)
      selected = versions.sort.reverse!
      grouped_by_minor = selected.group_by { |x| x[1] }

      lowest_minor = lowest_minor_without_skipping(grouped_by_minor)
      grouped_by_minor[lowest_minor].sort.first
    end

    def failable(yaml)
      matrix = yaml.fetch('matrix', {})
      allowed = matrix.fetch('allow_failures', [])
      allowed.map(&:values).flatten
    end

    def supported_versions(yaml)
      yaml['rvm'] - failable(yaml)
    end

    def lowest_minor_without_skipping(grouped_by_minor)
      minors = grouped_by_minor.keys.flatten
      lowest = minors.shift
      current = lowest
      while (lower = minors.shift)
        (current -= 1) == lower ? lowest = lower : break
      end
      lowest
    end
  end
end
