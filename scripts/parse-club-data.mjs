import { load } from 'cheerio';
import { createClubParsers } from '../shared/club-parsers.mjs';

export const { parseLeague, parseMembers, applyFixtureTimes, parseStandings } = createClubParsers(load);
