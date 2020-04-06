import { localStorageTokenKey } from '../store/userContext';

export const FETCH_STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};

export const httpGet = (endpoint, config = {}) => {
    return client(endpoint, config);
};

export const httpPost = (url, data = {}, config = {}) => {
    return client(url, { body: data, ...config });
};

export const httpPut = (url, data, config) =>
    client(url, {
        method: 'PUT',
        body: data,
        ...config,
    });

const client = (endpoint, { body, host = process.env.API_URL, ...customConfig } = {}) => {
    const token = window.localStorage.getItem(localStorageTokenKey);
    const headers = { 'content-type': 'application/json' };
    if (token) {
        headers.Authorization = `JWT ${token}`;
    }
    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };
    if (body) {
        config.body = JSON.stringify(body);
    }
    return window.fetch(`${host}/${endpoint}`, config).then(async (response) => {
        if (response.status === 401) {
            // TODO logout();
            // window.location.assign(window.location);
            // return;
        }
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            return Promise.reject(data);
        }
    });
};
