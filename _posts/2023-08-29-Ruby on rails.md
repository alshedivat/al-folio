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
cd/user/code
rails new \
  -d postgresql \
  -m https://raw.githubusercontent.com/lewagon/rails-templates/master/devise.rb \
  CHANGE_THIS_TO_YOUR_RAILS_APP_NAME
gh repo create
git push origin master
```
````
{% details retrieve the project %}
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
{% enddetails %}
---

# Finish bootstraping the app

Add Devise (unless you used the devise template!)

## Add models
````markdown
```bash
rails g model Product name:type available:type user:references
```
````
## Add a field to a model
````markdown
```bash
rails g migration AddFieldToModel field:type
```
````

````markdown
```types
:string, :text, :integer, :float, :decimal, :datetime, :timestamp, :time, :date, :boolean
```
````

## Add controllers
````markdown
```bash
rails g controller products index show new create edit update destroy
```
````

----
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

# ROR no

If you have an error

  - check maybe some terminal commands

````markdown
```bash
gem update
brew upgrade
```
````

# For more informations
   - [ROR-command-line](https://guides.rubyonrails.org/command_line.html)
   - [ROR-activerecord](https://guides.rubyonrails.org/active_record_basics.html)

