import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { httpGet, FETCH_STATUS } from '../common/api';
import './status.scss';

const stations = ['1', '2', '3', '4'];

const Status = () => {
    const { id } = useParams();
    const [stationId, setStationId] = useState(id || stations[0]);
    const [stationData, setStationData] = useState();
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [fetchedStation, setFetchedStation] = useState();
    const [activeTestDescription, setActiveTestDescription] = useState();

    useEffect(() => {
        if (fetchedStation !== stationId && fetchStatus !== FETCH_STATUS.PENDING && stationId) {
            setFetchStatus(FETCH_STATUS.PENDING);

            httpGet('status/station/' + stationId)
                .then((data) => {
                    setFetchStatus(FETCH_STATUS.RESOLVED);
                    setFetchedStation(stationId);
                    setStationData(data);
                })
                .catch((err) => {
                    setFetchStatus(FETCH_STATUS.REJECTED);
                    setFetchedStation(stationId);
                    setStationData(false);
                });
        }
    }, [stationData, stationId, fetchStatus, fetchedStation]);

    const toggleActiveTestDescription = (testId) => {
        if (activeTestDescription === testId) {
            setActiveTestDescription('');
        } else {
            setActiveTestDescription(testId);
        }
    };

    return (
        <div className="status-container">
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
            {stationData && (
                <div className="testlist">
                    {stationData.Tests.map((test, i) => (
                        <React.Fragment key={test + i}>
                            <div
                                className={`row testlist__test testlist__test--${test.Status} ${
                                    activeTestDescription === test.Task + i ? 'testlist__test--expanded' : ''
                                }`}
                                key={test.Title}
                                onClick={() => toggleActiveTestDescription(test.Task + i)}
                            >
                                <div className="col-xs-2">{test.Status}</div>
                                <div className="col-xs">{test.Title}</div>
                            </div>
                            <div
                                className={`row testlist__test-description ${
                                    activeTestDescription === test.Task + i
                                        ? 'row testlist__test-description--active'
                                        : ''
                                }`}
                            >
                                <div className="col-xs">
                                    {test.Description ? (
                                        <ReactMarkdown source={test.Description} />
                                    ) : (
                                        <strong>No extra description for this test</strong>
                                    )}
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export { Status };
