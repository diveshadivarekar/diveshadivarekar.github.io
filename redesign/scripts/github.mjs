/**
 * Saves public GitHub activity to src/data/github.json before each build.
 * No token is needed. If GitHub can't be reached or its page changes, the build
 * continues with the last saved copy.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const user = 'diveshadivarekar';
const file = new URL('../src/data/github.json', import.meta.url);

async function get(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'portfolio-build', 'X-Requested-With': 'XMLHttpRequest' },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`${response.status} from ${url}`);
  return response;
}

/** Reads the calendar that GitHub shows on the public profile page. */
async function contributions() {
  const html = await (await get(`https://github.com/users/${user}/contributions`)).text();
  const counts = new Map();
  for (const [, id, text] of html.matchAll(/<tool-tip[^>]*\sfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    counts.set(id, Number(text.trim().match(/^[\d,]+/)?.[0].replaceAll(',', '') ?? 0));
  }
  const days = [];
  for (const [cell] of html.matchAll(/<td[^>]*data-date="[^"]+"[^>]*>/g)) {
    const attribute = (name) => cell.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
    const id = attribute('id');
    if (!counts.has(id)) throw new Error('Contribution counts not found: GitHub page format changed');
    days.push({ date: attribute('data-date'), level: Number(attribute('data-level')), count: counts.get(id) });
  }
  if (days.length < 300) throw new Error('Contribution calendar not found: GitHub page format changed');
  return days.sort((a, b) => a.date.localeCompare(b.date));
}

async function repositories() {
  const repos = await (await get(`https://api.github.com/users/${user}/repos?per_page=100`)).json();
  const own = repos.filter((r) => !r.fork);
  const languages = {};
  for (const r of own) if (r.language) languages[r.language] = (languages[r.language] ?? 0) + 1;
  return {
    publicRepos: repos.length,
    stars: own.reduce((sum, r) => sum + r.stargazers_count, 0),
    languages: Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, repos]) => ({ name, repos })),
  };
}

const saved = () => {
  try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return null; }
};

const previous = saved();
const next = { user, ...previous };
let changed = false;
for (const [key, load] of [['days', contributions], ['repos', repositories]]) {
  try {
    next[key] = await load();
    changed = true;
  } catch (error) {
    console.warn(`github: kept the saved ${key} (${error.message})`);
  }
}

if (changed) {
  next.updated = new Date().toISOString().slice(0, 10);
  writeFileSync(file, `${JSON.stringify(next)}\n`);
}
if (!next.days || !next.repos) throw new Error('github: no data and no saved copy');
console.log(`github: ${next.days.reduce((sum, d) => sum + d.count, 0)} contributions, ${next.repos.publicRepos} public repositories`);
