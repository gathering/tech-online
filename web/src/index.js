import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import { UserProvider } from './store/userContext';
import 'regenerator/runtime';
import './styles/main.scss';
import 'flexboxgrid';

render(
    <Router basename="/tech-online">
        <UserProvider>
            <App />
        </UserProvider>
    </Router>,
    document.getElementById('root')
);
