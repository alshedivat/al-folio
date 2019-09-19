# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class LLVM < RegexLexer
      title "LLVM"
      desc 'The LLVM Compiler Infrastructure (http://llvm.org/)'
      tag 'llvm'

      filenames '*.ll'
      mimetypes 'text/x-llvm'

      def self.analyze_text(text)
        return 0.1 if text =~ /\A%\w+\s=\s/
      end

      string = /"[^"]*?"/
      identifier = /([-a-zA-Z$._][-a-zA-Z$._0-9]*|#{string})/

      state :basic do
        rule /;.*?$/, Comment::Single
        rule /\s+/, Text

        rule /#{identifier}\s*:/, Name::Label

        rule /@(#{identifier}|\d+)/, Name::Variable::Global
        rule /(%|!)#{identifier}/, Name::Variable
        rule /(%|!)\d+/, Name::Variable

        rule /c?#{string}/, Str

        rule /0[xX][a-fA-F0-9]+/, Num
        rule /-?\d+(?:[.]\d+)?(?:[eE][-+]?\d+(?:[.]\d+)?)?/, Num

        rule /[=<>{}\[\]()*.,!]|x/, Punctuation
      end

      builtin_types = %w(
        void float double half x86_fp80 x86mmx fp128 ppc_fp128 label metadata
      )

      state :types do
        rule /i[1-9]\d*/, Keyword::Type
        rule /#{builtin_types.join('|')}/, Keyword::Type
      end

      builtin_keywords = %w(
        begin end true false declare define global constant personality private
        landingpad linker_private internal available_externally linkonce_odr
        linkonce weak weak_odr appending dllimport dllexport common default
        hidden protected extern_weak external thread_local zeroinitializer
        undef null to tail target triple datalayout volatile nuw nsw nnan ninf
        nsz arcp fast exact inbounds align addrspace section alias module asm
        sideeffect gc dbg ccc fastcc coldcc x86_stdcallcc x86_fastcallcc
        arm_apcscc arm_aapcscc arm_aapcs_vfpcc ptx_device ptx_kernel cc
        c signext zeroext inreg sret nounwind noreturn noalias nocapture byval
        nest readnone readonly inlinehint noinline alwaysinline optsize ssp
        sspreq noredzone noimplicitfloat naked type opaque eq ne slt sgt sle
        sge ult ugt ule uge oeq one olt ogt ole oge ord uno unnamed_addr ueq
        une uwtable x
      )

      builtin_instructions = %w(
        add fadd sub fsub mul fmul udiv sdiv fdiv urem srem frem shl lshr ashr
        and or xor icmp fcmp phi call catch trunc zext sext fptrunc fpext
        uitofp sitofp fptoui fptosi inttoptr ptrtoint bitcast select va_arg ret
        br switch invoke unwind unreachable malloc alloca free load store
        getelementptr extractelement insertelement shufflevector getresult
        extractvalue insertvalue cleanup resume
      )

      state :keywords do
        rule /#{builtin_instructions.join('|')}/, Keyword
        rule /#{builtin_keywords.join('|')}/, Keyword
      end

      state :root do
        mixin :basic
        mixin :keywords
        mixin :types
      end
    end
  end
end
