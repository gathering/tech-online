import React, { useMemo } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import * as Views from '../views';
import { useUserState } from '../store/userContext';
import nextronLogo from '../assets/nextron.svg';
import nexthopLogo from '../assets/nexthop.svg';
import nlogicLogo from '../assets/nlogic.svg';
import elkjopLogo from '../assets/elkjop.svg';
import frivillighetensarLogo from '../assets/frivillighetensar.svg';

const loginEnabled = process.env.REACT_APP_LOGIN_ENABLED === 'true';

const App = () => {
  const user = useUserState();
  const loggedIn = useMemo(() => !!user.access_token, [user]);

  return (
    <>
      <header>
        <div className="nav-left">
          <NavLink to="/" exact>
            TG: Tech Online
          </NavLink>
          <NavLink to="/documentation">Reference documentation</NavLink>

          <a
            href="https://discord.gg/gathering"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord Server
          </a>

          {loggedIn && (
            <NavLink to="/participate" className="participate-link">
              Participate
            </NavLink>
          )}
        </div>
        <div className="nav-right">
          {!loggedIn && loginEnabled && (
            <NavLink to="/login" className="participate-link">
              Login
            </NavLink>
          )}

          {user.admin && (
            <NavLink to="/admin" className="participate-link">
              Admin
            </NavLink>
          )}
          <NavLink to="/status">Status</NavLink>
          {loggedIn && <NavLink to="/logout">Log out</NavLink>}
        </div>
      </header>
      <main>
        <Switch>
          <Route path="/" exact component={Views.Frontpage} />
          <Route path="/login" component={Views.Login} />
          <Route path="/signup" component={Views.Signup} />
          <Route path="/documentation" component={Views.Documentation} />
          <Route path="/participate" component={Views.Participate} />
          <Route path="/status" component={Views.Status} />
          <Route path="/logout" component={Views.Logout} />
          <Route path="/admin/:tab?" component={Views.Admin} />
          {/* <Route path="/demo" component={Views.Demo} /> */}
          <Route path="*" component={Views.NotFound} />
        </Switch>
        <div className="sponsors">
          <h4>Check out our great sponsors!</h4>
          <div className="sponsors-row">
            <a href="https://www.nextron.no" target="_blank" rel="noreferrer">
              <img src={nextronLogo as any} alt="nextron" />
            </a>
            <a href="https://www.nexthop.no" target="_blank" rel="noreferrer">
              <img src={nexthopLogo as any} alt="Nexthop" />
            </a>
            <a href="https://www.nlogic.no" target="_blank" rel="noreferrer">
              <img src={nlogicLogo as any} alt="nlogic" />
            </a>
            <a href="https://elkjop.no" target="_blank" rel="noreferrer">
              <img src={elkjopLogo as any} alt="Elkjop" />
            </a>
            <a
              href="https://frivillighetensar.no/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={frivillighetensarLogo as any} alt="Frivillighetensar" />
            </a>
          </div>
        </div>
      </main>
      <footer>
        <a
          href="https://gathering.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          gathering.org
        </a>
        <a
          href="https://tech.gathering.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          tech.gathering.org
        </a>
      </footer>
    </>
  );
};

export default App;
