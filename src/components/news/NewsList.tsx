import { useState } from 'react';
import NewsItem from './NewsItem';
import type { NewsItem as NewsItemType } from '../../types';

interface NewsListProps {
  items: NewsItemType[];
  pageSize?: number;
}

export default function NewsList({ items, pageSize = 10 }: NewsListProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length / pageSize);
  const visible = items.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div>
      <div className="space-y-4">
        {visible.map((item) => (
          <NewsItem key={item.id} item={item} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-navy-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
          >
            ← Predchádzajúce
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400 px-4">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-navy-600 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
          >
            Nasledujúce →
          </button>
        </div>
      )}
    </div>
  );
}
