import { useEffect, useState, useCallback } from 'react';
import { httpGet } from './api';
import { useInterval } from './useInterval';

export type Track = 'server' | 'net' | string;

export type Station = {
  id: string;
  track: Track;
  shortname: string;
  name: string;
  status: string;
  credentials: string;
  notes: string;
  timeslot: string;
};

export const useStationsData = (track: Track) => {
  const [stationsData, setStationsData] = useState<Station[]>([]);

  const fetchStations = useCallback(async () => {
    let data = await httpGet<Station[]>(`stations/`).catch((err) => {
      console.log(err);
    });

    data = (data || []).sort(
      (a, b) => parseInt(a.shortname, 10) - parseInt(b.shortname, 10)
    );
    setStationsData(data);
    return;
  }, []);

  // Fetch all stations on initial page load
  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  useInterval(() => {
    fetchStations();
  }, 30000);

  return track
    ? (stationsData || []).filter((s) => s.track === track)
    : stationsData || [];
};
