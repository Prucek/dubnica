import type { Match } from '../context/ClubDataContext';
export function localTime(now: Date) {
  const parts = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Bratislava', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
  const value = (type: string) => parts.find(p => p.type === type)!.value;
  return `${value('year')}-${value('month')}-${value('day')}T${value('hour')}:${value('minute')}`;
}
export function latestResults(matches: Match[]) {
  const latest = new Map<string, Match>();
  for (const match of matches.filter(m => m.status === 'completed')) {
    for (const team of [match.home, match.away].filter(t => t.includes('Dubnica'))) {
      const key = `${match.leagueId}-${team}`;
      if (!latest.has(key) || latest.get(key)!.round < match.round) latest.set(key, match);
    }
  }
  return [...new Map([...latest.values()].map(m => [m.id, m])).values()].sort((a, b) => b.date.localeCompare(a.date) || b.round - a.round);
}
export function upcomingMatches(matches: Match[], now: Date) {
  const current = localTime(now);
  return matches.filter(m => m.status === 'scheduled' && `${m.date}T${m.time}` >= current).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}
export function nextMatchesPerTeam(matches: Match[], now: Date) {
  const next = new Map<string, Match>();
  for (const match of upcomingMatches(matches, now)) {
    for (const team of [match.home, match.away].filter(t => t.includes('Dubnica'))) {
      const key = `${match.leagueId}-${team}`;
      if (!next.has(key)) next.set(key, match);
    }
  }
  return [...new Map([...next.values()].map(m => [m.id, m])).values()].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}
export function nextTraining(now: Date) {
  const local = localTime(now);
  const date = new Date(local.slice(0, 10) + 'T12:00:00Z');
  let days = (2 - date.getUTCDay() + 7) % 7;
  if (days === 0 && local.slice(11) >= '18:00') days = 7;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
export function matchDate(date: string) {
  return new Intl.DateTimeFormat('sk-SK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Bratislava' }).format(new Date(date + 'T12:00:00Z'));
}
