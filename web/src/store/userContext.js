import React, { createContext, useReducer, useState, useEffect } from 'react';
import { httpPost, FETCH_STATUS, httpGet, httpPut } from '../common/api';

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
        if (initialData?.meta?.exp < Date.now() / 1000) {
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

const useLogin = (code, redirURL = '/login') => {
    const dispatch = useUserDispatch();
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE);
    const [fetchResult, setFetchResult] = useState();

    useEffect(() => {
        (async () => {
            if (fetchStatus === FETCH_STATUS.IDLE) {
                setFetchStatus(FETCH_STATUS.PENDING);
                await httpPost(
                    'oauth/token/',
                    {
                        code: code,
                        redirect_uri: `${window.location.origin}${redirURL}`,
                        grant_type: 'authorization_code',
                        client_secret: process.env.CLIENT_SECRET,
                        client_id: process.env.CLIENT_ID,
                    },
                    {
                        host: 'https://unicorn.zoodo.io',
                        forceBlankEol: true,
                        contentType: 'application/x-www-form-urlencoded',
                    }
                )
                    .then(async (data) => {
                        window.localStorage.setItem(localStorageTokenKey, data.access_token);

                        await httpGet('api/accounts/users/@me/', {
                            host: 'https://unicorn.zoodo.io',
                        }).then((profile) => {
                            let isAdmin = false;
                            if (profile.role.value === 'crew') {
                                isAdmin = true;
                            }
                            dispatch({
                                type: actions.LOGIN,
                                payload: {
                                    admin: isAdmin,
                                    profile,
                                    ...data,
                                },
                            });

                            httpPut(`user/${profile.uuid}`, {
                                token: profile.uuid,
                                username: profile.username,
                                display_name: profile.display_name,
                                email_address: profile.email,
                            }).catch((err) => {
                                console.warn(err);
                            });

                            setFetchResult(data);
                            setFetchStatus(FETCH_STATUS.RESOLVED);
                        });
                    })
                    .catch((error) => {
                        dispatch({ type: actions.LOGOUT });
                        setFetchResult(error);
                        setFetchStatus(FETCH_STATUS.REJECTED);
                    });
            }
        })();
    }, [code, dispatch, fetchStatus]);

    return [fetchStatus, fetchResult];
};

const userIsAuthed = (user) => !!Object.keys(user).length;

export { UserProvider, useUserState, useUserDispatch, useLogin, userIsAuthed };
