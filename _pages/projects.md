---
layout: page
title: projects
permalink: /projects/
description:
nav: true
nav_order: 3
display_categories: []
horizontal: false
---

<style>
  :root {
    --global-theme-color: #dc3545;
    --global-hover-color: #dc3545;
  }

  .projects-grid {
    display: grid;
    gap: 2rem;
    margin: 2rem 0 4rem;
  }

  .project-card {
    position: relative;
    padding: 2rem;
    border: 1px solid #e6e6e6;
    border-radius: 18px;
    background: #fbfaf8;
    box-shadow: 0 6px 24px rgba(0,0,0,0.04);
    transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
  }

  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(0,0,0,0.08);
    border-color: #dcd6d0;
  }

  .project-card h2 {
    margin: 0 0 0.6rem;
    font-size: 1.9rem;
    line-height: 1.2;
  }

  .project-card p {
    margin: 0 0 1rem;
    font-size: 1.05rem;
    color: #333;
  }

  .project-meta {
    font-size: 0.95rem;
    color: #666;
  }

  .project-arrow {
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.6rem;
    color: #c4bdb5;
    transition: transform 160ms ease, color 160ms ease;
  }

  .project-card:hover .project-arrow {
    color: var(--global-theme-color);
    transform: translate(4px, -50%);
  }

  .project-card a {
    color: inherit;
    text-decoration: none;
  }

  .project-card a:focus {
    outline: 2px solid var(--global-theme-color);
    outline-offset: 6px;
  }

  @media (max-width: 720px) {
    .project-card {
      padding: 1.5rem;
    }

    .project-arrow {
      position: static;
      display: inline-block;
      transform: translateY(0);
      margin-left: 0.35rem;
    }
  }
</style>

<div class="projects-grid">
  <a class="project-card" href="https://none-momo.github.io/anthropic-notes/">
    <h2>AI using Notes</h2>
    <p>Study how to use Claude together!</p>
    <div class="project-meta">TypeScript · Research notes</div>
    <span class="project-arrow">→</span>
  </a>

  <a class="project-card" href="https://github.com/None-Momo">
    <h2>Open learning resources</h2>
    <p>My own study materials.</p>
    <div class="project-meta">Open resources · Community friendly</div>
    <span class="project-arrow">→</span>
  </a>
</div>
