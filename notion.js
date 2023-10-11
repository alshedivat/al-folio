import { Client } from '@notionhq/client'
import dotenv from 'dotenv'

import { NotionToMarkdown } from 'notion-to-md'
import * as fs from 'fs'

dotenv.config()
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const response = await notion.databases.query({
  database_id: process.env.NOTION_DATABASE_ID,
})

const n2m = new NotionToMarkdown({ notionClient: notion})

const kebabCase = str => str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .join('-')
        .toLowerCase();
const pages = response
  .results
  .filter(x => x.properties.Name.title.length > 0)

pages.map(async x => {
  const mdBlocks = await n2m.pageToMarkdown(x.id)
  const content = n2m.toMarkdownString(mdBlocks)
  const createdDate = x.created_time.split('T')[0]
  //const createdTime = x.created_time
  const publishTime = x.properties.Published.date.start

  const Categories = x.properties.Category.select.name

  const description = x.properties.Description.rich_text[0].plain_text

  const title = x.properties.Name.title[0].plain_text
  const filename = kebabCase(title)
  const tags = x.properties.Tags.multi_select
    .map(x => `  - ${x.name}`)
    .join('\n')
  const pageContent =
`---
layout: post
title: ${title}
date: ${publishTime}
description: ${description}
tags:
${tags}
categories: ${Categories}
giscus_comments: true
toc:
  sidebar: right
featured: false
related_posts: false
datatable: true
---
${content}
`
  fs.writeFile(`./_posts/${createdDate}-${filename}.md`, pageContent, (err) => {
    console.log(err);
  });
  return
});
