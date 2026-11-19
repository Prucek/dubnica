import Section from '../components/ui/Section';
import PlayerTable from '../components/roster/PlayerTable';
import { useClubData } from '../context/ClubDataContext';
import DataFreshness from '../components/chess/DataFreshness';

export default function RosterPage() {
  const { data } = useClubData();
  return (
    <Section title="Hráči">
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Registrovaní členovia klubu podľa chess.sk, zoradení podľa ELO ratingu.
        Údaje z{' '}
        <a
          href={data.membersUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-navy-600 dark:text-navy-300 hover:text-gold-600 transition-colors underline"
        >
          chess.sk
        </a>
        .
      </p>
      <PlayerTable players={data.players} />
      <DataFreshness />
    </Section>
  );
}
