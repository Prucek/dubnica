import { useState } from 'react';
import Section from '../components/ui/Section';
import TeamCard from '../components/chess/TeamCard';
import { seasons } from '../data/results';
import { useClubData } from '../context/ClubDataContext';
import DataFreshness from '../components/chess/DataFreshness';

export default function ResultsPage() {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0].year);
  const season = seasons.find((s) => s.year === selectedSeason) ?? seasons[0];
  const { data } = useClubData();
  const isCurrent = season.year === data.season;
  const teams = isCurrent ? data.leagues.flatMap(league => league.standings.map(team => ({
    name: `Družstvo ${team.name.match(/ ([A-Z])$/)?.[1] ?? 'A'}`,
    league: league.name,
    chessResultsUrl: league.url,
    position: team.rank === null ? 'Poradie zatiaľ neurčené — čaká na prvý výsledok' : `${team.rank}. miesto v tabuľke`,
  }))) : season.teams;

  return (
    <>
      <Section title="Výsledky">
        <div className="flex items-center gap-4 mb-8">
          <label htmlFor="season" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sezóna:
          </label>
          <select
            id="season"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="border border-gray-300 dark:border-navy-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-navy-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          >
            {seasons.map((s) => (
              <option key={s.year} value={s.year}>
                {s.year}
              </option>
            ))}
          </select>
        </div>

          <div>
            <h3 className="text-lg font-semibold text-navy-600 dark:text-navy-200 mb-4">
              Všetky družstvá — sezóna {season.year}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((team) => (
                <TeamCard key={team.name} team={team} />
              ))}
            </div>
          </div>
        {isCurrent && <DataFreshness />}
      </Section>
    </>
  );
}
