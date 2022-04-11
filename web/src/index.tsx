import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import 'flexboxgrid';

import App from './components/App';
import { UserProvider } from './store/userContext';
import './styles/main.scss';

render(
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>,
  document.getElementById('root')
);
