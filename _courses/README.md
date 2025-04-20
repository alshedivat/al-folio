# Course Collection

This directory contains course files for the teaching page. Each course is represented by a markdown file with frontmatter metadata.

## Adding New Courses

To add a new course, create a markdown file in the `_courses` directory with the following format:

```yaml
---
layout: course
title: Course Title
description: Course description
instructor: Your Name
year: 2023
term: Fall
location: Room 101
time: MWF 10:00-11:00
course_id: course-id # This should be unique
schedule:
  - week: 1
    date: Jan 10
    topic: Introduction
    description: Overview of course content and objectives
    materials:
      - name: Slides
        url: /assets/pdf/example_slides.pdf
      - name: Reading
        url: https://example.com/reading
  - week: 2
    date: Jan 17
    topic: Topic 2
    description: Description of this week's content
---
Additional course content, information, or resources can be added here as markdown.
```

## Important Notes

1. Each course file must have a unique `course_id` in the frontmatter
2. Course files will be grouped by `year` on the teaching page
3. Within each year, courses are sorted by `term`
4. The content below the frontmatter (written in markdown) will appear on the individual course page
5. The schedule section will be automatically formatted into a table

## Required Fields

- `layout: course` - Must be set to use the course layout
- `title` - The course title
- `year` - The year the course was/will be taught (used for sorting)
- `course_id` - A unique identifier for the course

## Optional Fields

- `description` - A brief description of the course
- `instructor` - The course instructor's name
- `term` - The academic term (e.g., Fall, Spring, Summer)
- `location` - The course location
- `time` - The course meeting time
- `schedule` - A list of course sessions with details
