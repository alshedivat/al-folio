# -*- encoding: utf-8 -*-

module UnicodeUtils

  # Corresponds to the unicode_utils gem version.
  #
  # Conforms to Semantic Versioning as documented at semver.org.
  #
  # Summary:
  # MAJOR.MINOR.PATCHLEVEL
  # - A backwards incompatible change causes a change in MAJOR
  # - New features or non-bugfix improvals cause a change in MINOR
  # - Bugfixes increase only PATCHLEVEL.
  # - Pre-release versions append more info after a dash.
  VERSION = "1.4.0"

  # The version of Unicode implemented by this version of UnicodeUtils.
  #
  #   require "unicode_utils/version"
  #   puts "Unicode #{UnicodeUtils::UNICODE_VERSION}"
  UNICODE_VERSION = "6.2.0"

end
