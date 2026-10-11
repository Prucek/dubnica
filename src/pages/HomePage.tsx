import Hero from '../components/home/Hero';
import QuickInfo from '../components/home/QuickInfo';
import LatestResults from '../components/home/LatestResults';
import FacebookFeed from '../components/home/FacebookFeed';
import SponsorBar from '../components/home/SponsorBar';
import Section from '../components/ui/Section';

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section title="Informácie">
        <QuickInfo />
      </Section>

      <Section title="Aktuálne výsledky" className="bg-white">
        <LatestResults />
      </Section>

      <Section title="Novinky z Facebooku">
        <FacebookFeed />
      </Section>

      <Section className="bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-600 mb-4">O klube</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Športový klub šachu Dubnica nad Váhom je šachový klub s dlhoročnou
            tradíciou siahajúcou do roku 1949. Klub pôsobí v slovenskej Extralige
            a v ďalších ligových súťažiach. Tréningy sa konajú každý utorok —
            žiaci od 17:00, ostatní od 18:00.
          </p>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Sponzori
          </h3>
          <SponsorBar />
        </div>
      </Section>
    </>
  );
}
