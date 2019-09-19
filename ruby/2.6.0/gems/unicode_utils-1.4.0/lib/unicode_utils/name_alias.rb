# -*- encoding: utf-8 -*-

module UnicodeUtils

  # See: UnicodeUtils.name_aliases
  class NameAlias

    # The alias as string.
    attr_reader :name

    # The type of alias as symbol. Currently one of :correction,
    # :control, :alternate, :figment, :abbreviation.
    attr_reader :type

    # Do not construct directly. Use UnicodeUtils.name_aliases.
    def initialize(name, type)
      @name = name
      @type = type
    end

    # Returns a descriptive string. The format may change even in minor
    # releases.
    def inspect
      "#<UnicodeUtils::NameAlias #{name} #{type.inspect}>"
    end

    # Returns name.
    def to_s
      name
    end

    def ==(other)
      other.kind_of?(NameAlias) && other.type == type && other.name == name
    end

    def eql?(other)
      self == other
    end

    def hash
      name.hash
    end

  end

end
