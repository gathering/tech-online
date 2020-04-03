import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

export const actions = {
    LOGIN: 'login',
    LOGOUT: 'logout',
};

const userReducer = (state, action) => {
    switch (action.type) {
        case actions.LOGIN: {
            return { token: action.data, token_meta: jwtDecode(action.data.access_token) };
        }
        case actions.LOGOUT: {
            return {};
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, {});
    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
};

const useUserState = () => {
    const context = React.useContext(UserStateContext);
    if (context === undefined) {
        throw new Error('useUserState must be used within a UserProvider');
    }
    return context;
};

const useUserDispatch = () => {
    const context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error('useUserDispatch must be used within a UserProvider');
    }
    return context;
};

export { UserProvider, useUserState, useUserDispatch };
