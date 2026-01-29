---
permalink: /assets/js/search-data.js
---
// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [
  {%- for page in site.pages -%}
    {%- if page.permalink == '/' -%}{%- assign about_title = page.title | strip -%}{%- endif -%}
  {%- endfor -%}
  {
    id: "nav-{{ about_title | slugify }}",
    title: "{{ about_title | truncatewords: 13 }}",
    section: "Navigation",
    handler: () => {
      window.location.href = "{{ '/' | relative_url }}";
    },
  },
  {%- assign sorted_pages = site.pages | sort: "nav_order" -%}
  {%- for p in sorted_pages -%}
    {%- if p.nav and p.autogen == null -%}
      {%- if p.dropdown -%}
        {%- for child in p.children -%}
          {%- unless child.title == 'divider' -%}
            {
              {%- assign title = child.title | escape | strip -%}
              {%- if child.permalink contains "/blog/" -%}{%- assign url = "/blog/" -%} {%- else -%}{%- assign url = child.permalink -%}{%- endif -%}
              id: "dropdown-{{ title | slugify }}",
              title: "{{ title | truncatewords: 13 }}",
              description: "{{ child.description | strip_html | strip_newlines | escape | strip }}",
              section: "Dropdown",
              handler: () => {
                window.location.href = "{{ url | relative_url }}";
              },
            },
          {%- endunless -%}
        {%- endfor -%}

      {%- else -%}
        {
          {%- assign title = p.title | escape | strip -%}
          {%- if p.permalink contains "/blog/" -%}{%- assign url = "/blog/" -%} {%- else -%}{%- assign url = p.url -%}{%- endif -%}
          id: "nav-{{ title | slugify }}",
          title: "{{ title | truncatewords: 13 }}",
          description: "{{ p.description | strip_html | strip_newlines | escape | strip }}",
          section: "Navigation",
          handler: () => {
            window.location.href = "{{ url | relative_url }}";
          },
        },
      {%- endif -%}
    {%- endif -%}
  {%- endfor -%}
  {%- if site.posts_in_search -%}
    {%- for post in site.posts -%}
      {
        {%- assign title = post.title | escape | strip -%}
        id: "post-{{ title | slugify }}",
        {% if post.redirect == blank %}
          title: "{{ title | truncatewords: 13 }}",
        {% elsif post.redirect contains '://' %}
          title: '{{ title | truncatewords: 13 }} <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        {% else %}
          title: "{{ title | truncatewords: 13 }}",
        {% endif %}
        description: "{{ post.description | strip_html | strip_newlines | escape | strip }}",
        section: "Posts",
        handler: () => {
          {% if post.redirect == blank %}
            window.location.href = "{{ post.url | relative_url }}";
          {% elsif post.redirect contains '://' %}
            window.open("{{ post.redirect }}", "_blank");
          {% else %}
            window.location.href = "{{ post.redirect | relative_url }}";
          {% endif %}
        },
      },
    {%- endfor -%}
  {%- endif -%}
  {%- for collection in site.collections -%}
    {%- if collection.label != 'posts' -%}
      {%- for item in collection.docs -%}
        {
          {%- if item.inline -%}
            {%- assign title = item.content | newline_to_br | replace: "<br />", " " | replace: "<br/>", " " | strip_html | strip_newlines | escape | strip -%}
          {%- else -%}
            {%- assign title = item.title | newline_to_br | replace: "<br />", " " | replace: "<br/>", " " | strip_html | strip_newlines | escape | strip -%}
          {%- endif -%}
          id: "{{ collection.label }}-{{ title | slugify }}",
          title: '{{ title | escape | emojify | truncatewords: 13 }}',
          description: "{{ item.description | strip_html | strip_newlines | escape | strip }}",
          section: "{{ collection.label | capitalize }}",
          {%- unless item.inline -%}
            handler: () => {
              window.location.href = "{{ item.url | relative_url }}";
            },
          {%- endunless -%}
        },
      {%- endfor -%}
    {%- endif -%}
  {%- endfor -%}
  {%- if site.socials_in_search -%}
    {%- for social in site.data.socials -%}
      {%- case social[0] -%}
        {%- when "acm_id" -%}
          {%- assign social_id = "social-acm" -%}
          {%- assign social_title = "ACM DL" -%}
          {%- capture social_url %}"https://dl.acm.org/profile/{{ social[1] }}/"{% endcapture -%}
        {%- when "arxiv_id" -%}
          {%- assign social_id = "social-arxiv" -%}
          {%- assign social_title = "arXiv" -%}
          {%- capture social_url %}"https://arxiv.org/a/{{ social[1] }}.html"{% endcapture -%}
        {%- when "blogger_url" -%}
          {%- assign social_id = "social-blogger" -%}
          {%- assign social_title = "Blogger" -%}
          {%- capture social_url %}"{{ social[1] }}"{% endcapture -%}
        {%- when "bluesky_url" -%}
          {%- assign social_id = "social-bluesky" -%}
          {%- assign social_title = "Bluesky" -%}
          {%- capture social_url %}"{{ social[1] }}"{% endcapture -%}
        {%- when "cv_pdf" -%}
          {%- assign social_id = "social-cv" -%}
          {%- assign social_title = "CV" -%}
          {%- capture social_url %}"{{ social[1] | relative_url }}"{% endcapture -%}
        {%- when "dblp_url" -%}
          {%- assign social_id = "social-dblp" -%}
          {%- assign social_title = "DBLP" -%}
          {%- capture social_url %}"{{ social[1] }}"{% endcapture -%}
        {%- when "discord_id" -%}
          {%- assign social_id = "social-discord" -%}
          {%- assign social_title = "Discord" -%}
          {%- capture social_url %}"https://discord.com/users/{{ social[1] }}"{% endcapture -%}
        {%- when "email" -%}
          {%- assign social_id = "social-email" -%}
          {%- assign social_title = "email" -%}
          {%- capture social_url %}"mailto:{{ social[1] | encode_email }}"{% endcapture -%}
        {%- when "facebook_id" -%}
          {%- assign social_id = "social-facebook" -%}
          {%- assign social_title = "Facebook" -%}
          {%- capture social_url %}"https://facebook.com/{{ social[1] }}"{% endcapture -%}
        {%- when "flickr_id" -%}
          {%- assign social_id = "social-flickr" -%}
          {%- assign social_title = "Flickr" -%}
          {%- capture social_url %}"https://www.flickr.com/{{ social[1] }}"{% endcapture -%}
        {%- when "github_username" -%}
          {%- assign social_id = "social-github" -%}
          {%- assign social_title = "GitHub" -%}
          {%- capture social_url %}"https://github.com/{{ social[1] }}"{% endcapture -%}
        {%- when "gitlab_username" -%}
          {%- assign social_id = "social-gitlab" -%}
          {%- assign social_title = "GitLab" -%}
          {%- capture social_url %}"https://gitlab.com/{{ social[1] }}"{% endcapture -%}
        {%- when "hal_id" -%}
          {%- assign social_id = "social-hal" -%}
          {%- assign social_title = "HAL" -%}
          {%- capture social_url %}"https://cv.hal.science/{{ social[1] }}"{% endcapture -%}
        {%- when "ieee_id" -%}
          {%- assign social_id = "social-ieee" -%}
          {%- assign social_title = "IEEE Xplore" -%}
          {%- capture social_url %}"https://ieeexplore.ieee.org/author/{{ social[1] }}/"{% endcapture -%}
        {%- when "inspirehep_id" -%}
          {%- assign social_id = "social-inspire" -%}
          {%- assign social_title = "Inspire HEP" -%}
          {%- capture social_url %}"https://inspirehep.net/authors/{{ social[1] }}"{% endcapture -%}
        {%- when "instagram_id" -%}
          {%- assign social_id = "social-instagram" -%}
          {%- assign social_title = "Instagram" -%}
          {%- capture social_url %}"https://instagram.com/{{ social[1] }}"{% endcapture -%}
        {%- when "kaggle_id" -%}
          {%- assign social_id = "social-kaggle" -%}
          {%- assign social_title = "Kaggle" -%}
          {%- capture social_url %}"https://www.kaggle.com/{{ social[1] }}"{% endcapture -%}
        {%- when "keybase_username" -%}
          {%- assign social_id = "social-keybase" -%}
          {%- assign social_title = "Keybase" -%}
          {%- capture social_url %}"https://keybase.io/{{ social[1] }}"{% endcapture -%}
        {%- when "lastfm_id" -%}
          {%- assign social_id = "social-lastfm" -%}
          {%- assign social_title = "Last FM" -%}
          {%- capture social_url %}"https://www.last.fm/user/{{ social[1] }}"{% endcapture -%}
        {%- when "lattes_id" -%}
          {%- assign social_id = "social-lattes" -%}
          {%- assign social_title = "Lattes" -%}
          {%- capture social_url %}"https://lattes.cnpq.br/{{ social[1] }}"{% endcapture -%}
        {%- when "leetcode_id" -%}
          {%- assign social_id = "social-leetcode" -%}
          {%- assign social_title = "LeetCode" -%}
          {%- capture social_url %}"https://leetcode.com/u/{{ social[1] }}/"{% endcapture -%}
        {%- when "linkedin_username" -%}
          {%- assign social_id = "social-linkedin" -%}
          {%- assign social_title = "LinkedIn" -%}
          {%- capture social_url %}"https://www.linkedin.com/in/{{ social[1] }}"{% endcapture -%}
        {%- when "mastodon_username" -%}
          {%- assign social_id = "social-mastodon" -%}
          {%- assign social_title = "Mastodon" -%}
          {%- capture social_url %}"https://{{ social[1] }}"{% endcapture -%}
        {%- when "medium_username" -%}
          {%- assign social_id = "social-medium" -%}
          {%- assign social_title = "Medium" -%}
          {%- capture social_url %}"https://medium.com/@{{ social[1] }}"{% endcapture -%}
        {%- when "orcid_id" -%}
          {%- assign social_id = "social-orcid" -%}
          {%- assign social_title = "ORCID" -%}
          {%- capture social_url %}"https://orcid.org/{{ social[1] }}"{% endcapture -%}
        {%- when "osf_id" -%}
          {%- assign social_id = "social-osf" -%}
          {%- assign social_title = "Open Science Framework" -%}
          {%- capture social_url %}"https://osf.io/{{ social[1] }}/"{% endcapture -%}
        {%- when "pinterest_id" -%}
          {%- assign social_id = "social-pinterest" -%}
          {%- assign social_title = "Pinterest" -%}
          {%- capture social_url %}"https://www.pinterest.com/{{ social[1] }}"{% endcapture -%}
        {%- when "publons_id" -%}
          {%- assign social_id = "social-publons" -%}
          {%- assign social_title = "Publons" -%}
          {%- capture social_url %}"https://publons.com/a/{{ social[1] }}/"{% endcapture -%}
        {%- when "quora_username" -%}
          {%- assign social_id = "social-quora" -%}
          {%- assign social_title = "Quora" -%}
          {%- capture social_url %}"https://www.quora.com/profile/{{ social[1] }}"{% endcapture -%}
        {%- when "research_gate_profile" -%}
          {%- assign social_id = "social-researchgate" -%}
          {%- assign social_title = "ResearchGate" -%}
          {%- capture social_url %}"https://www.researchgate.net/profile/{{ social[1] }}/"{% endcapture -%}
        {%- when "rss_icon" -%}
          {%- assign social_id = "social-rss" -%}
          {%- assign social_title = "RSS Feed" -%}
          {%- capture social_url %}"{{ site.baseurl }}/feed.xml"{% endcapture -%}
        {%- when "scholar_userid" -%}
          {%- assign social_id = "social-scholar" -%}
          {%- assign social_title = "Google Scholar" -%}
          {%- capture social_url %}"https://scholar.google.com/citations?user={{ social[1] }}"{% endcapture -%}
        {%- when "scopus_id" -%}
          {%- assign social_id = "social-scopus" -%}
          {%- assign social_title = "Scopus" -%}
          {%- capture social_url %}"https://www.scopus.com/authid/detail.uri?authorId={{ social[1] }}"{% endcapture -%}
        {%- when "semanticscholar_id" -%}
          {%- assign social_id = "social-semanticscholar" -%}
          {%- assign social_title = "Semantic Scholar" -%}
          {%- capture social_url %}"https://www.semanticscholar.org/author/{{ social[1] }}"{% endcapture -%}
        {%- when "spotify_id" -%}
          {%- assign social_id = "social-spotify" -%}
          {%- assign social_title = "Spotify" -%}
          {%- capture social_url %}"https://open.spotify.com/user/{{ social[1] }}"{% endcapture -%}
        {%- when "stackoverflow_id" -%}
          {%- assign social_id = "social-stackoverflow" -%}
          {%- assign social_title = "Stackoverflow" -%}
          {%- capture social_url %}"https://stackoverflow.com/users/{{ social[1] }}"{% endcapture -%}
        {%- when "strava_userid" -%}
          {%- assign social_id = "social-strava" -%}
          {%- assign social_title = "Strava" -%}
          {%- capture social_url %}"https://www.strava.com/athletes/{{ social[1] }}"{% endcapture -%}
        {%- when "telegram_username" -%}
          {%- assign social_id = "social-telegram" -%}
          {%- assign social_title = "telegram" -%}
          {%- capture social_url %}"https://telegram.me/{{ social[1] }}"{% endcapture -%}
        {%- when "unsplash_id" -%}
          {%- assign social_id = "social-unsplash" -%}
          {%- assign social_title = "Unsplash" -%}
          {%- capture social_url %}"https://unsplash.com/@{{ social[1] }}"{% endcapture -%}
        {%- comment -%}
        // check how to add wechat qr code
        {%- when "wechat_qr" -%}
          {%- assign social_id = "social-wechat" -%}
          {%- assign social_title = "WeChat" -%}
          {%- capture social_url %}"https://wechat.com/{{ social[1] }}"{% endcapture -%}
        {%- endcomment -%}
        {%- when "whatsapp_number" -%}
          {%- assign social_id = "social-whatsapp" -%}
          {%- assign social_title = "whatsapp" -%}
          {%- capture social_url %}"https://wa.me/{{ social[1] }}"{% endcapture -%}
        {%- when "wikidata_id" -%}
          {%- assign social_id = "social-wikidata" -%}
          {%- assign social_title = "Wikidata" -%}
          {%- capture social_url %}"https://www.wikidata.org/wiki/{{ social[1] }}"{% endcapture -%}
        {%- when "wikipedia_id" -%}
          {%- assign social_id = "social-wikipedia" -%}
          {%- assign social_title = "Wikipedia" -%}
          {%- capture social_url %}"https://wikipedia.org/wiki/User:{{ social[1] }}"{% endcapture -%}
        {%- when "work_url" -%}
          {%- assign social_id = "social-work" -%}
          {%- assign social_title = "Work" -%}
          {%- capture social_url %}"{{ social[1] }}"{% endcapture -%}
        {%- when "x_username" -%}
          {%- assign social_id = "social-x" -%}
          {%- assign social_title = "X" -%}
          {%- capture social_url %}"https://twitter.com/{{ social[1] }}"{% endcapture -%}
        {%- when "youtube_id" -%}
          {%- assign social_id = "social-youtube" -%}
          {%- assign social_title = "YouTube" -%}
          {%- capture social_url %}"https://youtube.com/@{{ social[1] }}"{% endcapture -%}
        {%- when "zotero_username" -%}
          {%- assign social_id = "social-zotero" -%}
          {%- assign social_title = "Zotero" -%}
          {%- capture social_url %}"https://www.zotero.org/{{ social[1] }}"{% endcapture -%}
        {%- else -%}
          {%- assign social_id = "social-" | append: social[0] -%}
          {%- assign social_title = social[0] | capitalize -%}
          {%- capture social_url %}"{{ social[1].url }}"{% endcapture -%}
      {%- endcase -%}
      {
        id: '{{ social_id }}',
        title: '{{ social_title }}',
        section: 'Socials',
        handler: () => {
          window.open({{ social_url }}, "_blank");
        },
      },
    {%- endfor -%}
  {%- endif -%}
  {%- if site.enable_darkmode -%}
    {
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },
  {%- endif -%}
];
