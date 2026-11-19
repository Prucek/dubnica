import test from 'node:test';
import assert from 'node:assert/strict';
import { parseLeague, parseMembers, applyFixtureTimes, parseStandings } from './parse-club-data.mjs';
import { latestResults, upcomingMatches, nextMatchesPerTeam, nextTraining } from '../src/utils/leagueUtils.ts';

const league = { id: '1', name: '1. liga Západ', url: 'https://chess-results.com/tnr1.aspx?lan=4' };
function row(round, home, away, score, compact = false) {
  const cells = compact
    ? ['š.', '1', home, 'Elo', '-', '2', away, 'Elo', score]
    : ['š.', '1', home, 'Elo', '', '-', '2', away, 'Elo', '', score, 'PGN'];
  return `<tr><th colspan="12">${round}. kolo dňa 2026/11/22 o 9:00</th></tr><tr>${cells.map(c => `<th>${c}</th>`).join('')}</tr>`;
}
function fixture(rows) { return `<h2>1.liga Západ 2026/2027</h2><table>${rows}</table>`; }
test('both table layouts, half points, 0:0, partial scores and byes', () => {
  const html = fixture(
    row(1, 'ŠKŠ Dubnica nad Váhom B', 'Súper', '5½:2½') +
    row(2, 'Súper', 'ŠKŠ Dubnica nad Váhom B', '0 : 0', true) +
    row(3, '---', 'ŠKŠ Dubnica nad Váhom B', '0:0') +
    row(4, 'ŠKŠ Dubnica nad Váhom B', 'Súper', '1½:½') +
    row(11, 'ŠKŠ Dubnica nad Váhom B', 'Súper', '4:4'));
  const { matches } = parseLeague(html, league, '2026/2027');
  assert.deepEqual(matches.map(m => m.status), ['completed', 'scheduled', 'bye', 'in-progress', 'completed']);
  assert.equal(matches[0].homeScore, 5.5);
  assert.equal(matches[3].awayScore, 0.5);
  assert.equal(matches[1].away, 'ŠKŠ Dubnica nad Váhom B');
  assert.equal(matches[1].time, '09:00');
});
test('reject wrong tournament or incomplete source instead of silently replacing data', () => {
  assert.throws(() => parseLeague('<h2>Unrelated event</h2>', league, '2026/2027'), /Unexpected/);
  assert.throws(() => parseLeague(fixture(row(1, 'ŠKŠ Dubnica nad Váhom B', 'Súper', '0:0')), league, '2026/2027'), /Incomplete/);
  assert.throws(() => parseMembers('<h1>Maintenance</h1>'), /Unexpected/);
});
test('members: preserve missing FIDE IDs and read separate time controls', () => {
  const html = '<h1>Dubnica</h1>' + Array.from({ length: 20 }, (_, i) =>
    `<div class="datagridphp_item" id="p_src_${i}"><div>${i}</div><div><a>Hráč ${i}</a></div><div><a>2208F [+3]</a><div>rapid: 2047<br>Blitz: 1986</div></div><div>${i === 0 ? '' : 1000+i}</div></div>`).join('');
  const players = parseMembers(html);
  assert.equal(players.length, 20);
  assert.ok(players.some(p => p.fideId === 0));
  assert.equal(players[0].elo, 2208);
  assert.equal(players[0].rapidElo, 2047);
});
test('latest result is per team; derby is shown once; unplayed later round is ignored', () => {
  const base = { leagueId: '1', date: '2026-11-22', time: '09:00', league: '', url: '', homeScore: 7, awayScore: 1 };
  const derby = { ...base, id: 'derby', round: 2, home: 'Dubnica D', away: 'Dubnica E', status: 'completed' };
  const pending = { ...derby, id: 'future', round: 3, status: 'scheduled', date: '2026-12-06' };
  assert.deepEqual(latestResults([derby, pending]).map(m => m.id), ['derby']);
  assert.deepEqual(upcomingMatches([derby, pending], new Date('2026-11-18T08:00:00Z')).map(m => m.id), ['future']);
});
test('training uses Bratislava time and advances after the Tuesday sessions', () => {
  assert.equal(nextTraining(new Date('2026-11-18T08:00:00Z')), '2026-11-24');
  assert.equal(nextTraining(new Date('2026-11-24T16:30:00Z')), '2026-11-24');
  assert.equal(nextTraining(new Date('2026-11-24T17:00:00Z')), '2026-12-01');
  assert.equal(nextTraining(new Date('2027-06-01T16:00:00Z')), '2027-06-08');
});

