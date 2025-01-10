---
layout: page
title: Portfolio
description: A description of building this portfolio.
img: 
importance: 4
category: personal
related_publications: false
---

<h2>Introduction</h2>
So, I decided to redo my portfolio.  I made the decision to go with GitHub Pages, Jekyll, with the Al-folio.  I had some growing pains getting everything set-up, probably because I could not be bothered to read the documentation.  So, I put this together to document my process of putting it together.  And, maybe it can help someone else who is struggling to get it set-up.

<br />
<h2>Link</h2>
<a href="https://github.com/alshedivat/al-folio">Al-folio</a>

<br />
<h2>Process</h2>
<h3>Setup</h3>
The first step of the process is finding a Jekyll them that meets your purposes.  Unfortunately, I cannot help you with that.  It is a matter of personal preference.  I went with the Al-folio theme.  If you go with a different theme, this guide might be of <b><i>limited</i></b> value.  I don't have experience with any other themes.

<br />
Navigate to the al-folio repository and click Fork.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/alfolio.png" title="Al-folio" class="img-fluid rounded z-depth-1" %}
</div>

<br />
For the repository, the name has to be in a specific format.  It has to follow a specific naming convention for GitHub pages.  That is your_user_name.github.io.

{% raw %}
```
<your_user_name>.github.io

Ex.
biscottidiskette.github.io
```
{% endraw %}
<div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/createrepo.png" title="Create the repo" class="img-fluid rounded z-depth-1" %}
</div>

<br />
Click on the COG wheel in the about section.

<div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/about.png" title="The GitHub About" class="img-fluid rounded z-depth-1" %}
</div>

<br />
Update the URL and the description.

<div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/editabout.png" title="Edit the About" class="img-fluid rounded z-depth-1" %}
</div>

<br />
Now, install the prerequisites, the ruby manager, the ruby build environment.  This install setup is from <a href="https://stackoverflow.com/questions/37720892/you-dont-have-write-permissions-for-the-var-lib-gems-2-3-0-directory">StackOverflow</a>.

{% raw %}
```bash
cd $HOME
sudo apt update 
sudo apt install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libxml2-dev libxslt1-dev libcurl4-openssl-dev libffi-dev

git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL
```
{% endraw %}

<br />
Use the rbenv to get the most recent version of ruby.  Note the version.

{% raw %}
```bash
ubz@ubz-VirtualBox:~/Documents/GitHub/biscottidiskette.github.io$ rbenv install -l
3.1.6
3.2.6
3.3.6
3.4.1
jruby-9.4.9.0
mruby-3.3.0
picoruby-3.0.0
truffleruby-24.1.1
truffleruby+graalvm-24.1.1

Only latest stable releases for each Ruby implementation are shown.
Use `rbenv install --list-all' to show all local versions.
```
{% endraw %}

<br />
Install the later version of ruby.  Please note, this is building from source so it will take a bit.  Set that version of ruby.  Check the verions of Ruby to ensure that the install completed successfully.

{% raw %}
```bash
rbenv install 3.4.1
rbenv global 3.4.1
ruby -v
```
{% endraw %}

<br />
Use Ruby's gem to install bundler.

{% raw %}
```bash
gem install bundler
rbenv rehash
```
{% endraw %}

<br />
Install Code or your favourite programming envrionment.

{% raw %}
```bash
sudo snap install --classic code
```
{% endraw %}

<br />
From the Code Dropdown, copy the git https link.

<div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/repogitlink.png" title="Copy the git link" class="img-fluid rounded z-depth-1" %}
</div>

<br />
Clone the repository to your development machine.

{% raw %}
```bash
ubz@ubz-VirtualBox:~$ git clone https://github.com/biscottidiskette/biscottidiskette.github.io.git
```
{% endraw %}

<br />
Open the code folder structure in Code.

{% raw %}
```bash
ubz@ubz-VirtualBox:~$ code .
```
{% endraw %}

<br />
Change directory in the folder and execute bundle to install the prerequisites.

{% raw %}
```bash
cd biscottidiskette.github.io/
bundle
```
{% endraw %}

<br />
Use bundle to spin up a local webserver.  You can get the ip and port at the bottom of the output and this can be viewed in the web browser.  Please note that this bundle command can be used whenever you want to test and see changes that were made.  Use Control + C to stop the server.

{% raw %}
```bash
ubz@ubz-VirtualBox:~/Documents/GitHub/biscottidiskette.github.io$ bundle exec jekyll serve

