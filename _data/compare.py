#!/usr/bin/env python3
"""
compare_files.py

Loads <filename>.xlsx and <filename>.csv, compares rows, and reports row-level differences.
Usage:
    python compare_files.py <filename_without_extension>
"""
import pandas as pd
import sys
import os

def compare_files(filename):
    xlsx_path = f"{filename}.xlsx"
    csv_path = f"{filename}.csv"

    # Check file existence
    if not os.path.exists(xlsx_path):
        print(f"Error: {xlsx_path} not found.")
        return
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found.")
        return

    # Load files
    df_xlsx = pd.read_excel(xlsx_path)
    df_csv = pd.read_csv(csv_path)

    # Warn if different number of rows
    if len(df_xlsx) != len(df_csv):
        print(f"Warning: Number of rows differ (Excel: {len(df_xlsx)}, CSV: {len(df_csv)}). Comparing up to the first {min(len(df_xlsx), len(df_csv))} rows.")

    # Align columns
    all_columns = list(set(df_xlsx.columns) | set(df_csv.columns))
    df_xlsx = df_xlsx.reindex(columns=all_columns)
    df_csv = df_csv.reindex(columns=all_columns)

    n_rows = min(len(df_xlsx), len(df_csv))
    differences_found = False

    for i in range(n_rows):
        row_x = df_xlsx.iloc[i]
        row_c = df_csv.iloc[i]
        diff_cols = []
        for col in all_columns:
            val_x = row_x[col]
            val_c = row_c[col]
            # Treat NaN vs NaN as equal
            if pd.isna(val_x) and pd.isna(val_c):
                continue
            if val_x != val_c:
                diff_cols.append((col, val_x, val_c))

        if diff_cols:
            differences_found = True
            print(f"\nRow {i} differences:")
            for col, v_x, v_c in diff_cols:
                print(f"  Column '{col}': Excel={v_x!r} | CSV={v_c!r}")

    if not differences_found:
        print(f"No row-level differences found in the first {n_rows} rows.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python compare_files.py <filename_without_extension>")
        sys.exit(1)
    compare_files(sys.argv[1])
