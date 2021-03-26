import React, { useMemo } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useLogin } from '../store/userContext';
import { FETCH_STATUS } from '../common/api';
import './login.scss';

const Login = () => {
    const params = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(params.search), [params]);
    const code = useMemo(() => searchParams.get('code'), [searchParams]);

    let fetchStatus, fetchResult;

    if (!code) {
        return (
            <div className="login">
                <h1>
                    <a
                        href={`https://unicorn.zoodo.io/oauth/authorize/?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${window.location.origin}/login`}
                    >
                        Log in
                    </a>
                </h1>
            </div>
        );
    } else {
        [fetchStatus, fetchResult] = useLogin(code);
    }

    if (fetchStatus === FETCH_STATUS.REJECTED) {
        return (
            <div className="login">
                <h1>Failed.</h1>
                <h3>{fetchResult.message ? fetchResult.message : fetchResult.error}</h3>
            </div>
        );
    }

    if (fetchStatus === FETCH_STATUS.RESOLVED) {
        return <Redirect to="/participate" />;
    }

    return (
        <div className="login">
            <h1>Logging in</h1>
        </div>
    );
};

export { Login };
