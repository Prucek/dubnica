import Section from '../components/ui/Section';
import EventList from '../components/events/EventList';
import { events } from '../data/events';

export default function EventsPage() {
  return (
    <Section title="Najbližšie akcie">
      <EventList events={events} />
    </Section>
  );
}
