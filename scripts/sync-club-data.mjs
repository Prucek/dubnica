import { readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import { parseLeague, parseMembers, applyFixtureTimes, parseStandings } from './parse-club-data.mjs';

const config = JSON.parse(await readFile(new URL('./club-sources.json', import.meta.url), 'utf8'));
async function download(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
      return await response.text();
    } catch (error) {
      if (attempt === 2) throw error;
    }
  }
}

// Parse and validate every source before replacing the snapshot.
const leagues = [];
for (const league of config.leagues) {
  const url = new URL(league.url);
  url.searchParams.set('art', '20');
  const parsed = parseLeague(await download(url), league, config.season);
  url.searchParams.set('art', '2');
  applyFixtureTimes(await download(url), parsed);
  url.searchParams.set('art', '0');
  parsed.standings = parseStandings(await download(url), parsed, config.season);
  leagues.push(parsed);
}
const players = parseMembers(await download(config.membersUrl));
const snapshot = {
  season: config.season, fetchedAt: new Date().toISOString(),
  membersUrl: config.membersUrl, players, leagues,
};
const dir = new URL('../public/data/', import.meta.url);
await mkdir(dir, { recursive: true });
const output = new URL('club.json', dir);
const temp = new URL('club.json.tmp', dir);
await writeFile(temp, JSON.stringify(snapshot, null, 2) + '\n');
await rename(temp, output);
console.log(`Updated ${players.length} members, ${leagues.reduce((n, l) => n + l.matches.length, 0)} Dubnica fixtures for ${snapshot.season}.`);
