import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { FETCH_STATUS, httpPost, httpPut, httpGet } from '../common/api';
import { useUserState, userIsAuthed } from '../store/userContext';
import './participate.scss';

const mock = {
    information: {
        ip: '192.168.1.2',
        password: "JoMs+kly='JoMskly'",
    },
    tests: [
        {
            title: 'Ping 192.168.1.20',
            description: 'I pinged 192.168.1.20',
            status: 'OK',
            status_code: 'success',
        },
        {
            title: 'Ping 192.168.1.20',
            description: 'I pinged 192.168.1.20',
            status: 'Skipped',
            status_code: 'warn',
        },
        {
            title: 'Ping 192.168.1.20',
            description: 'I pinged 192.168.1.20',
            status: 'Failed',
            status_code: 'err',
        },
    ],
    tasks: {
        management: {
            description: 'This is a description!',
            hint: 'This is a hint!',
            tests: [0, 1, 2],
        },
        ping: {
            description: 'This is a description!',
            hint: '',
            tests: [0, 2],
        },
    },
};

// TODO Check if user is logged in

const Participate = () => {
    const [participationData, setParticipationData] = useState();
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [activeHint, setActiveHint] = useState('');
    const [isParticipant, setIsParticipant] = useState();
    const user = useUserState();
    const isAuthed = userIsAuthed(user);
    console.log(user);

    useEffect(() => {
        if (isParticipant === undefined && fetchStatus === FETCH_STATUS.IDLE && isAuthed) {
            setFetchStatus(FETCH_STATUS.PENDING);
            httpGet('participant/' + user.profile.uuid)
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
                console.log(err);
            });
    };

    const toggleHint = (taskId) => {
        if (activeHint === taskId) {
            setActiveHint('');
        } else {
            setActiveHint(taskId);
        }
    };

    if (fetchStatus === FETCH_STATUS.PENDING) {
        return (
            <div className="participate-container">
                <h1>Fetching data...</h1>
            </div>
        );
    }

    if (!isAuthed) {
        return <Redirect to="/" />;
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
            <section>
                <div className="row">
                    <div className="col-xs">
                        <h2>Connection information</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs" style={{ maxWidth: '300px' }}>
                        <div className="row between-xs">
                            <div className="col-xs">
                                <strong>IP </strong>
                            </div>
                            <div className="col-xs end-xs">{participationData.information.ip}</div>
                        </div>
                        <div className="row between-xs">
                            <div className="col-xs">
                                <strong>Password</strong>
                            </div>
                            <div className="col-xs end-xs"> {participationData.information.password}</div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="row">
                    <div className="col-xs">
                        <h2>Tasks</h2>
                        <hr />

                        {Object.entries(participationData.tasks).map(([title, task]) => (
                            <div className="row" key={title}>
                                <div className="col-xs">
                                    <div className="task">
                                        <h3 className="task__header">
                                            {title}
                                            {!!task.hint && (
                                                <span
                                                    className={`task__header--hint task__header--hint--${
                                                        activeHint === title ? 'active' : 'inactive'
                                                    }`}
                                                    title="You want some hints on how to proceed?"
                                                    onClick={() => toggleHint(title)}
                                                >
                                                    ?
                                                </span>
                                            )}
                                        </h3>
                                        <div
                                            className={`task__hint task__hint--${
                                                activeHint === title ? 'active' : 'hidden'
                                            }`}
                                        >
                                            <pre>{task.hint}</pre>
                                        </div>
                                        <div className="task__description">{task.description}</div>
                                        <div className="task__tests">
                                            {task.tests.map((test) => (
                                                <div
                                                    className={`row task__test task__test--${participationData.tests[test].status_code}`}
                                                    key={test}
                                                >
                                                    <div className="col-xs">{participationData.tests[test].status}</div>
                                                    <div className="col-xs">{participationData.tests[test].title}</div>
                                                    <div className="col-xs">
                                                        {participationData.tests[test].description}
                                                    </div>
                                                </div>
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
