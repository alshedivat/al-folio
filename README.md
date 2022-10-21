# CI-lab @ ECNU

Powered by [Jekyll](https://jekyllrb.com/) with [al-folio](https://github.com/alshedivat/al-folio) theme.

    .
    ├── 404.html # 404 page
    ├── assets # assets folder, for images, css, js, etc.
    │   └── img # put images here
    ├── _config.yml # Jekyll configuration file
    ├── _group # group members, "成员" page
    │   ├── cc.md
    │   └── gongyongtang.md
    ├── _includes # layout components
    │   ├── figure.html
    │   ├── footer.html
    │   ├── header.html
    │   ├── head.html
    │   ├── member.html
    │   ├── metadata.html
    │   ├── news.html
    │   ├── pagination.html
    │   ├── projects_horizontal.html
    │   ├── projects.html
    │   ├── scripts
    │   │   ├── analytics.html
    │   │   ├── bootstrap.html
    │   │   ├── jquery.html
    │   │   ├── masonry.html
    │   │   ├── mathjax.html
    │   │   └── misc.html
    │   ├── selected_papers.html
    │   └── social.html
    ├── _layouts # layout templates
    │   ├── about.html
    │   ├── archive-category.html
    │   ├── archive-tag.html
    │   ├── archive-year.html
    │   ├── bib.html
    │   ├── default.html
    │   ├── distill.html
    │   ├── member.html
    │   ├── none.html
    │   ├── page.html
    │   ├── parse.html
    │   └── post.html
    ├── _news # news, "新闻" section on the index page
    │   ├── announcement_1.md
    │   ├── announcement_2.md
    │   └── announcement_3.md
    ├── _pages # pages templates
    │   ├── about.md # index page, "关于我们" page
    │   ├── contact.md # "招生" page
    │   ├── dropdown.md
    │   ├── group.md # "成员" page. Modify members in _group folder
    │   ├── projects.md # "研究项目" page. Modify projects in _projects folder
    │   └── publications.md # "发表" page. Modify publications in _publications folder
    ├── _projects # projects, "研究项目" page
    │   ├── dataset.md
    │   ├── kd.md
    │   └── kd-tiho.md
    ├── _publications # publications, "发表" page
    │   ├── 2020.md
    │   ├── 2021.md
    │   └── 2022.md
    ├── README_al-folio.md # al-folio README file
    ├── README.md # this file
    ├── _sass # css
    │   ├── _base.scss
    │   ├── _distill.scss
    │   ├── _layout.scss
    │   ├── _themes.scss
    │   └── _variables.scss
    └── _site # generated site