<snip>

Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```
{% endraw %}
<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/firstrun.png" title="The Intial Website" class="img-fluid rounded z-depth-1" %}
</div>

<br />
Make some simple changes just to test if everything is working correctly.  These changes will take place in the _config.yml file and the _pages/about.md. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/website/config.png" title="The Config File" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/website/aboutpage.png" title="The About File" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Reviewing the output from the server start, notice the imagemagick error message.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/imageerror.png" title="Imagemagick Error" class="img-fluid rounded z-depth-1" %}
</div>

Update the imagemagick enabled property to false.

<div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/imgenable.png" title="Set Enable to False" class="img-fluid rounded z-depth-1" %}
</div>

<br />
Also in the _config.yml, update the first_name, last_name, url, and base_url.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/website/update_name.png" title="Update Name" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/website/update_url.png" title="Update Url" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Make test changes to the about.md file so we can ensure that everything is working correctly.

<div class="col-sm-8 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/aboutupdate.png" title="Update the About" class="img-fluid rounded z-depth-1" %}
</div>

<br />
Save all of the changes that were made.  Rerun the server and check the change like in the steps above.

<div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/saveall.png" title="Save All" class="img-fluid rounded z-depth-1" %}
</div>

<br />
<h3>Create Collection</h3>
Create a md file in the _pages folder.  Create a folder under the root folder with the same name as the pages file preceeded by an underscore.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/website/createpage.png" title="Create Page" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/website/createfolder.png" title="Create Folder" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br />
Update the header of the new page that was just created.

{% raw %}
```
---
layout: page
title: boxes
permalink: /boxes/
description: All of the boxes, CTFs, and various other practice.
nav: true
nav_order: 2
display_categories: [HackTheBox, TryHackMe, VulnHub, CTFs]
horizontal: false
---
```
{% endraw %}

<ul>
    <li>layout: Indicates the layout of the file.  Collections use page layout.</li>
    <li>title: The tile for the collection.</li>
    <li>permalink: The url for the new collection.</li>
    <li>description: The description that will appear under the header.</li>
    <li>nav: Will it appear in the site header.</li>
    <li>nav_order: The order that the heading will appear in the site header.</li>
    <li>display_categories: The different categories for the collection.</li>
    <li>horizontal: Allows for horizontal orientation.</li>
</ul>

<br />
Update the file to display to display_categories to the site.

{% raw %}
```html
<!-- pages/boxes.md -->
<div class="projects">
    {% if site.enable_project_categories and page.display_categories %}
        <!-- Display categorized boxes -->
        {% for category in page.display_categories %}
            <a id="{{ category }}" href=".#{{ category }}">
                <h2 class="category">{{ category }}</h2>
            </a>
        {% endfor %}
    {% else %}


    {% endif %}
</div>
```
{% endraw %}

<br />
Review the updates to ensure that everything is correct so far.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/categories.png" title="View categories" class="img-fluid rounded z-depth-1" %}
</div>

<br />
Create a test item for the new collection.

<div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/testitem.png" title="Test Item" class="img-fluid rounded z-depth-1" %}
</div>
{% raw %}
```html
---
layout: page
title: Brainpan
description: Brainpan buffer overflow from TryHackMe.
img: 
importance: 2
category: TryHackMe
related_publications: false
---
```
{% endraw %}
<ul>
    <li>layout: Indicates the layout of the file.  Collection Items use page layout.</li>
    <li>title: The tile for the item.</li>
    <li>description: The description that will appear under the header.</li>
    <li>img: The image that will be displayed on the collection card on the collections page.</li>
    <li>importance: The sort importance of individual item.</li>
    <li>category: The category of the item for grouping purposes.</li>
</ul>

<br />
When the bundle exec command is run, it will pull all of the items for the _collection folder and add them to the _site folder.  So, create a variable the fetches all of the items from the site object, filtering by category.  The create a second variable that sorts the first variable in order of importance.

{% raw %}
```html
<!-- pages/boxes.md -->
<div class="projects">
    {% if site.enable_project_categories and page.display_categories %}
        <!-- Display categorized boxes -->
        {% for category in page.display_categories %}
            <a id="{{ category }}" href=".#{{ category }}">
                <h2 class="category">{{ category }}</h2>
            </a>
            {% assign categorized_boxes = site.boxes | where: "category", category %}
            {% assign sorted_boxes = categorized_boxes | sort: "importance" %}
            <!-- Generate cards for each boxes -->

        {% endfor %}
    {% else %}


    {% endif %}
