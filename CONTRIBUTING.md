# Contributing to al-folio

Thank you for considering contributing to al-folio!

## Pull Requests

We welcome your pull requests (PRs).
For minor fixes (e.g., documentation improvements), feel free to submit a PR directly.
If you would like to implement a new feature or a bug, please make sure you (or someone else) has opened an appropriate issue first; in your PR, please mention the issue it addresses.

Note that since [#2048](https://github.com/alshedivat/al-folio/pull/2048) al-folio uses the [prettier formatter](https://prettier.io/) for its code, meaning all new submitted code must conform to its standard. If you don't have `prettier` installed for your setup and the `prettier` code check fails when submitting a PR, you can check the referred failed action in our repo. In that action there will be an artifact with an HTML diff showing the needed changes.

### Adding new social media information

To add new social media information, there are a few places you might need to modify. Currently, the template supports icons from [Academicons](https://jpswalsh.github.io/academicons/), [Font Awesome](https://fontawesome.com/), and [Tabler Icons](https://tabler.io/icons). For an example PR, check [Add HAL id to socials](https://github.com/alshedivat/al-folio/pull/3206/files). Note that the information in all these files are alphabetically sorted.

- \_data/socials.yml - your social media information
- \_includes/metadata.liquid - add social media information to site metadata
- \_includes/social.liquid - where the social media icon will be displayed
- \_scripts/search.liquid.js - make the social media information appear in search

## GitHub Copilot Agents

This repository includes two specialized GitHub Copilot agents to assist with development and documentation:

### Customization Agent

The **Customization Agent** (`.github/agents/customize.agent.md`) helps users customize their al-folio website. It:

- Guides you through modifying configuration files, adding content, and customizing the theme
- Explains technical concepts in plain language for users without coding experience
- Applies changes directly to your repository files
- Provides step-by-step instructions for common customization tasks

To use the customization agent, you need to have [GitHub Copilot](https://github.com/features/copilot) enabled in your repository. The agent can help with tasks like changing site information, updating your CV, adding publications, creating blog posts, customizing theme colors, and more.

### Documentation Agent

The **Documentation Agent** (`.github/agents/docs.agent.md`) maintains the project documentation. It:

- Updates and maintains documentation files (`README.md`, `INSTALL.md`, `CUSTOMIZE.md`, `FAQ.md`, `CONTRIBUTING.md`)
- Keeps documentation in sync with code changes
- Writes clear, concise documentation for users without technical backgrounds
- Follows documentation standards and best practices

The documentation agent is primarily intended for maintainers and contributors who are updating the project documentation.

### Important: Verify Agent Output

While these agents are designed to assist you, **they can make mistakes or produce incorrect information**. Always review and verify the output before applying it to your repository:

- **Review code and configuration changes** – Check that suggested modifications are correct and fit your needs
- **Test changes locally** – Before pushing to GitHub, test the changes locally (using Docker or native setup)
- **Verify syntax** – Ensure any YAML, Markdown, or configuration files have correct syntax
- **Check documentation** – If the agent generates documentation, review it for accuracy and clarity
- **Don't blindly apply changes** – Understand what changes are being made and why
- **Run your site** – After applying changes, run your site locally and verify everything works as expected

**Example:** If an agent suggests a BibTeX entry or configuration change, verify that the syntax is correct and matches the existing style in your repository before committing.

### How to Enable Agents

GitHub Copilot agents are available to users with GitHub Copilot subscriptions. To use these agents:

1. Ensure you have [GitHub Copilot](https://github.com/features/copilot) enabled for your account
2. Open your repository in an editor with GitHub Copilot support (such as VS Code with the GitHub Copilot extension)
3. The agents will be automatically available based on the configuration files in `.github/agents/`. For more information, see [Using custom agents in your IDE](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents#using-custom-agents-in-your-ide).

For more information about GitHub Copilot agents and how to use them, see the [GitHub Copilot documentation](https://docs.github.com/en/copilot).

## Issues

We use GitHub issues to track bugs and feature requests.
Before submitting an issue, please make sure:

1. You have read [the FAQ section](FAQ.md) of the README and your question is NOT addressed there.
2. You have done your best to ensure that your issue is NOT a duplicate of one of [the previous issues](https://github.com/alshedivat/al-folio/issues).
3. Your issue is either a bug (unexpected/undesirable behavior) or a feature request.
   If it is just a question, please ask it in the [Discussions](https://github.com/alshedivat/al-folio/discussions) forum.

When submitting an issue, please make sure to use the appropriate template.

## License

By contributing to al-folio, you agree that your contributions will be licensed
under the LICENSE file in the root directory of the source tree.
