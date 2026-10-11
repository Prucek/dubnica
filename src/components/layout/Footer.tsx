import { Users } from 'lucide-react';
import { sponsors } from '../../data/sponsors';
import { clubInfo } from '../../data/clubInfo';

export default function Footer() {
  return (
    <footer className="bg-navy-600 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-gold-400 font-semibold mb-3">Kontakt</h3>
            <p className="text-gray-300 text-sm">{clubInfo.fullName}</p>
            <p className="text-gray-300 text-sm">{clubInfo.address}</p>
            <p className="text-gray-300 text-sm">{clubInfo.zip} {clubInfo.city}</p>
            <p className="text-gray-300 text-sm mt-1">IČO: {clubInfo.ico}</p>
          </div>

          <div>
            <h3 className="text-gold-400 font-semibold mb-3">Tréningy</h3>
            <p className="text-gray-300 text-sm">
              {clubInfo.trainingDay} — žiaci od {clubInfo.trainingTime}
            </p>
            <p className="text-gray-300 text-sm">
              Ostatní od {clubInfo.trainingTimeSeniors}
            </p>
            <p className="text-gray-300 text-sm mt-1">{clubInfo.trainingLocation}</p>
            <a
              href="https://www.facebook.com/groups/dubnica.chess.sk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-gold-400 hover:text-gold-300 text-sm transition-colors"
            >
              <Users size={16} />
              Facebook skupina
            </a>
          </div>

          <div>
            <h3 className="text-gold-400 font-semibold mb-3">Sponzori</h3>
            <div className="flex flex-col gap-3">
              {sponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="h-10 object-contain brightness-200 contrast-50"
                    />
                  ) : (
                    <span className="text-gray-300 hover:text-gold-400 text-sm transition-colors">
                      {sponsor.name}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-navy-400 mt-8 pt-4 text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} {clubInfo.name}. Všetky práva vyhradené.
        </div>
      </div>
    </footer>
  );
}
