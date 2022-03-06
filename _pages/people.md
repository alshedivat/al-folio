---
layout: page
permalink: /people/
title: people
description:
nav: true
person_types: ["Principal Investigator","Collaborators","PhD","PhD Rotation Students","Medical Students","Master's","Undergraduates","High School Summer"]
lab_types: ["Current","Previous"]
---

<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- PI -->
<div class="bg-white">
  <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
    <div class="space-y-8 sm:space-y-12">
      <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Principal Investigator</h2>
        <p class="text-xl text-gray-500">Figuring It Out</p>
      </div>


      {% assign members = site.people | where:"type","Principal Investigator" %}
      {% assign sorted_people = members | sort:"lab_type" %}

      {% for person in sorted_people %}
              {% if person.img %}
                {% if person.img=="placeholder" %}
                  <div class="flex justify-center aspect-w-3 aspect-h-2">
                    <img class="object-cover shadow-lg rounded-lg" src="/assets/img/blank_profile.png" alt="">
                  </div>
                {% else %}
                  <div class="flex justify-center aspect-w-3 aspect-h-2">
                    <img class="object-cover shadow-lg rounded-lg" src="{{ person.img | prepend: site.baseurl | prepend: site.url }}" alt="">
                  </div>
                {% endif %}
              {% endif %}
              <div class="space-y-2">
                <div class="text-lg leading-6 font-medium space-y-1">
                  <h3>{{ person.title }}</h3>
                  <p class="text-indigo-600">{{ person.description }}</p>
                  <a href="{{ person.url | prepend: site.baseurl | prepend: site.url }}" class="text-gray-400 hover:text-gray-500">
                    Profile
                  </a>
                </div>
              </div>
        {% endfor %}

        <!-- More people... -->


    </div>
  </div>
</div>

<!-- Collaborators -->
<div class="bg-white">
  <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
    <div class="space-y-8 sm:space-y-12">
      <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Collaborators</h2>
        <p class="text-xl text-gray-500">The Best Of The Best</p>
      </div>

      <ul role="list" class="h-auto mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">

        {% assign members = site.people | where:"type","Collaborators" %}
        {% assign sorted_people = members | sort:"lab_type" %}

        {% for person in sorted_people %}
            <li>
            <a class="text-indigo-600 hover:no-underline" href="{{ person.url | prepend: site.baseurl | prepend: site.url }}">
              <div class="p-2 space-y-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-100 duration-300">
                    {% if person.img %}
                      {% if person.img=="placeholder" %}
                        <img class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src="/levylab/assets/img/blank_profile.png" alt="">
                      {% else %}
                        <img class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src="{{ person.img | prepend: site.baseurl | prepend: site.url }}" alt="">
                      {% endif %}
                    {% endif %}

                    <!-- Gray font if "Former" -->
                    {% if person.lab_type=="Current" %}
                      <div class="space-y-2">
                        <div class="text-xs font-medium lg:text-sm">
                          <h3>{{ person.title }}</h3>
                          <p class="text-indigo-600"> {{ person.lab_type }}  {{ person.description }}</p>
                        </div>
                      </div>
                    {% else %}
                      <div class="space-y-2">
                        <div class="text-xs font-medium lg:text-sm">
                          <h3>{{ person.title }}</h3>
                          <p class="text-gray-600"> {{ person.lab_type }}  {{ person.description }}</p>
                        </div>
                      </div>
                    {% endif %}

                  </div>
                </a>
            </li>

        {% endfor %}
      </ul>
    </div>
  </div>
</div>

<!-- PhD Rotation Students -->
<div class="bg-white">
  <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
    <div class="flex-none space-y-8 sm:space-y-12">
      <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">PhD Rotation Students</h2>
        <p class="text-xl text-gray-500">The Future Of The Program</p>
      </div>

      <ul role="list" class="h-auto mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
        {% assign members = site.people | where:"type","PhD Rotation Students" %}
        {% assign sorted_people = members | sort:"lab_type" %}

        {% for person in sorted_people %}
            <li>
              <a class="text-indigo-600 hover:no-underline" href="{{ person.url | prepend: site.baseurl | prepend: site.url }}">
                <div class="p-2 space-y-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-100 duration-300">                    
                  {% if person.img %}
                      {% if person.img=="placeholder" %}
                        <img class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src="/levylab/assets/img/blank_profile.png" alt="">
                      {% else %}
                        <img class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src="{{ person.img | prepend: site.baseurl | prepend: site.url }}" alt="">
                      {% endif %}
                    {% endif %}

                    <!-- Gray font if "Former" -->
                    {% if person.lab_type=="Current" %}
                      <div class="space-y-2">
                        <div class="text-xs font-medium lg:text-sm">
                          <h3>{{ person.title }}</h3>
                          <p class="text-indigo-600"> {{ person.lab_type }}  {{ person.description }}</p>
                        </div>
                      </div>
                    {% else %}
                      <div class="space-y-2">
                        <div class="text-xs font-medium lg:text-sm">
                          <h3>{{ person.title }}</h3>
                          <p class="text-gray-600"> {{ person.lab_type }}  {{ person.description }}</p>
                        </div>
                      </div>
                    {% endif %}

                </div>
              </a>
            </li>

        {% endfor %}
      </ul>
    </div>
  </div>
