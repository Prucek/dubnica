import type { ClubEvent } from '../types';

export const events: ClubEvent[] = [
  {
    id: 'treningy-leto-2026',
    type: 'training',
    title: 'Letné tréningy',
    date: '2026-06-03',
    endDate: '2026-08-25',
    location: 'Budova bývalej ZŠ, ul. Partizánska 151/3',
    description: 'Pravidelné utorkové tréningy pokračujú aj cez leto. Žiaci od 17:00, ostatní od 18:00.',
  },
  {
    id: 'extraliga-7-8-2026',
    type: 'match',
    title: 'Extraliga — kolá 7–8',
    date: '2026-09-19',
    endDate: '2026-09-20',
    location: 'Dubnica nad Váhom',
    description: 'Domáce dvojkolo extraligy. A-tím nastúpi proti súperom v boji o udržanie sa v najvyššej súťaži.',
  },
  {
    id: 'dubnicke-rapidy-2026',
    type: 'tournament',
    title: 'Dubnické rapidy 2026',
    date: '2026-10-12',
    location: 'Dubnica nad Váhom',
    description: 'Tradičný rapidový turnaj pre všetky vekové kategórie. Tempo 15+5.',
  },
  {
    id: 'valaska-stretnutie-2026',
    type: 'meeting',
    title: 'Výročná členská schôdza',
    date: '2026-11-10',
    location: 'Budova bývalej ZŠ, ul. Partizánska 151/3',
    description: 'Zhodnotenie sezóny 2025/2026 a plány na novú sezónu.',
  },
];
