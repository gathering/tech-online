import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { httpGet, FETCH_STATUS } from '../common/api';
import './status.scss';
import { useInterval } from '../common/useInterval';
import ReactMarkdown from 'react-markdown';

const VALID_TRACKS = ['server', 'net'];

const Status = () => {
    const { track: rawTrack } = useParams();
    const [track, setTrack] = useState(VALID_TRACKS.includes(rawTrack) ? rawTrack : 'net');
    const [stations, setStations] = useState([]);
    const [stationId, setStationId] = useState(undefined);
    const [stationData, setStationData] = useState();
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [fetchStationsStatus, setStationsFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [fetchedStation, setFetchedStation] = useState('non-existent-station');
    const [activeTestDescription, setActiveTestDescription] = useState();
    const [lastUpdated, setLastUpdated] = useState();
    const fetchFailed = useMemo(() => fetchStatus === FETCH_STATUS.REJECTED, [fetchStatus]);

    const hasStations = useCallback(() => stations.length && fetchStationsStatus !== FETCH_STATUS.PENDING, [
        stations,
        fetchStationsStatus,
    ]);

    const getTestId = (task, test) => `${task.shortname}-${test.shortname}`;

    const initTrack = useCallback(async () => {
        let data;
        setStationsFetchStatus(FETCH_STATUS.PENDING);
        if (track === 'server') {
            await httpGet(`custom/track-stations/${track}/`)
                .then((d) => {
                    data = d;
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            data = {
                stations: [
                    { id: '1', shortname: '1' },
                    { id: '2', shortname: '2' },
                    { id: '3', shortname: '3' },
                    { id: '4', shortname: '4' },
                    { id: '5', shortname: '5' },
                    { id: '6', shortname: '6' },
                ],
            };
        }

        if (!data) {
            setStationsFetchStatus(FETCH_STATUS.REJECTED);
            setLastUpdated(Date.now());
            return;
        }

        setStationsFetchStatus(FETCH_STATUS.RESOLVED);
        setStations(
            data.stations.length
                ? data.stations
                : [
                      {
                          id: '1',
                          shortname: '1',
                          tasks: [],
                      },
                  ]
        );
        setStationId(data.stations?.[0]?.shortname || '1');
        return;
    }, [track]);

    const fetchStationData = useCallback(() => {
        setFetchStatus(FETCH_STATUS.PENDING);
        httpGet(`custom/station-tasks-tests/${track}/${stationId}/`)
            .then((data) => {
                httpGet('documents/?family=task-net').then((docs) => {
                    setFetchStatus(FETCH_STATUS.RESOLVED);
                    setFetchedStation(stationId);
                    setStationData({
                        ...data,
                        tasks: data.tasks.map((task) => ({
                            ...task,
                            description: docs.find((doc) => doc.shortname === task.shortname).content,
                        })),
                    });
                    setLastUpdated(Date.now());
                });
            })
            .catch((err) => {
                setFetchStatus(FETCH_STATUS.REJECTED);
                setFetchedStation(stationId);
                setStationData(false);
                setLastUpdated(Date.now());
            });
    }, [stationId, track]);

    // Fetch stations
    useEffect(() => {
        if (!stations.length && fetchStationsStatus !== FETCH_STATUS.PENDING) {
            initTrack();
        }
    }, [stations, initTrack, fetchStationsStatus]);

    // Change tracks when needed
    useEffect(() => {
        const newTrack = VALID_TRACKS.includes(rawTrack) ? rawTrack : 'net';
        if (newTrack !== track) {
            setTrack(newTrack);
            setStations([]);
            setStationData();
            setStationId(undefined);
        }
    }, [rawTrack, setTrack, track]);

    // Fetch data for specific station
    useEffect(() => {
        if (hasStations() && fetchedStation !== stationId && fetchStatus !== FETCH_STATUS.PENDING && stationId) {
            fetchStationData();
        }
    }, [hasStations, stationData, stationId, fetchStatus, fetchedStation, fetchStationData]);

    useInterval(() => {
        if (!hasStations()) {
            return;
        }
        if (stationId && fetchStatus !== FETCH_STATUS.PENDING) {
            fetchStationData();
        }
    }, 10000);

    const toggleActiveTestDescription = (testId) => {
        if (activeTestDescription === testId) {
            setActiveTestDescription('');
        } else {
            setActiveTestDescription(testId);
        }
    };

    const fLastUpdated = useMemo(() => {
        if (!lastUpdated) {
            return null;
        }

        const d = new Date(lastUpdated);
        const dtf = new Intl.DateTimeFormat('nb-no', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        return dtf.format(d);
    }, [lastUpdated]);

    return (
        <div className="status-container">
            {fetchFailed && (
                <div style={{ fontWeight: 'bold', color: 'red', paddingBottom: '1rem' }}>
                    The request for this station's status failed on the last request. Data may not be accurate.{' '}
                </div>
            )}
            <div className="header">
                <h2>Station status</h2>
                <div className="nav">
                    <NavLink to="/status/net">Net</NavLink>
                    <NavLink to="/status/server">Server</NavLink>
                </div>
            </div>
            <hr />

            <div className="row center-xs tabs">
                {stationId &&
                    stations.map(({ id, shortname }) => (
                        <div key={id} className="col-xs">
                            <h2
                                onClick={() => setStationId(shortname)}
                                className={`tabs__item ${stationId === shortname ? 'tabs__item--active' : ''}`}
                            >
                                #{shortname}
                            </h2>
                        </div>
                    ))}
            </div>
            {fLastUpdated && (
                <div className="row">
                    <div className="col-xs" style={{ paddingTop: '2rem' }}>
                        <strong>Last updated: {fLastUpdated}</strong>
                    </div>
                </div>
            )}
            {stationData && (
                <div className="testlist">
                    {stationData.tasks.map((task, i) => (
                        <React.Fragment key={task + i}>
                            <h3>{task.name}</h3>
                            <div>
                                <ReactMarkdown>{task.description}</ReactMarkdown>
                            </div>
                            {task.tests.map((test, i) => (
                                <React.Fragment key={test + i}>
                                    <div
                                        className={`row testlist__test testlist__test--${test.status_success} ${
                                            activeTestDescription === getTestId(task, test)
                                                ? 'testlist__test--expanded'
                                                : ''
                                        }`}
                                        key={test.name}
                                        onClick={() => toggleActiveTestDescription(getTestId(task, test))}
                                    >
                                        <div className="col-xs-2">
                                            {test.status_success === true ? 'Ok' : 'Fail'}
                                            <small>{test.status_description ? ' (more info)' : ''}</small>
                                        </div>
                                        <div className="col-xs">
                                            {test.name}
                                            <small>{test.description ? ' (more info)' : ''}</small>
                                        </div>
                                    </div>
                                    <div
                                        className={`row testlist__test-description ${
                                            activeTestDescription === getTestId(task, test)
                                                ? 'row testlist__test-description--active'
                                                : ''
                                        }`}
                                    >
                                        <div className="col-xs">
                                            <strong>Test</strong>:{' '}
                                            {test.description ? test.description : 'No extra description.'}
                                        </div>
                                        <div className="col-xs">
                                            <strong>Status</strong>:{' '}
                                            {test.status_description
                                                ? test.status_description
                                                : 'No extra description.'}
                                        </div>
                                        <div className="col-xs">
                                            <strong>Timestamp</strong>: <code>{test.timestamp}</code>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export { Status };
