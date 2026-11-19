import Layout from './components/layout/Layout';
import Hero from './components/home/Hero';
import QuickInfo from './components/home/QuickInfo';
import ChessPuzzle from './components/home/ChessPuzzle';
import { ClubDataProvider } from './context/ClubDataContext';
import SponsorBar from './components/home/SponsorBar';
import Section from './components/ui/Section';
import ResultsPage from './pages/ResultsPage';
import RosterPage from './pages/RosterPage';
import NewsPage from './pages/NewsPage';
import HistoryPage from './pages/HistoryPage';
import LinksPage from './pages/LinksPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import TaxDonationPage from './pages/TaxDonationPage';
import ContributionPage from './pages/ContributionPage';

export default function App() {
  return (
    <ClubDataProvider><Layout>
      <div id="domov">
        <Hero />
      </div>

      <Section title="Informácie" id="informacie">
        <QuickInfo />
      </Section>

      <div id="vysledky">
        <ResultsPage />
      </div>

      <div id="hraci">
        <RosterPage />
      </div>

      <Section title="Denná šachová úloha" id="puzzle" className="bg-white dark:bg-navy-900">
        <ChessPuzzle />
      </Section>

      <div id="aktuality">
        <NewsPage />
      </div>

      <div id="akcie">
        <EventsPage />
      </div>

      <div id="fotogaleria">
        <GalleryPage />
      </div>

      <div id="historia">
        <HistoryPage />
      </div>

      <div id="odkazy">
        <LinksPage />
      </div>

      <div id="dve-percenta">
        <TaxDonationPage />
      </div>

      <div id="prispevok">
        <ContributionPage />
      </div>

      <Section className="bg-white dark:bg-navy-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-600 dark:text-navy-200 mb-4">O klube</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Športový klub šachu Dubnica nad Váhom je šachový klub s dlhoročnou
            tradíciou siahajúcou do roku 1949. Klub pôsobí v slovenskej Extralige
            a v ďalších ligových súťažiach. Tréningy sa konajú každý utorok —
            žiaci od 17:00, ostatní od 18:00.
          </p>
        </div>
      </Section>

      <Section>
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
            Sponzori
          </h3>
          <SponsorBar />
        </div>
      </Section>
    </Layout></ClubDataProvider>
  );
}
