import Section from '../components/ui/Section';
import PlayerTable from '../components/roster/PlayerTable';
import { players } from '../data/players';

export default function RosterPage() {
  return (
    <Section title="Hráči">
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Aktuálny zoznam členov klubu zoradený podľa ELO ratingu.
        Údaje z{' '}
        <a
          href="https://www.chess.sk/index.php?str=clenovia&klubId=60301"
          target="_blank"
          rel="noopener noreferrer"
          className="text-navy-600 dark:text-navy-300 hover:text-gold-600 transition-colors underline"
        >
          chess.sk
        </a>
        .
      </p>
      <PlayerTable players={players} />
    </Section>
  );
}
