# Portfolio

A YAML-driven static portfolio built with Astro and deployed to GitHub Pages.

## Content

All editable content lives in `src/data/`:

- `profile.yml` — name, title, tagline, email, links
- `experience.yml` — work history
- `projects.yml` — project entries
- `skills.yml` — skills grouped by category

Bots and humans should edit only these YAML files. The site and components read from them at build time.

## Local development

```bash
bun install
bun run dev
```

Validate content:

```bash
bun run validate
```

Build for production:

```bash
bun run build
```

## Custom domain

1. Go to the repository's **Settings > Pages**.
2. Under **Custom domain**, enter your domain and save.
3. Run the **Deploy to GitHub Pages** workflow manually with the `cname` input.

The workflow writes `dist/CNAME` and forces `BASE_PATH=/`.
