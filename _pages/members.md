---
layout: members
title: members
permalink: /members
nav: true
nav_order: 1
---

<h1>Members</h1>

<div class="">
{% assign sorted = site.members | sort: "start-date" %}
<h3>CURRENT</h3>
{% for member in sorted %}
    {% if member.state == "current" %}
    <div class="cards">
        <div class="card">
            <img class="card-img-top img-thumbnail circle" style="width: 120px; height: 120px; margin: 0px auto;" src="{%- if member.image %}{{ member.image | relative_url }}{% else %}{{ 'assets/members/profile-placeholder.png' | relative_url }}{% endif %}" />
            <div class="card-body">
                <h3 class="text-center card-title mt-0"><strong>{{ member.name }}</strong></h3>
                {% if member.pronouns %}<span class="text-center text-mute d-block">{{member.pronouns}}</span>{% endif %}
                <span class="text-center d-block">{{member.position}}</span>
                <p class="card-text text-left">{{member.description | markdownify}} 
                    {% if member.start-date %} 
                    <br>Joined the lab on {{member.start-date}}.
                    {% endif %}
                </p>
            </div>
            <div class="card-footer text-center">
                {% if member.email %}<a class="text-dark" href="mailto:{{ member.email | encode_email }}"><i class="fas fa-envelope"></i></a>{% endif %}
                {% if member.orcid_id %}<a class="text-dark" href="https://orcid.org/{{ member.orcid_id }}" target="_blank" title="ORCID"><i class="fab fa-orcid""></i></a>{% endif %}
                {% if member.scholar_userid %}<a class="text-dark" href="https://scholar.google.com/citations?user={{ member.scholar_userid }}" target="_blank" title="Google Scholar"><i class="fas fa-graduation-cap"></i></a>{% endif %}
                {% if member.research_gate_profile %}<a class="text-dark" href="https://www.researchgate.net/profile/{{member.research_gate_profile}}/" target="_blank" title="ResearchGate"><i class="fab fa-researchgate"></i></a>{% endif %}
                {% if member.github_username %}<a class="text-dark" href="https://github.com/{{ member.github_username }}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>{% endif %}
                {% if member.linkedin_username %}<a class="text-dark" href="https://www.linkedin.com/in/{{ member.linkedin_username }}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>{% endif %}
                {% if member.twitter_username %}<a class="text-dark" href="https://twitter.com/{{ member.twitter_username }}" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>{% endif %}
                {% if member.medium_username %}<a class="text-dark" href="https://medium.com/@{{ member.medium_username }}" target="_blank" title="Medium"><i class="fab fa-medium"></i></a>{% endif %}
                {% if member.quora_username %}<a class="text-dark" href="https://www.quora.com/profile/{{ member.quora_username }}" target="_blank" title="Quora"><i class="fab fa-quora"></i></a>{% endif %}
                {% if member.blogger_url %}<a class="text-dark" href="{{ member.blogger_url }}" target="_blank" title="Blogger"><i class="fab fa-blogger-b"></i></a>{% endif %}
                {% if member.work_url %}<a class="text-dark" href="{{ member.work_url }}" target="_blank" title="Work"><i class="fas fa-briefcase"></i></a>{% endif %}
                {% if member.wikidata_id %}<a class="text-dark" href="https://www.wikidata.org/wiki/{{ member.wikidata_id }}" target="_blank" title="Wikidata"><i class="fas fa-barcode"></i></a>{% endif %}
                {% if member.strava_userid %}<a class="text-dark" href="https://www.strava.com/athletes/{{ member.strava_userid }}" target="_blank" title="Strava"><i class="fab fa-strava"></i></a>{% endif %}
                {% if member.keybase_username %}<a class="text-dark" href="https://keybase.io/{{ member.keybase_username }}" target="_blank" title="Keybase"><i class="fab fa-keybase"></i></a>{% endif %}
                {% if member.gitlab_username %}<a class="text-dark" href="https://gitlab.com/{{ member.gitlab_username }}" target="_blank" title="GitLab"><i class="fab fa-gitlab"></i></a>{% endif %}
            </div>
        </div>
    </div>
    {% endif %}
{% endfor %}
<hr>
<h3>MASTER</h3>
{% for member in sorted %}
    {% if member.state == "master" %}
    <div class="cards">
        <div class="card">
            <img class="card-img-top img-thumbnail circle" style="width: 120px; height: 120px; margin: 0px auto;" src="{%- if member.image %}{{ member.image | relative_url }}{% else %}{{ 'assets/members/profile-placeholder.png' | relative_url }}{% endif %}" />
            <div class="card-body">
                <h3 class="text-center card-title mt-0"><strong>{{ member.name }}</strong></h3>
                {% if member.pronouns %}<span class="text-center text-mute d-block">{{member.pronouns}}</span>{% endif %}
                <span class="text-center d-block">{{member.position}}</span>
                <p class="card-text text-left">{{member.description | markdownify}} 
                    {% if member.start-date %} 
                    <br>Joined the lab on {{member.start-date}}.
                    {% endif %}
                </p>
            </div>
            <div class="card-footer text-center">
                {% if member.email %}<a class="text-dark" href="mailto:{{ member.email | encode_email }}"><i class="fas fa-envelope"></i></a>{% endif %}
                {% if member.orcid_id %}<a class="text-dark" href="https://orcid.org/{{ member.orcid_id }}" target="_blank" title="ORCID"><i class="fab fa-orcid""></i></a>{% endif %}
                {% if member.scholar_userid %}<a class="text-dark" href="https://scholar.google.com/citations?user={{ member.scholar_userid }}" target="_blank" title="Google Scholar"><i class="fas fa-graduation-cap"></i></a>{% endif %}
                {% if member.research_gate_profile %}<a class="text-dark" href="https://www.researchgate.net/profile/{{member.research_gate_profile}}/" target="_blank" title="ResearchGate"><i class="fab fa-researchgate"></i></a>{% endif %}
                {% if member.github_username %}<a class="text-dark" href="https://github.com/{{ member.github_username }}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>{% endif %}
                {% if member.linkedin_username %}<a class="text-dark" href="https://www.linkedin.com/in/{{ member.linkedin_username }}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>{% endif %}
                {% if member.twitter_username %}<a class="text-dark" href="https://twitter.com/{{ member.twitter_username }}" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>{% endif %}
                {% if member.medium_username %}<a class="text-dark" href="https://medium.com/@{{ member.medium_username }}" target="_blank" title="Medium"><i class="fab fa-medium"></i></a>{% endif %}
                {% if member.quora_username %}<a class="text-dark" href="https://www.quora.com/profile/{{ member.quora_username }}" target="_blank" title="Quora"><i class="fab fa-quora"></i></a>{% endif %}
                {% if member.blogger_url %}<a class="text-dark" href="{{ member.blogger_url }}" target="_blank" title="Blogger"><i class="fab fa-blogger-b"></i></a>{% endif %}
                {% if member.work_url %}<a class="text-dark" href="{{ member.work_url }}" target="_blank" title="Work"><i class="fas fa-briefcase"></i></a>{% endif %}
                {% if member.wikidata_id %}<a class="text-dark" href="https://www.wikidata.org/wiki/{{ member.wikidata_id }}" target="_blank" title="Wikidata"><i class="fas fa-barcode"></i></a>{% endif %}
                {% if member.strava_userid %}<a class="text-dark" href="https://www.strava.com/athletes/{{ member.strava_userid }}" target="_blank" title="Strava"><i class="fab fa-strava"></i></a>{% endif %}
                {% if member.keybase_username %}<a class="text-dark" href="https://keybase.io/{{ member.keybase_username }}" target="_blank" title="Keybase"><i class="fab fa-keybase"></i></a>{% endif %}
                {% if member.gitlab_username %}<a class="text-dark" href="https://gitlab.com/{{ member.gitlab_username }}" target="_blank" title="GitLab"><i class="fab fa-gitlab"></i></a>{% endif %}
            </div>
        </div>
    </div>
    {% endif %}
{% endfor %}

