import { Heart, FileText } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import { clubInfo } from '../data/clubInfo';

export default function TaxDonationPage() {
  return (
    <Section title="2% z dane">
      <div className="max-w-3xl">
        <Card className="mb-8 border-gold-200 dark:border-gold-700 bg-gold-50 dark:bg-gold-900/30">
          <div className="flex items-start gap-3">
            <Heart className="text-gold-500 mt-1 shrink-0" size={24} />
            <div>
              <h3 className="font-semibold text-navy-600 dark:text-navy-200 text-lg mb-2">
                Podporte náš klub
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Darujte 2% z vašich daní Športovému klubu šachu Dubnica nad Váhom.
                Vaša podpora pomáha rozvíjať šachový šport v našom meste.
              </p>
            </div>
          </div>
        </Card>

        <Card className="mb-8">
          <h3 className="font-semibold text-navy-600 dark:text-navy-200 mb-4">Údaje prijímateľa</h3>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400 w-32 shrink-0">Názov:</span>
              <span className="text-gray-900 dark:text-gray-100">{clubInfo.fullName}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400 w-32 shrink-0">Adresa:</span>
              <span className="text-gray-900 dark:text-gray-100">
                Dom kultúry, Bratislavská ulica 434/9, {clubInfo.zip} {clubInfo.city}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400 w-32 shrink-0">Právna forma:</span>
              <span className="text-gray-900 dark:text-gray-100">Občianske združenie</span>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-500 dark:text-gray-400 w-32 shrink-0">IČO:</span>
              <span className="text-gray-900 font-mono font-semibold">{clubInfo.ico}</span>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-navy-600 dark:text-navy-200 mb-3">
              <FileText className="inline mr-2 text-gold-500" size={18} />
              Pre zamestnancov
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Stiahnite si tlačivá a požiadajte zamestnávateľa o vystavenie
              „Potvrdenia o zaplatení dane". Vyplnené tlačivo „Vyhlásenie"
              spolu s potvrdením odovzdajte na daňový úrad podľa bydliska
              do 30. apríla.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-navy-600 dark:text-navy-200 mb-3">
              <FileText className="inline mr-2 text-gold-500" size={18} />
              Pre podnikateľov
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Vyplňte príslušnú časť „Vyhlásenie" v daňovom priznaní
              s údajmi nášho združenia.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
