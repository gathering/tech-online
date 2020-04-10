import React, { useEffect, useState } from 'react';
import { FETCH_STATUS, httpGet } from '../../common/api';
import './station-status.scss';

const StationStatus = ({ id }) => {
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [stationData, setStationData] = useState();
    const [hover, setHover] = useState();

    const toggleHover = (id) => {
        if (hover === id) {
            setHover(undefined);
        } else {
            setHover(id);
        }
    };

    useEffect(() => {
        if (stationData === undefined && fetchStatus !== FETCH_STATUS.PENDING && id) {
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
        }
    }, [id, stationData, fetchStatus]);

    if (fetchStatus === FETCH_STATUS.PENDING || !stationData) {
        return null;
    }

    return (
        <div className="station-status">
            <h2>Station #{id}</h2>
            <div className="station-status__testlist">
                {stationData.Tests.map((test) => (
                    <div
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StationStatus;
