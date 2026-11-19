import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import snapshot from '../../public/data/club.json';
import type { Player } from '../types';
import { loadLiveClubData } from '../data/liveClubData';

export interface Match {
  id: string; leagueId: string; league: string; round: number;
  date: string; time: string; home: string; away: string;
  homeScore: number | null; awayScore: number | null;
  status: 'completed' | 'scheduled' | 'in-progress' | 'bye';
  url: string;
  scheduleNote?: string;
}
export interface ClubData {
  season: string; fetchedAt: string; membersUrl: string; players: Player[];
  leagues: { id: string; name: string; url: string; sourceUpdated: string | null; matches: Match[]; standings: { name: string; rank: number | null }[] }[];
}
const initial = snapshot as ClubData;
const storageKey = 'dubnica-club-data-v1';
function validData(value: ClubData) {
  return value?.season === initial.season && value.players?.length > 0 &&
    value.leagues?.length === initial.leagues.length &&
    value.leagues.every(league => Array.isArray(league.matches) && Array.isArray(league.standings)) &&
    Number.isFinite(Date.parse(value.fetchedAt));
}
function savedData(): ClubData {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? 'null') as ClubData;
    if (validData(value) && Date.parse(value.fetchedAt) > Date.parse(initial.fetchedAt)) return value;
  } catch { /* Storage is optional. */ }
  return initial;
}
const Context = createContext({ data: initial, refreshFailed: false, now: new Date() });
export function ClubDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(savedData);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      try {
        const next = await loadLiveClubData(controller.signal);
        if (!validData(next)) throw new Error('Invalid data');
        if (!controller.signal.aborted) {
          setData(next); setRefreshFailed(false);
          try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Storage is optional. */ }
        }
      } catch {
        if (!controller.signal.aborted) setRefreshFailed(true);
      }
    }
    void refresh();
    const polling = window.setInterval(() => void refresh(), 15 * 60_000);
    const clock = window.setInterval(() => setNow(new Date()), 60_000);
    return () => { controller.abort(); window.clearInterval(polling); window.clearInterval(clock); };
  }, []);
  return <Context.Provider value={{ data, refreshFailed, now }}>{children}</Context.Provider>;
}
export function useClubData() { return useContext(Context); }
