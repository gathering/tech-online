import React from 'react';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import * as Views from '../views';

const App = () => (
    <>
        <header>
            <div className="nav-left">
                <NavLink to="/" exact>
                    TG Tech Online
                </NavLink>
                <NavLink to="/documentation">Reference documentation</NavLink>
            </div>
            <div className="nav-right">
                <Link to="/auth">Log in</Link>
            </div>
        </header>
        <main>
            <Switch>
                <Route path="/" exact component={Views.Frontpage} />
                <Route path="/auth" component={Views.Auth} />
                <Route path="/documentation" component={Views.Documentation} />
            </Switch>
        </main>
        <footer>
            <a href="https://gathering.org" target="_blank" rel="noopener">
                Gathering.org
            </a>
            <a href="https://friday.horse" target="_blank" rel="noopener">
                Horses
            </a>
        </footer>
    </>
);

export default App;
