import { useEffect, useState, useCallback } from 'react';
import { useInterval } from './useInterval';
import { httpGet, FETCH_STATUS } from './api';

import type { Station } from './useStationsData';
import { Document } from '../components/admin/Docs';

export type Task = {
  id: string;
};

export const useStationTasksData = (station: Station) => {
  const [tasksData, setTasksData] = useState<any>();
  const [lastFetchPassed, setLastFetchPassed] = useState(true);
  const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);

  const fetchStationTasks = useCallback(() => {
    if (!station) {
      setFetchStatus(FETCH_STATUS.RESOLVED);
      setLastFetchPassed(true);
      setTasksData(undefined);
      return;
    }

    setFetchStatus(FETCH_STATUS.PENDING);

    httpGet(
      `custom/station-tasks-tests/${station.track || 'net'}/${
        station.shortname
      }/`
    )
      .then((data) => {
        httpGet<Document[]>(`documents/?family=task-${station.track}`).then(
          (docs) => {
            const d = Date.now();
            const dtf = new Intl.DateTimeFormat('nb-no', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });

            setTasksData({
              ...data,
              updated: dtf.format(d),
              tasks: data.tasks.map((task: any) => ({
                ...task,
                description: docs.find(
                  (doc) => doc.shortname === task.shortname
                )?.content,
              })),
            });
            setFetchStatus(FETCH_STATUS.RESOLVED);
            setLastFetchPassed(true);
          }
        );
      })
      .catch((err) => {
        setLastFetchPassed(false);
        console.log(err);
        // Limit retry rate
        setTimeout(() => {
          setFetchStatus(FETCH_STATUS.REJECTED);
        }, 5000);
      });
  }, [station]);

  // Fetch tasks data for the current station
  useEffect(() => {
    if (
      station &&
      tasksData?.station_shortname !== station.shortname &&
      fetchStatus !== FETCH_STATUS.PENDING
    ) {
      fetchStationTasks();
    }
  }, [station, tasksData, fetchStatus]);

  // Refresh tasks data every X ms
  useInterval(() => {
    if (station && fetchStatus !== FETCH_STATUS.PENDING) {
      fetchStationTasks();
    }
  }, 10000);

  return [tasksData, lastFetchPassed];
};
