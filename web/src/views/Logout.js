import React from 'react';
import { Redirect } from 'react-router-dom';
import { actions, useUserDispatch } from '../store/userContext';

const Logout = () => {
    const dispatch = useUserDispatch();
    dispatch({ type: actions.LOGOUT });

    return <Redirect to="/" />;
};

export { Logout };
