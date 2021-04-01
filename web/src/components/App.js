import React, { useMemo } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import * as Views from '../views';
import { useUserState } from '../store/userContext';
import nextronLogo from '../assets/nextron.svg';

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
                    {loggedIn && (
                        <NavLink to="/participate" className="participate-link">
                            Participate
                        </NavLink>
                    )}
                    <a href="https://discordapp.com/invite/PmSTYdT" target="_blank" rel="noopener noreferrer">
                        Discord Server
                    </a>
                </div>
                <div className="nav-right">
                    {!loggedIn && (
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
                    <Route path="/documentation" component={Views.Documentation} />
                    <Route path="/participate" component={Views.Participate} />
                    <Route path="/status/:id?" component={Views.Status} />
                    <Route path="/logout" component={Views.Logout} />
                    <Route path="/admin/:tab?" component={Views.Admin} />
                    {/* <Route path="/demo" component={Views.Demo} /> */}
                </Switch>
                <div className="sponsors flex-row">
                    <h4>Check out our great sponsor!</h4>
                    <a href="https://www.nextron.no" target="_blank" rel="noreferrer">
                        <img src={nextronLogo} alt="nextron" />
                    </a>
                </div>
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
