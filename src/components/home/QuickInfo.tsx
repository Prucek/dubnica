import { Clock, MapPin, Users } from 'lucide-react';
import Card from '../ui/Card';
import { clubInfo } from '../../data/clubInfo';

export default function QuickInfo() {
  const mapUrl = `https://www.google.com/maps?q=${clubInfo.gps.lat},${clubInfo.gps.lng}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <div className="flex items-start gap-3">
          <Clock className="text-gold-500 mt-1 shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-navy-600 dark:text-navy-200 mb-1">Tréningy</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {clubInfo.trainingDay} — žiaci od {clubInfo.trainingTime}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Ostatní od {clubInfo.trainingTimeSeniors}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <MapPin className="text-gold-500 mt-1 shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-navy-600 dark:text-navy-200 mb-1">Kde nás nájdete</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{clubInfo.address}</p>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-navy-600 dark:text-navy-300 hover:text-gold-500 transition-colors"
            >
              Zobraziť na mape →
            </a>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <Users className="text-gold-500 mt-1 shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-navy-600 dark:text-navy-200 mb-1">Sledujte nás</h3>
            <a
              href="https://www.facebook.com/groups/dubnica.chess.sk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-navy-600 dark:text-navy-300 hover:text-gold-500 transition-colors"
            >
              Facebook skupina →
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
