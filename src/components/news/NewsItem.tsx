import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../ui/Card';
import type { NewsItem as NewsItemType } from '../../types';

interface NewsItemProps {
  item: NewsItemType;
}

export default function NewsItem({ item }: NewsItemProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = item.content.length > 200;
  const displayContent = isLong && !expanded
    ? item.content.slice(0, 200) + '...'
    : item.content;

  return (
    <Card>
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
        <Calendar size={14} />
        <span>{item.date}</span>
        <span className="text-gold-500">·</span>
        <span className="text-gold-600 font-medium">{item.season}</span>
      </div>
      <h3 className="font-semibold text-navy-600 dark:text-navy-200 mb-2">{item.title}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
        {displayContent}
      </p>
      {item.results && item.results.length > 0 && (
        <div className="mt-3 space-y-1">
          {item.results.map((r, i) => (
            <div key={i} className="text-sm font-mono bg-gray-50 dark:bg-navy-800 px-3 py-1.5 rounded flex justify-between">
              <span>{r.home} – {r.away}</span>
              <span className="font-semibold text-navy-600 dark:text-navy-200">{r.score}</span>
            </div>
          ))}
        </div>
      )}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-sm text-navy-600 dark:text-navy-300 hover:text-gold-500 flex items-center gap-1 transition-colors"
        >
          {expanded ? (
            <>Skryť <ChevronUp size={14} /></>
          ) : (
            <>Čítať viac <ChevronDown size={14} /></>
          )}
        </button>
      )}
    </Card>
  );
}
