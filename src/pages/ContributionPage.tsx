import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { clubInfo } from '../data/clubInfo';

export default function ContributionPage() {
  return (
    <Section title="Príspevok uznanému športu">
      <div className="max-w-3xl">
        <Card className="mb-6">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Šachový klub Dubnica nad Váhom je uznaným športovým klubom.
            Informácie o možnostiach príspevkov a podpory nájdete nižšie.
          </p>
        </Card>

        <Card>
          <h3 className="font-semibold text-navy-600 dark:text-navy-200 mb-4">Kontaktné údaje</h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400 w-32 shrink-0">Klub:</span>
              <span className="text-gray-900 dark:text-gray-100">{clubInfo.fullName}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400 w-32 shrink-0">IČO:</span>
              <span className="text-gray-900 font-mono">{clubInfo.ico}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400 w-32 shrink-0">Adresa:</span>
              <span className="text-gray-900 dark:text-gray-100">
                {clubInfo.address}, {clubInfo.zip} {clubInfo.city}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
