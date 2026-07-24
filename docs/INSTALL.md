# Installing and Deploying

<!--ts-->

- [Installing and Deploying](#installing-and-deploying)
  - [Recommended Approach](#recommended-approach)
    - [Template vs. Fork: Which Should I Use?](#template-vs-fork-which-should-i-use)
    - [Important Notes for GitHub Pages Sites](#important-notes-for-github-pages-sites)
    - [Automatic Deployment](#automatic-deployment)
    - [Local Development](#local-development)
  - [Local setup on Windows](#local-setup-on-windows)
  - [Local setup using Docker (Recommended)](#local-setup-using-docker-recommended)
    - [Build your own docker image](#build-your-own-docker-image)
    - [Have Bugs on Docker Image?](#have-bugs-on-docker-image)
  - [Local Setup with Development Containers](#local-setup-with-development-containers)
  - [Local Setup (Legacy, no longer supported)](#local-setup-legacy-no-longer-supported)
  - [Deployment](#deployment)
    - [For personal and organization webpages](#for-personal-and-organization-webpages)
    - [For project pages](#for-project-pages)
    - [Enabling automatic deployment](#enabling-automatic-deployment)
    - [Manual deployment to GitHub Pages](#manual-deployment-to-github-pages)
    - [Deploy on <a href="https://www.netlify.com/" rel="nofollow">Netlify</a>](https://www.netlify.com/)
    - [Deployment to another hosting server (non GitHub Pages)](#deployment-to-another-hosting-server-non-github-pages)
    - [Deployment to a separate repository (advanced users only)](#deployment-to-a-separate-repository-advanced-users-only)
  - [Maintaining Dependencies](#maintaining-dependencies)
  - [Upgrading from a previous version](#upgrading-from-a-previous-version)
    - [Migrating heavily customized pre-v1 sites](#migrating-heavily-customized-pre-v1-sites)

<!--te-->

## Recommended Approach

The recommended approach for using **al-folio** is to first create your own site using the template with as few changes as possible, and only when it is up and running customize it however you like. This way it is easier to pinpoint what causes a potential issue in case of a bug.

**For the quickest setup**, follow the [Quick Start Guide](QUICKSTART.md), which will have you up and running in 5 minutes.

### Template vs. Fork: Which Should I Use?

**Use the "Use this template" button** (recommended) when creating your own al-folio site. This creates a clean, independent copy that is not linked to the main al-folio repository.

**If you already forked the repository**, your fork will work fine, but you should be aware of a common pitfall:

- Forks maintain a connection to the original repository, which can make it easy to accidentally submit pull requests to al-folio with your personal site changes
- **Solution:** When making changes to your fork, always create a new branch (e.g., `git checkout -b my-site-updates`) and verify that you're pushing to **your own fork** before submitting pull requests
- Only submit pull requests to `alshedivat/al-folio` if you're intentionally contributing improvements that benefit the entire al-folio community

### Important Notes for GitHub Pages Sites

If you plan to upload your site to `<your-github-username>.github.io`, the repository name :warning: **MUST BE** :warning: `<your-github-username>.github.io` or `<your-github-orgname>.github.io`, as stated in the [GitHub pages docs](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites).

When configuring `_config.yml`, set `url` to `https://<your-github-username>.github.io` and leave `baseurl` **empty** (do NOT delete it), setting it as `baseurl:`.

### Automatic Deployment

Starting version [v0.3.5](https://github.com/alshedivat/al-folio/releases/tag/v0.3.5), **al-folio** will automatically re-deploy your webpage each time you push new changes to your repository! :sparkles:

### Local Development

Once everything is deployed, you can download the repository to your machine and start customizing it locally:

```bash
git clone git@github.com:<your-username>/<your-repo-name>.git
```

See [Local setup using Docker](#local-setup-using-docker-recommended) or other sections below for local development options.

## Local setup on Windows

If you are using Windows, it is **highly recommended** to use [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install), which is a compatibility layer for running Linux on top of Windows. You can follow [these instructions](https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-11-with-gui-support) to install WSL and Ubuntu on your machine. You only need to go up to the step 4 of the tutorial (you don't have to enable the optional `systemd` nor the graphical applications), and then you can follow the instructions below to install docker. You can install docker natively on Windows as well, but it has been having some issues as can be seen in [#1540](https://github.com/alshedivat/al-folio/issues/1540), [#2007](https://github.com/alshedivat/al-folio/issues/2007).

## Local setup using Docker (Recommended)

Using Docker to install Jekyll and Ruby dependencies is the easiest way.

You need to take the following steps to get `al-folio` up and running on your local machine:

- First, install [docker](https://docs.docker.com/get-docker/) and [docker-compose](https://docs.docker.com/compose/install/).
- Finally, run the following command that will pull the latest pre-built image from DockerHub and will run your website.

```bash
docker compose pull
docker compose up
```

Note that when you run it for the first time, it will download a docker image of size 400MB or so. To see the template running, open your browser and go to `http://localhost:8080`. You should see a copy of the theme's demo website.

Now, feel free to customize the theme however you like (don't forget to change the name!). Also, your changes should be automatically rendered in real-time (or maybe after a few seconds).

For v1.x, Docker serves from a container-local destination (`/tmp/_site`) to avoid host bind-mount write deadlocks during notebook and asset generation.

> Beta: You can also try the slimmed docker image with `docker compose -f docker-compose-slim.yml up`, but it may lag behind the full image on some host architectures.

### Build your own docker image

> Note: this approach is only necessary if you would like to build an older or very custom version of al-folio.

Build and run a new docker image using:

```bash
docker compose up --build
```

> If you want to update jekyll, install new ruby packages, etc., all you have to do is build the image again using `--force-recreate` argument at the end of the previous command! It will download Ruby and Jekyll and install all Ruby packages again from scratch.

If you want to use a specific docker version, you can do so by changing the version tag to `your_version` in `docker-compose.yml` (for example, `image: amirpourmand/al-folio:v1.0.0`). Plugin patch releases do not require a new starter Docker image unless the starter wiring, lockfile, Dockerfile, or image build inputs change.

### Have Bugs on Docker Image?

Sometimes, there might be some bugs in the current docker image. It might be version mismatch or anything. If you want to debug and easily solve the problem for yourself you can do the following steps:

```
docker compose up -d
docker compose logs
```

Then you can see the bug! You can enter the container via this command:

```
docker compose exec -it jekyll /bin/bash
```

Then you can run the script:

```
./bin/entry_point.sh
```

You might see problems for package dependecy or something which is not available. You can fix it now by using

```
bundle install
./bin/entry_point.sh
```

Most likely, this will solve the problem but it shouldn't really happen. So, please open a bug report for us.

## Local Setup with Development Containers

`al-folio` supports [Development Containers](https://containers.dev/supporting).
For example, when you open the repository with Visual Studio Code (VSCode), it prompts you to install the necessary extension and automatically install everything necessary.

## Local Setup (Legacy, no longer supported)

For a hands-on walkthrough of running al-folio locally without using Docker, check out [this cool blog post](https://george-gca.github.io/blog/2022/running-local-al-folio/) by one of the community members!

Assuming you have [Ruby](https://www.ruby-lang.org/en/downloads/) and [Bundler](https://bundler.io/) installed on your system (_hint: for ease of managing ruby gems, consider using [rbenv](https://github.com/rbenv/rbenv)_), and also [Python](https://www.python.org/) and [pip](https://pypi.org/project/pip/) (_hint: for ease of managing python packages, consider using a virtual environment, like [venv](https://docs.python.org/pt-br/3/library/venv.html) or `conda`_).

```bash
bundle install
# optional but recommended if you use jupyter posts:
# installs jupyter + nbconvert for jekyll-jupyter-notebook
./bin/setup-python-deps
# or manually:
# python3 -m pip install --user --break-system-packages jupyter nbconvert
bundle exec jekyll serve
```

In `v1.x`, `al-folio` is a thin starter. Do not run starter-local npm build commands for theme/runtime assets; those are owned by `al-*` gems and loaded through plugin contracts.
Interactive TOC (`toc.sidebar`) and TikZ (`tikzjax: true`) use pinned CDN runtime assets from `_config.yml` (`third_party_libraries.tocbot` and `third_party_libraries.tikzjax`), not install-time downloads.

Starter plugin wiring lives in:

- [Gemfile](../Gemfile) for dependency declarations
- [\_config.yml](../_config.yml) for Jekyll plugin activation/config

`al-folio` starter does not currently use a gemspec; contributor/plugin integration docs should reference the two files above.

If `jekyll-jupyter-notebook` is enabled and `jupyter-nbconvert` is missing, builds continue but notebook rendering is skipped with a warning.

To see the template running, open your browser and go to `http://localhost:4000`. You should see a copy of the theme's [demo website](https://alshedivat.github.io/al-folio/). Now, feel free to customize the theme however you like. After you are done, remember to **commit** your final changes.

## Deployment

Deploying your website to [GitHub Pages](https://pages.github.com/) is the most popular option.
Starting version [v0.3.5](https://github.com/alshedivat/al-folio/releases/tag/v0.3.5), **al-folio** will automatically re-deploy your webpage each time you push new changes to your repository **main branch**! :sparkles:

### For personal and organization webpages

1. The name of your repository **MUST BE** `<your-github-username>.github.io` or `<your-github-orgname>.github.io`.
2. In `_config.yml`, set `url` to `https://<your-github-username>.github.io` and leave `baseurl` empty.
3. Set up automatic deployment of your webpage (see instructions below).
4. Make changes to your main branch, commit, and push!
5. After deployment, the webpage will become available at `<your-github-username>.github.io`.

### For project pages

1. In `_config.yml`, set `url` to `https://<your-github-username>.github.io` and `baseurl` to `/<your-repository-name>/`.
2. Set up automatic deployment of your webpage (see instructions below).
3. Make changes to your main branch, commit, and push!
4. After deployment, the webpage will become available at `<your-github-username>.github.io/<your-repository-name>/`.

### Enabling automatic deployment

1. Click on **Actions** tab and **Enable GitHub Actions**; do not worry about creating any workflows as everything has already been set for you.
2. Go to `Settings -> Actions -> General -> Workflow permissions`, and give `Read and write permissions` to GitHub Actions
3. Make any other changes to your webpage, commit, and push to your main branch. This will automatically trigger the **Deploy** action.
4. Wait for a few minutes and let the action complete. You can see the progress in the **Actions** tab. If completed successfully, in addition to the `main` branch, your repository should now have a newly built `gh-pages` branch. **Do NOT touch this branch!**
5. Finally, in the **Settings** of your repository, in the Pages section, set the branch to `gh-pages` (**NOT** to `main`). For more details, see [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source).

If you keep your site on another branch, open `.github/workflows/deploy.yml` **on the branch you keep your website on** and change `on->push->branches` and `on->pull\_request->branches` to the branch you keep your website on. This will trigger the action on pulls/pushes on that branch. The action will then deploy the website on the branch it was triggered from.

### Manual deployment to GitHub Pages

If you need to manually re-deploy your website to GitHub pages, go to Actions, click "Deploy" in the left sidebar, then "Run workflow."

### Deploy on [Netlify](https://www.netlify.com/)

1. [Use this template -> Create a new repository](https://github.com/new?template_name=al-folio&template_owner=alshedivat).
2. Netlify: **Add new site** -> **Import an existing project** -> **GitHub** and give Netlify access to the repository you just created.
3. Netlify: In the deploy settings
   - Set **Branch to deploy** to `main`
   - **Base directory** is empty
   - Set **Build command** to `sed -i "s/^\(baseurl: \).*$/baseurl:/" _config.yml && bundle exec jekyll build`
   - Set **Publish directory** to `_site`

4. Netlify: Add the following two **environment variables**
   - | Key            | Value                                                                                  |
     | -------------- | -------------------------------------------------------------------------------------- |
     | `JEKYLL_ENV`   | `production`                                                                           |
     | `RUBY_VERSION` | set to the Ruby version found in `.github/workflows/deploy.yml` (for example, `3.3.5`) |

5. Netlify: Click **Deploy** and wait for the site to be published. If you want to use your own domain name, follow the steps in [this documentation](https://docs.netlify.com/domains-https/custom-domains/).

### Deployment to another hosting server (non GitHub Pages)

If you decide to not use GitHub Pages and host your page elsewhere, simply run:

```bash
bundle exec jekyll build
```

which will (re-)generate the static webpage in the `_site/` folder.
Then simply copy the contents of the `_site/` directory to your hosting server.

If you also want to remove unused css classes from your file, run:

```bash
purgecss -c purgecss.config.js
```

which will replace the css files in the `_site/assets/css/` folder with the purged css files.

**Note:** Make sure to correctly set the `url` and `baseurl` fields in `_config.yml` before building the webpage. If you are deploying your webpage to `your-domain.com/your-project/`, you must set `url: your-domain.com` and `baseurl: /your-project/`. If you are deploying directly to `your-domain.com`, leave `baseurl` blank, **do not delete it**.

### Deployment to a separate repository (advanced users only)

**Note:** Do not try using this method unless you know what you are doing (make sure you are familiar with [publishing sources](https://help.github.com/en/github/working-with-github-pages/about-github-pages#publishing-sources-for-github-pages-sites)). This approach allows to have the website's source code in one repository and the deployment version in a different repository.

Let's assume that your website's publishing source is a `publishing-source` subdirectory of a git-versioned repository cloned under `$HOME/repo/`.
For a user site this could well be something like `$HOME/<user>.github.io`.

Firstly, from the deployment repo dir, checkout the git branch hosting your publishing source.

Then from the website sources dir (commonly your al-folio fork's clone):

```bash
bundle exec jekyll build --destination $HOME/repo/publishing-source
```

This will instruct jekyll to deploy the website under `$HOME/repo/publishing-source`.

**Note:** Jekyll will clean `$HOME/repo/publishing-source` before building!

The quote below is taken directly from the [jekyll configuration docs](https://jekyllrb.com/docs/configuration/options/):

> Destination folders are cleaned on site builds
>
> The contents of `<destination>` are automatically cleaned, by default, when the site is built. Files or folders that are not created by your site will be removed. Some files could be retained by specifying them within the `<keep_files>` configuration directive.
>
> Do not use an important location for `<destination>`; instead, use it as a staging area and copy files from there to your web server.

If `$HOME/repo/publishing-source` contains files that you want jekyll to leave untouched, specify them under `keep_files` in `_config.yml`.
In its default configuration, al-folio will copy the top-level `README.md` to the publishing source. If you want to change this behavior, add `README.md` under `exclude` in `_config.yml`.

**Note:** Do _not_ run `jekyll clean` on your publishing source repo as this will result in the entire directory getting deleted, irrespective of the content of `keep_files` in `_config.yml`.

## Maintaining Dependencies

**al-folio** uses **Bundler** (a Ruby dependency manager) to keep track of Ruby packages (called "gems") needed to run Jekyll and its plugins.

**To update all dependencies:**

```bash
bundle update --all
```

**After updating:**

1. Rebuild the Docker image to apply changes: `docker compose up --build`
2. Test locally to ensure everything still works: `docker compose up`
3. Visit `http://localhost:8080` and verify the site renders correctly
4. If your site fails after updating, check the [FAQ](FAQ.md) for troubleshooting

**For Ruby/Python environment issues:**

- Always use Docker for consistency with CI/CD (see [Local setup using Docker](#local-setup-using-docker-recommended))
- Avoid manual Ruby/Python installation when possible

## Upgrading from a previous version

Starting with `v1.0`, **al-folio** ships an upgrade CLI (`al_folio_upgrade`) and versioned migration manifests from `al_folio_core` to make minor upgrades (`v1.0 -> v1.1 -> v1.2`) predictable.

### Recommended workflow (v1.x)

```bash
# 1) Update dependencies
bundle update

# 2) Audit your site for breaking/deprecated patterns
bundle exec al-folio upgrade audit

# 3) Apply deterministic codemods (optional)
bundle exec al-folio upgrade apply --safe

# 4) Generate a report for manual follow-up
bundle exec al-folio upgrade report
```

`al-folio` starter is intentionally thin in `v1.x`: layouts/includes/core assets are provided by `al_folio_core`, so regular upgrades do not require rebuilding Tailwind in the starter repo.

The report is written to `al-folio-upgrade-report.md` and classifies findings as:

- **Blocking**: must be resolved before the target upgrade is considered complete
- **Non-blocking**: deprecated patterns that should be migrated over time

### Legacy Bootstrap content

`v1.0` is Tailwind-first. If your content still relies on Bootstrap-marked classes/behaviors:

1. Enable `al_folio.compat.bootstrap.enabled: true` in `_config.yml`
2. Ensure `al_folio_bootstrap_compat` is in your plugins/dependencies
3. Complete migration gradually
4. Disable compatibility mode before `v1.3` (compat is supported through `v1.2`, deprecated in `v1.3`, removed in `v2.0`)

### Older pre-v1 installs

For heavily customized pre-v1 repositories, you can still use rebase/cherry-pick workflows if needed, but the recommended path is:

1. Start from the v1 starter/runtime contract and copy your site-owned files over: `_config.yml` values, `_data`, content collections, assets, Sass overrides, and intentional local `_layouts`/`_includes` overrides.
2. Keep `theme: al_folio_core`, the `al_folio` config namespace, and the bundled `al_*` plugin entries from the v1 starter.
3. Enable `al_folio.compat.bootstrap.enabled: true` if your custom templates still use Bootstrap classes or `data-toggle` attributes.
4. Run the upgrade audit/codemods.
5. Run the local override audit.
6. Fix all blocking findings from `al-folio-upgrade-report.md`.
7. Build locally and review key pages before deploying.

For ownership boundaries (starter vs gem runtime/tests), see [`BOUNDARIES.md`](BOUNDARIES.md).

#### Migrating heavily customized pre-v1 sites

The safest migration pattern is to keep custom site code local, but stop carrying old copies of runtime files that v1 gems now own.

Keep these in your site repo:

- content collections such as `_pages`, `_projects`, `_news`, `_bibliography`, `_data`, and site assets
- intentional local overrides such as `_layouts/bib.liquid`, `_includes/repository/repo.liquid`, or custom Sass files
- custom plugins that are truly site-specific
- local path or Git-pinned gems when you intentionally maintain a custom plugin variant

Run these checks early:

```bash
bundle exec al-folio upgrade audit --no-fail
bundle exec al-folio upgrade overrides audit
bundle exec al-folio upgrade report
```

The report calls out plugin-owned local files that usually should be removed or replaced by v1 plugin wiring. The override audit catches intentional local copies of plugin-owned files and records the upstream version you reviewed.

Remove or review these during migration:

- `_includes/head.liquid` and `_includes/scripts.liquid` if they only copy old al-folio runtime setup
- old local citation and external-post plugins now owned by `al_citations` and `al_ext_posts`
- `assets/js/distillpub/**` now owned by `al_folio_distill`
- `assets/js/search/**` now owned by `al_search`
- starter sample content that does not exist in your old site, such as sample `_posts`

To pin a plugin while testing a local fix:

```ruby
gem "al_folio_core", git: "https://github.com/YOUR-USER/al-folio-core.git", branch: "my-fix"
```

To use a local plugin checkout:

```ruby
gem "al_folio_core", path: "../al-folio-core"
```

Only fork a plugin when the behavior you need belongs to that plugin. A local layout/include/Sass override in your site repo is enough for one-off site customization.

#### Tracking local override drift

Local overrides are still supported in v1, but Git will not conflict when a gem updates the upstream file that your local copy shadows. Use `al_folio_upgrade` to restore that review signal:

```bash
bundle exec al-folio upgrade overrides audit
bundle exec al-folio upgrade overrides diff _includes/repository/repo.liquid
bundle exec al-folio upgrade overrides accept _includes/repository/repo.liquid
```

Commit `.al-folio-overrides.yml` in customized sites. It stores the owning gem, gem version, upstream checksum, and local checksum for each reviewed override. After future `bundle update` runs, `bundle exec al-folio upgrade overrides audit` flags overrides whose upstream plugin file changed.
