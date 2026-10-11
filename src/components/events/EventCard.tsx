import { MapPin, Swords, Trophy, GraduationCap, Users, CalendarDays } from 'lucide-react';
import Card from '../ui/Card';
import type { ClubEvent } from '../../types';
import { formatDateSlovak, formatRelativeDate } from '../../utils/dateUtils';

const typeConfig: Record<ClubEvent['type'], { label: string; color: string; icon: typeof Swords }> = {
  match: { label: 'Zápas', color: 'bg-navy-600 text-white', icon: Swords },
  tournament: { label: 'Turnaj', color: 'bg-gold-500 text-white', icon: Trophy },
  training: { label: 'Tréning', color: 'bg-green-600 text-white', icon: GraduationCap },
  meeting: { label: 'Schôdza', color: 'bg-gray-600 text-white', icon: Users },
  other: { label: 'Iné', color: 'bg-gray-500 text-white', icon: CalendarDays },
};

export default function EventCard({ event }: { event: ClubEvent }) {
  const config = typeConfig[event.type];
  const Icon = config.icon;
  const dateLabel = event.endDate
    ? `${formatDateSlovak(event.date)} — ${formatDateSlovak(event.endDate)}`
    : formatDateSlovak(event.date);

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
              <Icon size={12} />
              {config.label}
            </span>
            <span className="text-xs text-gold-600 font-medium">
              {formatRelativeDate(event.date)}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{event.title}</h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <CalendarDays size={14} />
            <span>{dateLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <MapPin size={14} />
            <span>{event.location}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{event.description}</p>
        </div>
      </div>
    </Card>
  );
}
