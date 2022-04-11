import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Track } from './useStationsData';

export const useTrack = (): Track => {
  const VALID_TRACKS: Track[] = ['server', 'net'];
  const { hash: rawHash } = useLocation();
  const getTrackFromHash = (h: string): Track => {
    return VALID_TRACKS.includes(h.slice(1)) ? h.slice(1) : 'net';
  };

  const [track, setTrack] = useState<Track>(getTrackFromHash(rawHash));

  // Update track when hash changes
  useEffect(() => {
    const newTrack = getTrackFromHash(rawHash);
    if (newTrack !== track) {
      setTrack(newTrack);
    }
  }, [rawHash, track, setTrack]);

  return track;
};
