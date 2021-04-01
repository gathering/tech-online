import React, { useMemo, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useLogin } from '../store/userContext';
import { FETCH_STATUS } from '../common/api';
import Select from 'react-select';
import './signup.scss';

const paths = [
    { value: 'net', label: 'Networking' },
    { value: 'server', label: 'Server' },
];

const Signup = () => {
    const params = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(params.search), [params]);
    const code = useMemo(() => searchParams.get('code'), [searchParams]);

    const [selectedPath, setSelectedPath] = useState(paths[0]);

    let fetchStatus, fetchResult;

    if (!code) {
        return <Redirect to="/login" />;
    } else {
        [fetchStatus, fetchResult] = useLogin(code, '/signup');
    }

    if (fetchStatus === FETCH_STATUS.REJECTED) {
        return (
            <div className="signup">
                <h1>Failed.</h1>
                <h3>{fetchResult.message ? fetchResult.message : fetchResult.error}</h3>
            </div>
        );
    }

    if (fetchStatus === FETCH_STATUS.RESOLVED) {
        return (
            <div className="signup">
                <div className="title">
                    <h1>Sign up</h1>
                </div>
                <div className="signup-container">
                    <Select
                        className="react-select-container"
                        classNamePrefix="react-select"
                        options={paths}
                        value={selectedPath ?? paths[0]}
                        onChange={(value) => setSelectedPath(value)}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="signup">
            <h1>Logging in</h1>
        </div>
    );
};

export { Signup };
