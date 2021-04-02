import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FETCH_STATUS, httpGet } from '../../common/api';
import { useUserState, userIsAuthed } from '../../store/userContext';
import './net.scss';
import { useInterval } from '../../common/useInterval';

export const Net = () => {
    const [netParticipationData, setNetParticipationData] = useState();
    const [timeslot, setTimeslot] = useState();
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [hasSignedUp, setHasSignedUp] = useState(true);
    const user = useUserState();
    const isAuthed = userIsAuthed(user);

    if (!isAuthed) {
        return <Redirect to="/login" />;
    }

    const fetchParticipationData = useCallback(() => {
        setFetchStatus(FETCH_STATUS.PENDING);
        httpGet(`timeslots/?user-token=${user.profile.uuid}&track=net`)
            .then((data) => {
                if (data.length > 0) {
                    httpGet(`stations/?timeslot=${data[0].id}&user-token=${user.profile.uuid}`).then((timeslot) => {
                        setTimeslot(timeslot[0]);
                        setNetParticipationData(data);
                        setHasSignedUp(true);
                        setFetchStatus(FETCH_STATUS.RESOLVED);
                    });
                } else {
                    setHasSignedUp(false);
                    setFetchStatus(FETCH_STATUS.REJECTED);
                }
            })
            .catch((err) => {
                setNetParticipationData(false);
                setFetchStatus(FETCH_STATUS.REJECTED);
            });
    }, [user]);

    useEffect(() => {
        if ((netParticipationData === undefined || netParticipationData === []) && fetchStatus === FETCH_STATUS.IDLE) {
            fetchParticipationData();
        }
    }, [netParticipationData, fetchStatus, fetchParticipationData]);

    useInterval(() => {
        if (netParticipationData && fetchStatus !== FETCH_STATUS.IDLE) {
            fetchParticipationData();
        }
    }, 10000);

    const timeSlot = useMemo(() => {
        if (!netParticipationData || !netParticipationData[0].begin_time || !netParticipationData[0].end_time) {
            return null;
        }

        const Start = netParticipationData[0].begin_time;
        const End = netParticipationData[0].end_time;
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

    if (fetchStatus === FETCH_STATUS.PENDING && netParticipationData === []) {
        return <h1>Fetching data...</h1>;
    }

    if (fetchStatus === FETCH_STATUS.REJECTED) {
        if (hasSignedUp) {
            return <h1>Failed to fetch data</h1>;
        } else {
            return (
                <>
                    <p>
                        You are not signed up for the network track. You can sign up <a href="/signup">here</a>
                    </p>
                </>
            );
        }
    }

    if (
        fetchStatus === FETCH_STATUS.RESOLVED ||
        (fetchStatus === FETCH_STATUS.PENDING && netParticipationData?.length > 0)
    ) {
        return (
            <>
                {timeslot?.notes && (
                    <section>
                        <div className="row">
                            <div className="col-xs">
                                <div className="admonition admonition--danger">
                                    <div className="admonition__title">PSA</div>
                                    <ReactMarkdown source={timeslot.notes} />
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
                            {timeslot?.credentials !== undefined ? (
                                <div className="station">
                                    <div className="row between-xs">
                                        <div className="col-xs">
                                            <h2 className="station__header">{timeslot.name}</h2>
                                        </div>
                                    </div>

                                    <ReactMarkdown source={timeslot.credentials} />
                                    {/* <div className="row between-xs station__row">
                                        <div className="col-xs col-md-3">
                                            <strong>Host</strong>
                                        </div>
                                        <div className="col-xs">{netParticipationData[0].Station.Jumphost}</div>
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
                                        <div className="col-xs"> {netParticipationData[0].Station.Password}</div>
                                    </div>
                                    <div className="row between-xs station__row">
                                        <div className="col-xs col-md-3">
                                            <strong>Network</strong>
                                        </div>
                                        <div className="col-xs">{netParticipationData[0].Station.Net}</div>
                                    </div> */}

                                    {netParticipationData[0]?.Station?.Notes && (
                                        <div className="row between-xs station__row">
                                            <div className="col-xs">
                                                <div className="admonition admonition--warning">
                                                    <div className="admonition__title">Station specific notes</div>
                                                    <ReactMarkdown source={netParticipationData[0]?.Station?.Notes} />
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
            </>
        );
    } else if (netParticipationData?.length === 0) {
        return <Redirect to="/signup" />;
    }

    return <h1>Loading...</h1>;
};
