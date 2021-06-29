	.text
	.file	"machine_pass_sum.cpp"
	.section	.rodata.cst8,"aM",@progbits,8
	.p2align	3               # -- Begin function _Z1fPdi
.LCPI0_0:
	.quad	4607182418800017408     # double 1
	.text
	.globl	_Z1fPdi
	.p2align	4, 0x90
	.type	_Z1fPdi,@function
_Z1fPdi:                                # @_Z1fPdi
	.cfi_startproc
# %bb.0:
	testl	%esi, %esi
	jle	.LBB0_1
# %bb.3:
	movl	%esi, %eax
	movsd	.LCPI0_0(%rip), %xmm0   # xmm0 = mem[0],zero
	xorl	%ecx, %ecx
	.p2align	4, 0x90
.LBB0_4:                                # =>This Inner Loop Header: Depth=1
	addsd	(%rdi,%rcx,8), %xmm0
	addq	$1, %rcx
	cmpq	%rcx, %rax
	jne	.LBB0_4
# %bb.2:
	retq
.LBB0_1:
	movsd	.LCPI0_0(%rip), %xmm0   # xmm0 = mem[0],zero
	retq
.Lfunc_end0:
	.size	_Z1fPdi, .Lfunc_end0-_Z1fPdi
	.cfi_endproc
                                        # -- End function

	.ident	"clang version 8.0.0 (git@github.com:llvm-mirror/clang.git cde569a8760722ce854b7055247562954fe55d39) (git@github.com:llvm-mirror/LLVM.git ad1103ee8b81977cdf168a3d0a86f62d100a9183)"
	.section	".note.GNU-stack","",@progbits
