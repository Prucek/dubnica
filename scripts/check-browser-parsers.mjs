import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DOMParser } from 'linkedom';
import { createHtmlLoader } from '../src/utils/htmlAdapter.mjs';
import { createClubParsers } from '../shared/club-parsers.mjs';
import * as nodeParsers from './parse-club-data.mjs';
const browser = createClubParsers(createHtmlLoader(html => new DOMParser().parseFromString(html, 'text/html')));
const config = JSON.parse(await readFile(new URL('./club-sources.json', import.meta.url), 'utf8'));
async function fetchHtml(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200);
  return response.text();
}
for (const league of config.leagues) {
  const pages = await Promise.all(['20', '2', '0'].map(view => fetchHtml(league.url + '&art=' + view)));
  const expected = nodeParsers.parseLeague(pages[0], league, config.season);
  const actual = browser.parseLeague(pages[0], league, config.season);
  assert.deepEqual(actual, expected);
  assert.deepEqual(browser.applyFixtureTimes(pages[1], actual), nodeParsers.applyFixtureTimes(pages[1], expected));
  assert.deepEqual(actual, expected);
  assert.deepEqual(browser.parseStandings(pages[2], actual, config.season), nodeParsers.parseStandings(pages[2], expected, config.season));
  console.log('Browser/Node parser parity: ' + league.name);
}
const html = await fetchHtml(config.membersUrl);
assert.deepEqual(browser.parseMembers(html), nodeParsers.parseMembers(html));
console.log('Browser/Node parser parity: club members');