test('4th league uses five boards, ten rounds, and abbreviated Dubnica names', () => {
  const config = { ...league, boards: 5, rounds: 10 };
  const html = fixture(
    row(3, 'ŠKŠ Dubnica n/V F', 'Trenčín D', '3:2', true) +
    row(3, 'ŠKŠ Dubnica n/V G', 'Podhradie D', '3:2', true).replace('<th>1</th>', '<th>3</th>') +
    row(10, 'Púchov B', 'ŠKŠ Dubnica n/V F', '0:0', true));
  const { matches } = parseLeague(html, config, '2026/2027');
  assert.equal(matches.length, 3);
  assert.equal(matches[0].status, 'completed');
  assert.equal(matches[1].status, 'completed');
  assert.equal(matches[2].status, 'scheduled');
  assert.equal(latestResults(matches).length, 2);
  assert.equal(upcomingMatches(matches, new Date('2026-11-18T08:00:00Z')).length, 1);
});

test('individual fixture time overrides general time; inconsistent date is flagged', () => {
  const parsed = parseLeague(fixture(
    row(1, 'ŠKŠ Dubnica nad Váhom', 'Nitra', '0:0', true) +
    row(11, 'ŠKŠ Dubnica nad Váhom', 'Osuské', '0:0', true)), league, '2026/2027');
  const html = '<table><tr><th>1. kolo</th></tr><tr><td>3</td><td>ŠKŠ Dubnica nad Váhom</td><td>Nitra</td><td></td><td>:</td><td></td><td>2026/11/22</td><td>11:00</td><td>Dubnica</td></tr>' +
    '<tr><th>11. kolo</th></tr><tr><td>3</td><td>ŠKŠ Dubnica nad Váhom</td><td>Osuské</td><td></td><td>:</td><td></td><td>2025/11/22</td><td>10:00</td><td>Dubnica</td></tr></table>';
  const result = applyFixtureTimes(html, parsed);
  assert.equal(result.matches[0].time, '11:00');
  assert.equal(result.matches[1].date, '2026-11-22');
  assert.match(result.matches[1].scheduleNote, /líši/);
});

test('nearest fixtures include every team even when lower leagues play later', () => {
  const base = { leagueId: '1', date: '2026-11-21', time: '09:00', league: '', url: '', homeScore: 0, awayScore: 0, status: 'scheduled' };
  const matches = [
    { ...base, id: 'a1', home: 'Dubnica A', away: 'Nitra' },
    { ...base, id: 'a2', home: 'Dubnica A', away: 'Čebovce', date: '2026-11-22' },
    { ...base, id: 'f', home: 'Dubnica n/V F', away: 'Podhradie', leagueId: '4', date: '2026-12-13' },
    { ...base, id: 'g', home: 'Púchov', away: 'Dubnica n/V G', leagueId: '4', date: '2026-12-13' },
  ];
  assert.deepEqual(nextMatchesPerTeam(matches, new Date('2026-11-18T08:00:00Z')).map(m => m.id), ['a1', 'f', 'g']);
});

test('standings separate both club teams and do not present starting order as a league position', () => {
  const config = { ...league, matches: [{ home: 'ŠKŠ Dubnica n/V F', away: 'ŠKŠ Dubnica n/V G', status: 'completed' }] };
  const html = '<h2>1.liga Západ 2026/2027</h2><table><tr><th>Por.</th><th> Družstvo</th><th>TB1</th></tr>' +
    '<tr><td>1</td><td>ŠKŠ Dubnica n/V F</td><td>9</td></tr><tr><td>5</td><td>ŠKŠ Dubnica n/V G</td><td>3</td></tr></table>';
  assert.deepEqual(parseStandings(html, config, '2026/2027'), [
    { name: 'ŠKŠ Dubnica n/V F', rank: 1 }, { name: 'ŠKŠ Dubnica n/V G', rank: 5 },
  ]);
  const beforeSeason = { ...config, matches: [{ ...config.matches[0], status: 'scheduled' }] };
  assert.deepEqual(parseStandings(html, beforeSeason, '2026/2027').map(t => t.rank), [null, null]);
  assert.throws(() => parseStandings('<h2>Other tournament</h2>', config, '2026/2027'), /Unexpected/);
  assert.throws(() => parseStandings('<h2>1.liga Západ 2026/2027</h2>', config, '2026/2027'), /Incomplete/);
});
