import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { httpGet, FETCH_STATUS } from '../common/api';
import { useTrack } from '../common/useTrack';
import { useStationsData } from '../common/useStationsData';
import { useStationTasksData } from '../common/useStationTasksData';
import './status.scss';
import { useInterval } from '../common/useInterval';
import ReactMarkdown from 'react-markdown';
import Collapsible from 'react-collapsible';

const Status = () => {
    const track = useTrack();
    const stations = useStationsData(track).filter((s) => s.track === 'net' || s.status !== 'terminated');
    const [station, setStation] = useState(stations[0] || undefined);
    const [tasksData, live] = useStationTasksData(station);
    const [activeTestDescription, setActiveTestDescription] = useState();

    // Change to a valid station when list of stations change
    useEffect(() => {
        if (!stations.some((s) => s.id === station?.id)) {
            setStation(stations[0] || undefined);
        }
    }, [stations, station]);

    const toggleActiveTestDescription = (testId) => {
        if (activeTestDescription === testId) {
            setActiveTestDescription();
        } else {
            setActiveTestDescription(testId);
        }
    };

    const calculateTestId = (task, test) => `${task.shortname}-${test.shortname}`;
    const isAvailableToUsers = (station) => station?.status === 'active';
    const isBooked = (station) => station?.timeslot !== '';
    const isMaintenance = (station) => station?.status === 'maintenance';
    const isDirty = (station) => station?.status === 'dirty';

    return (
        <div className="status-container">
            <div className="header">
                <h2>Station status</h2>
                <div className="nav">
                    <Link to="/status#net" className={track === 'net' ? 'active' : ''}>
                        Net
                    </Link>
                    <Link to="/status#server" className={track === 'server' ? 'active' : ''}>
                        Server
                    </Link>
                </div>
            </div>
            <hr />

            <div className="row center-xs tabs">
                {stations.map((s) => (
                    <div key={s.id} className="col-xs">
                        <h2
                            onClick={() => setStation(s)}
                            className={`tabs__item ${station?.id === s?.id ? 'tabs__item--active' : ''} ${
                                !isAvailableToUsers(s) ? 'tabs__item--closed' : ''
                            } ${isBooked(s) ? 'tabs_item--booked' : 'tabs_item--available'}`}
                        >
                            {s.name || `#${s.shortname}`}
                        </h2>
                        <h3
                            className={`status ${
                                isDirty(s)
                                    ? 'dirty'
                                    : isMaintenance(s)
                                    ? 'maintenance'
                                    : isBooked(s)
                                    ? 'booked'
                                    : 'available'
                            }`}
                        >
                            {isDirty(s)
                                ? 'Dirty'
                                : isMaintenance(s)
                                ? 'Maintenance'
                                : isBooked(s)
                                ? 'Booked'
                                : 'Available'}
                        </h3>
                    </div>
                ))}
            </div>
            <div className="row">
                <div className="col-xs" style={{ paddingTop: '2rem' }}>
                    <strong>Station status:</strong> {isAvailableToUsers(station) ? 'Active' : 'Closed'}
                    {' | '}
                    <strong>Station:</strong> {station ? station.name || `#${station.shortname}` : '...'}
                    {' | '}
                    <strong>Last updated:</strong> {tasksData?.updated || '...'}
                </div>
            </div>
            {!live && (
                <div className="row">
                    <div className="col-xs" style={{ fontWeight: 'bold', color: 'red', paddingTop: '1rem' }}>
                        The request for this station's status failed on the last request. Data may not be accurate.{' '}
                    </div>
                </div>
            )}
            <div
                className={`testlist ${
                    tasksData?.station_shortname !== station?.shortname ? 'testlist--out-of-date' : ''
                }`}
            >
                {(tasksData?.tasks || []).map((task) => (
                    <React.Fragment key={task.id}>
                        <h3>{task.name}</h3>
                        {task.description && (
                            <Collapsible trigger="Toggle task description">
                                <ReactMarkdown>{task.description}</ReactMarkdown>
                            </Collapsible>
                        )}
                        {task.tests.map((test) => (
                            <React.Fragment key={test.id}>
                                <div
                                    className={`row testlist__test testlist__test--${test.status_success} ${
                                        activeTestDescription === calculateTestId(task, test)
                                            ? 'testlist__test--expanded'
                                            : ''
                                    } ${
                                        test?.status_description?.includes('Skipped') ? 'testlist__test--skipped' : ''
                                    } `}
                                    key={test.name}
                                    onClick={() => toggleActiveTestDescription(calculateTestId(task, test))}
                                >
                                    <div className="col-xs-2">
                                        {test?.status_description?.includes('Skipped')
                                            ? 'Skipped'
                                            : test.status_success === true
                                            ? 'Ok'
                                            : 'Fail'}
                                        <small>{test.status_description ? ' (more info)' : ''}</small>
                                    </div>
                                    <div className="col-xs">
                                        {test.name}
                                        <small>{test.description ? ' (more info)' : ''}</small>
                                    </div>
                                </div>
                                <div
                                    className={`row testlist__test-description ${
                                        activeTestDescription === calculateTestId(task, test)
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
                                        {test.status_description ? test.status_description : 'No extra description.'}
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
        </div>
    );
};

export { Status };
