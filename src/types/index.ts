export interface NewsItem {
  id: string;
  date: string;
  season: string;
  title: string;
  content: string;
  results?: MatchResult[];
}

export interface MatchResult {
  home: string;
  away: string;
  score: string;
}

export interface TeamResult {
  name: string;
  league: string;
  chessResultsUrl: string;
  position?: string;
}

export interface Season {
  year: string;
  teams: TeamResult[];
}

export interface HistorySection {
  decade: string;
  title: string;
  events: HistoryEvent[];
}

export interface HistoryEvent {
  year: string;
  text: string;
  photos?: HistoryPhoto[];
}

export interface HistoryPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export interface ExternalLink {
  name: string;
  url: string;
  description: string;
  category: 'federation' | 'news' | 'server' | 'club' | 'social' | 'other';
}

export interface ClubEvent {
  id: string;
  type: 'match' | 'tournament' | 'training' | 'meeting' | 'other';
  title: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
}

export interface Player {
  name: string;
  fideId: number;
  elo: number;
  rapidElo?: number;
  blitzElo?: number;
}

export interface Sponsor {
  name: string;
  url: string;
  logo?: string;
}

export interface ClubInfo {
  name: string;
  fullName: string;
  address: string;
  city: string;
  zip: string;
  ico: string;
  trainingDay: string;
  trainingTime: string;
  trainingTimeSeniors: string;
  trainingLocation: string;
  gps: { lat: number; lng: number };
  email?: string;
}
