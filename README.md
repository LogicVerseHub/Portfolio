# INTELLIGENCE LAB

**Computer Science Student | AI & Data Engineering**

An interactive portfolio built as a small "developer lab": an animated data network, a technology system map, an educational data-pipeline simulation, a skills explorer, a project gallery, a learning journal, and a safe, simulated terminal.

Built with React, TypeScript, Vite, Tailwind CSS, Motion for React, and Lucide icons. No backend, no API keys, no database.

---

## Publish on GitHub Pages (no local install needed)

GitHub builds and deploys the site for you with GitHub Actions.

1. **Create a repository** on GitHub (for example `intelligence-lab`).
   GitHub Free only supports Pages on **public** repositories — make sure you are comfortable with the code being public.
2. **Upload the files.** On the new repository page choose **Add file → Upload files**, then drag in the *contents* of this folder (including the `.github` folder, `src`, `public`, `index.html`, `package.json`, etc.). Don't upload `node_modules` or `dist`. Commit to the `main` branch.
   > Tip: if your file manager hides the `.github` folder, enable "show hidden items", or create the file manually via **Add file → Create new file** with the path `.github/workflows/deploy.yml` and paste its contents.
3. **Turn on Pages.** Go to **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
4. **Wait for the deploy.** Open the **Actions** tab; the *Deploy to GitHub Pages* workflow runs on every push to `main` (you can also start it manually with **Run workflow**). When it finishes, your site is live at:

   ```
   https://<your-username>.github.io/<repository-name>/
   ```

The workflow passes the repository name to Vite, so the base path is always correct — you don't need to edit anything if you choose a different repository name. A repository named `<your-username>.github.io` is deployed at the domain root automatically.

---

## Local development (optional)

Requires [Node.js](https://nodejs.org/) 18 or newer.

```bash
npm install
npm run dev        # start the dev server at http://localhost:5173
npm run build      # type-check and build into dist/
npm run preview    # serve the production build locally
```

Committing the generated `package-lock.json` after `npm install` is recommended; the workflow will then use `npm ci` for reproducible builds.

For local production builds the base path defaults to `/intelligence-lab/`. Change `DEFAULT_REPO_NAME` in `vite.config.ts` if your repository has a different name, or run `REPO_NAME=my-repo npm run build`.

---

## Editing content

All content lives in `src/data/` — you don't need to touch the components.

| File | What it controls |
| --- | --- |
| `site.ts` | Headline, bio, philosophy, navigation, **contact links** |
| `technologies.ts` | Technology cards and the system map |
| `pipeline.ts` | Pipeline simulation stages |
| `skills.ts` | Skills explorer, including each topic's **status** |
| `projects.ts` | Project gallery |
| `learning.ts` | Learning journal timeline |

### Contact links
In `src/data/site.ts`, fill in any of `github`, `linkedin`, `email`. Empty values are hidden. If all are empty, the Contact section shows a neutral closing message instead of buttons.

### Skill statuses
Each skill in `src/data/skills.ts` has a `status`: `'learning'`, `'explored'`, or `'demonstrated'`. Only use `'demonstrated'` once a project on the site shows that skill.

### Projects
Replace the three example entries in `src/data/projects.ts`. Remove `isPlaceholder: true` from real projects. Only add `repoUrl` / `demoUrl` when the links exist. For a screenshot, put the image in `public/screenshots/` and set:

```ts
screenshot: { src: 'screenshots/my-project.png', alt: 'Dashboard showing daily revenue by category' }
```

### Learning journal
Add objects to the array in `src/data/learning.ts` (newest first) and delete the placeholders:

```ts
{
  id: 'delta-lake-basics',
  title: 'Delta Lake basics',
  topic: 'Data Engineering',
  date: '2025-03-14',            // optional
  summary: 'What I learned…',
  technology: 'Databricks',
  projectUrl: 'https://…',       // optional
  status: 'completed',           // 'up-next' | 'in-progress' | 'completed'
}
```

---

## Project structure

```
.github/workflows/deploy.yml   GitHub Pages deployment
public/                        Static files (favicon, screenshots)
src/
  components/                  Reusable UI (Navbar, Terminal, Section, …)
  sections/                    Page sections (Hero, About, TechStack, …)
  data/                        Editable content
  hooks/                       useActiveSection, useMediaQuery
  types/                       Shared TypeScript types
  styles/index.css             Tailwind layers and custom effects
```

## Accessibility & motion

- Semantic landmarks, skip link, visible focus states, and ARIA state on every toggle.
- All interactions work with mouse, touch, and keyboard.
- `prefers-reduced-motion` is respected: decorative loops stop, Motion transforms are disabled, the cursor glow and parallax are turned off, and the pipeline simulation starts paused.

## Notes

- The pipeline section is an **educational simulation**; it processes no data and connects to no services.
- The terminal is a portfolio interaction: it matches a fixed list of commands, with no shell access, `eval`, or network calls.
- Product names are trademarks of their respective owners and are used for identification only.
