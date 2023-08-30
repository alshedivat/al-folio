---
layout: post
title: Ror start
date: 2023-08-28
description: Ror basics
tags: ror ruby code
categories: code
featured: true
toc:
  sidebar: left
---

# Starting a project : design phase

Before jumping right into the code, first you have to think a bit about what defines your project. It’s the design phase.

  - User stories
  - Database schema
  - Mockups / Design
  - Routes
  - Create the project

# Creating project

  - Create

````markdown
```bash
rails new \
  --database postgresql \
  --javascript webpack \
  --template https://raw.githubusercontent.com/lewagon/rails-templates/master/devise.rb \
  PROJECT-NAME

cd PROJECT-NAME
gh repo create
git push origin master
```
````

  - Retrieve the project

````markdown
```bash
git clone git@github.com:username/PROJECT-NAME.git
cd PROJECT-NAME
bundle install
yarn install
rails db:create db:migrate
touch .env
echo '.env*' >> .gitignore # if not already in .gitignore
```
````

  - Finish bootstraping the application

Add Devise (unless you used the devise template!)
Add models
Write all the routes
Add some seeds + configure image upload (if needed)
Configure your domain name
Making a feature

  - Define the route(s)
Generate and implement the controller and its action(s)
Implement the view
⚠ Only create the controller you need for the specific feature you work on. Do not create all controllers at once!
⚠ And only create the action(s) needed by your feature, not all the actions of the controller!

  - The steps become:

Find the route(s) via a rails routes
Deduce the name of the controller and action(s)
Generate the controller and its action(s) with the --skip-routes option
We use the --skip-routes option in order to not pollute the config/routes.rb file.

  - Fetching new changes
After finishing a feature, when you go back on master branch, you’ll fetch the latest changes:

  - git pull origin master
Each time you pull changes from master, there are operations that you might have to do. In the listing of the files, if you see:

the Gemfile, then run a bundle install
the package.json file, then run yarn install
any file in db/migrate/ folder, then run rails db:migrate
