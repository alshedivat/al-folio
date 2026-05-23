import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
});

const news = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/news",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
});

const pages = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/pages",
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ""),
  }),
});

export const collections = { blog, news, pages };
