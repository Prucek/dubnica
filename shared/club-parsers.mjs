export function createClubParsers(load) {
const clean = (value) => value.replace(/\s+/g, ' ').trim();
const folded = (value) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
const isDubnica = (value) => /dubnica (?:nad vahom|n\s*\/\s*v)/.test(folded(value));
const points = (value) => {
  const normalized = value.trim().replace('½', '.5').replace(',', '.');
  return /^\d*(?:\.5)?$/.test(normalized) && normalized !== '' ? Number(normalized) : null;
};

function parseLeague(html, league, season) {
  const $ = load(html);
  const title = clean($('h2').first().text());
  if (!title.includes(season) || !folded(title).replace(/\s/g, '').includes(folded(league.name).replace(/\s/g, ''))) {
    throw new Error(`Unexpected tournament at ${league.url}: ${title}`);
  }
  const matches = [];
  let round;
  $('tr').each((_, row) => {
    const cells = $(row).children('th,td');
    const text = clean(cells.text());
    const heading = text.match(/^(\d+)\. kolo dňa (\d{4})\/(\d{2})\/(\d{2}) o (\d{1,2}:\d{2})$/);
    if (heading) {
      round = { round: Number(heading[1]), date: `${heading[2]}-${heading[3]}-${heading[4]}`, time: heading[5].padStart(5, '0') };
      return;
    }
    if (!round || cells.length < 9 || clean(cells.eq(0).text()) !== 'š.') return;
    const separator = cells.toArray().findIndex((cell) => clean($(cell).text()) === '-');
    if (separator < 0) throw new Error('Missing home/away separator');
    const home = clean(cells.eq(2).text());
    const away = clean(cells.eq(separator + 2).text());
    if (!isDubnica(home) && !isDubnica(away)) return;
    const score = cells.toArray().slice(separator + 3).map((cell) => clean($(cell).text())).find((cell) => cell.includes(':'))?.split(':') ?? [];
    if (score.length !== 2) throw new Error(`Unrecognized team score: ${text}`);
    const homeScore = points(score[0]);
    const awayScore = points(score[1]);
    const bye = home === '---' || away === '---' || /voľno/i.test(home + away);
    const finished = homeScore !== null && awayScore !== null && homeScore + awayScore >= (league.boards ?? 8);
    const status = bye ? 'bye' : finished ? 'completed' :
      homeScore !== null && awayScore !== null && homeScore + awayScore > 0 ? 'in-progress' : 'scheduled';
    const url = new URL(league.url);
    url.searchParams.set('art', '20');
    url.searchParams.set('rd', String(round.round));
    matches.push({
      id: `${league.id}-${round.round}-${clean(cells.eq(1).text())}-${clean(cells.eq(separator + 1).text())}`,
      leagueId: league.id, league: league.name, ...round, home, away,
      homeScore, awayScore, status, url: url.href,
    });
  });
  if (!matches.length || !matches.some((m) => m.round === (league.rounds ?? 11))) {
    throw new Error(`Incomplete draw for ${league.name}; keeping previous data`);
  }
  const unique = new Map(matches.map((m) => [m.id, m]));
  const sourceUpdated = clean($('body').text()).match(/Posledná aktualizácia\s*(\d{2}\.\d{2}\.\d{4}\s+\d{2}:\d{2}:\d{2})/)?.[1] ?? null;
  return { ...league, title, sourceUpdated, matches: [...unique.values()] };
}

// The pairing view can specify a different start time for an individual fixture.
function applyFixtureTimes(html, league) {
  const $ = load(html);
  let round;
  const times = new Map();
  $('tr').each((_, row) => {
    const cells = $(row).children('th,td');
    if (cells.length === 1) {
      const heading = clean(cells.text()).match(/^(\d+)\. kolo(?: dňa .*)?$/);
      if (heading) round = Number(heading[1]);
    }
    if (!round || cells.length < 8 || cells.length > 9 || !/^\d+$/.test(clean(cells.eq(0).text()))) return;
    const home = clean(cells.eq(1).text());
    const away = clean(cells.eq(2).text());
    if (!isDubnica(home) && !isDubnica(away)) return;
    const date = clean(cells.eq(6).text()).replaceAll('/', '-');
    const time = clean(cells.eq(7).text()).padStart(5, '0');
    if (/^\d{4}-\d{2}-\d{2}$/.test(date) && /^\d{2}:\d{2}$/.test(time)) times.set(`${round}|${home}|${away}`, { date, time });
  });
  for (const match of league.matches) {
    const individual = times.get(`${match.round}|${match.home}|${match.away}`);
    if (!individual) continue;
    if (individual.date === match.date) match.time = individual.time;
    else match.scheduleNote = 'Dátum v rozpise zápasu sa líši od termínu kola; presný termín si overte u organizátora.';
  }
  return league;
}

function parseMembers(html) {
  const $ = load(html);
  if (!/dubnica/i.test($('body').text())) throw new Error('Unexpected club member page');
  const members = [];
  $('.datagridphp_item[id^="p_src_"]').each((_, row) => {
    const cells = $(row).children('div');
    const name = clean(cells.eq(1).find('a').first().text());
    if (!name) return;
    const ratingCell = cells.eq(2);
    const rating = clean(ratingCell.find('a').first().text()).match(/^(\d+)/);
    const extras = ratingCell.text();
    const fideId = Number(clean(cells.eq(3).text())) || 0;
    members.push({
      name, fideId, elo: Number(rating?.[1]) || 0,
      ...(extras.match(/rapid:\s*(\d+)/i) ? { rapidElo: Number(extras.match(/rapid:\s*(\d+)/i)[1]) } : {}),
      ...(extras.match(/blitz:\s*(\d+)/i) ? { blitzElo: Number(extras.match(/blitz:\s*(\d+)/i)[1]) } : {}),
    });
  });
  if (members.length < 20 || new Set(members.map((p) => p.name)).size < 20) {
    throw new Error('Incomplete member list; keeping previous data');
  }
  return members.sort((a, b) => b.elo - a.elo || a.name.localeCompare(b.name, 'sk'));
}

function parseStandings(html, league, season) {
  const $ = load(html);
  const title = clean($('h2').first().text());
  if (!title.includes(season) || !folded(title).replace(/\s/g, '').includes(folded(league.name).replace(/\s/g, ''))) {
    throw new Error(`Unexpected standings at ${league.url}: ${title}`);
  }
  const standings = [];
  $('table').each((_, table) => {
    const rows = $(table).children('tbody').children('tr').add($(table).children('tr'));
    const header = rows.first().children('th,td').map((_, cell) => clean($(cell).text())).get();
    if (header[0] !== 'Por.' || header[1] !== 'Družstvo') return;
    rows.slice(1).each((_, row) => {
      const cells = $(row).children('th,td');
      const name = clean(cells.eq(1).text());
      const rank = Number(clean(cells.eq(0).text()));
      if (!isDubnica(name) || !Number.isInteger(rank) || rank < 1) return;
      const played = league.matches.some(m => m.status === 'completed' && (m.home === name || m.away === name));
      standings.push({ name, rank: played ? rank : null });
    });
  });
  const expectedTeams = new Set(league.matches.flatMap(m => [m.home, m.away]).filter(isDubnica));
  if (!standings.length || standings.length !== expectedTeams.size) throw new Error(`Incomplete standings for ${league.name}`);
  return standings;
}

return { parseLeague, parseMembers, applyFixtureTimes, parseStandings };
}
