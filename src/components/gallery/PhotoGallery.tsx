import { useState } from 'react';
import type { GalleryPhoto } from '../../data/gallery';
import Lightbox from './Lightbox';

const categoryLabels: Record<GalleryPhoto['category'], string> = {
  match: 'Zápasy',
  tournament: 'Turnaje',
  club: 'Klub',
  history: 'História',
};

export default function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [filter, setFilter] = useState<GalleryPhoto['category'] | 'all'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === 'all' ? photos : photos.filter(p => p.category === filter);
  const categories = [...new Set(photos.map(p => p.category))];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            filter === 'all'
              ? 'bg-navy-600 text-white shadow-md'
              : 'bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-700'
          }`}
        >
          Všetky
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === cat
                ? 'bg-navy-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-navy-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-700'
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightboxIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-navy-700 hover:border-gold-400 dark:hover:border-gold-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {photo.caption && (
              <p className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                {photo.caption}
              </p>
            )}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