</div>
```
{% endraw %}

<br />
Create a new liquid file in the _include folder.  Update all of the variables to what the individual item variable will be called.

<div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/createliquid.png" title="Create liquid" class="img-fluid rounded z-depth-1" %}
</div>
{% raw %}
```html
<div class="col">
  <a href="{% if box.redirect %}{{ box.redirect }}{% else %}{{ box.url | relative_url }}{% endif %}">
    <div class="card h-100 hoverable">
      {% if box.img %}
        {%
          include figure.liquid
          loading="eager"
          path=box.img
          sizes = "250px"
          alt="box thumbnail"
          class="card-img-top"
        %}
      {% endif %}
      <div class="card-body">
        <h2 class="card-title">{{ box.title }}</h2>
        <p class="card-text">{{ box.description }}</p>
        <div class="row ml-1 mr-1 p-0">
          {% if box.github %}
            <div class="github-icon">
              <div class="icon" data-toggle="tooltip" title="Code Repository">
                <a href="{{ box.github }}"><i class="fa-brands fa-github gh-icon"></i></a>
              </div>
              {% if box.github_stars %}
                <span class="stars" data-toggle="tooltip" title="GitHub Stars">
                  <i class="fa-solid fa-star"></i>
                  <span id="{{ box.github_stars }}-stars"></span>
                </span>
              {% endif %}
            </div>
          {% endif %}
        </div>
      </div>
    </div>
  </a>
</div>
```
{% endraw %}

<br />
Create a new liquid file in the _include folder for the horizontal orientation.  Update all of the variables to what the individual item variable will be called.

<div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/createhorliquid.png" title="Create Horizontal liquid" class="img-fluid rounded z-depth-1" %}
</div>
{% raw %}
```html
<div class="col mb-4">
  <a href="{% if box.redirect %}{{ box.redirect }}{% else %}{{ box.url | relative_url }}{% endif %}">
    <div class="card h-100 hoverable">
      <div class="row no-gutters">
        {% if box.img %}
          <div class="col-md-6">
            {% include figure.liquid loading="eager" path=box.img sizes="(min-width: 768px) 156px, 50vw" alt="box thumbnail" class="card-img" %}
          </div>
        {% endif %}
        <div class="{% if box.img %}col-md-6{% else %}col-md-12{% endif %}">
          <div class="card-body">
            <h3 class="card-title">{{ box.title }}</h3>
            <p class="card-text">{{ box.description }}</p>
            <div class="row ml-1 mr-1 p-0">
              {% if box.github %}
                <div class="github-icon">
                  <div class="icon" data-toggle="tooltip" title="Code Repository">
                    <a href="{{ box.github }}"><i class="fa-brands fa-github gh-icon"></i></a>
                  </div>
                  {% if box.github_stars %}
                    <span class="stars" data-toggle="tooltip" title="GitHub Stars">
                      <i class="fa-solid fa-star"></i>
                      <span id="{{ box.github_stars }}-stars"></span>
                    </span>
                  {% endif %}
                </div>
              {% endif %}
            </div>
          </div>
        </div>
      </div>
    </div>
  </a>
</div>
```
{% endraw %}

<br />
For the categorized items, create an if statement to differentiate between horizontal and default orientation.  Create a for loop to display each individual item int the filtered, sorted variable.  Remember to use the variable from the liquid file.

{% raw %}
```html
            {% if page.horizontal %}
                <div class="container">
                    <div class="row row-cols-1 row-cols-md-2">
                        {% for box in sorted_boxes %}
                            {% include boxes_horizontal.liquid %}
                        {% endfor %}
                    </div>
                </div>
            {% else %}
                <div class="row row-cols-1 row-cols-md-3">
                    {% for box in sorted_boxes %}
                        {% include boxes.liquid %}
                    {% endfor %}
                </div>
            {% endif %}
