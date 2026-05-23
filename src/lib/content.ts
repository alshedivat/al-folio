const datedSlugPattern = /^(\d{4})-(\d{2})-(\d{2})-(.+?)(?:\.(?:md|mdx))?$/;

export function stripExtension(id: string) {
  return id.replace(/\.(md|mdx)$/, "");
}

export function datedSlug(entry: CollectionEntry<"blog">) {
  const normalized = stripExtension(entry.id);
  const match = normalized.match(datedSlugPattern);

  if (!match) {
    return {
      year: "notes",
      slug: normalized,
      date: new Date(0),
    };
  }

  const [, year, month, day, slug] = match;
  return {
    year,
    slug: slug.toLowerCase(),
    date: new Date(`${year}-${month}-${day}T00:00:00`),
  };
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatShortDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
