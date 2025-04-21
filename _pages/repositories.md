---
layout: page
permalink: /repositories/
title: repositories
description:
nav: false
---

{% if site.data.repositories.github_users %}

## GitHub Users

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for user in site.data.repositories.github_users %}
    {% include repository/repo_user.liquid username=user %}
  {% endfor %}
</div>

{% endif %}

{% if site.data.repositories.github_organizations %}

## GitHub Organizations

<div class="repositories">
  {% for org in site.data.repositories.github_organizations %}
    <div class="organization-info" style="text-align: left; margin-bottom: 20px;">
      <h4 id="{{ org }}-display-name">Fetching organization name...</h4>
      <p id="{{ org }}-description">Fetching stats for {{ org }}...</p>

      <!-- This will be populated with stats dynamically -->
      <ul id="{{ org }}-stats">
        <li><strong>Public Repositories:</strong> Loading...</li>
        <li><strong>Followers:</strong> Loading...</li>
        <li><strong>Location:</strong> Loading...</li>
      </ul>

      <!-- This will be populated with repositories dynamically -->
      <h5>Repositories:</h5>
      <ul id="{{ org }}-repos">
        <li>Loading repositories...</li>
      </ul>

      <p>Visit our GitHub organization at <a href="https://github.com/{{ org }}" target="_blank">https://github.com/{{ org }}</a>.</p>
    </div>

    <hr>
  {% endfor %}
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const organizations = {{ site.data.repositories.github_organizations | jsonify }};

    // Cache last commit data to avoid redundant API calls
    let commitCache = {};

    organizations.forEach(org => {
      // Fetch organization info and stats
      fetch(`https://api.github.com/orgs/${org}`)
        .then(response => response.json())
        .then(data => {
          // Update the organization display name
          document.getElementById(`${org}-display-name`).textContent = data.name || org;

          // Update the organization stats on the page
          document.getElementById(`${org}-description`).textContent = data.description || "No description available.";
          document.getElementById(`${org}-stats`).innerHTML = `
            <li><strong>Public Repositories:</strong> ${data.public_repos}</li>
            <li><strong>Followers:</strong> ${data.followers}</li>
            <li><strong>Location:</strong> ${data.location || "No location available"}</li>
          `;

          // Fetch organization repositories with pagination
          fetchAllRepos(data.repos_url, org, 1, []);
        })
        .catch(error => {
          console.error('Error fetching organization data:', error);
          document.getElementById(`${org}-display-name`).textContent = org;
          document.getElementById(`${org}-description`).textContent = "Error fetching data";
          document.getElementById(`${org}-repos`).innerHTML = "<li>Error fetching repositories.</li>";
        });
    });

    // Function to recursively fetch repositories from paginated API and store them for sorting
    function fetchAllRepos(reposUrl, org, page, allRepos) {
      fetch(`${reposUrl}?per_page=100&page=${page}`)
        .then(response => response.json())
        .then(repos => {
          if (repos.length > 0) {
            // Append the current page of repositories to the allRepos array
            allRepos = allRepos.concat(repos);

            // If there are exactly 100 repos, fetch the next page
            if (repos.length === 100) {
              fetchAllRepos(reposUrl, org, page + 1, allRepos);
            } else {
              // Once all pages are fetched, sort the repositories by updated_at date
              allRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

              // Clear "Loading repositories..." and display sorted repositories
              const reposElement = document.getElementById(`${org}-repos`);
              reposElement.innerHTML = ''; // Clear the initial loading message

              allRepos.forEach(repo => {
                // Display the repo immediately
                reposElement.innerHTML += `<li id="${repo.name}"><a href="${repo.html_url}" target="_blank">${repo.name}</a>: ${repo.description || "No description available."} (Last updated: ${new Date(repo.updated_at).toLocaleDateString()})</li>`;

                // Fetch last commit info if not cached
                if (!commitCache[repo.name]) {
                  fetchLastCommit(repo);
                } else {
                  // If commit data is cached, use it
                  updateRepoWithLastCommit(repo, commitCache[repo.name]);
                }
              });
            }
          } else if (page === 1) {
            // If there are no repositories at all
            document.getElementById(`${org}-repos`).innerHTML = "<li>No repositories available.</li>";
          }
        })
        .catch(error => {
          console.error('Error fetching repositories:', error);
          document.getElementById(`${org}-repos`).innerHTML = "<li>Error fetching repositories.</li>";
        });
    }

    // Function to fetch the last commit details for each repository
    function fetchLastCommit(repo) {
      fetch(`${repo.url}/commits?per_page=1`)
        .then(response => response.json())
        .then(commits => {
          if (commits.length > 0) {
            const lastCommit = commits[0];
            const lastCommitter = lastCommit.commit.author.name;
            const lastCommitterUrl = lastCommit.author ? lastCommit.author.html_url : '#';
            const lastCommitDate = new Date(lastCommit.commit.author.date).toLocaleDateString();

            // Cache commit data to minimize API calls
            commitCache[repo.name] = {
              lastCommitter,
              lastCommitterUrl,
              lastCommitDate
            };

            // Update the repository list item with the last commit details
            updateRepoWithLastCommit(repo, commitCache[repo.name]);
          }
        })
        .catch(error => {
          console.error(`Error fetching last commit for ${repo.name}:`, error);
        });
    }

    // Function to update the repository list item with the last commit details
    function updateRepoWithLastCommit(repo, commitData) {
      const repoElement = document.getElementById(repo.name);
      if (repoElement) {
        repoElement.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>: 
          ${repo.description || "No description available."} 
          (Last updated: ${commitData.lastCommitDate} by <a href="${commitData.lastCommitterUrl}" target="_blank">${commitData.lastCommitter}</a>)
        `;
      }
    }
  });
</script>

{% endif %}

{% if site.data.repositories.github_repos %}

## GitHub Repositories

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>

{% endif %}
