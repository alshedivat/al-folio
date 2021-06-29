
; Function Attrs: norecurse nounwind readonly uwtable
define dso_local double @_Z1fPdi(double* nocapture readonly, i32) local_unnamed_addr {
  %3 = icmp sgt i32 %1, 0
  br i1 %3, label %4, label %6

; <label>:4:                                      ; preds = %2
  %5 = zext i32 %1 to i64
  br label %8

; <label>:6:                                      ; preds = %8, %2
  %7 = phi double [ 1.000000e+00, %2 ], [ %13, %8 ]
  ret double %7

; <label>:8:                                      ; preds = %8, %4
  %9 = phi i64 [ 0, %4 ], [ %14, %8 ]
  %10 = phi double [ 1.000000e+00, %4 ], [ %13, %8 ]
  %11 = getelementptr inbounds double, double* %0, i64 %9
  %12 = load double, double* %11, align 8
  %13 = fadd double %10, %12
  %14 = add nuw nsw i64 %9, 1
  %15 = icmp eq i64 %14, %5
  br i1 %15, label %6, label %8
}

