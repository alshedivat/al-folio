
# Machine code for function _Z1fPdi: NoPHIs, TracksLiveness, NoVRegs
Constant Pool:
  cp#0: 1.000000e+00, align=8
Function Live Ins: $rdi, $esi

bb.0 (%ir-block.2):
  successors: %bb.3(0x50000000), %bb.1(0x30000000); %bb.3(62.50%), %bb.1(37.50%)
  liveins: $esi, $rdi
  TEST32rr renamable $esi, renamable $esi, implicit-def $eflags
  JLE_1 %bb.1, implicit $eflags

bb.3 (%ir-block.4):
; predecessors: %bb.0
  successors: %bb.4(0x80000000); %bb.4(100.00%)
  liveins: $esi, $rdi
  renamable $eax = MOV32rr killed renamable $esi, implicit-def $rax
  renamable $xmm0 = MOVSDrm $rip, 1, $noreg, %const.0, $noreg :: (load 8 from constant-pool)
  renamable $ecx = XOR32rr undef $ecx(tied-def 0), undef $ecx, implicit-def dead $eflags, implicit-def $rcx

bb.4 (%ir-block.8, align 4):
; predecessors: %bb.3, %bb.4
  successors: %bb.2(0x04000000), %bb.4(0x7c000000); %bb.2(3.12%), %bb.4(96.88%)
  liveins: $rax, $rcx, $rdi, $xmm0
  renamable $xmm0 = ADDSDrm killed renamable $xmm0(tied-def 0), renamable $rdi, 8, renamable $rcx, 0, $noreg :: (load 8 from %ir.scevgep, !tbaa !2)
  renamable $rcx = nuw nsw ADD64ri8 killed renamable $rcx(tied-def 0), 1, implicit-def dead $eflags
  CMP64rr renamable $rax, renamable $rcx, implicit-def $eflags
  JNE_1 %bb.4, implicit $eflags

bb.2 (%ir-block.6):
; predecessors: %bb.4
  liveins: $xmm0
  RETQ $xmm0

bb.1:
; predecessors: %bb.0

  renamable $xmm0 = MOVSDrm $rip, 1, $noreg, %const.0, $noreg :: (load 8 from constant-pool)
  RETQ $xmm0

# End machine code for function _Z1fPdi.
