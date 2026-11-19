import { Trophy } from 'lucide-react';
import type { TeamResult } from '../../types';
import ExternalLink from '../ui/ExternalLink';
import Card from '../ui/Card';

interface TeamCardProps {
  team: TeamResult;
}

export default function TeamCard({ team }: TeamCardProps) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <Trophy className="text-gold-500 mt-1 shrink-0" size={20} />
        <div>
          <h3 className="font-semibold text-navy-600 dark:text-navy-200">{team.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{team.league}</p>
          {team.position && (
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{team.position}</p>
          )}
          <ExternalLink href={team.chessResultsUrl}>
            Tabuľka na Chess-Results →
          </ExternalLink>
        </div>
      </div>
    </Card>
  );
}
