import React, { useMemo } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useLogin } from '../store/userContext';
import { FETCH_STATUS } from '../common/api';

const Login = () => {
    const params = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(params.search), [params]);
    const code = useMemo(() => searchParams.get('code'), [searchParams]);

    const [fetchStatus, fetchResult] = useLogin(code);

    if (!code) {
        return <Redirect to="/" />;
    }

    if (fetchStatus === FETCH_STATUS.REJECTED) {
        return <h1>Failed: {fetchResult.error}</h1>;
    }

    if (fetchStatus === FETCH_STATUS.RESOLVED) {
        return <Redirect to="/" />;
    }

    return <h2 style={{ textAlign: 'center' }}>Logging in</h2>;
};

export { Login };
