import { Globe, Newspaper, Monitor, Users, Share2 } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import ExternalLink from '../components/ui/ExternalLink';
import { externalLinks } from '../data/links';

const categoryConfig = {
  social: { label: 'Sociálne siete', icon: Share2 },
  federation: { label: 'Zväzy a organizácie', icon: Globe },
  news: { label: 'Šachové správy', icon: Newspaper },
  server: { label: 'Herné servery', icon: Monitor },
  club: { label: 'Šachové kluby', icon: Users },
  other: { label: 'Ostatné', icon: Globe },
} as const;

const categoryOrder: (keyof typeof categoryConfig)[] = [
  'social', 'federation', 'news', 'server', 'club', 'other',
];

export default function LinksPage() {
  return (
    <Section title="Užitočné odkazy">
      <div className="space-y-8">
        {categoryOrder.map((category) => {
          const links = externalLinks.filter((l) => l.category === category);
          if (links.length === 0) return null;
          const config = categoryConfig[category];
          const Icon = config.icon;

          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-4">
                <Icon size={18} className="text-gold-500" />
                <h3 className="font-semibold text-navy-600 dark:text-navy-200">{config.label}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {links.map((link) => (
                  <Card key={link.url}>
                    <ExternalLink href={link.url} className="font-medium">
                      {link.name}
                    </ExternalLink>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{link.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
