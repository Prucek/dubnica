import type { ClubEvent } from '../../types';
import EventCard from './EventCard';

export default function EventList({ events }: { events: ClubEvent[] }) {
  const upcoming = events
    .filter(e => new Date(e.endDate ?? e.date) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (upcoming.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
        Momentálne nie sú naplánované žiadne akcie.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {upcoming.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
