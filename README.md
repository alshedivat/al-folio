# Academic Responsive (AR) Website Template

## A Responsive HTML5/CSS3 template for setting up an academic website.

This template is implemented in Bootstrap (a popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web). The template has been tested on iOS, Windows Phone, Android, Chrome, Safari and other browsers. Some of its features require external free components (e.g., Google Custom Search for site-search, Twitter widget for news, Smartbib for publication indexing). Additionally, having a CV in LATEX format will help to automate the generation of material and streamline consistency between your CV and your website. You will need to edit the sources with a text editor or a capable WYSIWYG editor.

The original idea for setting up this template was to make an academic profile easily accessible from a smartphone.

The template is free and open to reuse under a CC BY 4.0 licence.

Enjoy!

Copyright (c) 2015, Demetris Zeinalipour, Department of Computer Science
University of Cyprus.

All rights reserved.

## Creative Commons CC BY 4.0 licence 

The AR template is open to reuse under a CC BY 4.0 licence. This license lets others distribute, remix, tweak, and build upon AR even commercially, as long as they credit the original creation in the footer of the site. This is the most accommodating of licenses offered. Recommended for maximum dissemination and use of licensed materials.

More: http://creativecommons.org/licenses/by/4.0/legalcode

## Credits

To use AR on your site, please add the following code at the end of your website:
```html
<footer>
    <small>
    <center>
        © YEAR | YOURNAME. Credits: AR template
    <a onclick="javascript:$('#credit').toggle();"><img border="0" src="images/ccby.png"/></a>
    <div style="display:none;" id="credit">[AR template available under Creative Commons CC BY 4.0 licence: 
    <a href="https://github.com/dmsl/academic-responsive-template" target="_blank">
        https://github.com/dmsl/academic-responsive-template 
    </a> ]
    </div>
    </center>
    </small>
</footer>
```

## Example Site

- Dr. Demetris Zeinalipour, University of Cyprus (latest version): http://www.cs.ucy.ac.cy/~dzeina/
- Dr. Pavlos Antoniou, University of Cyprus, Cyprus: https://www.cs.ucy.ac.cy/~csp5pa1/
- Dr. Georgios Chatzimilioudis, University of Cyprus, Cyprus: https://www.cs.ucy.ac.cy/~gchatzim/
- Dr. Federico Mari, Sapienza University of Rome, Italy: http://mari.di.uniroma1.it/index.html
- Dr. Francesco Belardo, University of Naples Federico II, Italy: http://www.dma.unina.it/belardo/index.html
- Jessica Ryan, University of Glasgow, https://jessryan.co.uk/

to be included above, please add your name here https://docs.google.com/spreadsheets/d/1jl6MyvTFCwY1KrfOPdFcGyT4wj0ZF45dJ2ViQde_W9U/edit?usp=sharing

## Components 

Short description of the contents included in this release.

- index.html : Contains most of the website material (single-page layout). Change this accordingly.
- bio.html: Add your Short Bio
- cv.html: To generate the content of this file effectively, first generate your CV from a latex file: "latex2html -no_math -html_version 3.2,math -split 0 yourcv.tex " Please use the sources under "CV-latex" if you don't have your own CV template. Then copy/paste the material onto cv.html
- publications: tenatively add your publications in bibtex format to the following file publications/demo.bib. If PHP is available on your webserver, this will show the bibtex entries neatly.
- talks: tenatively add your talks in bibtex format to the following file talks/presentations/demo.bibIf PHP is available on your webserver, this will show the bibtex entries neatly.
- Search Box: Setup a custom search box through Google. Replace the respective javascript in the HTML files to make your new search box effective.

## CR (Course Responsive) Template

Also check out the sister template designated for courses: https://github.com/dmsl/course-responsive-template


