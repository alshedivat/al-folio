# brim-folio:

Adapted from [al-folio](https://github.com/alshedivat/al-folio), a simple and clean [Jekyll](https://jekyllrb.com/) theme for academics.

## Usage

Note that `_pages/about.md` is built to index.html in the published site. There is therefore no need to have a separate index page for the project. If an index page does exist in the root directory then this will prevent `_pages/about.md` from being added to the built site.

## Features

#### Ergonomic Publications

Your publications page is generated automatically from your BibTex bibliography.
Simply edit `_bibliography/papers.bib`.
You can also add new `*.bib` files and customize the look of your publications however you like by editing `_pages/publications.md`.

Keep meta-information about your co-authors in `_data/coauthors.yml` and Jekyll will insert links to their webpages automatically.

#### Collections
This Jekyll theme implements collections to let you break up your work into categories.
The example is divided into news and projects, but easily revamp this into apps, short stories, courses, or whatever your creative work is.

> To do this, edit the collections in the `_config.yml` file, create a corresponding folder, and create a landing page for your collection, similar to `_pages/projects.md`.

Two different layouts are included: the blog layout, for a list of detailed descriptive list of entries, and the projects layout.
The projects layout overlays a descriptive hoverover on a background image.
If no image is provided, the square is auto-filled with the chosen theme color.
Thumbnail sizing is not necessary, as the grid crops images perfectly.

#### Theming
Six beautiful theme colors have been selected to choose from.
The default is purple, but quickly change it by editing `$theme-color` variable in the `_sass/variables.scss` file (line 72).
Other color variables are listed there, as well.

#### Photos
Photo formatting is made simple using rows of a 3-column system.
Make photos 1/3, 2/3, or full width.
Easily create beautiful grids within your blog posts and projects pages:

<p align="center">
  <a href="https://alshedivat.github.io/al-folio/projects/1_project/">
    <img src="assets/img/photos-screenshot.png" width="75%">
  </a>
</p>

#### Code Highlighting
This theme implements Jekyll's built in code syntax highlighting with Pygments.
Just use the liquid tags `{% highlight python %}` and `{% endhighlight %}` to delineate your code:

<p align="center">
  <a href="https://alshedivat.github.io/al-folio/blog/2015/code/">
    <img src="assets/img/code-screenshot.png" width="75%">
  </a>
</p>

#### Social media previews
The al-folio theme optionally supports preview images on social media.
To enable this functionality you will need to set `serve_og_meta` to `true` in
your `_config.yml`. Once you have done so, all your site's pages will include
Open Graph data in the HTML head element.

You will then need to configure what image to display in your site's social
media previews. This can be configured on a per-page basis, by setting the
`og_image` page variable. If for an individual page this variable is not set,
then the theme will fall back to a site-wide `og_image` variable, configurable
in your `_config.yml`. In both the page-specific and site-wide cases, the
`og_image` variable needs to hold the URL for the image you wish to display in
social media previews.

## Contributing

Feel free to contribute new features and theme improvements by sending a pull request.
Style improvements and bug fixes are especially welcome.

## License

The theme is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
