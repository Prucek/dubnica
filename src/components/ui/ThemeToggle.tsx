import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-600 dark:text-gray-400 hover:text-navy-600 dark:hover:text-navy-200 transition-colors"
      aria-label={theme === 'dark' ? 'Prepnúť na svetlý režim' : 'Prepnúť na tmavý režim'}
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
