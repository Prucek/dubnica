import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import snapshot from '../../public/data/club.json';
import type { Player } from '../types';

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
const Context = createContext({ data: initial, refreshFailed: false, now: new Date() });
export function ClubDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(initial);
  const [refreshFailed, setRefreshFailed] = useState(false);
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/club.json`, { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error('Data unavailable');
        const next = await response.json() as ClubData;
        if (!next.players?.length || next.leagues?.length !== initial.leagues.length || next.season !== initial.season || !Number.isFinite(Date.parse(next.fetchedAt))) throw new Error('Invalid data');
        if (!controller.signal.aborted) { setData(next); setRefreshFailed(false); }
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
