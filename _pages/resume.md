---
layout: page
permalink: /resume/
title: resume
description: Current resume.
nav: true
nav_order: 1
---

For now, this page is assumed to be a static description of your courses. You can convert it to a collection similar to `_projects/` so that you can have a dedicated page for each course.

Organize your courses by years, topics, or universities, however you like!

content:
  - title: Projects # Title for the section
    layout: list # Type of content section (list/text)
    content:
      - layout: top-middle
        title: Super awesome project
        link: github.com/sproogen
        # link_text: Project Website
        additional_links:
          - title:  sproogen/modern-resume-theme
            icon: fab fa-github
            url: github.com/sproogen/modern-resume-theme
          # - title:  Github page for project (eg. sproogen/modern-resume-theme)
          #   icon: fab fa-github
          #   url: Link to project (eg. sproogen.github.io/modern-resume-theme)
        quote: >
          This is probably one of the greatest apps ever created, if you don't agree you're probably wrong.
        description: | # this will include new lines to allow paragraphs
          I started this project as a way if learning <mark>React</mark> and it has since grown into a fully fledged app. I have learned many skills through this and been I'm very proud of having this in my portfolio. If you don't have a project as awesome as this I would advise you make one.