```
{% endraw %}

<br />
For the uncategorized items, recreate the sorted_collection pulling directly from the site.collection.  Create the if statement to differentiate between horizontal and default orientation.  Create a for loop to display each individual item int the filtered, sorted variable.  Remember to use the variable from the liquid file.  At this point, rerun the bundle exec command and check the new collection in the browswer.

{% raw %}
```html
        <!-- Display boxes without categories -->
        {% assign sorted_boxes = site.boxes | sort: "importance" %}
        <!-- Generate cards for each project -->
        {% if page.horizontal %}
            <div class="container">
                <div class="row row-cols-1 row-cols-md-2">
                    {% for box in sorted_boxes %}
                        {% include boxes_horizontal.liquid %}
                    {% endfor %}
                </div>
            </div>
        {% else %}
            <div class="row row-cols-1 row-cols-md-3">
                {% for box in sorted_boxes %}
                    {% include boxes.liquid %}
                {% endfor %}
            </div>
        {% endif %}
```
{% endraw %}

<br />
<h3>Update blog</h3>
Create a new item in the _posts folder.  It follow the naming convention: yyyy-mm-dd-title.md.

<div class="col-sm-4 mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/firstblog.png" title="First blog post" class="img-fluid rounded z-depth-1" %}
</div>
{% raw %}
```html
---
layout: post
title: First post.
date: 2025-01-03 09:56:00-0400
description: A quick post about this new portfolio.
tags: portfolio
categories: personal
related_posts: false
---

<p>Welcome to my blog.  Feel free to check it out and let me know what you think.</p>
```
{% endraw %}
<ul>
    <li>layout: Indicates the layout of the file.  Blog posts use post layout.</li>
    <li>title: The tile for the post.</li>
    <li>date: Follows the format: yyyy-mm-dd hh:mm:ss-0400</li>
    <li>description: The description that will appear under the header.</li>
    <li>tags: The hashtag tags associated with the post.</li>
    <li>category: The category of the post for grouping purposes.</li>
</ul>

<br />
In the _config.yml file, update the display_tags and display_categories to whatever was done in your posts.

{% raw %}
```html
display_tags: ["portfolio"] # these tags will be displayed on the front page of your blog
display_categories: ["personal"] # these categories will be displayed on the front page of your blog
```
{% endraw %}

<br />
In the same file, update the blog and the blog description.

{% raw %}
```html
blog_name: ScottiSec # blog_name will be displayed in your blog page
blog_description: My musings about the InfoSec/Cybersecurity space.
permalink: /blog/:year/:title/
lsi: false # produce an index for related posts
```
{% endraw %}

<br />
Also, delete all of the sample posts to clean up the blog.  Also, also, comment out the external blog posts in the _config.yml file.

{% raw %}
```html
# External sources.
# If you have blog posts published on medium.com or other external sources,
# you can display them in your blog by adding a link to the RSS feed.
#external_sources:
#  - name: medium.com
#    rss_url: https://medium.com/@al-folio/feed
#  - name: Google Blog
#    posts:
#      - url: https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/
#        published_date: 2024-05-14
```
{% endraw %}

<br />
Check the blog in the web browser to ensure it looks how you want it.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/website/blogfinal.png" title="Final blog look" class="img-fluid rounded z-depth-1" %}
</div>

<br />
<h3>Deployment<h3>


<br />
<h3><u>References:</u></h3>
derek. 2016, June 21. You don't have write permissions for the /var/lib/gems/2.3.0 directory. stackoverflow. <a href="https://stackoverflow.com/questions/37720892/you-dont-have-write-permissions-for-the-var-lib-gems-2-3-0-directory">https://stackoverflow.com/questions/37720892/you-dont-have-write-permissions-for-the-var-lib-gems-2-3-0-directory</a><br />
Spencer Pao. How To Build A Website | Github Pages | Jekyll | Template. YouTube. <a href="https://www.youtube.com/watch?v=g6AJ9qPPoyc">https://www.youtube.com/watch?v=g6AJ9qPPoyc</a><br />
Techno Tim.  Meet Jekyll - The Static Site Generator. YouTube. <a href="https://www.youtube.com/watch?v=F8iOU1ci19Q">https://www.youtube.com/watch?v=F8iOU1ci19Q</a>