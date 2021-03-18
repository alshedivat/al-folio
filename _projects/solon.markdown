---
layout: page
title: Solon
description: A Virtual Assistant to improve productivity and learning
img: /assets/img/learn-screenshot.png
importance: 2
---

## [Github Repository](https://github.com/ChamsToure/solon)

    ---
    Tech Stack: C++, Python, beautifulsoup4, gTTS
    ---

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/search-screenshot.png' | relative_url }}" alt="" title="example image"/>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        <img class="img-fluid rounded z-depth-1" src="{{ '/assets/img/learn-screenshot.png' | relative_url }}" alt="" title="example image"/>
    </div>
</div>

# Solon
A Virtual Assistant to improve productivity and learning.

## Features
- using voice or keyboard shortcut to search for definitions and explanation of words or concepts
- save the searched words as a flashcard
- transform your personal notes automatically into flashcards
- create your own decks of flashcards
- start learning sessions with a goal of correct answers for each card in the choosen deck

![alt text](https://raw.githubusercontent.com/ChamsToure/solon/master/search-demo.gif)
<br/><br/>
![alt text](https://raw.githubusercontent.com/ChamsToure/solon/master/learn-demo.gif)


## Before building
### Set up your browser
1. set your default browser. You can find the option in the search/search.cpp file.
If you use Chromium for example:
```
system(("chromium -new-tab " + search2).c_str());
```
Replace "chromium" with your default browser:
* For google chrome: google-chrome or google-chrome-stable (on linux)
* For Firefox: firefox
2. On windows, uncomment the ShellExecute function to enable the browser function. This method may
be easier if you run into issues with the browser set up.

## How to build
- Open your command line
- cd to project root directory: solon/
- Create a build directory: mkdir build
- Change into the build direcotry: cd build
- Inside the build directory type: cmake .. && make
- To execute the application write: ./solon


## Required python packages
- bs4
- SpeechRecognition
- gTTS
- requests
- playsound
- To install all the packages type this into your command line: ```pip install bs4 SpeechRecognition gTTS requests playsound ```

## How to use?
- First of all, I would recommend to set the program as a keyboard shortcut, to use it effortless, quickly and intuitively.
  You can also create a bash script with the following text:
  ```
  #!/bin/bash
  cd <path-to-build-directory>
  .solon
  ```
- If you already have a collection of notes, you can turn them easily into flashcard:
    1. Create a .txt file inside /solon/files/decks/<your-filename>.txt
    2. Copy your entire notes document into the .txt file
    3. Put a "?" at the end of each question or "#" at the front of a topic title. You will find an example inside the example.txt file.
    4. Save the file and the program will automatically create the front and back of each flashcard after execution

 - Uncomment line 42-43 inside the scraping.py file.
 - Every searched keyword is stored in the /files/decks/history.txt file


