import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';
import type { Player } from '../../types';

type SortKey = 'name' | 'elo' | 'rapidElo' | 'blitzElo';
type SortDir = 'asc' | 'desc';

const COLLAPSED_COUNT = 10;

export default function PlayerTable({ players }: { players: Player[] }) {
  const [expanded, setExpanded] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('elo');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const sorted = useMemo(() => {
    return [...players].sort((a, b) => {
      if (sortKey === 'name') {
        const cmp = a.name.localeCompare(b.name, 'sk');
        return sortDir === 'desc' ? -cmp : cmp;
      }
      const aVal = a[sortKey] ?? 0;
      const bVal = b[sortKey] ?? 0;
      return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
    });
  }, [players, sortKey, sortDir]);

  const visible = expanded ? sorted : sorted.slice(0, COLLAPSED_COUNT);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const SortHeader = ({ label, field, className = '' }: { label: string; field: SortKey; className?: string }) => (
    <th
      className={`px-3 py-3 text-left text-sm font-semibold text-navy-600 dark:text-navy-200 cursor-pointer select-none hover:text-gold-600 transition-colors ${className}`}
      onClick={() => handleSort(field)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {sortKey === field ? (
          sortDir === 'desc' ? <ChevronDown size={14} /> : <ChevronUp size={14} />
        ) : (
          <ArrowUpDown size={14} className="opacity-30" />
        )}
      </span>
    </th>
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-navy-200 dark:border-navy-600">
              <th className="px-3 py-3 text-left text-sm font-semibold text-navy-600 dark:text-navy-200 w-10">#</th>
              <SortHeader label="Meno" field="name" />
              <SortHeader label="ELO" field="elo" />
              <SortHeader label="Rapid" field="rapidElo" className="hidden sm:table-cell" />
              <SortHeader label="Blitz" field="blitzElo" className="hidden sm:table-cell" />
              <th className="px-3 py-3 text-left text-sm font-semibold text-navy-600 dark:text-navy-200 hidden md:table-cell">FIDE</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((player, i) => (
              <tr
                key={`${player.fideId}-${player.name}`}
                className={`border-b border-gray-200 dark:border-navy-700 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors ${
                  i % 2 === 0 ? 'bg-white dark:bg-navy-900' : 'bg-gray-50 dark:bg-navy-800/50'
                }`}
              >
                <td className="px-3 py-2.5 text-sm text-gray-400">{i + 1}</td>
                <td className="px-3 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100">{player.name}</td>
                <td className="px-3 py-2.5 text-sm font-semibold text-navy-600 dark:text-navy-200">{player.elo || '—'}</td>
                <td className="px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                  {player.rapidElo ?? '—'}
                </td>
                <td className="px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                  {player.blitzElo ?? '—'}
                </td>
                <td className="px-3 py-2.5 text-sm hidden md:table-cell">
                  {player.fideId ? <a
                    href={`https://ratings.fide.com/profile/${player.fideId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-navy-500 dark:text-navy-300 hover:text-gold-600 transition-colors"
                  >
                    {player.fideId}
                  </a> : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {players.length > COLLAPSED_COUNT && (
        <div className="text-center mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-navy-600 dark:text-navy-200 border border-navy-200 dark:border-navy-600 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
          >
            {expanded ? (
              <>Zobraziť menej <ChevronUp size={16} /></>
            ) : (
              <>Zobraziť všetkých ({players.length}) <ChevronDown size={16} /></>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
