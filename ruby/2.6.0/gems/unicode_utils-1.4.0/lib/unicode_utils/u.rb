# -*- encoding: utf-8 -*-

require "unicode_utils"

# Shortcut for usage in irb. This shortcut is only defined when
# <tt>unicode_utils/u</tt> is explicitly required. It is intended for
# interactive use only!
#
#   $ irb -r unicode_utils/u
#   irb(main):001:0> U.grep(/angstrom/)
#   => [#<U+212B "Å" ANGSTROM SIGN utf8:e2,84,ab>]
U = UnicodeUtils
