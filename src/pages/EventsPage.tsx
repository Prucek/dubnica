import { useState } from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import MatchCard from '../components/chess/MatchCard';
import DataFreshness from '../components/chess/DataFreshness';
import { useClubData } from '../context/ClubDataContext';
import { upcomingMatches, nextMatchesPerTeam, nextTraining, matchDate } from '../utils/leagueUtils';
import { clubInfo } from '../data/clubInfo';
export default function EventsPage() {
  const { data, now } = useClubData();
  const [showAll, setShowAll] = useState(false);
  const matches = data.leagues.flatMap(l => l.matches);
  const upcoming = upcomingMatches(matches, now);
  const nearest = nextMatchesPerTeam(matches, now);
  const visible = showAll ? upcoming : nearest;
  return <Section title="Najbližšie zápasy a tréningy">
    <div className="mb-6"><Card>
      <h3 className="font-semibold text-navy-700 dark:text-navy-200 mb-2">Najbližší pravidelný tréning — {matchDate(nextTraining(now))}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">Každý {clubInfo.trainingDay.toLowerCase()}: žiaci od {clubInfo.trainingTime}, ostatní od {clubInfo.trainingTimeSeniors}.</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{clubInfo.trainingLocation}</p>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Pravidelný rozvrh; prípadné zmeny sledujte vo Facebook skupine klubu.</p>
    </Card></div>
    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">Najbližší zápas každého dubnického družstva podľa Chess-Results. Časy sú v časovom pásme Slovenska.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{visible.map(m => <MatchCard key={m.id} match={m} />)}</div>
    {!upcoming.length && <p className="text-gray-500">V aktuálnom rozpise už nie sú ďalšie plánované zápasy.</p>}
    {upcoming.length > nearest.length && <button onClick={() => setShowAll(!showAll)} className="mt-4 text-sm underline text-navy-600 dark:text-navy-300">{showAll ? 'Zobraziť menej' : 'Celý zostávajúci rozpis →'}</button>}
    <DataFreshness />
  </Section>;
}
