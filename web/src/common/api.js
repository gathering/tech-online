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
    return client(url, { body: data, method: 'POST', ...config });
};

export const httpPut = (url, data, config) =>
    client(url, {
        method: 'PUT',
        body: data,
        ...config,
    });

const client = (
    endpoint,
    { body, host = process.env.API_URL, forceBlankEol = false, contentType = 'application/json', ...customConfig } = {}
) => {
    const token = window.localStorage.getItem(localStorageTokenKey);
    const headers = { 'Content-Type': contentType, Accept: 'application/json' };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
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

    if (contentType === 'application/x-www-form-urlencoded') {
        config.body = Object.entries(body)
            .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
            .join('&');
    }

    if (config.method === 'POST') {
        endpoint += forceBlankEol ? '' : '/';
    }

    return fetch(`${host}/${endpoint}`, config).then(async (response) => {
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            return Promise.reject({
                status: response.status,
                data,
            });
        }
    });
};
