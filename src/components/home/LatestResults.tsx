import { currentSeason } from '../../data/results';
import TeamCard from '../chess/TeamCard';

export default function LatestResults() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-navy-600 dark:text-navy-200">
          Sezóna {currentSeason.year}
        </h3>
        <a
          href="#vysledky"
          className="text-sm text-navy-600 dark:text-navy-300 hover:text-gold-500 transition-colors"
        >
          Všetky výsledky →
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentSeason.teams.map((team) => (
          <TeamCard key={team.name} team={team} />
        ))}
      </div>
    </div>
  );
}
