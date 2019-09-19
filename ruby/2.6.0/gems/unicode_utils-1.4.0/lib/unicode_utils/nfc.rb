# -*- encoding: utf-8 -*-

require "unicode_utils/read_cdata"
require "unicode_utils/canonical_decomposition"
require "unicode_utils/combining_class"

module UnicodeUtils
  
  module Impl # :nodoc:all
    
    COMPOSITION_EXCLUSION_SET =
      Impl.read_code_point_set("composition_exclusion_set")

    CANONICAL_COMPOSITION_MAP = Hash.new.tap do |m|
      CANONICAL_DECOMPOSITION_MAP.each_pair { |comp, decomp|
        if decomp.length == 2
          (m[decomp[0]] ||= {})[decomp[1]] = comp
        end
      }
    end

    module NFC

      # does b block c?
      def self.blocked?(b, c)
        # From the standard:
        # "If a combining character sequence is in canonical order,
        # then testing whether a character is blocked requires looking
        # at only the immediately preceding character."
        # cpary is in canonical order (since it comes out of
        # canonical_decomposition).
        COMBINING_CLASS_MAP[b] >= COMBINING_CLASS_MAP[c]
      end

      def self.primary_composite?(cp)
        unless CANONICAL_DECOMPOSITION_MAP[cp] ||
            # has hangul syllable decomposition?
            (cp >= 0xAC00 && cp <= 0xD7A3)
          return false
        end
        !COMPOSITION_EXCLUSION_SET.include?(cp)
      end

    end

    def self.composition(str)
      ### constants for hangul composition ###
      sbase = 0xAC00
      lbase = 0x1100
      vbase = 0x1161
      tbase = 0x11A7
      lcount = 19
      vcount = 21
      tcount = 28
      ncount = vcount * tcount
      scount = lcount * ncount
      ########################################

      String.new.force_encoding(str.encoding).tap do |res|
        last_starter = nil
        uncomposable_non_starters = []
        str.each_codepoint { |cp|
          if COMBINING_CLASS_MAP[cp] == 0 # starter?
            combined = false
            if last_starter && uncomposable_non_starters.empty?
              ### hangul ###
              lindex = last_starter - lbase
              if 0 <= lindex && lindex < lcount
                vindex = cp - vbase
                if 0 <= vindex && vindex <= vcount
                  last_starter =
                    sbase + (lindex * vcount + vindex) * tcount
                  combined = true
                end
              end
              unless combined
                sindex = last_starter - sbase
                if 0 <= sindex && sindex < scount && (sindex % tcount) == 0
                  tindex = cp - tbase
                  if 0 <= tindex && tindex < tcount
                    last_starter += tindex
                    combined = true
                  end
                end
              end
              ##############
              unless combined
                map = Impl::CANONICAL_COMPOSITION_MAP[last_starter]
                composition = map && map[cp]
                if composition && Impl::NFC.primary_composite?(composition)
                  last_starter = composition
                  combined = true
                end
              end
            end
            unless combined
              res << last_starter if last_starter
              uncomposable_non_starters.each { |nc| res << nc }
              uncomposable_non_starters.clear
              last_starter = cp
            end
          else
            last_non_starter = uncomposable_non_starters.last
            if last_non_starter && Impl::NFC.blocked?(last_non_starter, cp)
              uncomposable_non_starters << cp
            else
              map = Impl::CANONICAL_COMPOSITION_MAP[last_starter]
              composition = map && map[cp]
              if composition && Impl::NFC.primary_composite?(composition)
                last_starter = composition
              else
                uncomposable_non_starters << cp
              end
            end
          end
        }
        res << last_starter if last_starter
        uncomposable_non_starters.each { |nc| res << nc }
      end
    end

  end

  # Get +str+ in Normalization Form C.
  #
  # The Unicode standard has multiple representations for some
  # characters. One representation as a single code point and other
  # representation(s) as a combination of multiple code points. This
  # function "composes" these characters into the former
  # representation.
  #
  # Example:
  #
  #   require "unicode_utils/nfc"
  #   UnicodeUtils.nfc("La\u{308}mpchen") => "Lämpchen"
  def nfc(str)
    str = UnicodeUtils.canonical_decomposition(str)
    Impl.composition(str)
  end
  module_function :nfc

end
