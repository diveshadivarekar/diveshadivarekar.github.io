# Portfolio redesign (Astro + Tailwind)

```sh
npm install
npm run dev      # local preview with live reload
npm run build    # output goes to dist/
```

Astro asks for a newer Node.js 22 release than 22.14, so update Node if you see engine warnings.

`npm run build` also copies the older project pages and documents into `dist/`, writes
the sitemap and fails if a local link on a new page is broken. `npm run dev` shows only the
new pages, so links to documents and older pages work only after a build
(`npm run preview`).

## Where to edit

- CV details (stats, experience, education, awards, patents, skills): `src/data/profile.ts`
- Major projects and their pictures: `src/data/caseStudies.ts`
- Smaller projects: add to `../Json/work-data.json`; categories and summaries are in
  `src/data/projects.ts`
- Achievements timeline: add to `../Json/blog-data.json`; filter groups and awards are in
  `src/data/achievements.ts`
- Your photo: save it as `src/assets/photo.jpg` and it replaces the certificates beside the
  Home and About introductions
- Project screenshots: see `src/assets/projects/README.txt`
- Certificate images: `src/data/certificates.ts`
- Five project links that returned "not found" are hidden in `src/data/projects.ts`
- Résumé: replace `public/Divesh-Adivarekar-Resume.pdf`
- GitHub graph: each build saves your public activity to `src/data/github.json`; if GitHub
  can't be reached, the saved copy is used. The deployment also rebuilds daily
- Scroll effects: `src/scripts/motion.ts`. They are off for visitors who reduce motion
- Colours: `src/styles/global.css`. Header, footer and share tags: `src/layouts/Base.astro`
- Contact form: paste a Web3Forms access key into `src/pages/contact.astro` to send messages
  directly; without one it opens the visitor's email app

## Going live (not done yet)

1. Read through the pages with `npm run build` and `npm run preview`.
2. In the GitHub repository, set Settings > Pages > Source to **GitHub Actions**.
3. Commit, then merge the `redesign` branch into `main`. `.github/workflows/deploy.yml`
   builds and publishes the site.
4. Check the live site, send a test message and resubmit the sitemap in Search Console.

To go back, switch the Pages source to "Deploy from a branch" (`main`, root). The old
pages are still in the repository root.

The new pages carry no AdSense code. The older pages still do.
