---
layout: page
title: plugins
permalink: /plugins/
nav: false
description: featured and bundled plugin ecosystem catalog for al-folio v1.x
---

`al-folio` `v1.x` is a starter with plugin-owned runtime features.
This page lists plugins recognized in the ecosystem catalog (`_data/featured_plugins.yml`).

## Naming convention

- Theme-coupled plugins:
  - repo: `al-folio-<feature>`
  - gem/plugin id: `al_folio_<feature>`
- Reusable plugins:
  - repo: `al-<feature>` or neutral name
  - gem/plugin id aligned with plugin namespace

Third-party non-`al-*` plugins are also eligible for featuring.

## Bundled plugins

{% assign bundled_plugins = site.data.featured_plugins | where: "status", "bundled" %}

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Gem</th>
      <th>Plugin ID</th>
      <th>Compatibility</th>
      <th>Owner</th>
      <th>Demo</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    {% for plugin in bundled_plugins %}
      <tr>
        <td>{{ plugin.name }}<br><small><code>{{ plugin.repo_url }}</code></small></td>
        <td><code>{{ plugin.gem_name }}</code></td>
        <td><code>{{ plugin.jekyll_plugin_id }}</code></td>
        <td><code>{{ plugin.compat.al_folio_min }}</code> - <code>{{ plugin.compat.al_folio_max }}</code></td>
        <td>{{ plugin.owner }}</td>
        <td><code>{{ plugin.demo_path }}</code></td>
        <td>{{ plugin.notes }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>

## Featured-only plugins

{% assign featured_only_plugins = site.data.featured_plugins | where: "status", "featured" %}
{% if featured_only_plugins.size == 0 %}
There are no featured-only entries yet.
Open a **Plugin Feature Proposal** issue if you want your plugin considered.
{% else %}

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Gem</th>
      <th>Plugin ID</th>
      <th>Compatibility</th>
      <th>Owner</th>
      <th>Demo</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    {% for plugin in featured_only_plugins %}
      <tr>
        <td>{{ plugin.name }}<br><small><code>{{ plugin.repo_url }}</code></small></td>
        <td><code>{{ plugin.gem_name }}</code></td>
        <td><code>{{ plugin.jekyll_plugin_id }}</code></td>
        <td><code>{{ plugin.compat.al_folio_min }}</code> - <code>{{ plugin.compat.al_folio_max }}</code></td>
        <td>{{ plugin.owner }}</td>
        <td><code>{{ plugin.demo_path }}</code></td>
        <td>{{ plugin.notes }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
{% endif %}

## Proposing a plugin for featuring

1. Open a **Plugin Feature Proposal** issue in this repo.
2. Provide plugin metadata (repo URL, gem name, plugin id, compatibility, demo path, maintainer contact).
3. Open a PR updating `_data/featured_plugins.yml`.
4. If requesting default starter bundling, include `Gemfile` and `_config.yml` wiring updates in the same PR.

Featuring and bundling are separate maintainer decisions.
