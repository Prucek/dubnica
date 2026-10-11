import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface ChessResultsEmbedProps {
  url: string;
  title: string;
  height?: number;
}

export default function ChessResultsEmbed({ url, title, height = 600 }: ChessResultsEmbedProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="space-y-3">
      <div className="relative bg-white dark:bg-navy-900 rounded-lg border border-gray-200 dark:border-navy-700 overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-navy-800">
            <div className="text-gray-400 text-sm">Načítavam výsledky...</div>
          </div>
        )}
        <div className="overflow-x-auto">
          <iframe
            src={url}
            title={title}
            width="100%"
            height={height}
            className="border-0 min-w-[800px]"
            onLoad={() => setLoading(false)}
          />
        </div>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm text-navy-600 dark:text-navy-300 hover:text-gold-500 transition-colors"
      >
        Otvoriť na chess-results.com
        <ExternalLink size={14} />
      </a>
    </div>
  );
}
