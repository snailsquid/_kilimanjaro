import { defineConfig } from 'astro/config';

function resolveBase() {
  if (process.env.BASE_PATH) {
    return process.env.BASE_PATH;
  }

  const repo = process.env.GITHUB_REPOSITORY;
  if (repo) {
    const [, repoName] = repo.split('/');
    if (repoName && repoName.endsWith('.github.io')) {
      return '/';
    }
    return `/${repoName}/`;
  }

  return '/';
}

function resolveSite() {
  if (process.env.SITE_URL) {
    return process.env.SITE_URL;
  }
  return undefined;
}

export default defineConfig({
  output: 'static',
  site: resolveSite(),
  base: resolveBase(),
});