<hr>
<h3>ALUMNI</h3>
{% for member in sorted %}
    {% if member.state == "alumni" %}
    <div class="cards">
        <div class="card">
            <img class="card-img-top img-thumbnail circle" style="width: 120px; height: 120px; margin: 0px auto;" src="{%- if member.image %}{{ member.image | relative_url }}{% else %}{{ 'assets/members/profile-placeholder.png' | relative_url }}{% endif %}" />
            <div class="card-body">
                <h3 class="text-center card-title mt-0"><strong>{{ member.name }}</strong></h3>
                {% if member.pronouns %}<span class="text-center text-mute d-block">{{member.pronouns}}</span>{% endif %}
                <span class="text-center d-block">{{member.position}}</span>
                <p class="card-text text-left">{{member.description | markdownify}} 
                    <br> {{member.name}} was working with us from {{member.start-date}} to {{member.end-date}}, and has since moved on to be {{member.current}}.
                </p>
            </div>
            <div class="card-footer text-center">
                {% if member.email %}<a class="text-dark" href="mailto:{{ member.email | encode_email }}"><i class="fas fa-envelope"></i></a>{% endif %}
                {% if member.orcid_id %}<a class="text-dark" href="https://orcid.org/{{ member.orcid_id }}" target="_blank" title="ORCID"><i class="fab fa-orcid""></i></a>{% endif %}
                {% if member.scholar_userid %}<a class="text-dark" href="https://scholar.google.com/citations?user={{ member.scholar_userid }}" target="_blank" title="Google Scholar"><i class="fas fa-graduation-cap"></i></a>{% endif %}
                {% if member.research_gate_profile %}<a class="text-dark" href="https://www.researchgate.net/profile/{{member.research_gate_profile}}/" target="_blank" title="ResearchGate"><i class="fab fa-researchgate"></i></a>{% endif %}
                {% if member.github_username %}<a class="text-dark" href="https://github.com/{{ member.github_username }}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>{% endif %}
                {% if member.linkedin_username %}<a class="text-dark" href="https://www.linkedin.com/in/{{ member.linkedin_username }}" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>{% endif %}
                {% if member.twitter_username %}<a class="text-dark" href="https://twitter.com/{{ member.twitter_username }}" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>{% endif %}
                {% if member.medium_username %}<a class="text-dark" href="https://medium.com/@{{ member.medium_username }}" target="_blank" title="Medium"><i class="fab fa-medium"></i></a>{% endif %}
                {% if member.quora_username %}<a class="text-dark" href="https://www.quora.com/profile/{{ member.quora_username }}" target="_blank" title="Quora"><i class="fab fa-quora"></i></a>{% endif %}
                {% if member.blogger_url %}<a class="text-dark" href="{{ member.blogger_url }}" target="_blank" title="Blogger"><i class="fab fa-blogger-b"></i></a>{% endif %}
                {% if member.work_url %}<a class="text-dark" href="{{ member.work_url }}" target="_blank" title="Work"><i class="fas fa-briefcase"></i></a>{% endif %}
                {% if member.wikidata_id %}<a class="text-dark" href="https://www.wikidata.org/wiki/{{ member.wikidata_id }}" target="_blank" title="Wikidata"><i class="fas fa-barcode"></i></a>{% endif %}
                {% if member.strava_userid %}<a class="text-dark" href="https://www.strava.com/athletes/{{ member.strava_userid }}" target="_blank" title="Strava"><i class="fab fa-strava"></i></a>{% endif %}
                {% if member.keybase_username %}<a class="text-dark" href="https://keybase.io/{{ member.keybase_username }}" target="_blank" title="Keybase"><i class="fab fa-keybase"></i></a>{% endif %}
                {% if member.gitlab_username %}<a class="text-dark" href="https://gitlab.com/{{ member.gitlab_username }}" target="_blank" title="GitLab"><i class="fab fa-gitlab"></i></a>{% endif %}
            </div>
        </div>
    </div>
    {% endif %}
{% endfor %}
</div>
