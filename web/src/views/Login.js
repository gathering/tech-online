import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useUserDispatch, actions } from '../store/userContext';

const FETCH_STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};

const Login = () => {
    const params = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(params.search), [params]);
    const code = useMemo(() => searchParams.get('code'), [searchParams]);
    const dispatch = useUserDispatch();

    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [fetchResult, setFetchResult] = useState();
    useEffect(() => {
        if (fetchStatus === FETCH_STATUS.IDLE) {
            setFetchStatus(FETCH_STATUS.PENDING);
            fetch(
                `https://oscar.zoodo.io/o/token/?code=${code}&client_secret=${process.env.CLIENT_SECRET}&client_id=${process.env.CLIENT_ID}&grant_type=authorization_code&redirect_uri=http://localhost:1234/login`,
                { method: 'POST' }
            )
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then((json) => {
                            // reject med et IFeil objekt
                            return Promise.reject({
                                status: res.status,
                                ok: false,
                                body: json,
                            });
                        });
                    }

                    return res.json();
                })
                .then((data) => {
                    dispatch({ type: actions.LOGIN, data });
                    setFetchResult(data);
                    setFetchStatus(FETCH_STATUS.RESOLVED);
                })
                .catch((error) => {
                    dispatch({ type: actions.LOGOUT });
                    setFetchResult(error);
                    setFetchStatus(FETCH_STATUS.REJECTED);
                });
        }
    }, [code, fetchStatus, dispatch]);

    if (!code) {
        return <Redirect to="/" />;
    }

    if (fetchStatus === FETCH_STATUS.REJECTED) {
        return <h1>Failed: {fetchResult.body.error}</h1>;
    }

    if (fetchStatus === FETCH_STATUS.RESOLVED) {
        return <Redirect to="/" />;
    }

    return <h2 style={{ textAlign: 'center' }}>Logging in</h2>;
};

export { Login };
