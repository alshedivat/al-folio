# -*- encoding: utf-8 -*-

require "unicode_utils/name_alias"
require "unicode_utils/read_cdata"

module UnicodeUtils

  NAME_ALIASES_MAP = Impl.read_name_aliases("name_aliases") # :nodoc:
  NAME_ALIASES_MAP.default = [].freeze

  # Get an Enumerable of formal name aliases of the given character. Returns an
  # empty Enumerable if the character doesn't have an alias.
  #
  # The aliases are instances of UnicodeUtils::NameAlias, the order of the
  # aliases in the returned Enumerable is preserved from NameAliases.txt in the
  # Unicode Character Database.
  #
  # Example:
  #
  #   require "unicode_utils/name_aliases"
  #   UnicodeUtils.name_aliases("\n").map(&:name) # => ["LINE FEED", "NEW LINE", "END OF LINE", "LF", "NL", "EOL"]
  #
  # See also: UnicodeUtils.char_name
  def name_aliases(char)
    NAME_ALIASES_MAP[char.ord]
  end
  module_function :name_aliases

end
