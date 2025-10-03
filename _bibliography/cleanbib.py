#!/usr/bin/env python3
import argparse
import os
import re

# Mapping for month abbreviations to their full names.
MONTH_MAPPING = {
    'jan': 'January',
    'january': 'January',
    'feb': 'February',
    'february': 'February',
    'mar': 'March',
    'march': 'March',
    'apr': 'April',
    'april': 'April',
    'may': 'May',
    'jun': 'June',
    'june': 'June',
    'jul': 'July',
    'july': 'July',
    'aug': 'August',
    'august': 'August',
    'sep': 'September',
    'september': 'September',
    'oct': 'October',
    'october': 'October',
    'nov': 'November',
    'november': 'November',
    'dec': 'December',
    'december': 'December'
}

def clean_bib_file(input_file):
    """
    Reads the input BibTeX file line-by-line, performs two tasks:
      1. Removes any lines defining a field with an empty value (e.g. "editor = {}").
      2. Processes month field lines: if the month value is an abbreviated word
         (and not numeric), it is replaced with the full month name.
    The cleaned lines are written to a new file named <original_file>-updated.bib.
    """
    # Regex for an empty field line.
    empty_field_pattern = re.compile(r'^\s*[\w\-]+\s*=\s*\{\s*\}\s*,?\s*$')
    
    # Regex to capture the month field.
    # It will match a line beginning with "month", then "=", then optionally "{", then capture a complete word,
    # then optionally "}" and optional trailing comma and whitespace.
    # This handles both "month = apr," and "month = {apr}," formats
    # Word boundaries ensure we only match complete month names, not substrings
    month_field_pattern = re.compile(r'^(\s*month\s*=\s*)(\{?)(\b[a-zA-Z]+\b)(\}?)(\s*,?\s*)$', re.IGNORECASE)

    with open(input_file, "r", encoding="utf-8") as f:
        lines = f.readlines()

    cleaned_lines = []
    for line in lines:
        # First, if the line matches an empty field, skip it.
        if empty_field_pattern.match(line):
            continue

        # Next, if it is a month field, try to process it.
        m = month_field_pattern.match(line)
        if m:
            prefix, open_brace, month_val, close_brace, suffix = m.groups()
            # Remove extra whitespace from the month value.
            month_val_clean = month_val.strip()
            # If the month value is purely numeric, leave it as is.
            if month_val_clean.isdigit():
                cleaned_lines.append(line)
            else:
                # Check if it is an abbreviated month; if found, replace it.
                lower_val = month_val_clean.lower()
                if lower_val in MONTH_MAPPING and lower_val != MONTH_MAPPING[lower_val].lower():
                    new_month = MONTH_MAPPING[lower_val]
                    # Build the new line with the full month name, preserving brace style.
                    new_line = prefix + open_brace + new_month + close_brace + suffix
                    cleaned_lines.append(new_line)
                else:
                    cleaned_lines.append(line)
        else:
            # All other lines are left unchanged.
            cleaned_lines.append(line)

    # Build the new file name: original basename with "-updated" appended before the extension.
    base, ext = os.path.splitext(input_file)
    output_file = base + "-updated.bib"

    with open(output_file, "w", encoding="utf-8") as f:
        f.writelines(cleaned_lines)

    print(f"Updated file created: {output_file}")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description="Clean a BibTeX file by removing fields with empty values and process month fields while preserving formatting."
    )
    parser.add_argument("bibtex_file", help="Path to the BibTeX file to clean")
    args = parser.parse_args()
    clean_bib_file(args.bibtex_file)