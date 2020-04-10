import React, { useMemo } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import * as Views from '../views';
import { useUserState, useUserDispatch, actions } from '../store/userContext';

const App = () => {
    const user = useUserState();
    const userDispatch = useUserDispatch();

    const loggedIn = useMemo(() => !!user.access_token, [user]);
    return (
        <>
            <header>
                <div className="nav-left">
                    <NavLink to="/" exact>
                        TG: Tech Online
                    </NavLink>
                    <NavLink to="/documentation">Reference documentation</NavLink>
                    {loggedIn && (
                        <NavLink to="/participate" className="participate-link">
                            Participate
                        </NavLink>
                    )}
                </div>
                <div className="nav-right">
                    <NavLink to="/status">Status</NavLink>
                    {loggedIn ? (
                        <span className="action" onClick={() => userDispatch({ type: actions.LOGOUT })}>
                            Log out
                        </span>
                    ) : (
                        <a
                            href={`https://oscar.zoodo.io/o/authorize/?client_id=${process.env.CLIENT_ID}&response_type=code&scope=read_userdata_extended%20write_userdata_extended&redirect_uri=${location.origin}/login`}
                        >
                            Log in
                        </a>
                    )}
                </div>
            </header>
            <main>
                <Switch>
                    <Route path="/" exact component={Views.Frontpage} />
                    <Route path="/login" component={Views.Login} />
                    <Route path="/documentation" component={Views.Documentation} />
                    <Route path="/participate" component={Views.Participate} />
                    <Route path="/status/:id?" component={Views.Status} />
                </Switch>
            </main>
            <footer>
                <a href="https://gathering.org" target="_blank" rel="noopener noreferrer">
                    Gathering.org
                </a>
                <a href="https://friday.horse" target="_blank" rel="noopener noreferrer">
                    Horses
                </a>
            </footer>
        </>
    );
};

export default App;
