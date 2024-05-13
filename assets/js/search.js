---
---
// don't remove the above lines
// they are required to make the code work

// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [
  {% for page in site.pages %}
    {% if page.permalink == '/' %} {% assign about_title = page.title %} {% endif %}
  {% endfor %}
  {
    id: "nav-{{ about_title | slugify }}",
    title: "{{ about_title }}",
    section: "Navigation",
    handler: () => {
      window.location.href = "{{ '/' | relative_url }}";
    },
  },
  {% assign sorted_pages = site.pages | sort: "nav_order" %}
  {% for p in sorted_pages %}
    {% if p.nav and p.autogen == null %}
      {% if p.dropdown %}
        {% for child in p.children %}
          {% unless child.title == 'divider' %}
            {
              {% assign title = child.title | escape %}
              {% if child.permalink contains "/blog/" %}{% assign url = "/blog/" %} {% else %}{% assign url = child.url %}{% endif %}
              id: "dropdown-{{ title | slugify }}",
              title: "{{ title }}",
              description: "{{ child.description | strip_html | strip_newlines | escape }}",
              section: "Dropdown",
              handler: () => {
                window.location.href = "{{ url | relative_url }}";
              },
            },
          {% endunless %}
        {% endfor %}

      {% else %}
        {
          {% assign title = p.title | escape %}
          {% if p.permalink contains "/blog/" %}{% assign url = "/blog/" %} {% else %}{% assign url = p.url %}{% endif %}
          id: "nav-{{ title | slugify }}",
          title: "{{ title }}",
          description: "{{ p.description | strip_html | strip_newlines | escape }}",
          section: "Navigation",
          handler: () => {
            window.location.href = "{{ url | relative_url }}";
          },
        },
      {% endif %}
    {% endif %}
  {% endfor %}
  {% for post in site.posts %}
    {
      {% assign title = post.title | escape %}
      id: "post-{{ title | slugify }}",
      title: "{{ title }}",
      description: "{{ post.description | strip_html | strip_newlines | escape }}",
      section: "Posts",
      handler: () => {
        window.location.href = "{{ post.url | relative_url }}";
      },
    },
  {% endfor %}
  {% for project in site.projects %}
    {
      {% assign title = project.title | escape %}
      id: "project-{{ title | slugify }}",
      title: "{{ title }}",
      description: "{{ project.description | strip_html | strip_newlines | escape }}",
      section: "Projects",
      handler: () => {
        window.location.href = "{{ project.url | relative_url }}";
      },
    },
  {% endfor %}
];