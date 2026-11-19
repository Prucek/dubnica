import type { Match } from '../../context/ClubDataContext';
import { matchDate } from '../../utils/leagueUtils';
import Card from '../ui/Card';
export default function MatchCard({ match }: { match: Match }) {
  const completed = match.status === 'completed';
  const score = (value: number | null) => value === 0.5 ? '½' : String(value).replace('.5', '½');
  return <Card>
    <p className="text-xs font-medium uppercase tracking-wide text-gold-600 dark:text-gold-400 mb-2">{match.league} · {match.round}. kolo</p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{matchDate(match.date)} · {match.time}</p>
    <div className="space-y-2 text-sm text-navy-800 dark:text-gray-100">
      <p className="flex justify-between gap-4"><span>{match.home}</span>{completed && <strong>{score(match.homeScore)}</strong>}</p>
      <p className="flex justify-between gap-4"><span>{match.away}</span>{completed && <strong>{score(match.awayScore)}</strong>}</p>
    </div>
    {match.scheduleNote && <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{match.scheduleNote}</p>}
    <a href={match.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm text-navy-600 dark:text-navy-300 underline hover:text-gold-600">
      {completed ? 'Zápis a výsledky po šachovniciach →' : 'Rozpis na Chess-Results →'}
    </a>
  </Card>;
}
