import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FETCH_STATUS, httpGet } from '../../common/api';
import './station-status.scss';
import { useInterval } from '../../common/useInterval';

const StationStatus = ({ id }) => {
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [stationData, setStationData] = useState();
    const [hover, setHover] = useState();

    const fetchStationData = useCallback(() => {
        setFetchStatus(FETCH_STATUS.PENDING);

        httpGet('status/station/' + id)
            .then((data) => {
                setFetchStatus(FETCH_STATUS.RESOLVED);
                setStationData(data);
            })
            .catch((err) => {
                setFetchStatus(FETCH_STATUS.REJECTED);
                setStationData(false);
            });
    }, [id]);

    const toggleHover = (id) => {
        if (hover === id) {
            setHover(undefined);
        } else {
            setHover(id);
        }
    };

    useEffect(() => {
        if (stationData === undefined && fetchStatus !== FETCH_STATUS.PENDING && id) {
            fetchStationData();
        }
    }, [id, stationData, fetchStatus, fetchStationData]);

    useInterval(() => {
        if (id && fetchStatus !== FETCH_STATUS.PENDING) {
            fetchStationData();
        }
    }, 10000);

    if (!stationData) {
        return null;
    }

    return (
        <div className="station-status">
            <h2>Station #{id}</h2>
            <div className="station-status__testlist">
                {stationData.Tests.map((test) => (
                    <Link
                        to={'/status/' + id}
                        key={test.Title}
                        className={`station-status__test station-status__test--${test.Status}`}
                        onMouseEnter={() => toggleHover(test.Title)}
                        onMouseLeave={() => toggleHover(test.Title)}
                    >
                        <div
                            className={`station-status__test__description ${
                                hover === test.Title ? 'station-status__test__description--active' : ''
                            }`}
                        >
                            {test.Title}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default StationStatus;
