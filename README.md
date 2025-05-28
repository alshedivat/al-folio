
# EVL-Website

This repository contains the source code for the official website of the Electronic Visualization Laboratory (EVL) at the University of Illinois at Chicago (UIC). Built on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme, the site highlights EVL's interdisciplinary work in virtual reality, visualization, advanced computing, and interactive design.

## Features

- 📱 Responsive design for desktop, tablet, and mobile
- 🧠 Academic-focused layout with support for publications, news, and projects
- ✏️ Easy content editing with Markdown and YAML
- 📚 BibTeX integration for publication management
- 🚀 Deployment-ready for UIC web infrastructure

## Getting Started

### Prerequisites

To build and serve the site locally, ensure you have:

- [Ruby](https://www.ruby-lang.org/en/) (v2.5 or higher)
- [Bundler](https://bundler.io/)
- [Jekyll](https://jekyllrb.com/)

### Installation

Clone the repository:

```bash
git clone https://github.com/uic-evl/EVL-Website.git
cd EVL-Website
```

Install dependencies:

```bash
bundle install
```

## Development Workflow

To make updates to the website, follow this Git branching strategy:

```bash
git checkout deployment
git switch -c a-new-update  # name the branch as you like

# edit the files or add new files
git add [new files]
git commit -m "a new update"
git push origin a-new-update

git checkout deployment
```

Then go to GitHub to create a pull request:

- Merge `a-new-update` into the `deployment` branch.
- GitHub may prompt you to create a pull request; if not, navigate to the branch and click “New pull request.”
- Select `deployment` as the base branch.
- Check for conflicts.
- Add Mike, Luc, or Lance as a reviewer.
- Wait for approval and merge.

## Testing Locally

To preview your changes:

```bash
bundle exec jekyll serve --host 0.0.0.0
```

Then open [http://localhost:4000](http://localhost:4000) in your browser.

## Deployment

To deploy to the EVL server (`www-new`):

```bash
ssh www-new
cd EVL-Website
git checkout deployment
git pull origin deployment
./Build
./Deploy
```

> Make sure you have the appropriate permissions and configurations on the target machine.

## Content Structure

- `_pages/` – Static site pages
- `_posts/` – News and blog updates
- `_projects/` – Research and design projects
- `_data/` – Site-wide data including navigation and people
- `_publications/` – Academic publications (BibTeX-supported)

Refer to [al-folio documentation](https://github.com/alshedivat/al-folio) for advanced customization.

## Contributing

We welcome contributions! Please open an issue or submit a pull request with suggested changes or improvements.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Based on the [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme by [alshedivat](https://github.com/alshedivat).

---

For more information, visit [evl.uic.edu](https://www.evl.uic.edu/).
