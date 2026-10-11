import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryPhoto } from '../../data/gallery';

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const photo = photos[index];

  const goPrev = useCallback(() => {
    onNavigate(index > 0 ? index - 1 : photos.length - 1);
  }, [index, photos.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate(index < photos.length - 1 ? index + 1 : 0);
  }, [index, photos.length, onNavigate]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Zavrieť"
      >
        <X size={32} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        className="absolute left-4 text-white/50 hover:text-white transition-colors z-10"
        aria-label="Predchádzajúca"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        className="absolute right-4 text-white/50 hover:text-white transition-colors z-10"
        aria-label="Nasledujúca"
      >
        <ChevronRight size={40} />
      </button>

      <div
        className="max-w-5xl max-h-[90vh] px-16 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl animate-fade-up"
          key={photo.src}
        />
        {photo.caption && (
          <p className="text-white/80 text-sm mt-4 text-center">{photo.caption}</p>
        )}
        <p className="text-white/40 text-xs mt-1">
          {index + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
}
