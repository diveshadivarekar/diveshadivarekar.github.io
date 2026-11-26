/**
 * Runs after `astro build`. Copies the parts of the old site that must keep working
 * into dist/, redirects the old blog page, writes the sitemap, then checks that every
 * local link in the new pages points to a real file.
 */
import { cpSync, existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const dist = resolve(here, '../dist');
const site = 'https://diveshadivarekar.github.io';

// Stand-alone projects and files, kept at the same addresses.
const folders = ['team-drps', 'evalioai', 'fluid', 'feed_me_more', 'documents', 'favicon'];
// Older pages that are not rebuilt yet, plus the styles, scripts and images they use.
const pages = ['flowchart.html', 'holi.html', 'microproject.html', 'msbte-paper.html', 'paper.html', 'sequence.html', 'writeups.html'];
const support = ['css', 'js', 'fonts', 'images', 'component', 'Json'];
const files = ['robots.txt', 'ads.txt', 'google76ff971fb87cb1a8.html'];

const junk = (path) => /[\\/](\.DS_Store|node_modules)$/.test(path);

for (const name of [...folders, ...pages, ...support, ...files]) {
  const from = join(root, name);
  const to = join(dist, name);
  if (!existsSync(from)) throw new Error(`Missing from the repository: ${name}`);
  if (statSync(from).isFile() && existsSync(to)) throw new Error(`Would overwrite a new page: ${name}`);
  cpSync(from, to, { recursive: true, filter: (path) => !junk(path) });
}

writeFileSync(
  join(dist, 'blog.html'),
  `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Moved to Achievements</title>
  <link rel="canonical" href="${site}/achievements.html">
  <meta http-equiv="refresh" content="0; url=/achievements.html">
</head>
<body><p>This page has moved to <a href="/achievements.html">Achievements</a>.</p></body>
</html>
`,
);

const listed = [
  '/', '/work.html', '/achievements.html', '/about.html', '/contact.html',
  '/team-drps/', '/evalioai/', '/writeups.html', '/microproject.html',
];
const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${listed.map((path) => `  <url><loc>${site}${path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`,
);

// Link check for the new pages.
const built = ['index.html', 'work.html', 'achievements.html', 'about.html', 'contact.html', '404.html'];
const broken = [];
for (const page of built) {
  const html = readFileSync(join(dist, page), 'utf8');
  for (const [, raw] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    if (raw.startsWith('//')) continue;
    const path = decodeURIComponent(raw.replaceAll('&#38;', '&').split(/[?#]/)[0]);
    const target = join(dist, path.endsWith('/') ? `${path}index.html` : path);
    if (!existsSync(target)) broken.push(`${page} -> ${raw}`);
  }
}
if (broken.length) throw new Error(`Broken local links:\n${broken.join('\n')}`);

const count = readdirSync(dist, { recursive: true }).length;
console.log(`postbuild: copied legacy files, wrote sitemap, checked links on ${built.length} pages (${count} items in dist)`);
