---
layout: page
title: Gettysburg Text Processing
description: Python code
img: assets/img/12.jpg
importance: 1
category: Python
related_publications: false
---

```
import string

contents = []

word_count_dict = {}

# Prompt the user for the filename they wish to name their generated report
# Input sanitization
valid_chars = "-_.() %s%s" % (string.ascii_letters, string.digits)
output_file = ''.join(c for c in input('Enter output file name: ') if c in valid_chars).strip()
# to save as .txt file
if output_file.endswith('.txt'):
    output_file = output_file
else:
    output_file = output_file + '.txt'


# to add word to dictionary
def add_word(word, wc_dict):
    if word in wc_dict.keys() != '':
        wc_dict[word] += 1
    else:
        wc_dict[word] = 1
    # parameters are the word and a dictionary
    # no return value


# to strip unnecessary characters and split out words
def process_line(line, wc_dict):
    line = line.strip()
    word_list = line.split()
    for word in word_list:
        if word != '--':
            word = word.lower()
            word = word.strip()
            word = word.translate(str.maketrans('', '', string.punctuation))
            add_word(word, wc_dict)
    # parameters are a line and the dictionary
    # calls the add_word function with each processed word
    # no return value


# to write to new file rather than print to screen
def process_file(wc_dict):  # parameter is dictionary; no return value
    for key, value in wc_dict.items():
        contents.append((key, value))
    contents.sort(key=lambda x: x[1], reverse=True)
    # create file
    f = open(output_file, 'w')
    f.write('Length of Dictionary:' + str(len(word_count_dict)) + ' \n')
    f.write("{0:<12}{1:>10}".format('Word', 'Count\n'))  # heading
    f.write("-"*22)  # stars
    for key, value in contents:
        f.write("\n{0:<12}{1:>10}".format(key, value))  # contents from process_file
    f.close()


def main():
    with open("gettysburg.txt", "r+") as rf:
        for line in rf:
            process_line(line, word_count_dict)
        # to strip unnecessary characters and split out words
        process_file(word_count_dict)
    # open file
    # call process_line on each line
    # when done, will call pretty_print to print the dictionary (high to low frequency, using string formatting)


if __name__ == "__main__":
    main()
```