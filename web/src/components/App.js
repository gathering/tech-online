import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import * as Views from '../views';

const App = () => (
    <>
        <header>
            <div className="nav-left">
                <Link to="/">TG Tech Online</Link>
            </div>
            <div className="nav-right">
                <Link to="/auth">Log in</Link>
            </div>
        </header>
        <main>
            <Switch>
                <Route path="/" exact component={Views.Frontpage} />
                <Route path="/auth" exact component={Views.Auth} />
            </Switch>
        </main>
    </>
);

export default App;
