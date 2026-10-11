import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navigation from './Navigation';
import ThemeToggle from '../ui/ThemeToggle';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white/90 dark:bg-navy-900/90 backdrop-blur-md border-b border-gray-200 dark:border-navy-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#domov" onClick={scrollToTop} className="flex items-center gap-3 no-underline">
            <span className="text-3xl">♞</span>
            <span className="text-lg font-bold text-navy-600 dark:text-navy-200 hidden sm:block">
              ŠK Šachu Dubnica
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            <Navigation />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-navy-600 dark:hover:text-navy-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Zavrieť menu' : 'Otvoriť menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-900 py-2">
          <Navigation mobile onClose={() => setMobileOpen(false)} />
        </div>
      )}
    </header>
  );
}
