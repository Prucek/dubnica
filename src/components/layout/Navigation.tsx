const navItems = [
  { to: '#domov', label: 'Domov' },
  { to: '#vysledky', label: 'Výsledky' },
  { to: '#hraci', label: 'Hráči' },
  { to: '#aktuality', label: 'Aktuality' },
  { to: '#akcie', label: 'Akcie' },
  { to: '#fotogaleria', label: 'Fotky' },
  { to: '#historia', label: 'História' },
  { to: '#odkazy', label: 'Odkazy' },
  { to: '#dve-percenta', label: '2% dane' },
];

interface NavigationProps {
  mobile?: boolean;
  onClose?: () => void;
}

export default function Navigation({ mobile, onClose }: NavigationProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    const el = document.querySelector(to);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    onClose?.();
  };

  const linkClass = mobile
    ? 'block px-4 py-3 text-lg text-gray-700 dark:text-gray-300 hover:text-navy-600 dark:hover:text-navy-200 transition-colors'
    : 'relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-navy-600 dark:hover:text-navy-200 transition-colors after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-gold-500 after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-2/3';

  return (
    <nav className={mobile ? 'flex flex-col' : 'flex items-center gap-1'}>
      {navItems.map((item) => (
        <a
          key={item.to}
          href={item.to}
          className={linkClass}
          onClick={(e) => handleClick(e, item.to)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
