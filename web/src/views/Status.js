import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { httpGet, FETCH_STATUS } from '../common/api';
import './status.scss';
import { useInterval } from '../common/useInterval';

const stations = ['1', '2', '3', '4', '5', '6'];

const Status = () => {
    const { id } = useParams();
    const [stationId, setStationId] = useState(id || stations[0]);
    const [stationData, setStationData] = useState();
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [fetchedStation, setFetchedStation] = useState();
    const [activeTestDescription, setActiveTestDescription] = useState();
    const [lastUpdated, setLastUpdated] = useState();
    const fetchFailed = useMemo(() => fetchStatus === FETCH_STATUS.REJECTED, [fetchStatus]);

    const fetchStationData = useCallback(() => {
        setFetchStatus(FETCH_STATUS.PENDING);

        httpGet('custom/station-tasks-tests/net/' + stationId + '/')
            .then((data) => {
                setFetchStatus(FETCH_STATUS.RESOLVED);
                setFetchedStation(stationId);
                setStationData(data);
                setLastUpdated(Date.now());
            })
            .catch((err) => {
                setFetchStatus(FETCH_STATUS.REJECTED);
                setFetchedStation(stationId);
                setStationData(false);
                setLastUpdated(Date.now());
            });
    }, [stationId]);

    useEffect(() => {
        if (fetchedStation !== stationId && fetchStatus !== FETCH_STATUS.PENDING && stationId) {
            fetchStationData();
        }
    }, [stationData, stationId, fetchStatus, fetchedStation, fetchStationData]);

    useInterval(() => {
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
            <h2>Station status</h2>
            <hr />

            <div className="row center-xs tabs">
                {stations.map((s) => (
                    <div key={s} className="col-xs">
                        <h2
                            onClick={() => setStationId(s)}
                            className={`tabs__item ${stationId === s ? 'tabs__item--active' : ''}`}
                        >
                            #{s}
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
                            <p>{task.description}</p>
                            {task.tests.map((test, i) => (
                                <React.Fragment key={test + i}>
                                    <div
                                        className={`row testlist__test testlist__test--${test.status_success} ${
                                            activeTestDescription === test.id ? 'testlist__test--expanded' : ''
                                        }`}
                                        key={test.name}
                                        onClick={() => toggleActiveTestDescription(test.id)}
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
                                            activeTestDescription === test.id
                                                ? 'row testlist__test-description--active'
                                                : ''
                                        }`}
                                    >
                                        <div className="col-xs">
                                            <strong>Test</strong>: {test.description ? test.description : 'No extra description.'}
                                        </div>
                                        <div className="col-xs">
                                            <strong>Status</strong>: {test.status_description ? test.status_description : 'No extra description.'}
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
