---
layout: post
title: Latex with Vscode on Windows
date: 2020-09-28 11:12:00-0400
description: configuration of the Visual Studio Code extension Latex Workshop + grammarly support
---

### Prerequisites 

Texlive, Visual Studio Code

### Latex Workshop Extension Configuration
+ support forward/backward search 
+ for latex project with no bib file, add the following to the first line of the target tex file to use the singleton tool of xelatex
> % !TEX program = xelatex
+ Remember to replace `/path/to` with real path. 

{% highlight json %}

"latex-workshop.showContextMenu":true,
    "latex-workshop.latex.autoBuild.run": "never",
    "latex-workshop.synctex.afterBuild.enabled": true,
    "latex-workshop.intellisense.package.enabled": true,
    "latex-workshop.message.error.show": false,
    "latex-workshop.message.warning.show": false,

    "latex-workshop.view.pdf.viewer": "external",
    "latex-workshop.view.pdf.ref.viewer":"auto",
    "latex-workshop.view.pdf.external.viewer.command": "/path/to/SumatraPDF/SumatraPDF.exe",
    "latex-workshop.view.pdf.external.viewer.args": [
        "-forward-search",
        "%TEX%",
        "%LINE%",
        "-reuse-instance",
        "-inverse-search",
        "\"/path/to/Microsoft VS Code/Code.exe\" \"/path/to/Microsoft VS Code/resources/app/out/cli.js\" -gr \"%f\":\"%l\"",
        "%PDF%"
    ],
    "latex-workshop.view.pdf.external.synctex.command": "/path/to/SumatraPDF/SumatraPDF.exe",
    "latex-workshop.view.pdf.external.synctex.args": [
        "-forward-search",
        "%TEX%",
        "%LINE%",
        "-reuse-instance",
        "-inverse-search",
        "\"/path/to/Microsoft VS Code/Code.exe\" \"/path/to/Microsoft VS Code/resources/app/out/cli.js\" -gr \"%f\":\"%l\"",
        "%PDF%"
    ],
    "latex-workshop.view.pdf.internal.synctex.keybinding": "double-click",
    "editor.wordWrap":"on",
    "latex-workshop.latex.tools": [
        {
            "name": "bibtex",
            "command": "bibtex",
            "args": [
              "%DOCFILE%"
            ]
        },
        {
            "name": "xelatex",
            "command": "xelatex",
            "args": [
              "-synctex=1",
              "-interaction=nonstopmode",
              "-file-line-error",
              "-shell-escape",
              "%DOC%"
            ]
        },
        {
            "name": "pdflatex",
            "command": "pdflatex",
            "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-shell-escape",
                "%DOC%"
            ],
        }
    ],
    "latex-workshop.latex.recipes": [
        {
            "name": "pdflatex -> bibtex -> pdflatex*2",
            "tools": [
                "pdflatex",
                "bibtex",
                "pdflatex",
                "pdflatex"
            ]
        },
        {
            "name": "xe->bib->xe->xe",
            "tools": [
                "xelatex",
                "bibtex",
                "xelatex",
                "xelatex"
            ]
        },
        {
            "name": "xelatex",
            "tools": [
                "xelatex"
            ]
        }
    ],
    "latex-workshop.latex.clean.fileTypes": [
        "*.aux",
        "*.bbl",
        "*.blg",
        "*.idx",
        "*.ind",
        "*.lof",
        "*.lot",
        "*.out",
        "*.toc",
        "*.acn",
        "*.acr",
        "*.alg",
        "*.glg",
        "*.glo",
        "*.gls",
        "*.ist",
        "*.fls",
        "*.log",
        "*.fdb_latexmk"
    ],
    "latex-workshop.latex.autoClean.run": "onFailed",
    "latex-workshop.latex.recipe.default": "lastUsed",
{% endhighlight %}

### Key Binding
`Ctrl+Shift+P` and search for keyboard shortcuts

look up `{
  "key": "ctrl+alt+r",
  "command": "latex-workshop.recipes"
}`

### Grammarly Unofficial Extension

login and reload the extension

{% highlight json %}
    "grammarly.autoActivate": true,
    "grammarly.severity": {
        "Hard-to-read": 4, // Sets Fragment category to Warning.
        "Passive voice": 4,
        "Incorrect spacing with punctuation": 4
    }
{% endhighlight %}