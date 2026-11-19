import snapshot from '../../public/data/club.json';
import type { Player } from '../types';

// Public club register snapshot, refreshed by npm run sync:data.
export const players: Player[] = snapshot.players;
