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
              // Fetch last commit for all repos, then sort and display
              fetchAllCommitsAndSort(allRepos, org);
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

    // Function to fetch last commits for all repos, then sort and display
    function fetchAllCommitsAndSort(repos, org) {
      const reposElement = document.getElementById(`${org}-repos`);
      reposElement.innerHTML = '<li>Loading commit information...</li>';

      // Fetch all commits in parallel
      const commitPromises = repos.map(repo => {
        if (commitCache[repo.name]) {
          return Promise.resolve({ repo, commitData: commitCache[repo.name] });
        }
        return fetch(`${repo.url}/commits?per_page=1`)
          .then(response => response.json())
          .then(commits => {
            if (commits.length > 0) {
              const lastCommit = commits[0];
              const commitData = {
                lastCommitter: lastCommit.author ? lastCommit.author.login : lastCommit.commit.author.name,
                lastCommitterUrl: lastCommit.author ? lastCommit.author.html_url : '#',
                lastCommitDate: new Date(lastCommit.commit.author.date),
                lastCommitDateString: new Date(lastCommit.commit.author.date).toLocaleDateString()
              };
              commitCache[repo.name] = commitData;
              return { repo, commitData };
            }
            return { repo, commitData: null };
          })
          .catch(error => {
            console.error(`Error fetching commit for ${repo.name}:`, error);
            return { repo, commitData: null };
          });
      });

      // Wait for all commits to be fetched, then sort and display
      Promise.all(commitPromises).then(results => {
        // Sort by last commit date (most recent first)
        results.sort((a, b) => {
          const dateA = a.commitData ? a.commitData.lastCommitDate : new Date(a.repo.updated_at);
          const dateB = b.commitData ? b.commitData.lastCommitDate : new Date(b.repo.updated_at);
          return dateB - dateA;
        });

        // Clear and display sorted repositories
        reposElement.innerHTML = '';
        results.forEach(({ repo, commitData }) => {
          const li = document.createElement('li');
          li.id = repo.name;

          if (commitData) {
            li.innerHTML = `
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>:
              ${repo.description || "No description available."}
              (Last updated: ${commitData.lastCommitDateString} by <a href="${commitData.lastCommitterUrl}" target="_blank">${commitData.lastCommitter}</a>)
            `;
          } else {
            li.innerHTML = `
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>:
              ${repo.description || "No description available."}
              (Last updated: ${new Date(repo.updated_at).toLocaleDateString()})
            `;
          }
          reposElement.appendChild(li);
        });
      });
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
