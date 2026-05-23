# Arnau Jimenez Castany

Personal website built with [Astro](https://astro.build/).

## Development

```bash
npm install
npm run dev
```

The local site runs at:

```text
http://127.0.0.1:4321/
```

## Build

```bash
npm run build
```

The static output is written to `dist/`.

## Deployment

GitHub Pages is deployed from `.github/workflows/deploy.yml` whenever `master`
is updated. The workflow builds the Astro site and publishes the generated
`dist/` artifact.

## Project Structure

```text
src/content/blog/      Blog posts
src/content/news/      Homepage news items
src/components/        Reusable Astro components
src/layouts/           Page shell and shared metadata
src/pages/             Routes
src/styles/            Site styles
public/assets/         Static images and files
```
