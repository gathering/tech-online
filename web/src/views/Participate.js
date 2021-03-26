import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FETCH_STATUS, httpPost, httpGet } from '../common/api';
import { useUserState, userIsAuthed } from '../store/userContext';
import './participate.scss';
import { useInterval } from '../common/useInterval';

const Participate = () => {
    const [participationData, setParticipationData] = useState();
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [activeHint, setActiveHint] = useState('');
    const [activeTestDescription, setActiveTestDescription] = useState();
    const [isParticipant, setIsParticipant] = useState();
    const user = useUserState();
    const isAuthed = userIsAuthed(user);

    useEffect(() => {
        if (isParticipant === undefined && fetchStatus === FETCH_STATUS.IDLE && isAuthed) {
            setFetchStatus(FETCH_STATUS.PENDING);
            httpGet('api/accounts/users/@me/', { host: 'https://unicorn.zoodo.io' })
                .then(() => {
                    setIsParticipant(true);
                    setFetchStatus(FETCH_STATUS.RESOLVED);
                })
                .catch((err) => {
                    if (err.status === 404) {
                        setIsParticipant(false);
                    }

                    // TODO Handle a case where the user is not not found or something?
                    setFetchStatus(FETCH_STATUS.REJECTED);
                });
        }
    }, [isParticipant, fetchStatus, isAuthed, user]);

    const fetchParticipationData = useCallback(() => {
        setFetchStatus(FETCH_STATUS.PENDING);
        httpGet('status/user/' + user.profile.uuid)
            .then((data) => {
                setFetchStatus(FETCH_STATUS.RESOLVED);
                setParticipationData(data);
            })
            .catch((err) => {
                setFetchStatus(FETCH_STATUS.REJECTED);
                setParticipationData(false);
            });
    }, [user]);

    useEffect(() => {
        if (isParticipant && participationData === undefined && fetchStatus !== FETCH_STATUS.IDLE) {
            fetchParticipationData();
        }
    }, [isParticipant, participationData, fetchStatus, fetchParticipationData]);

    useInterval(() => {
        if (isParticipant && participationData && fetchStatus !== FETCH_STATUS.IDLE) {
            fetchParticipationData();
        }
    }, 10000);

    const signup = () => {
        const { uuid, first_name, last_name, display_name, email } = user.profile;
        if (fetchStatus === FETCH_STATUS.PENDING) {
            return;
        }

        setFetchStatus(FETCH_STATUS.PENDING);

        httpPost('participant', {
            uuid,
            first_name,
            last_name,
            display_name,
            email,
        })
            .then(() => {
                setFetchStatus(FETCH_STATUS.RESOLVED);
                setIsParticipant(true);
            })
            .catch((err) => {
                setFetchStatus(FETCH_STATUS.REJECTED);
            });
    };

    const toggleHint = (taskId) => {
        if (activeHint === taskId) {
            setActiveHint('');
        } else {
            setActiveHint(taskId);
        }
    };

    const toggleActiveTestDescription = (testId) => {
        if (activeTestDescription === testId) {
            setActiveTestDescription('');
        } else {
            setActiveTestDescription(testId);
        }
    };

    const timeSlot = useMemo(() => {
        if (!participationData || !participationData.TimeSlot) {
            return null;
        }

        const { Start, End } = participationData.TimeSlot;
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
    }, [participationData]);

    if (fetchStatus === FETCH_STATUS.PENDING && !participationData) {
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

    if (isParticipant === false) {
        return (
            <div className="participate-container">
                <div className="sign-up">
                    <h1>Want to have a go at configuring switches and winning prizes?</h1>
                    <button onClick={signup}>Sign up!</button>
                </div>
            </div>
        );
    }

    if (!participationData) {
        return null;
    }

    return (
        <div className="participate-container">
            {participationData.Message && (
                <section>
                    <div className="row">
                        <div className="col-xs">
                            <div className="admonition admonition--danger">
                                <div className="admonition__title">PSA</div>
                                {participationData.Message}
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
                        {participationData.Station ? (
                            <div className="station">
                                <div className="row between-xs">
                                    <div className="col-xs">
                                        <h2 className="station__header">Station #{participationData.Station.Id}</h2>
                                    </div>
                                </div>
                                <div className="row between-xs station__row">
                                    <div className="col-xs col-md-3">
                                        <strong>Host</strong>
                                    </div>
                                    <div className="col-xs">{participationData.Station.Jumphost}</div>
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
                                    <div className="col-xs"> {participationData.Station.Password}</div>
                                </div>
                                <div className="row between-xs station__row">
                                    <div className="col-xs col-md-3">
                                        <strong>Network</strong>
                                    </div>
                                    <div className="col-xs">{participationData.Station.Net}</div>
                                </div>

                                {participationData.Station.Notes && (
                                    <div className="row between-xs station__row">
                                        <div className="col-xs">
                                            <div className="admonition admonition--warning">
                                                <div className="admonition__title">Station specific notes</div>
                                                <ReactMarkdown source={participationData.Station.Notes} />
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

                        {participationData.Tasks.map(({ Name, Description, Hint, Tests }) => (
                            <div className="row" key={Name}>
                                <div className="col-xs">
                                    <div className="task">
                                        <h3 className="task__header">
                                            {Name}
                                            <hr />
                                            {!!Hint && (
                                                <span
                                                    className={`task__header--hint task__header--hint--${
                                                        activeHint === Name ? 'active' : 'inactive'
                                                    }`}
                                                    title="You want some hints on how to proceed?"
                                                    onClick={() => toggleHint(Name)}
                                                >
                                                    ?
                                                </span>
                                            )}
                                        </h3>
                                        <div
                                            className={`task__hint task__hint--${
                                                activeHint === Name ? 'active' : 'hidden'
                                            }`}
                                        >
                                            <pre>{Hint}</pre>
                                        </div>
                                        <div className="task__description">
                                            <ReactMarkdown source={Description} />
                                        </div>
                                        <div className="task__tests">
                                            {Tests.map((test, i) => (
                                                <>
                                                    <div
                                                        className={`row task__test task__test--${test.Status} ${
                                                            activeTestDescription === test.Task + i
                                                                ? 'task__test--expanded'
                                                                : ''
                                                        }`}
                                                        key={test.Title}
                                                        onClick={() => toggleActiveTestDescription(test.Task + i)}
                                                    >
                                                        <div className="col-xs-2">{test.Status}</div>
                                                        <div className="col-xs">{test.Title}</div>
                                                    </div>
                                                    <div
                                                        className={`row task__test-description ${
                                                            activeTestDescription === test.Task + i
                                                                ? 'row task__test-description--active'
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
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export { Participate };
