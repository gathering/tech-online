import React, { createContext, useReducer, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { httpPost, FETCH_STATUS, httpGet } from '../common/api';

export const localStorageTokenKey = '__tgo_token__';
export const localStorageDataKey = '__tgo_data__';

const UserStateContext = createContext();
const UserDispatchContext = createContext();

export const actions = {
    LOGIN: 'login',
    LOGOUT: 'logout',
};

const userReducer = (state, action) => {
    switch (action.type) {
        case actions.LOGIN: {
            return { ...state, ...action.payload };
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
    let initialData = localStorage.getItem(localStorageDataKey);
    if (initialData) {
        initialData = JSON.parse(initialData);
        if (initialData && initialData.meta && initialData.meta.exp < Date.now() / 1000) {
            initialData = {};
        }
    }

    const [state, dispatch] = useReducer(userReducer, initialData || {});

    useEffect(() => {
        localStorage.setItem(localStorageDataKey, JSON.stringify(state));
    }, [state]);

    // TODO refresh token hook

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

const useLogin = (code) => {
    const dispatch = useUserDispatch();
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [fetchResult, setFetchResult] = useState();

    useEffect(() => {
        if (fetchStatus === FETCH_STATUS.IDLE) {
            setFetchStatus(FETCH_STATUS.PENDING);
            httpPost(
                `o/token/?code=${code}&client_secret=${process.env.CLIENT_SECRET}&client_id=${process.env.CLIENT_ID}&grant_type=authorization_code&redirect_uri=http://localhost:1234/login`,
                {},
                {
                    host: 'https://oscar.zoodo.io',
                }
            )
                .then((data) => {
                    dispatch({
                        type: actions.LOGIN,
                        payload: {
                            ...data,
                            meta: jwtDecode(data.access_token),
                        },
                    });
                    window.localStorage.setItem(localStorageTokenKey, data.access_token);
                    setFetchResult(data);
                    setFetchStatus(FETCH_STATUS.RESOLVED);

                    httpGet('api/accounts/myprofile/', {
                        host: 'https://oscar.zoodo.io',
                    }).then((data) => {
                        dispatch({
                            type: actions.LOGIN,
                            payload: {
                                profile: data,
                            },
                        });
                    });
                })
                .catch((error) => {
                    dispatch({ type: actions.LOGOUT });
                    setFetchResult(error);
                    setFetchStatus(FETCH_STATUS.REJECTED);
                });
        }
    }, [code, dispatch, fetchStatus]);

    return [fetchStatus, fetchResult];
};

export { UserProvider, useUserState, useUserDispatch, useLogin };
