import config from '../../scripts/club-sources.json';
// @ts-expect-error Shared parser factory is plain JavaScript, tested against the Node adapter.
import { createClubParsers } from '../../shared/club-parsers.mjs';
// @ts-expect-error Native DOM adapter is plain JavaScript, tested against the Node adapter.
import { createHtmlLoader } from '../utils/htmlAdapter.mjs';
import type { ClubData } from '../context/ClubDataContext';

interface SourcePage { html: string; fetchedAt: string; stale: boolean }
const parsers = createClubParsers(createHtmlLoader((html: string) => new DOMParser().parseFromString(html, 'text/html')));

export async function loadLiveClubData(signal: AbortSignal): Promise<ClubData> {
  let oldest = Date.now();
  // Keep concurrent PHP requests bounded on ordinary shared hosting.
  async function source(name: string, view?: string): Promise<SourcePage> {
    const url = new URL(`${import.meta.env.BASE_URL}api/source.php`, window.location.origin);
    url.searchParams.set('source', name);
    if (view) url.searchParams.set('view', view);
    let response = await fetch(url, { signal: AbortSignal.any([signal, AbortSignal.timeout(25_000)]), cache: 'no-store' });
    for (let retry = 0; response.status === 503 && retry < 2; retry++) {
      await new Promise(resolve => window.setTimeout(resolve, 3000));
      signal.throwIfAborted();
      response = await fetch(url, { signal: AbortSignal.any([signal, AbortSignal.timeout(25_000)]), cache: 'no-store' });
    }
    if (!response.ok) throw new Error('Source unavailable');
    const page = await response.json() as SourcePage;
    if (typeof page.html !== 'string' || !Number.isFinite(Date.parse(page.fetchedAt)) || page.stale) throw new Error('Source refresh unavailable');
    oldest = Math.min(oldest, Date.parse(page.fetchedAt));
    return page;
  }
  const leagues: ClubData['leagues'] = [];
  for (const league of config.leagues) {
    const name = `league-${league.id}`;
    const [results, draw, table] = await Promise.all([source(name, '20'), source(name, '2'), source(name, '0')]);
    const parsed = parsers.parseLeague(results.html, league, config.season);
    parsers.applyFixtureTimes(draw.html, parsed);
    parsed.standings = parsers.parseStandings(table.html, parsed, config.season);
    leagues.push(parsed);
  }
  const members = await source('members');
  return {
    season: config.season, membersUrl: config.membersUrl,
    fetchedAt: new Date(oldest).toISOString(),
    players: parsers.parseMembers(members.html), leagues,
  };
}
