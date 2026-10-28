import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * GitHub Pages serves a project site from https://<user>.github.io/<repo>/,
 * so production assets need the repository name as their base path.
 *
 * The deploy workflow passes the real repository name through REPO_NAME,
 * so this default only matters for local `npm run build` / `npm run preview`.
 * Change it if you build locally under a different repository name.
 */
const DEFAULT_REPO_NAME = 'intelligence-lab';

export default defineConfig(({ command }) => {
  const repoName = process.env.REPO_NAME || DEFAULT_REPO_NAME;
  // A user/organization site (<user>.github.io) is served from the domain root.
  const isUserSite = repoName.toLowerCase().endsWith('.github.io');

  return {
    plugins: [react()],
    base: command === 'build' && !isUserSite ? `/${repoName}/` : '/',
    build: {
      outDir: 'dist',
    },
  };
});
