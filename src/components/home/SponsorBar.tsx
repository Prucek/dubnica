import { sponsors } from '../../data/sponsors';

export default function SponsorBar() {
  return (
    <div className="flex items-center justify-center gap-8 flex-wrap">
      {sponsors.map((sponsor) => (
        <a
          key={sponsor.name}
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          {sponsor.logo ? (
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-16 object-contain dark:brightness-200 dark:contrast-50"
            />
          ) : (
            <span className="text-gray-400 dark:text-gray-500 hover:text-navy-600 dark:hover:text-navy-200 font-semibold text-lg transition-colors">
              {sponsor.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
