#!/usr/bin/env python3
import sys

def ensure_trailing_comma(line):
    """Add a comma to the end of the line (before any newline) if it doesn't already have one."""
    if line.rstrip().endswith(','):
        return line
    # Add a comma before the newline (if any)
    if line.endswith('\n'):
        return line.rstrip('\n') + ',\n'
    else:
        return line + ','

def process_entry(entry_lines):
    """
    Inserts new fields into a BibTeX entry just before its final closing brace.
    
    It ensures that the preceding field has a trailing comma, and then
    inserts new lines for:
      altmetric    = {true},
      bibtex_show  = {true},
      dimensions   = {true},
      selected     = {false}
      
    where "selected" is not followed by a comma.
    """
    # Find the index of the final non-empty line that is just the closing "}"
    closing_index = None
    for i in range(len(entry_lines)-1, -1, -1):
        if entry_lines[i].strip() == '}':
            closing_index = i
            break

    if closing_index is None:
        # If we didn't find a closing "}", simply append our new fields and a closing brace.
        closing_index = len(entry_lines)
        entry_lines.append("}\n")
    
    # Find the last non-empty line before the closing brace.
    last_field_index = closing_index - 1
    while last_field_index >= 0 and entry_lines[last_field_index].strip() == "":
        last_field_index -= 1
    
    # If such a line exists, ensure it ends with a comma.
    if last_field_index >= 0:
        entry_lines[last_field_index] = ensure_trailing_comma(entry_lines[last_field_index])
    
    # Define new fields with proper formatting.
    new_fields = [
    #    "\taltmetric    = {true},\n",
        "\tbibtex_show  = {true},\n",
    #    "\tdimensions   = {true},\n",
        "\tselected     = {false}\n"
    ]
    
    # Insert the new fields before the final "}".
    new_entry = entry_lines[:closing_index] + new_fields + [entry_lines[closing_index]]
    return new_entry

def process_file(input_filename, output_filename):
    """
    Reads the original BibTeX file, processes each BibTeX entry by adding the new fields
    (while retaining all comments and existing formatting), and writes out the result.
    """
    with open(input_filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    processed_lines = []
    inside_entry = False
    entry_lines = []
    brace_level = 0

    for line in lines:
        # If not in an entry, check if the line marks the start of one.
        if not inside_entry:
            if line.lstrip().startswith('@'):
                inside_entry = True
                entry_lines = [line]
                i = line.find('{')
                if i != -1:
                    rest = line[i:]
                    brace_level = rest.count('{') - rest.count('}')
                else:
                    brace_level = 0
            else:
                # Outside of an entry, write the line as is.
                processed_lines.append(line)
        else:
            # If we are inside an entry, append and update brace count.
            entry_lines.append(line)
            brace_level += line.count('{') - line.count('}')
            # When the brace level indicates the entry is complete, process it.
            if brace_level <= 0:
                new_entry_lines = process_entry(entry_lines)
                processed_lines.extend(new_entry_lines)
                inside_entry = False
                entry_lines = []
                brace_level = 0

    # Process any dangling entry lines (if the file ended unexpectedly).
    if entry_lines:
        new_entry_lines = process_entry(entry_lines)
        processed_lines.extend(new_entry_lines)
    
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.writelines(processed_lines)

def main():
    if len(sys.argv) != 2:
        print("Usage: python enhance_bib.py <bibtex_file>")
        sys.exit(1)
    
    input_filename = sys.argv[1]
    if not input_filename.lower().endswith('.bib'):
        print("Please provide a .bib file.")
        sys.exit(1)
    
    output_filename = input_filename.rsplit('.bib', 1)[0] + "-enhanced.bib"
    process_file(input_filename, output_filename)
    print(f"Enhanced BibTeX file written to {output_filename}")

if __name__ == '__main__':
    main()
