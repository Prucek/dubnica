import Section from '../components/ui/Section';
import { historySections } from '../data/history';

export default function HistoryPage() {
  return (
    <Section title="História šachu v Dubnici">
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
        História organizovaného šachu v Dubnici nad Váhom siaha do roku 1949.
        Za viac ako 75 rokov existencie prešiel klub od skromných začiatkov
        až po pôsobenie v najvyššej slovenskej súťaži.
      </p>

      <div className="space-y-12">
        {historySections.map((section) => (
          <div key={section.decade}>
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-navy-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
                {section.decade}
              </div>
              <h3 className="text-lg font-semibold text-navy-600 dark:text-navy-200">
                {section.title}
              </h3>
            </div>

            <div className="border-l-2 border-gold-400 ml-4 pl-6 space-y-6">
              {section.events.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1 w-3 h-3 bg-gold-500 rounded-full border-2 border-white dark:border-navy-800" />
                  <div className="text-sm font-semibold text-gold-600 mb-1">
                    {event.year}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{event.text}</p>
                  {event.sources && <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                    {event.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-600">{source.label} ↗</a>)}
                  </div>}
                  {event.photos && event.photos.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {event.photos.map((photo, pIdx) => (
                        <figure key={pIdx} className="group">
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            className="rounded border border-gray-200 dark:border-navy-700 max-h-40 object-cover"
                          />
                          {photo.caption && (
                            <figcaption className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {photo.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
