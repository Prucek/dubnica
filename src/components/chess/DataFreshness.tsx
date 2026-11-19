import { useClubData } from '../../context/ClubDataContext';
export default function DataFreshness() {
  const { data, refreshFailed, now } = useClubData();
  const stale = now.getTime() - Date.parse(data.fetchedAt) > 24 * 60 * 60_000;
  return <p className="mt-4 text-xs text-gray-500 dark:text-gray-400" role="status">
    Načítané zo zdrojov {new Intl.DateTimeFormat('sk-SK', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Bratislava' }).format(new Date(data.fetchedAt))}.
    {(stale || refreshFailed) && ' Obnova dát mešká; zobrazené sú posledné uložené údaje. Aktuálny stav si overte na odkaze na zdroj.'}
  </p>;
}
