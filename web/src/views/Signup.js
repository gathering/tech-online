import React, { useMemo, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useLogin, useUserState, userIsAuthed } from '../store/userContext';
import { FETCH_STATUS, httpGet, httpPost } from '../common/api';
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
    const [notes, setNotes] = useState('');

    const user = useUserState();

    function submit() {
        httpGet(`timeslots/?user-token=${user.profile.uuid}`)
            .then((res) => {
                if (res.filter((track) => track.track === selectedPath.value).length > 0) {
                    alert('You have already registered for this track. Contact Crew if this seems wrong');
                    throw new Error();
                }
            })
            .then(() => {
                httpPost('timeslot', {
                    user_token: user.profile.uuid,
                    track: selectedPath.value,
                    notes: notes,
                })
                    .then(() => (window.location.pathname = '/participate'))
                    .catch((err) => alert(`Something went wrong :(\n\n${err}`));
            })
            .catch((err) => {});
    }

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
                    <h2>Select track</h2>
                    <ul>
                        <li>Networking - The same as last year but refined</li>
                        <li>Server - Setting up DNS and DHCP</li>
                    </ul>
                    <Select
                        className="react-select-container"
                        classNamePrefix="react-select"
                        options={paths}
                        value={selectedPath ?? paths[0]}
                        onChange={(value) => setSelectedPath(value)}
                    />
                    <br />
                    <h2>Notes</h2>
                    <p>
                        Anything we as Crew should know? Previous experience, required support, preferred timeslots,
                        etc. Remember to join <strong>#tech</strong> in the <a href="">TG Discord</a> server for better
                        support and communication with Crew.
                    </p>
                    <textarea value={notes} onChange={(event) => setNotes(event.target.value)}></textarea>
                    <button onClick={() => submit()}>Submit</button>
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
