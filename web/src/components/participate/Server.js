import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FETCH_STATUS, httpGet } from '../../common/api';
import { useUserState, userIsAuthed } from '../../store/userContext';
// import './server.scss';
import { useInterval } from '../../common/useInterval';


export const Server = () => {
    const [netParticipationData, setNetParticipationData] = useState();
    const [serverParticipationData, setServerParticipationData] = useState();
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const user = useUserState();
    const isAuthed = userIsAuthed(user);

    const fetchParticipationData = () => {
        setFetchStatus(FETCH_STATUS.PENDING);
        Promise.all([fetchNetParticipationData(), fetchServerParticipationData()])
            .then(() => setFetchStatus(FETCH_STATUS.RESOLVED))
            .catch(() => setFetchStatus(FETCH_STATUS.REJECTED));
    };

    const fetchNetParticipationData = useCallback(async () => {
        return httpGet(`timeslots/?user=${user.profile.uuid}`)
            .then((data) => {
                setNetParticipationData(data);
            })
            .catch((err) => {
                setNetParticipationData(false);
            });
    }, [user]);

    const fetchServerParticipationData = useCallback(async () => {
        return httpGet(`timeslots/?user=${user.profile.uuid}`)
            .then((data) => {
                setServerParticipationData(data);
            })
            .catch((err) => {
                setServerParticipationData(false);
            });
    }, [user]);

    useEffect(() => {
        if (
            (netParticipationData === undefined || serverParticipationData === undefined) &&
            fetchStatus !== FETCH_STATUS.IDLE
        ) {
            fetchParticipationData();
        }
    }, [netParticipationData, fetchStatus, fetchParticipationData]);

    useInterval(() => {
        if (netParticipationData && serverParticipationData && fetchStatus !== FETCH_STATUS.IDLE) {
            fetchParticipationData();
        }
    }, 10000);

    const timeSlot = useMemo(() => {
        if (!netParticipationData || null) {
            return null;
        }

        const { Start, End } = netParticipationData.TimeSlot;
        const from = Date.parse(Start);
        const to = Date.parse(End);
        const dtf = new Intl.DateTimeFormat('nb-no', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        const str = `You have been assigned a timeslot from ${dtf.format(from)} to ${dtf.format(to)}`;

        return str;
    }, [netParticipationData]);

    if (
        (fetchStatus === FETCH_STATUS.PENDING && netParticipationData === [] && serverParticipationData === []) ||
        !netParticipationData ||
        !serverParticipationData
    ) {
        return (
            <div className="participate-container">
                <h1>Fetching data...</h1>
            </div>
        );
    }

    if (fetchStatus === FETCH_STATUS.REJECTED) {
        return (
            <div className="participate-container">
                <h1>Failed to fetch data</h1>
            </div>
        );
    }

    if (!isAuthed) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="participate-container">
            {netParticipationData.Message && (
                <section>
                    <div className="row">
                        <div className="col-xs">
                            <div className="admonition admonition--danger">
                                <div className="admonition__title">PSA</div>
                                {netParticipationData.Message}
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <section>
                <div className="row">
                    <div className="col-xs">
                        <h1>Connection information</h1>
                        {timeSlot && <strong>{timeSlot}</strong>}
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs">
                        {netParticipationData.Station ? (
                            <div className="station">
                                <div className="row between-xs">
                                    <div className="col-xs">
                                        <h2 className="station__header">Station #{netParticipationData.Station.Id}</h2>
                                    </div>
                                </div>
                                <div className="row between-xs station__row">
                                    <div className="col-xs col-md-3">
                                        <strong>Host</strong>
                                    </div>
                                    <div className="col-xs">{netParticipationData.Station.Jumphost}</div>
                                </div>
                                <div className="row between-xs station__row">
                                    <div className="col-xs col-md-3">
                                        <strong>User</strong>
                                    </div>
                                    <div className="col-xs">techo</div>
                                </div>
                                <div className="row between-xs station__row">
                                    <div className="col-xs col-md-3">
                                        <strong>Password</strong>
                                    </div>
                                    <div className="col-xs"> {netParticipationData.Station.Password}</div>
                                </div>
                                <div className="row between-xs station__row">
                                    <div className="col-xs col-md-3">
                                        <strong>Network</strong>
                                    </div>
                                    <div className="col-xs">{netParticipationData.Station.Net}</div>
                                </div>

                                {netParticipationData.Station.Notes && (
                                    <div className="row between-xs station__row">
                                        <div className="col-xs">
                                            <div className="admonition admonition--warning">
                                                <div className="admonition__title">Station specific notes</div>
                                                <ReactMarkdown source={netParticipationData.Station.Notes} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <h2>You are currently not assigned to a station</h2>
                                <strong>Feel free to hang out in Discord while you wait</strong>
                            </>
                        )}
                    </div>
                </div>
            </section>
            <section>
                <div className="row">
                    <div className="col-xs">
                        <h1>Tasks</h1>
                    </div>
                </div>
            </section>
        </div>
    );
};
