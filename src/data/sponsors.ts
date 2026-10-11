import type { Sponsor } from '../types';

const base = import.meta.env.BASE_URL;

export const sponsors: Sponsor[] = [
  {
    name: 'Mesto Dubnica nad Váhom',
    url: 'https://www.dubnica.eu',
    logo: `${base}images/sponsors/dubnica-mesto.png`,
  },
];
