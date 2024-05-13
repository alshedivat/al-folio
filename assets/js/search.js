---
---
// don't remove the above lines
// they are required to make the code work

// Get list of posts from Jekyll
const posts = [
  {% for post in site.posts %}
    {
      title: "{{ post.title | escape }}",
      description: "{{ post.description | strip_html | strip_newlines | escape }}",
      url: "{{ site.baseurl }}{{ post.url }}",
      date: "{{ post.date | date: "%Y-%m-%d" }}",
      categories: [
        {% for category in post.categories %}
          "{{ category }}",
        {% endfor %}
      ],
      tags: [
        {% for tag in post.tags %}
          "{{ tag }}",
        {% endfor %}
      ]
    },
  {% endfor %}
];

const projects = [
  {% for project in site.projects %}
    {
      title: "{{ project.title | escape }}",
      description: "{{ post.description | strip_html | strip_newlines | escape }}",
      url: "{{ site.baseurl }}{{ project.url }}",
      categories: [
        "{{ project.category }}",
      ]
    },
  {% endfor %}
];

// Custom Icons for Home and Posts Menu Items
// You can use any SVG icon you want
const articleIcon = '<svg style="padding-right: 10px" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zM7 6v4h4V6H7zm0 6v2h10v-2H7zm0 4v2h10v-2H7zm6-9v2h4V7h-4z" fill="#fff"/></svg>';
const homeIcon = '<svg style="padding-right: 10px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.376 3.47a2.248 2.248 0 0 0-2.752 0l-6.75 5.222A2.254 2.254 0 0 0 3 10.475v8.272A2.251 2.251 0 0 0 5.25 21h3a2.251 2.251 0 0 0 2.25-2.253v-2.252a1.5 1.5 0 1 1 3 0v2.252A2.251 2.251 0 0 0 15.75 21h3A2.251 2.251 0 0 0 21 18.747v-8.272c0-.698-.323-1.356-.874-1.783l-6.75-5.222Z" fill="#fff"/></svg>';
const projectIcon = '<svg style="padding-right: 10px" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zM7 6v4h4V6H7zm0 6v2h10v-2H7zm0 4v2h10v-2H7zm6-9v2h4V7h-4z" fill="#fff"/></svg>';

// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// map the posts to the ninja-keys data format
const myPosts =  posts.map(post => {
  return {
    id: post.title,
    title: post.title,
    content: post.content,
      icon: articleIcon,
      parent: 'posts',
      handler: () => {
        window.location.href = post.url;
      },
  };
});

// map the projects to the ninja-keys data format
const myProjects =  projects.map(project => {
  return {
    id: project.title,
      title: project.title,
      content: project.content,
      icon: projectIcon,
      parent: 'projects',
      handler: () => {
        window.location.href = project.url;
      },
  };
});

// add the home and posts menu items
ninja.data = [
  {
    id: 'home',
    title: 'Home',
    icon: homeIcon,
    handler: () => {
      window.location.href = "{{ site.baseurl }}/";
    },
  },
  {
    id: 'posts',
    title: 'Posts',
    icon: articleIcon,
    children: myPosts,
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: projectIcon,
    children: myProjects,
  }
];