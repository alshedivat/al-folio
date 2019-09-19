# -*- encoding: utf-8 -*-

require "unicode_utils/codepoint"

module UnicodeUtils

  # Get an array of all Codepoint instances in Codepoint::RANGE whose
  # name matches regexp. Matching is case insensitive.
  #
  #   require "unicode_utils/grep"
  #   UnicodeUtils.grep(/angstrom/) => [#<U+212B "Å" ANGSTROM SIGN utf8:e2,84,ab>]
  def grep(regexp)
    # TODO: enhance behaviour by searching aliases in NameAliases.txt
    unless regexp.casefold?
      regexp = Regexp.new(regexp.source, Regexp::IGNORECASE)
    end
    Codepoint::RANGE.select { |cp|
      regexp =~ UnicodeUtils.char_name(cp)
    }.map { |cp| Codepoint.new(cp) }
  end
  module_function :grep

end
