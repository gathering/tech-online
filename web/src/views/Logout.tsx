import React from 'react';
import { Redirect } from 'react-router-dom';
import { httpPost } from '../common/api';
import { actions, useUserDispatch } from '../store/userContext';

function Logout() {
  httpPost('oauth/logout');

  const dispatch = useUserDispatch();
  dispatch({ type: actions.LOGOUT });

  return <Redirect to="/" />;
}

export { Logout };
