import { useEffect, useState, useCallback } from 'react';
import { httpGet } from '../common/api';
import { useInterval } from './useInterval';

export const useStationsData = (track) => {
    const [stationsData, setStationsData] = useState();

    const fetchStations = useCallback(async () => {
        let data = await httpGet(`stations/`).catch((err) => {
            console.log(err);
        });

        data = (data || []).sort((a, b) => parseInt(a.shortname, 10) - parseInt(b.shortname, 10));
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

    return track ? (stationsData || []).filter((s) => s.track === track) : stationsData || [];
};
