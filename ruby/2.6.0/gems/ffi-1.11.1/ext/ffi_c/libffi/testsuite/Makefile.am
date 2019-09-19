## Process this file with automake to produce Makefile.in.

AUTOMAKE_OPTIONS = foreign dejagnu

EXTRA_DEJAGNU_SITE_CONFIG=../local.exp

CLEANFILES = *.exe core* *.log *.sum

EXTRA_DIST = lib/target-libpath.exp lib/libffi.exp lib/wrapper.exp	\
libffi.call/strlen4.c libffi.call/cls_multi_sshort.c			\
libffi.call/cls_align_longdouble_split2.c libffi.call/cls_1_1byte.c	\
libffi.call/struct10.c libffi.call/cls_uint_va.c			\
libffi.call/many_mixed.c libffi.call/float.c libffi.call/struct5.c	\
libffi.call/return_fl3.c libffi.call/cls_3_1byte.c			\
libffi.call/return_fl1.c libffi.call/cls_many_mixed_args.c		\
libffi.call/cls_20byte1.c libffi.call/cls_pointer_stack.c		\
libffi.call/cls_align_float.c libffi.call/call.exp			\
libffi.call/pyobjc-tc.c libffi.call/float_va.c				\
libffi.call/cls_5_1_byte.c libffi.call/cls_9byte1.c			\
libffi.call/cls_align_uint32.c libffi.call/stret_medium.c		\
libffi.call/cls_3byte1.c libffi.call/cls_align_uint64.c			\
libffi.call/cls_longdouble_va.c libffi.call/cls_align_pointer.c		\
libffi.call/cls_19byte.c libffi.call/cls_ushort.c			\
libffi.call/cls_align_sint32.c libffi.call/struct8.c			\
libffi.call/pr1172638.c libffi.call/cls_ulonglong.c			\
libffi.call/cls_struct_va1.c libffi.call/cls_9byte2.c			\
libffi.call/closure_fn5.c libffi.call/cls_5byte.c			\
libffi.call/cls_3float.c libffi.call/return_sc.c			\
libffi.call/cls_schar.c libffi.call/closure_fn4.c			\
libffi.call/cls_uchar_va.c libffi.call/closure_fn0.c			\
libffi.call/huge_struct.c libffi.call/va_struct1.c			\
libffi.call/cls_ushort_va.c libffi.call/struct9.c libffi.call/va_1.c	\
libffi.call/cls_64byte.c libffi.call/va_struct2.c			\
libffi.call/cls_longdouble.c libffi.call/return_fl2.c			\
libffi.call/cls_ulong_va.c libffi.call/cls_6_1_byte.c			\
libffi.call/cls_align_uint16.c libffi.call/closure_fn2.c		\
libffi.call/align_mixed.c libffi.call/unwindtest_ffi_call.cc		\
libffi.call/cls_multi_ushortchar.c libffi.call/cls_8byte.c		\
libffi.call/ffitest.h libffi.call/nested_struct8.c			\
libffi.call/cls_pointer.c libffi.call/nested_struct2.c			\
libffi.call/nested_struct.c libffi.call/struct4.c			\
libffi.call/cls_multi_schar.c libffi.call/cls_align_longdouble_split.c	\
libffi.call/cls_uchar.c libffi.call/return_ldl.c			\
libffi.call/nested_struct9.c libffi.call/cls_float.c			\
libffi.call/stret_medium2.c libffi.call/closure_loc_fn0.c		\
libffi.call/float3.c libffi.call/cls_6byte.c libffi.call/return_sl.c	\
libffi.call/closure_simple.c libffi.call/return_dbl1.c			\
libffi.call/cls_align_double.c libffi.call/cls_multi_uchar.c		\
libffi.call/err_bad_typedef.c libffi.call/cls_4_1byte.c			\
libffi.call/closure_fn3.c libffi.call/return_ll1.c			\
libffi.call/return_dbl2.c libffi.call/cls_align_sint64.c		\
libffi.call/nested_struct1.c libffi.call/negint.c			\
libffi.call/nested_struct3.c libffi.call/unwindtest.cc			\
libffi.call/struct2.c libffi.call/struct3.c libffi.call/return_fl.c	\
libffi.call/nested_struct5.c libffi.call/cls_multi_ushort.c		\
libffi.call/nested_struct11.c libffi.call/cls_multi_sshortchar.c	\
libffi.call/cls_align_longdouble.c libffi.call/cls_dbls_struct.c	\
libffi.call/cls_many_mixed_float_double.c libffi.call/stret_large.c	\
libffi.call/stret_large2.c libffi.call/cls_align_sint16.c		\
libffi.call/cls_2byte.c libffi.call/offsets.c libffi.call/struct7.c	\
libffi.call/nested_struct4.c libffi.call/problem1.c			\
libffi.call/va_struct3.c libffi.call/testclosure.c			\
libffi.call/float1.c libffi.call/nested_struct6.c			\
libffi.call/cls_4byte.c libffi.call/cls_24byte.c			\
libffi.call/uninitialized.c libffi.call/many2.c				\
libffi.call/nested_struct10.c libffi.call/struct6.c			\
libffi.call/strlen2.c libffi.call/float2.c libffi.call/cls_uint.c	\
libffi.call/cls_12byte.c libffi.call/return_ul.c			\
libffi.call/cls_sint.c libffi.call/cls_7_1_byte.c			\
libffi.call/struct1.c libffi.call/cls_sshort.c				\
libffi.call/cls_16byte.c libffi.call/strlen3.c				\
libffi.call/nested_struct7.c libffi.call/cls_double_va.c		\
libffi.call/return_dbl.c libffi.call/cls_3byte2.c libffi.call/float4.c	\
libffi.call/cls_double.c libffi.call/many.c libffi.call/cls_7byte.c	\
libffi.call/strlen.c libffi.call/closure_fn6.c libffi.call/return_uc.c	\
libffi.call/closure_fn1.c libffi.call/cls_20byte.c			\
libffi.call/cls_18byte.c libffi.call/err_bad_abi.c			\
libffi.call/many_double.c libffi.call/return_ll.c			\
libffi.call/promotion.c libffi.complex/complex_defs_longdouble.inc	\
libffi.complex/cls_align_complex_float.c				\
libffi.complex/cls_complex_va_float.c					\
libffi.complex/cls_complex_struct_float.c				\
libffi.complex/return_complex2_longdouble.c				\
libffi.complex/cls_complex_float.c					\
libffi.complex/return_complex_longdouble.c				\
libffi.complex/return_complex2_float.c libffi.complex/cls_complex.inc	\
libffi.complex/cls_complex_va_longdouble.c				\
libffi.complex/return_complex_double.c					\
libffi.complex/return_complex.inc libffi.complex/many_complex.inc	\
libffi.complex/complex_float.c libffi.complex/cls_align_complex.inc	\
libffi.complex/return_complex2_double.c					\
libffi.complex/many_complex_float.c libffi.complex/ffitest.h		\
libffi.complex/return_complex1_double.c					\
libffi.complex/cls_complex_struct_longdouble.c				\
libffi.complex/complex_defs_double.inc					\
libffi.complex/cls_complex_va_double.c					\
libffi.complex/many_complex_double.c					\
libffi.complex/return_complex2.inc					\
libffi.complex/return_complex1_float.c					\
libffi.complex/complex_longdouble.c					\
libffi.complex/complex_defs_float.inc					\
libffi.complex/cls_complex_double.c					\
libffi.complex/cls_align_complex_double.c				\
libffi.complex/cls_align_complex_longdouble.c				\
libffi.complex/complex_double.c libffi.complex/cls_complex_va.inc	\
libffi.complex/many_complex_longdouble.c libffi.complex/complex.inc	\
libffi.complex/return_complex1_longdouble.c				\
libffi.complex/complex_int.c libffi.complex/cls_complex_longdouble.c	\
libffi.complex/cls_complex_struct_double.c				\
libffi.complex/return_complex1.inc libffi.complex/complex.exp		\
libffi.complex/cls_complex_struct.inc					\
libffi.complex/return_complex_float.c libffi.go/closure1.c		\
libffi.go/aa-direct.c libffi.go/ffitest.h libffi.go/go.exp		\
libffi.go/static-chain.h libffi.bhaible/bhaible.exp			\
libffi.bhaible/test-call.c libffi.bhaible/alignof.h			\
libffi.bhaible/testcases.c libffi.bhaible/test-callback.c		\
libffi.bhaible/Makefile libffi.bhaible/README config/default.exp  
