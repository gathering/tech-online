import { localStorageTokenKey } from '../store/userContext';

export const FETCH_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const httpGet = <T = any>(
  endpoint: string,
  config?: Record<string, any>
) => {
  return client<T>(endpoint, config);
};

export const httpPost = (url: string, data = {}, config = {}) => {
  return client(url, { body: data, method: 'POST', ...config });
};

export const httpPut = (url: string, data: Record<string, any>, config?: any) =>
  client(url, {
    method: 'PUT',
    body: data,
    ...config,
  });

export async function client<T = any>(
  endpoint: string,
  c: {
    body?: any;
    host?: string;
    forceBlankEol?: boolean;
    contentType?: string;
    [key: string]: any;
  } = {
    host: process.env.REACT_APP_API_URL as string,
    forceBlankEol: false,
    contentType: 'application/json',
  }
) {
  const token = window.localStorage.getItem(localStorageTokenKey);
  const headers: { [key: string]: any } = {
    'Content-Type': c.contentType,
    Accept: 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: c.body ? 'POST' : 'GET',
    ...c,
    headers: {
      ...headers,
      ...c.headers,
    },
  };

  if (c.body) {
    config.body = JSON.stringify(c.body);
  }

  if (c.contentType === 'application/x-www-form-urlencoded') {
    config.body = Object.entries(c.body)
      .map(
        ([key, _value]) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(c.value)
      )
      .join('&');
  }

  if (config.method === 'POST') {
    endpoint += c.forceBlankEol ? '' : '/';
  }

  return await fetch(`${c.host}/${endpoint}`, config).then(async (response) => {
    const data: T = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject({
        status: response.status,
        data,
      });
    }
  });
}
