import React, { useMemo } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useLogin } from '../store/userContext';
import { FETCH_STATUS } from '../common/api';
import './login.scss';

const Login = () => {
    const params = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(params.search), [params]);
    const code = useMemo(() => searchParams.get('code'), [searchParams]);

    console.log(location);

    const [fetchStatus, fetchResult] = useLogin(code);

    if (!code) {
        return (
            <div className="login">
                <h1>
                    <a
                        href={`https://oscar.zoodo.io/o/authorize/?client_id=${process.env.CLIENT_ID}&response_type=code&scope=read_userdata_extended%20write_userdata_extended&redirect_uri=${location.origin}/login`}
                    >
                        Log in
                    </a>
                </h1>
            </div>
        );
    }

    if (fetchStatus === FETCH_STATUS.REJECTED) {
        return (
            <div className="login">
                <h1>Failed: {fetchResult.error}</h1>
            </div>
        );
    }

    if (fetchStatus === FETCH_STATUS.RESOLVED) {
        return <Redirect to="/" />;
    }

    return <h2 style={{ textAlign: 'center' }}>Logging in</h2>;
};

export { Login };
