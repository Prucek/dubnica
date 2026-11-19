import Section from '../components/ui/Section';
import MatchCard from '../components/chess/MatchCard';
import DataFreshness from '../components/chess/DataFreshness';
import { useClubData } from '../context/ClubDataContext';
import { latestResults, localTime } from '../utils/leagueUtils';
import { newsItems } from '../data/news';
import NewsList from '../components/news/NewsList';
export default function NewsPage() {
  const { data, now } = useClubData();
  const matches = data.leagues.flatMap(l => l.matches);
  const latest = latestResults(matches);
  const waiting = matches.filter(m => ['scheduled', 'in-progress'].includes(m.status) && `${m.date}T${m.time}` < localTime(now));
  return <Section title="Aktuality z líg">
    <p className="mb-6 text-gray-600 dark:text-gray-400">Posledné ukončené kolo každého dubnického družstva v sezóne {data.season}.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{latest.map(match => <MatchCard key={match.id} match={match} />)}</div>
    {!latest.length && <p className="text-gray-500 dark:text-gray-400">Výsledky prvých kôl ešte neboli zverejnené.</p>}
    {data.leagues.filter(l => !l.matches.some(m => m.status === 'completed')).map(l =>
      <p key={l.id} className="mt-4 text-sm text-gray-500 dark:text-gray-400">{l.name}: zatiaľ bez ukončeného zápasu Dubnice.</p>
    )}
    {waiting.length > 0 && <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Pri {waiting.length} zápasoch po plánovanom začiatku zatiaľ zdroj neuvádza konečné skóre.</p>}
    <DataFreshness />
    <details className="mt-8 border-t border-gray-200 dark:border-navy-700 pt-4">
      <summary className="cursor-pointer text-sm text-navy-600 dark:text-navy-300">Archív článkov zo starej stránky (2005–2014)</summary>
      <div className="mt-6"><NewsList items={newsItems} /></div>
    </details>
  </Section>;
}
