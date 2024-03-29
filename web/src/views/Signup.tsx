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
  const searchParams = useMemo(
    () => new URLSearchParams(params.search),
    [params]
  );
  const code = useMemo(() => searchParams.get('code'), [searchParams]);

  const [selectedPath, setSelectedPath] = useState(paths[0]);
  const [notes, setNotes] = useState('');
  const [discord, setDiscord] = useState('');

  const user = useUserState();
  const isAuthed = userIsAuthed(user);

  function submit() {
    httpGet(`timeslots/?user=${user.profile.id}`)
      .then((res) => {
        if (
          res.filter((track: any) => track.track === selectedPath.value)
            .length > 0
        ) {
          alert(
            'You have already registered for this track. Contact Crew if this seems wrong'
          );
          throw new Error();
        }
      })
      .then(() => {
        httpPost(`timeslot/?user=${user.profile.id}`, {
          user: user.profile.id,
          track: selectedPath.value,
          notes: `Discord: ${discord}\n\n${notes}`,
        })
          .then(() => {
            window.location.hash = selectedPath.value;
            window.location.pathname = `/participate`;
            window.location.hash = selectedPath.value;
          })
          .catch((err) => {
            alert(`Something went wrong :(\n\n${err}`);
            console.warn(err.message);
          });
      })
      .catch((err) => console.error(err));
  }

  let fetchStatus, fetchResult;

  if (!code) {
    if (!isAuthed) {
      return <Redirect to="/login" />;
    }
  } else {
    [fetchStatus, fetchResult] = useLogin(code);
  }

  if (fetchStatus === FETCH_STATUS.REJECTED) {
    return (
      <div className="signup">
        <h1>Failed.</h1>
        <h3>{fetchResult.message ? fetchResult.message : fetchResult.error}</h3>
      </div>
    );
  }

  if (fetchStatus === FETCH_STATUS.RESOLVED || isAuthed) {
    return (
      <div className="signup">
        <div className="title">
          <h1>Sign up</h1>
        </div>
        <div className="signup-container">
          <div className="form">
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
              onChange={(value) => setSelectedPath(value as any)}
            />
          </div>
          <div className="form">
            <h2>Notes</h2>
            <p>
              Anything we as Crew should know? Previous experience, required
              support, preferred timeslots, etc. Remember to join{' '}
              <strong>#tech</strong> in the{' '}
              <a href="https://discord.gg/WYCXWNVcH5" target="_blank">
                TG Discord
              </a>{' '}
              server for better support and communication with Crew. We also
              have a voice channel <strong>Tech NOC</strong> on the bottom of
              the channel list where we hang out.
            </p>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            ></textarea>
          </div>
          <div className="form">
            <h2>Discord username</h2>
            <p>
              We as crew need your discord username to be able to communicate
              with you as efficiently as possible. Please use the format{' '}
              <strong>username#0000</strong>
            </p>
            <input
              type="text"
              value={discord}
              onChange={(event) => setDiscord(event.target.value)}
            />
          </div>
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
