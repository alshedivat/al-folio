  # DSAI-NLP GitHub Page Contribution Guide

Welcome to the DSAI-NLP GitHub repository! This guide will walk you through the steps to contribute to our GitHub Page. Whether you're fixing a bug, adding content, or updating existing information, your contributions are invaluable to the success of our project.

## Important Note for Contributors

When creating pull requests, please ensure you are submitting them to the correct base repository, which is `dsai-nlp/dsai-nlp.github.io`, **not** the original `alshedivat/al-folio` repo from which this project was forked. You can select the base repository when you open a pull request on GitHub. For more details, please refer to our contribution guidelines.

## Local Development Using Docker

For ease of setup and to avoid compatibility issues with Ruby and Jekyll versions, we recommend using Docker for local development. This method isolates the environment and works consistently across different operating systems.

### Prerequisites

Before you begin, ensure you have Docker installed on your system. If you haven't already, you can download and install Docker from the following links:

- [Get Docker](https://docs.docker.com/get-docker/)
- [Install Docker Compose](https://docs.docker.com/compose/install/)

### Running the Website Locally

After installing Docker and Docker Compose, follow these steps to run the website on your local machine:

1. Open a terminal and navigate to the root directory of your forked version of the `dsai-nlp/dsai-nlp.github.io` repository.

2. Run the following command to pull the latest pre-built Jekyll image from DockerHub:

   ```bash
   docker compose pull
   ```

3. Once the image is pulled, start the Docker container with:

   ```bash
   docker compose up
   ```

This command will start a local web server running the website.

4. Open your web browser and go to `http://localhost:8080`. You should see the local version of the website running.

Now that you have the site running locally, you can begin customizing the theme to suit your needs. 



## Getting Started

To start contributing, please follow these steps:

### 1. Fork the Repository

Before making any changes, you'll need your own copy of the repository. Fork the repo by clicking on the 'Fork' button at the top right corner of this page. This will create a copy of the repository in your own GitHub account.

### 2. Create a New Branch

Once you have your forked copy, create a new branch on your repository. This branch should be named appropriately based on the edits you intend to make. For example, if you're adding a new event, you might name your branch `add-new-event`.

```bash
git checkout -b your-branch-name
```

### 3. Make Your Changes

With your new branch checked out, you're ready to make the changes or additions you have in mind. Feel free to update existing content, add new files, or make any other necessary modifications.

### 4. Commit and Push Your Changes

After you've made your changes, commit them with a clear and concise commit message. Then, push your changes to your forked repository.

```bash
git add .
git commit -m "A brief description of your changes"
git push origin your-branch-name
```

### 5. Create a Pull Request

Navigate to your forked repository on GitHub, switch to your branch, and click on the 'Pull Request' button. Ensure that the base repository is set to `dsai-nlp/dsai-nlp.github.io` and the base branch is `master`. Fill in some details about your changes in the pull request message and submit it.

## Pull Request Review

Once your pull request is submitted, it will be reviewed by the maintainers of the original repository. If everything looks good, your changes will be merged into the master branch. If there are any additional changes needed, maintainers will provide feedback on your pull request.

## Additional Guidelines

- Ensure that your contributions are in line with the project's standards and code of conduct.
- Test your changes locally before pushing to ensure they work as expected.
- Do not push directly to the master branch; always create a new branch for your changes.

Thank you for your contributions to the DSAI-NLP GitHub Page. Together, we're building a comprehensive and valuable resource for the NLP community!

_Replace the placeholders such as `your-branch-name` and the commit message with the relevant information for your specific changes._

## Adding New Content to the Repository

### Adding Your Profile

To add your profile to the NLP@DSAI team page:

1. Navigate to the `_members` directory.
2. Create a new Markdown file (`.md`) with a suitable name, e.g., `john_doe.md`.
3. Use the following template as a guide for your content. Fill in your personal details where applicable:

```yaml
---
name: Your Name
image: path_to_your_image
position: Your Position
state: current # Options: current, master, alumni
start-date: YYYY-MM-DD
end-date: YYYY-MM-DD # If applicable
pronouns: your pronouns
email: your_email@domain.com
# Add any of the following that apply to you:
scholar_userid:
publons_id:
research_gate_profile:
github_username:
linkedin_username:
twitter_username:
medium_username:
quora_username:
blogger_url:
work_url:
wikidata_id:
strava_userid:
keybase_username:
gitlab_username:
dblp_url:
description: "A short personal bio or description."
---
```

### Adding an Event

To add an event:

1. Navigate to the `_events` directory.
2. Create a new YAML file (`.yaml`) with a suitable name, e.g., `nlp_fika_event.yaml`.
3. Use the following template as a guide for your event:

```yaml
---
layout: event_layout_type # Options: reading-group, fika, seminar, talk
speaker: Speaker's Name
title: "Event Title"
bio: "Speaker's bio."
abstract: "Short description of the event."
image: assets/events/event_image.png
start: YYYY-MM-DDTHH:MM:SS+HH:MM # Start time and timezone offset
end: YYYY-MM-DDTHH:MM:SS+HH:MM # End time and timezone offset
# Add any of the following that apply to your event:
youtube:
slides:
zoomroom:
zoompassword:
---
```

### Adding an Announcement

To add an announcement:

1. Navigate to the `_news` directory.
2. Create a new Markdown file (`.md`) with a suitable name, e.g., `conference_announcement.md`.
3. Follow the predefined template in the `_news` folder for the announcement, filling in the relevant details.

### Adding or Updating Course Information

To add or update information about a course:

1. Navigate to the `_pages` directory.
2. Locate the `courses.md` file.
3. Update the file with the new course information or make changes to the existing content.

### Updating Publications

To add or update publications:

1. Navigate to the `_bibliography` directory.
2. Locate the `papers.bib` file.
3. Add your new publication details in BibTeX format or update existing entries as necessary.

## Final Steps

After making any of the above changes, follow the standard contribution workflow:

1. Commit your changes with a clear message.
2. Push the changes to your forked repository branch.
3. Create a pull request to the main repository: `dsai-nlp/dsai-nlp.github.io`.

The repository maintainers will review your pull request and merge it upon approval. Make sure to provide detailed information in your pull request to expedite the review process.
