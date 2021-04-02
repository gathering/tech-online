import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const useTrack = () => {
    const VALID_TRACKS = ['server', 'net'];
    const { hash: rawHash } = useLocation();
    const getTrackFromHash = (h) => {
        return VALID_TRACKS.includes(h.slice(1)) ? h.slice(1) : 'net';
    };

    const [track, setTrack] = useState(getTrackFromHash(rawHash));

    // Update track when hash changes
    useEffect(() => {
        const newTrack = getTrackFromHash(rawHash);
        if (newTrack !== track) {
            setTrack(newTrack);
        }
    }, [rawHash, track, setTrack]);

    return track;
};
