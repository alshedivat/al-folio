#!/bin/bash

# BibTeX Tidy script with EVL-specific formatting options
# Based on: https://flamingtempura.github.io/bibtex-tidy/

# Check if file argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: ./tidyBib.sh <file.bib>"
    echo "Example: ./tidyBib.sh evl.bib"
    exit 1
fi

INPUT_FILE="$1"

# Run bibtex-tidy with all configured options
bibtex-tidy "$INPUT_FILE" \
    --modify \
    --omit=selected \
    --curly \
    --numeric \
    --space=2 \
    --tab \
    --align=13 \
    --blank-lines \
    --sort=-year \
    --duplicates=doi,citation \
    --drop-all-caps \
    --no-escape \
    --sort-fields=title,shorttitle,author,year,month,day,journal,booktitle,location,on,publisher,address,series,volume,number,pages,doi,isbn,issn,url,urldate,copyright,category,note,metadata \
    --trailing-commas \
    --tidy-comments \
    --remove-empty-fields \
    --remove-dupe-fields

echo "Tidied: $INPUT_FILE"
