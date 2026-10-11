import { useState } from 'react';
import Section from '../components/ui/Section';
import NewsList from '../components/news/NewsList';
import { newsItems, availableSeasons } from '../data/news';

export default function NewsPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  const filtered = selectedSeason === 'all'
    ? newsItems
    : newsItems.filter((item) => item.season === selectedSeason);

  return (
    <Section title="Aktuality">
      <div className="flex items-center gap-4 mb-8">
        <label htmlFor="news-season" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sezóna:
        </label>
        <select
          id="news-season"
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="border border-gray-300 dark:border-navy-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-navy-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
        >
          <option value="all">Všetky sezóny</option>
          {availableSeasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} {filtered.length === 1 ? 'článok' : filtered.length < 5 ? 'články' : 'článkov'}
        </span>
      </div>

      <NewsList items={filtered} />
    </Section>
  );
}
