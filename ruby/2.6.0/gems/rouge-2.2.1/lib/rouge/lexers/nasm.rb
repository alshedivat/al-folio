# -*- coding: utf-8 -*- #

module Rouge
  module Lexers
    class Nasm < RegexLexer
      tag 'nasm'
      filenames '*.asm'
      #mimetypes 'text/x-chdr', 'text/x-csrc'

      title "Nasm"
      desc "Netwide Assembler"

      ws = %r((?:\s|;.*?\n/)+)
      id = /[a-zA-Z_][a-zA-Z0-9_]*/

      #todo: pull more instructions from: http://www.nasm.us/doc/nasmdocb.html
      #so far, we have sections 1.1 and 1.2

      def self.keywords
        @keywords ||= Set.new %w(
           aaa aad aam aas adc add and arpl bb0_reset bb1_reset bound bsf bsr bswap bt btc btr bts
           call cbw cdq cdqe clc cld cli clts cmc cmp cmpsb cmpsd cmpsq cmpsw cmpxchg
           cmpxchg16b cmpxchg486 cmpxchg8b cpuid cpu_read cpu_write cqo cwd cwde daa das dec div
           dmint emms enter equ f2xm1 fabs fadd faddp fbld fbstp fchs fclex fcmovb fcmovbe fcmove
           fcmovnb fcmovnbe fcmovne fcmovnu fcmovu fcom fcomi fcomip fcomp fcompp fcos fdecstp
           fdisi fdiv fdivp fdivr fdivrp femms feni ffree ffreep fiadd ficom ficomp fidiv fidivr
           fild fimul fincstp finit fist fistp fisttp fisub fisubr fld fld1 fldcw fldenv fldl2e
           fldl2t fldlg2 fldln2 fldpi fldz fmul fmulp fnclex fndisi fneni fninit fnop fnsave fnstcw
           fnstenv fnstsw fpatan fprem fprem1 fptan frndint frstor fsave fscale fsetpm fsin fsincos
           fsqrt fst fstcw fstenv fstp fstsw fsub fsubp fsubr fsubrp ftst fucom fucomi fucomip
           fucomp fucompp fwait fxam fxch fxtract fyl2x fyl2xp1 hlt ibts icebp idiv imul in inc
           incbin insb insd insw int int01 int03 int1 int3 into invd invlpg invlpga invpcid iret
           iretd iretq iretw jcxz jecxz jmp jmpe jrcxz lahf lar lds lea leave les lfence lfs
           lgdt lgs lidt lldt lmsw loadall loadall286 lodsb lodsd lodsq lodsw loop loope loopne
           loopnz loopz lsl lss ltr mfence monitor monitorx mov movd movq movsb movsd movsq movsw
           movsx movsxd movzx mul mwait mwaitx neg nop not or out outsb outsd outsw packssdw
           packsswb packuswb paddb paddd paddsb paddsiw paddsw paddusb paddusw paddw pand pandn
           pause paveb pavgusb pcmpeqb pcmpeqd pcmpeqw pcmpgtb pcmpgtd pcmpgtw pdistib pf2id pfacc
           pfadd pfcmpeq pfcmpge pfcmpgt pfmax pfmin pfmul pfrcp pfrcpit1 pfrcpit2 pfrsqit1 pfrsqrt
           pfsub pfsubr pi2fd pmachriw pmaddwd pmagw pmulhriw pmulhrwa pmulhrwc pmulhw pmullw
           pmvgezb pmvlzb pmvnzb pmvzb pop popa popad popaw popf popfd popfq popfw por prefetch
           prefetchw pslld psllq psllw psrad psraw psrld psrlq psrlw psubb psubd psubsb psubsiw
           psubsw psubusb psubusw psubw punpckhbw punpckhdq punpckhwd punpcklbw punpckldq punpcklwd
           push pusha pushad pushaw pushf pushfd pushfq pushfw pxor rcl rcr rdm rdmsr rdpmc rdshr
           rdtsc rdtscp ret retf retn rol ror rsdc rsldt rsm rsts sahf sal salc sar sbb scasb scasd
           scasq scasw sfence sgdt shl shld shr shrd sidt skinit sldt smi smint smintold smsw
           stc std sti stosb stosd stosq stosw str sub svdc svldt svts swapgs syscall sysenter
           sysexit sysret test ud0 ud1 ud2 ud2a ud2b umov verr verw wbinvd wrmsr wrshr xadd xbts
           xchg xlat xlatb xor

           cmova cmovae cmovb cmovbe cmovc cmove cmovg cmovge cmovl cmovle cmovna cmovnae cmovnb cmovnbe cmovnc cmovne cmovng cmovnge cmovnl cmovnle cmovno cmovnp cmovns cmovnz cmovo cmovp cmovpe cmovpo cmovs cmovz

           ja jae jb jbe jc jcxz jecxz je jg jge jl jle jna jnae jnb jnbe jnc jne jng jnge jnl jnle jno jnp jns jnz jo jp jpe jpo js jz

           seta setae setb setbe setc sete setg setge setl setle setna setnae setnb setnbe setnc setne setng setnge setnl setnle setno setnp setns setnz seto setp setpe setpo sets setz

           AAA AAD AAM AAS ADC ADD AND ARPL BB0_RESET BB1_RESET BOUND BSF BSR BSWAP BT BTC BTR BTS
           CALL CBW CDQ CDQE CLC CLD CLI CLTS CMC  CMP CMPSB CMPSD CMPSQ CMPSW CMPXCHG
           CMPXCHG16B CMPXCHG486 CMPXCHG8B CPUID CPU_READ CPU_WRITE CQO CWD CWDE DAA DAS DEC DIV
           DMINT EMMS ENTER EQU F2XM1 FABS FADD FADDP FBLD FBSTP FCHS FCLEX FCMOVB FCMOVBE FCMOVE
           FCMOVNB FCMOVNBE FCMOVNE FCMOVNU FCMOVU FCOM FCOMI FCOMIP FCOMP FCOMPP FCOS FDECSTP
           FDISI FDIV FDIVP FDIVR FDIVRP FEMMS FENI FFREE FFREEP FIADD FICOM FICOMP FIDIV FIDIVR
           FILD FIMUL FINCSTP FINIT FIST FISTP FISTTP FISUB FISUBR FLD FLD1 FLDCW FLDENV FLDL2E
           FLDL2T FLDLG2 FLDLN2 FLDPI FLDZ FMUL FMULP FNCLEX FNDISI FNENI FNINIT FNOP FNSAVE FNSTCW
           FNSTENV FNSTSW FPATAN FPREM FPREM1 FPTAN FRNDINT FRSTOR FSAVE FSCALE FSETPM FSIN FSINCOS
           FSQRT FST FSTCW FSTENV FSTP FSTSW FSUB FSUBP FSUBR FSUBRP FTST FUCOM FUCOMI FUCOMIP
           FUCOMP FUCOMPP FWAIT FXAM FXCH FXTRACT FYL2X FYL2XP1 HLT IBTS ICEBP IDIV IMUL IN INC
           INCBIN INSB INSD INSW INT INT01 INT03 INT1 INT3 INTO INVD INVLPG INVLPGA INVPCID IRET
           IRETD IRETQ IRETW JCXZ JECXZ JMP JMPE JRCXZ LAHF LAR LDS LEA LEAVE LES LFENCE LFS
           LGDT LGS LIDT LLDT LMSW LOADALL LOADALL286 LODSB LODSD LODSQ LODSW LOOP LOOPE LOOPNE
           LOOPNZ LOOPZ LSL LSS LTR MFENCE MONITOR MONITORX MOV MOVD MOVQ MOVSB MOVSD MOVSQ MOVSW
           MOVSX MOVSXD MOVZX MUL MWAIT MWAITX NEG NOP NOT OR OUT OUTSB OUTSD OUTSW PACKSSDW
           PACKSSWB PACKUSWB PADDB PADDD PADDSB PADDSIW PADDSW PADDUSB PADDUSW PADDW PAND PANDN
           PAUSE PAVEB PAVGUSB PCMPEQB PCMPEQD PCMPEQW PCMPGTB PCMPGTD PCMPGTW PDISTIB PF2ID PFACC
           PFADD PFCMPEQ PFCMPGE PFCMPGT PFMAX PFMIN PFMUL PFRCP PFRCPIT1 PFRCPIT2 PFRSQIT1 PFRSQRT
           PFSUB PFSUBR PI2FD PMACHRIW PMADDWD PMAGW PMULHRIW PMULHRWA PMULHRWC PMULHW PMULLW
           PMVGEZB PMVLZB PMVNZB PMVZB POP POPA POPAD POPAW POPF POPFD POPFQ POPFW POR PREFETCH
           PREFETCHW PSLLD PSLLQ PSLLW PSRAD PSRAW PSRLD PSRLQ PSRLW PSUBB PSUBD PSUBSB PSUBSIW
           PSUBSW PSUBUSB PSUBUSW PSUBW PUNPCKHBW PUNPCKHDQ PUNPCKHWD PUNPCKLBW PUNPCKLDQ PUNPCKLWD
           PUSH PUSHA PUSHAD PUSHAW PUSHF PUSHFD PUSHFQ PUSHFW PXOR RCL RCR RDM RDMSR RDPMC RDSHR
           RDTSC RDTSCP RET RETF RETN ROL ROR RSDC RSLDT RSM RSTS SAHF SAL SALC SAR SBB SCASB SCASD
           SCASQ SCASW  SFENCE SGDT SHL SHLD SHR SHRD SIDT SKINIT SLDT SMI SMINT SMINTOLD SMSW
           STC STD STI STOSB STOSD STOSQ STOSW STR SUB SVDC SVLDT SVTS SWAPGS SYSCALL SYSENTER
           SYSEXIT SYSRET TEST UD0 UD1 UD2 UD2A UD2B UMOV VERR VERW WBINVD WRMSR WRSHR XADD XBTS
           XCHG XLAT XLATB XOR

           CMOVA CMOVAE CMOVB CMOVBE CMOVC CMOVE CMOVG CMOVGE CMOVL CMOVLE CMOVNA CMOVNAE CMOVNB CMOVNBE CMOVNC CMOVNE CMOVNG CMOVNGE CMOVNL CMOVNLE CMOVNO CMOVNP CMOVNS CMOVNZ CMOVO CMOVP CMOVPE CMOVPO CMOVS CMOVZ

           JA JAE JB JBE JC JCXZ JECXZ JE JG JGE JL JLE JNA JNAE JNB JNBE JNC JNE JNG JNGE JNL JNLE JNO JNP JNS JNZ JO JP JPE JPO JS JZ

           SETA SETAE SETB SETBE SETC SETE SETG SETGE SETL SETLE SETNA SETNAE SETNB SETNBE SETNC SETNE SETNG SETNGE SETNL SETNLE SETNO SETNP SETNS SETNZ SETO SETP SETPE SETPO SETS SETZ
        )
      end

      def self.keywords_type
        @keywords_type ||= Set.new %w(
          DB DW DD DQ DT DO DY DZ RESB RESW RESD RESQ REST RESO RESY RESZ
          db dq dd dq dt do dy dz resb resw resd resq rest reso resy resz
        )
      end

      def self.reserved
        @reserved ||= Set.new %w(
          global extern macro endmacro assign rep endrep section
          GLOBAL EXTERN MACRO ENDMACRO ASSIGN REP ENDREP SECTION
        )
      end

      # high priority for filename matches
      def self.analyze_text(*)
        0.3
      end

      def self.builtins
        @builtins ||= []
      end

      start { push :expr_bol }

      state :expr_bol do
        mixin :inline_whitespace
        rule(//) { pop! }
      end

      state :inline_whitespace do
        rule /[ \t\r]+/, Text
      end

      state :whitespace do
        rule /\n+/m, Text, :expr_bol
        rule %r(//(\\.|.)*?\n), Comment::Single, :expr_bol
        mixin :inline_whitespace
      end

      state :expr_whitespace do
        rule /\n+/m, Text, :expr_bol
        mixin :whitespace
      end

      state :root do
        mixin :expr_whitespace
        rule(//) { push :statement }
        rule /^%[a-zA-Z0-9]+/, Comment::Preproc, :statement

        rule(
          %r(&=|[*]=|/=|\\=|\^=|\+=|-=|<<=|>>=|<<|>>|:=|<=|>=|<>|[-&*/\\^+=<>.]),
          Operator
        )
        rule /;.*/, Comment, :statement
        rule /^[a-zA-Z]+[a-zA-Z0-9]*:/, Name::Function
        rule /;.*/, Comment
      end

      state :statement do
        mixin :expr_whitespace
        mixin :statements
        rule /;.*/, Comment
        rule /^%[a-zA-Z0-9]+/, Comment::Preproc
        rule /[a-zA-Z]+%[0-9]+:/, Name::Function
      end

      state :statements do
        mixin :whitespace
        rule /L?"/, Str, :string
        rule /[a-zA-Z]+%[0-9]+:/, Name::Function  #labels/subroutines/functions
        rule %r(L?'(\\.|\\[0-7]{1,3}|\\x[a-f0-9]{1,2}|[^\\'\n])')i, Str::Char
        rule /0x[0-9a-f]+[lu]*/i, Num::Hex
        rule /\d+[lu]*/i, Num::Integer
        rule %r(\*/), Error
        rule %r([~&*+=\|?:<>/-]), Operator
        rule /[(),.]/, Punctuation
        rule /\[[a-zA-Z0-9]*\]/, Punctuation
        rule /%[0-9]+/, Keyword::Reserved
        rule /[a-zA-Z]+%[0-9]+/, Name::Function  #labels/subroutines/functions

        #rule /(?<!\.)#{id}/ do |m|
        rule id do |m|
          name = m[0]

          if self.class.keywords.include? name
            token Keyword
          elsif self.class.keywords_type.include? name
            token Keyword::Type
          elsif self.class.reserved.include? name
            token Keyword::Reserved
          elsif self.class.builtins.include? name
            token Name::Builtin
          else
            token Name
          end
        end
      end

      state :string do
        rule /"/, Str, :pop!
        rule /\\([\\abfnrtv"']|x[a-fA-F0-9]{2,4}|[0-7]{1,3})/, Str::Escape
        rule /[^\\"\n]+/, Str
        rule /\\\n/, Str
        rule /\\/, Str # stray backslash
      end
    end
  end
end