</div>

<!-- Master's -->
<div class="bg-white">
  <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
    <div class="space-y-8 sm:space-y-12">
      <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Master's</h2>
        <p class="text-xl text-gray-500">Getting Ahead Of The Curve</p>
      </div>

      <ul role="list" class="h-auto mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
        {% assign members = site.people | where:"type","Master's" %}
        {% assign sorted_people = members | sort:"lab_type" %}

        {% for person in sorted_people %}
            <li>
              <a class="text-indigo-600 hover:no-underline" href="{{ person.url | prepend: site.baseurl | prepend: site.url }}">
                <div class="p-2 space-y-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-100 duration-300">                      
                  {% if person.img %}
                      {% if person.img=="placeholder" %}
                        <img class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src="/levylab/assets/img/blank_profile.png" alt="">
                      {% else %}
                        <img class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src="{{ person.img | prepend: site.baseurl | prepend: site.url }}" alt="">
                      {% endif %}
                    {% endif %}
                    <!-- Gray font if "Former" -->
                    {% if person.lab_type=="Current" %}
                      <div class="space-y-2">
                        <div class="text-xs font-medium lg:text-sm">
                          <h3>{{ person.title }}</h3>
                          <p class="text-indigo-600"> {{ person.lab_type }}  {{ person.description }}</p>
                        </div>
                      </div>
                    {% else %}
                      <div class="space-y-2">
                        <div class="text-xs font-medium lg:text-sm">
                          <h3>{{ person.title }}</h3>
                          <p class="text-gray-600"> {{ person.lab_type }}  {{ person.description }}</p>
                        </div>
                      </div>
                    {% endif %}
                </div>
              </a>
            </li>

        {% endfor %}
      </ul>
    </div>
  </div>
</div>

<!-- Undergraduates -->
<div class="bg-white">
  <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
    <div class="space-y-8 sm:space-y-12">
      <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Undergraduates</h2>
        <p class="text-xl text-gray-500">Always Learning, Always Growing</p>
      </div>

      <ul role="list" class="h-auto mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
        {% assign members = site.people | where:"type","Undergraduates" %}
        {% assign sorted_people = members | sort:"lab_type" %}

        {% for person in sorted_people %}
            <li>
              <a class="text-indigo-600 hover:no-underline" href="{{ person.url | prepend: site.baseurl | prepend: site.url }}">
                <div class="p-2 space-y-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-100 duration-300">                      
                  {% if person.img %}
                      {% if person.img=="placeholder" %}
                        <img class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src="/levylab/assets/img/blank_profile.png" alt="">
                      {% else %}
                        <img class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src="{{ person.img | prepend: site.baseurl | prepend: site.url }}" alt="">
                      {% endif %}
                    {% endif %}

                    <!-- Gray font if "Former" -->
                    {% if person.lab_type=="Current" %}
                      <div class="space-y-2">
                        <div class="text-xs font-medium lg:text-sm">
                          <h3>{{ person.title }}</h3>
                          <p class="text-indigo-600"> {{ person.lab_type }}  {{ person.description }}</p>
                        </div>
                      </div>
                    {% else %}
                      <div class="space-y-2">
                        <div class="text-xs font-medium lg:text-sm">
                          <h3>{{ person.title }}</h3>
                          <p class="text-gray-600"> {{ person.lab_type }}  {{ person.description }}</p>
                        </div>
                      </div>
                    {% endif %}

                </div>
              </a>
            </li>

        {% endfor %}
      </ul>
    </div>
  </div>
</div>

<!-- High School Summer -->
<div class="bg-white">
  <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
    <div class="space-y-8 sm:space-y-12">
      <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">High School Summer</h2>
        <p class="text-xl text-gray-500">Our Future Rockstars</p>
      </div>

      <ul role="list" class="h-auto mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6">
        {% assign members = site.people | where:"type","High School Summer" %}
        {% assign sorted_people = members | sort:"lab_type" %}

        {% for person in sorted_people %}
            <li>
              <a class="text-indigo-600 hover:no-underline" href="{{ person.url | prepend: site.baseurl | prepend: site.url }}">
                <div class="p-2 space-y-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-100 duration-300">   
                  {% if person.img %}
                      {% if person.img=="placeholder" %}
                        <img class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src="/levylab/assets/img/blank_profile.png" alt="">
                      {% else %}
                        <img class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24" src="{{ person.img | prepend: site.baseurl | prepend: site.url }}" alt="">
                      {% endif %}
                    {% endif %}

                    <!-- Gray font if "Former" -->
                    {% if person.lab_type=="Current" %}
                      <div class="space-y-2">
                        <div class="text-xs font-medium lg:text-sm">
                          <h3>{{ person.title }}</h3>
                          <p class="text-indigo-600"> {{ person.lab_type }}  {{ person.description }}</p>
                        </div>
                      </div>
                    {% else %}
                      <div class="space-y-2">
                        <div class="text-xs font-medium lg:text-sm">
                          <h3>{{ person.title }}</h3>
                          <p class="text-gray-600"> {{ person.lab_type }}  {{ person.description }}</p>
                        </div>
                      </div>
                    {% endif %}

                </div>
              </a>
            </li>

        {% endfor %}
      </ul>
    </div>
  </div>
</div>
